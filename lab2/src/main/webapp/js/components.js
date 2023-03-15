import {
    map,
    createElement,
    createWrapper,
    createTextWrapper,
    addDisposableEventListener,
    removeNodeContents, createSVGElement
} from './html.js';

class Validatable {
    constructor(root, constraint) {
        this.root = root;
        this.validate = () => this.#setValidityStatus(constraint(root));
        this.visit = () => this.#setVisitStatus(true);
        this.root.addEventListener('input', (event) => {
            if (this.validate()) event.target.dispatchEvent(new Event('validinput'));
        });
        this.resetValidityState();
    }

    get visited() {
        return this.root.classList.contains('visited');
    }

    get valid() {
        return !this.root.classList.contains('invalid');
    }

    #setVisitStatus(status) {
        if (this.visited !== status) this.root.classList.toggle('visited')
        return status;
    }

    #setValidityStatus(status) {
        if (this.valid !== status) this.root.classList.toggle('invalid');
        return status;
    }

    resetValidityState() {
        this.#setVisitStatus(false);
        addDisposableEventListener(this.root, 'focusout', this.visit)
        this.validate();
    }
}

export class Form extends Validatable {
    constructor({root, fields, submitHandler}) {
        super(root, () => fields.every(f => f.valid));
        this.fields = fields;
        this.submitHandler = submitHandler;
        this.root.addEventListener('submit', (event) => {
            this.submit();
            event.preventDefault();
        });
    }

    get data() {
        return new FormData(this.root);
    }

    submit() {
        this.root.classList.add('submitted');
        if (this.valid) return this.submitHandler(this.data, this);
        return null;
    }

    resetForm() {
        this.root.reset();
        this.root.classList.remove('submitted');
        this.fields.forEach(field => field.resetValidityState());
        this.resetValidityState();
    }
}

export class TextField extends Validatable {
    constructor(root, constraint) {
        super(root, (el) => {
            const value = el.querySelector("input").value;
            return constraint(value);
        });
    }

    static extractValue(root) {
        return root.querySelector('input[type="text"]').value;
    }

    get value() {
        return TextField.extractValue(this.root);
    }
}

export class RadioButtonGroup extends Validatable {
    constructor(root) {
        super(root, (element) =>
            element.querySelector('input[type="radio"]:checked') != null);
    }

    static extractValue(root) {
        const checked = root.querySelector('input[type="radio"]:checked');
        return (checked == null) ? null : checked.value;
    }

    get value() {
        return RadioButtonGroup.extractValue(this.root);
    }
}

export class Table {
    constructor({contentRoot, rowFormat, reversedOrder}) {
        this.contentRoot = contentRoot;
        this.rowFormat = rowFormat;
        this.reversedOrder = reversedOrder;
    }

    #generateTableRow(data) {
        const values = this.rowFormat.map(key => data[key]);
        return createWrapper('tr',
            map(values, value => createTextWrapper('td', value)));
    }

    add(data) {
        const row = this.#generateTableRow(data);
        if (this.reversedOrder) {
            this.contentRoot.prepend(row);
        } else {
            this.contentRoot.append(row);
        }
    }

    clear() {
        removeNodeContents(this.contentRoot);
    }
}

export class CartesianSVGPointsGroup {
    constructor({contentRoot, pointIDs, pixelsPerUnit}) {
        this.root = contentRoot.viewportElement || contentRoot;
        this.contentRoot = contentRoot;
        this.pointIDs = pointIDs;
        this.pixelsPerUnit = pixelsPerUnit;
    }

    offsetToCoordinates(x, y) {
        return [
            (x - this.root.clientWidth / 2) / this.pixelsPerUnit,
            ((this.root.clientHeight - y) - this.root.clientHeight / 2) / this.pixelsPerUnit,
        ];
    }

    coordinatesToOffset(x, y) {
        return [
            x * this.pixelsPerUnit + this.root.clientWidth / 2,
            this.root.clientHeight - (y * this.pixelsPerUnit + this.root.clientHeight / 2),
        ];
    }

    setClickHandler(func) {
        this.root.addEventListener('click', (event) => {
            func(...this.offsetToCoordinates(event.offsetX, event.offsetY));
        });
    }

    add(x, y, id) {
        [x, y] = this.coordinatesToOffset(x, y);
        const href = this.pointIDs[id];
        const point = createSVGElement('use', {href, x, y})
        this.contentRoot.appendChild(point);
    }

    clear() {
        removeNodeContents(this.contentRoot);
    }
}

export class TextElement {
    constructor(root, prefix) {
        this.root = root;
        this.prefix = prefix;
        this.value = '';
    }

    set(str) {
        this.root.textContent = this.prefix + str;
    }

    clear() {
        this.root.textContent = '';
    }
}