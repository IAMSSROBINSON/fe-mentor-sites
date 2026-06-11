// imports
import { mainViewInit, renderInvalid, renderValid } from './mainView.js';

// states
const fieldValues = {
    "first-name": "",
    "last-name": "",
    "email": "",
    "query-type": "",
    "message": "",
    "consent": ""
}

const fieldRules = {
    "first-name": [required],
    "last-name": [required],
    "email": [required, format],
    "query-type": [queryTypeRequired],
    "message": [required],
    "consent": [consentRequired]
}

// functions
function mainControllerInit () {
    mainViewInit();

    // elements
    const form = document.getElementById("contact-us-form");

    // events
    form.addEventListener('blur', handleBlur, true);
    form.addEventListener('submit', handleSubmit);
}

function updateFieldValues (fieldName, value) {
    if (fieldName === 'query-type' || fieldName === 'consent') {
        const checkedValue = hasCheckedValue(fieldName);
        checkedValue ? fieldValues[fieldName] = checkedValue : fieldValues[fieldName] = "";
        return;
    }

    fieldValues[fieldName] = value;
}

function getFieldNameValue (field) {
     if (field.name === 'query-type' || field.name === 'consent') {
        const checkedValue = hasCheckedValue(field.name);
        return checkedValue ? checkedValue : null;
    }
    return field.value;
}

function hasCheckedValue (fieldName) {
    const collection = Array.from(document.querySelectorAll(`input[name="${fieldName}"]`));

    const checkedEl = collection.filter((element => element.checked));
    return checkedEl.length !== 0 ? checkedEl[0].value : null; 
}

// validation functions
function validateField (value, rules) {
    for (const rule of rules) {
        const error = rule(value);
        if (error) {
            return error;
        };
    }
}

function validateForm (fieldValues, fieldRules) {
    const errors = {
    }

    const fields = Object.keys(fieldValues);
    const values = Object.values(fieldValues);

    for (const field of fields) {
        const error = validateField(fieldValues[field], fieldRules[field]);
        if (error) {
            errors[field] = error;
            renderInvalid(field, error);
        } else {
            errors[field] = "";
            renderValid(field);
        }
    }
    return errors;
}

function required (value) {
    return typeof value !== "string" || value.trim() === "" ? "This field is required" : null;
}

function format (value) {
    return !value.includes('@') || !value.includes('.') ? "Please enter a valid email address" : null;
}

function queryTypeRequired (value) {
    return typeof value !== "string" || value.trim() === "" ? "Please select a query type" : null;
}

function consentRequired (value) {
    return typeof value !== "string" || value.trim() === "" ? "To submit this form, please consent to being contacted" : null;
}


// handlers
function handleBlur (e) {
    if (e.target.id === 'submit-button') return;

    const target = e.target;
    const fieldName = e.target.name;
    const value = getFieldNameValue(target);
    const id = e.target.id;
  
    // validate field value
    const error = validateField(value, fieldRules[fieldName]);
    if (error) {
        updateFieldValues(fieldName, value);
        renderInvalid(fieldName, error);
        return;
    } else {
        updateFieldValues(fieldName, value);
        renderValid(fieldName);
    }
}

function handleSubmit (e) {
    e.preventDefault();

    const errorObj = validateForm(fieldValues, fieldRules);
    if (Object.values(errorObj).every(err => !err)) {
        console.log("handleSubmit form success submit form");
        window.location.href = "./formSuccess.html";
    } else {
        console.log("handleSubmit form unsuccessful do not submit form");
    }
}

export { mainControllerInit };