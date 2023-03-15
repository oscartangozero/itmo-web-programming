const lastItem = array => array[array.length - 1];

export function parseSingleRowTable(table, format) {
    try {
        const data = new Map();
        const headerCells = lastItem(table.tHead.rows).cells;
        const dataCells = table.tBodies[0].rows[0].cells;
        for (let i = 0; i < headerCells.length; i++) {
            data.set(headerCells.item(i).textContent, dataCells.item(i).textContent);
        }
        for (const key in format) {
            format[key] = data.get(format[key]);
        }
        return format;
    } catch (error) {
        throw new Error(`Unexpected data format`);
    }
}

export function createTextWrapper(name, value) {
    const element = document.createElement(name);
    element.textContent = value;
    return element;
}

export function createWrapper(name, contents) {
    const element = document.createElement(name);
    for (const content of contents) {
        element.append(content);
    }
    return element;
}

export function createElement(name, attributes = {}, contents = []) {
    const element = document.createElement(name);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    for (const content of contents) {
        element.append(content);
    }
    return element;
}

export function createSVGElement(name, attributes = {}) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    return element;
}

export function addDisposableEventListener(element, type, callback) {
    const a = element.addEventListener(type, (event) => {
        callback(event);
        document.removeEventListener(type, a);
    })
}

export function removeNodeContents(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

export function* map(iterable, callable) {
    for (const item of iterable) {
        yield callable(item);
    }
}

export function animate(element, animation, duration = 1000) {
    element.classList.add(animation);
    setTimeout(() => {
        element.classList.remove(animation);
    }, duration);
}
