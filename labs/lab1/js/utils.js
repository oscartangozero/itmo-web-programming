function createTextWrapper(name, value) {
    const element = document.createElement(name);
    element.textContent = value;
    return element;
}

function createWrapper(name, contents) {
    const element = document.createElement(name);
    for (const content of contents) {
        element.append(content);
    }
    return element;
}

function createElement(name, attributes = {}, contents = []) {
    const element = document.createElement(name);
    Object.assign(element, attributes);
    for (const content of contents) {
        element.append(content);
    }
    return element;
}

function addDisposableEventListener(element, type, callback) {
    const a = element.addEventListener(type, (event) => {
        callback(event);
        document.removeEventListener(type, a);
    })
}

const animate = (element, animation, duration=1000) => {
    element.classList.add(animation);
    setTimeout(() => { element.classList.remove(animation); }, duration);
};

const last_item = array => array[array.length - 1];

function parse_table(table, format) {
    const head_cells = last_item(table.tHead.rows).cells;
    const headers = Object.fromEntries(
        map(head_cells, (cell, i) => [cell.textContent, i]));
    const data = Array.from(Array(head_cells.length), () => []);
    const rows = flat_map(table.tBodies, body => body.rows);
    for (const row of rows) {
        for (let i = 0; i < head_cells.length; i++) {
            data[i].push(row.cells[i].textContent);
        }
    }
    Object.entries(format).forEach(
        ([key, header]) => { format[key] = data[headers[header]]; });
    return format;
}

function* map(iterable, callable) {
    let i = 0;
    for (const item of iterable) {
        yield callable(item, i++);
    }
}

function* flat_map(iterable, callable) {
    for (const item of iterable) {
        for (const subitem of callable(item)) {
            yield subitem;
        }
    }
}

const some = (iterable, predicate) => {
    for (const item of iterable) if (predicate(item)) return true;
    return false;
};

const some_inputs_checked = (element) =>
    some(element.querySelectorAll('input'), i => i.checked);

const contains_bounded_numberlike = (pattern, min, max) =>
    (element) => {
        const data = element.querySelector('input').value;
        return pattern.test(data) && min <= data && data <= max;
    };


export {
    map, some_inputs_checked, contains_bounded_numberlike, parse_table, animate,
    createElement, createWrapper, createTextWrapper, addDisposableEventListener
};
