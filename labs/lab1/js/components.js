import { map, createElement, createWrapper, createTextWrapper, addDisposableEventListener } from './utils.js';


class Validatable {
    constructor(root, constraint) {
        this.root = root;
        this.validate = this.#validator(constraint);
        setTimeout(this.validate);
        this.root.addEventListener('input', this.validate);
        addDisposableEventListener(this.root, 'focusout',
            () => { this.root.classList.add('visited'); })
    }

    get valid() {
        return !this.root.classList.contains('invalid');
    }

    #validator(constraint) {
        return () => {
            if (this.valid != constraint(this.root)) {
                this.root.classList.toggle('invalid');
            }
        };
    }

    reset() {
        this.root.classList.remove('visited');
        this.validate();
    }
}

class Form extends Validatable {
    constructor({ root, field_constraints, on_submit, on_failure }) {
        const fields = Object.entries(field_constraints)
            .map(([query, constraint]) =>
                new Validatable(root.querySelector(query), constraint));
        const constraint = () => fields.every(f => f.valid);
        super(root, constraint);
        this.fields = fields;
        this.root.addEventListener('submit', (event) => {
            event.preventDefault();
            this.root.classList.add('submitted');
            if (this.valid) { on_submit(this, event); }
            else { on_failure(this, event); }
        });
    }

    get data() { return new FormData(this.root); }

    get request() {
        return new Request(this.root.action,
            { method: this.root.method, body: this.data });
    }

    clear() {
        this.root.reset();
        this.root.classList.remove('submitted');
        this.fields.forEach(f => f.reset());
        this.reset();
    }
}

class Table {
    constructor({ root, data_format, display_inplace }) {
        this.root = root;
        this.base = root.lastChild;
        this.data_format = data_format;
        display_inplace.forEach(data => { this.append(data); });
    }

    *rows(data) {
        const values = this.data_format.map(key => data[key]);
        const arrays = values.filter(value => Array.isArray(value));
        const length = Math.max(...arrays.map(array => array.length));
        yield createWrapper('tr', map(values,
            value => (Array.isArray(value))
                ? createTextWrapper('td', value[0])
                : createElement('td', { textContent: value, rowSpan: length })));
        for (let i = 1; i < length; i++) {
            yield createWrapper('tr', map(arrays,
                array => createTextWrapper('td', array[i])));
        }
    }

    append(data) {
        this.base.after(createWrapper('tbody', this.rows(data)));
    }

    clear() {
        this.root.querySelectorAll('tbody').forEach(el => el.remove());
    }
}

class PreservedArray {
    constructor({ storage, id }) {
        this.storage = storage;
        this.id = id;
        const data = this.storage.getItem(this.id);
        this.data = data ? JSON.parse(data) : [];
    }

    append(item) {
        this.data.push(item);
        this.storage.setItem(this.id, JSON.stringify(this.data))
    }

    clear() {
        this.data = [];
        this.storage.removeItem(this.id);
    }
}

export { Form, Table, PreservedArray };
