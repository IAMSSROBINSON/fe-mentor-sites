
function mainViewInit () {
    console.log("mainViewInit")
}

function renderInvalid (id, error) {
    const element = document.getElementById(id);
    const errorEl = document.getElementById(`${id}-error`);
    errorEl.style.visibility = "visible";

    if (id === "query-type" || id === "content") {
        return;
    }

    element.style.outline = "1px solid red";
    
}

function renderValid (id) {
    const element = document.getElementById(id);
    const errorEl = document.getElementById(`${id}-error`);

    if (id === "query-type") {
        console.log("element:", element);
         parent.style.outline = "1px solid green";
        errorEl.style.visibility = "hidden";
        return;
    }

    errorEl.style.visibility = "hidden";
    element.style.outline = "1px solid green";

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
    const errorEl = document.getElementById(`${name}-error`);
    errorEl.style.visibility = "hidden";
}

export { mainViewInit, renderInvalid, renderValid, removeValueAttr, renderValidRadio };