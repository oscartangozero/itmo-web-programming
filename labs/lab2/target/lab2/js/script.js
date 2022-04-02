import {emptyRequestFactory, formRequestFactory} from './network.js';
import {parseSingleRowTable} from './html.js';
import {Form, Table, RadioButtonGroup, TextField, CartesianSVGPointsGroup} from './components.js';
import {isBoundedNumber} from './validation.js';

/* Network request executors */

const clearRequest = emptyRequestFactory('index', 'POST');
const dataRequest = formRequestFactory('index', 'GET');

/* Response processing helper functions */

function validateResponse(response) {
    if (!response.ok) throw new Error(`Request failed: ${response.status} ${response.statusText}`);
}

function handleNetworkError(error) {
    throw new Error(`Request failed: network error (${error.message})`)
}

function extractResponseBody(response) {
    validateResponse(response);
    return response.text();
}

const htmlParser = new DOMParser();

function parseResponseHTMLBody(text) {
    return htmlParser.parseFromString(text, 'text/html').body;
}

/* Response processing logic */

function handleResponseProcessingError(error) {
    alert(error.message);
}

function commitDataRequest(data) {
    dataRequest(data)
        .then(extractResponseBody, handleNetworkError)
        .then(parseResponseHTMLBody)
        .then(content => ({
            ...parseSingleRowTable(content.querySelector('#data-table'), {x: 'X', y: 'Y', r: 'R', result: 'RESULT'}),
            requestTime: content.querySelector('#request-time').textContent.trim(),
        }))
        .then(data => {
            responseTable.add(data);
            const radius = parseFloat(data.r);
            const relX = parseFloat(data.x) / radius;
            const relY = parseFloat(data.y) / radius;
            svg.add(relX, relY, data.result);
        }, handleResponseProcessingError);
}

function commitClearRequest() {
    clearRequest()
        .then(validateResponse, handleNetworkError)
        .then(() => {
            responseTable.clear();
            svg.clear();
        })
        .catch(handleResponseProcessingError);
}

/* HTML components */

const responseTable = new Table({
    contentRoot: document.getElementById('response-history-content'),
    rowFormat: ['requestTime', 'x', 'y', 'r', 'result'],
    reversedOrder: false,
});
document.querySelector('button#clear-history').addEventListener('click', commitClearRequest);

const requestRadiusParameterField = new TextField(document.getElementById('field-r'), isBoundedNumber(1, 4))
const requestForm = new Form({
    root: document.getElementById('request-form'),
    fields: [
        new RadioButtonGroup(document.getElementById('field-x')),
        new TextField(document.getElementById('field-y'), isBoundedNumber(-5, 3)),
        requestRadiusParameterField],
    submitHandler: commitDataRequest,
});

const svg = new CartesianSVGPointsGroup({
    contentRoot: document.getElementById('target-area-dynamic-content'),
    pointIDs: {'YES': '#point-yes', 'NO': '#point-no'},
    pixelsPerUnit: 120,
});
let radiusLastRequestedValue = null;
svg.setClickHandler((x, y) => {
    requestRadiusParameterField.visit();
    if (requestRadiusParameterField.valid) {
        let r = requestRadiusParameterField.value;
        if (r !== radiusLastRequestedValue) svg.clear();
        radiusLastRequestedValue = r;
        const radius = parseFloat(r);
        const absX = (parseFloat(x) * radius).toString();
        const absY = (parseFloat(y) * radius).toString();
        commitDataRequest(Object.entries({x: absX, y: absY, r}));
    }
});
