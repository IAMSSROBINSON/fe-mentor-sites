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
    console.log("mainControllerInit");
    mainViewInit();

    // elements
    const form = document.getElementById("contact-us-form");

    // events
    form.addEventListener('blur', handleBlur, true);
    form.addEventListener('submit', handleSubmit);
}

function updateFieldValues (fieldName, value) {
    // if field is query-type or consent make sure one of them is checked before updating value

    if (fieldName === 'query-type' || fieldName === 'consent') {
        const checkedValue = hasCheckedValue(fieldName);
        checkedValue ? fieldValues[fieldName] = checkedValue : fieldValues[fieldName] = "";
        console.log("fieldValuesUpdatedAfter:", fieldValues);
        return;
    }

    console.log("fieldValuesUpdatedBefore:", fieldValues);
    fieldValues[fieldName] = value;
    console.log("fieldValuesUpdatedAfter:", fieldValues);
}

function getFieldNameValue (field) {
     if (field.name === 'query-type' || field.name === 'consent') {
        const checkedValue = hasCheckedValue(field.name);
        return checkedValue ? checkedValue : null;
    }
    return field.value;
}

function hasCheckedValue (fieldName) {
    // get all elements with inputs name
    const collection = Array.from(document.querySelectorAll(`input[name="${fieldName}"]`));

    const checkedEl = collection.filter((element => element.checked));
    return checkedEl.length !== 0 ? checkedEl[0].value : null; 
}

// validation functions
function validateField (value, rules) {
    console.log("validateField value:", value);
    console.log("validateField rules:", rules);
    for (const rule of rules) {
        const error = rule(value);
        if (error) {
            console.log("validateField error:", error);
            return error;
        };
    }
}

function validateForm (fieldValues, fieldRules) {
    const errors = {

    }

    const fields = Object.keys(fieldValues);
    const values = Object.values(fieldValues);

    console.log("validateForm fields:", fields);
    console.log("validateForm values:", values);

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
    console.log("validateForm errors:", errors);
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
    console.log("handleBlur clicked");
    if (e.target.id === 'submit-button') return;

    const target = e.target;
    const fieldName = e.target.name;
    const value = getFieldNameValue(target);
    const id = e.target.id;
    console.log("blur target:", target);
    console.log("blur fieldName:", fieldName);
    console.log("blur value:", value);
    console.log("blur id:", id);

    // validate field value
    const error = validateField(value, fieldRules[fieldName]);
    if (error) {
        // renderError and update field values with ""
        updateFieldValues(fieldName, value);
        renderInvalid(fieldName, error);
        return;
    } else {
        // renderValid and update field values with value
        updateFieldValues(fieldName, value);
        renderValid(fieldName);
    }


}

function handleSubmit (e) {
    e.preventDefault();
    console.log("handleSubmit clicked");
    console.log("currentFieldValues:", fieldValues);

    const errorObj = validateForm(fieldValues, fieldRules);
    if (Object.values(errorObj).every(err => !err)) {
        // form success, submit form
        console.log("handleSubmit form success submit form");
    } else {
        // form unsuccessful, do not submit form
        console.log("handleSubmit form unsuccessful do not submit form");
    }
    console.log("handleSubmit fieldValues:", fieldValues);
}

export { mainControllerInit };