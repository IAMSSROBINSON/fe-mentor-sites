import { mainViewInit, renderInvalid, renderValid, removeValueAttr, renderValidRadio, renderValidConsent } from "./mainView.js";

// states
const fieldValues = {
    "first-name": "",
    "last-name": "",
    email: "",
    "query-type": "",
    message: "",
    consent: ""
}

const fieldRules = {
    "first-name": [required],
    "last-name": [required],
    email: [required, format],
    "query-type": [required],
    message: [required],
    consent: [required]
}

// functions
function mainControllerInit () {
    console.log("mainControllerInit")
    mainViewInit();

    // get elements
    const form = document.getElementById("contact-us-form");
    console.log("form :", form);
    
    // event listeners
    form.addEventListener("blur", handleBlur, true);
    form.addEventListener("submit", handleSubmit, true);
}

function validateField (value, rules) {
    for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
    }
    return null;
}

function validateForm (fieldValues, fieldRules) {
    const errors = {

    }

    Object.keys(fieldValues).forEach((field) => {
        console.log("FIELD:", field);
        const value = fieldValues[field];
        console.log("VALUE:", value); 
        const error = validateField(value, fieldRules[field]);
        if (error) {
            errors[field] = error;
        }
    });
    return errors;
}

function updateValue(field, value) {
    fieldValues[field] = value;
    console.log("fieldValues:", fieldValues);
}

function getCollection (name) {
    return Array.from(document.querySelectorAll(`input[type="${name}"]`));
}

// rule functions
function required (value) {
    return typeof value !== "string" || value.trim() === "" ? "This field is required" : null;
}

function format (value) {
    return !value.includes('@') || !value.includes('.') ? "Please enter a valid email address" : null;
}


// handlers
function handleBlur (e) {
    const target = e.target;
    if (target?.id === 'submit-button' || !target) return;
    const name = target?.name;
    const value = target?.value;
    const type = target?.type;
        
    console.log("target:", target);
    console.log("name:", name);
    console.log("value:", value);
    console.log("type:", type);

    if (type === 'radio') {
        handleRadio(name, value)
        return;
    }


    if (type === 'checkbox') {
        handleCheckbox(target, name);
        return;
    }


    const error = validateField(value, fieldRules[name]);
    if (error) {
        console.log("render invalid in ui");
        renderInvalid(name, error);
    } else {
        console.log("render valid in ui");
        renderValid(name);
        updateValue(name, value);
        console.log("fieldValues:", fieldValues);
    }

}

function handleCheckbox (target, name) {
    console.log("handleCheckBox:", target, name, target.checked);
    if (target.checked) {
        renderValidConsent(name);
        updateValue(name, "true");
        console.log("values:", fieldValues);
    } else {
        renderInvalid(name);
        updateValue(name, "");
        console.log("values:", fieldValues);

    }
}

function handleRadio (name, value) {
    console.log("handleRadio");
    const radios = Array.from(document.querySelectorAll(`input[name="${name}"]`));
    const hasChecked = radios.filter((radio) => radio.checked);
    if (hasChecked.length === 0) {
        const error = validateField("", fieldRules[name]);
        renderInvalid(name, error);
        updateValue(name, "");

        return;
    }

    renderValidRadio(name, value, radios);
    updateValue(name, value);

    console.log("handleRadio radios hasChecked", hasChecked);

}

function handleSubmit (e) {
    e.preventDefault();
    console.log("Form submitted, preventDefault");
    console.log("fieldValues:", fieldValues);
    const errors =  validateForm(fieldValues, fieldRules);
    console.log("handleSubmit errors", errors);

    if (Object.values(errors).every(value => !value)) {
        console.log("form successful, submit");
        // form is complete, submit
        e.target.submit();
        return;
    }

    const fields = Object.keys(errors);
    fields.forEach((field) => {
        renderInvalid(field, errors[field]);
    });
}


export { mainControllerInit };