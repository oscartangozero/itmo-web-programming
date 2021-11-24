import { Form, Table, PreservedArray } from './components.js';
import { some_inputs_checked, contains_bounded_numberlike, parse_table, animate } from './utils.js';


const responses = new PreservedArray({
    storage: sessionStorage,
    id: 'response-history',
});
const response_table = new Table({
    root: document.getElementById('response-history'),
    data_format: ['request_time', 'x', 'y', 'r', 'result', 'proccessing_time'],
    display_inplace: responses.data,
});
document.getElementById('clear-history').addEventListener('click', () => {
    responses.clear();
    response_table.clear();
});

const html_parser = new DOMParser();
function retrieve_data(content) {
    try {
        return {
            ...parse_table(content.querySelector('#data-table'),
                { 'x': 'X', 'y': 'Y', 'r': 'R', 'result': 'RESULT' }),
            request_time: content.querySelector('#request-time').textContent + '\n'
                + content.querySelector('#request-date').textContent,
            proccessing_time: content.querySelector('#proccessing-time').textContent,
        };
    } catch {
        throw new Error('Unexpected data format');
    }
}

const float_pattern = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?[0-9]+)?$/;
const request_form = new Form({
    root: document.getElementById('request-form'),
    field_constraints: {
        '#field-x': some_inputs_checked,
        '#field-y': contains_bounded_numberlike(float_pattern, -3, 5),
        '#field-r': some_inputs_checked,
    },
    on_submit(form) {
        fetch(form.request)
            .then(response => {
                if (response.ok) return response.text();
                else throw new Error(
                    `Request failed: ${response.status} ${response.statusText}`);
            })
            .then(text =>
                html_parser.parseFromString(text, 'text/html').body)
            .then(retrieve_data)
            .then(data => {
                responses.append(data);
                response_table.append(data);
                form.clear();
            }, error => {
                alert(error.message);
            });
    },
    on_failure(form, event) { animate(event.submitter, 'shake'); }
});