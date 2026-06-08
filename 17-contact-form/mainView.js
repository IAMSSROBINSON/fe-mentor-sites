
function mainViewInit () {
    console.log("mainViewInit")
}

function renderInvalid (id, error) {
    const element = document.getElementById(id);
    const errorEl = document.getElementById(`${id}-error`);
    errorEl.style.visibility = "visible";
    console.log("renderInvalidTExtContent:", errorEl.textContent);
    console.log("renderInvalidTExtContentError:", error);

    if (id === 'email') {
        errorEl.textContent = error;
    }

    if (id === "query-type" || id === "consent") {
        return;
    }

    element.style.border = "1px solid #D73C3C";
    
}

function renderValid (id) {
    removeErrorText(id);
    document.getElementById(id).style.outline = "1px solid #0C7D69";
}

function removeValueAttr (id) {
     const element = document.getElementById(id);
     element.value === "";
}

function renderValidRadio (name, value, radios) {

    radios.forEach((radio) => radio.closest('.radio-group').style.border = "1px solid #86A2A5");

    const checkedRadio = document.getElementById(value);

    const parent = checkedRadio.closest('.radio-group');
    parent.style.border = "1px solid #0C7D69";
    removeErrorText(name);
}

function renderValidConsent (name) {
    removeErrorText(name);
}

function removeErrorText (name) {
     const errorEl = document.getElementById(`${name}-error`);
    errorEl.style.visibility = "hidden";
}

export { mainViewInit, renderInvalid, renderValid, removeValueAttr, renderValidRadio, renderValidConsent };