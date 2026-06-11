function mainViewInit () {
    console.log("mainViewInit");
}

function renderInvalid(fieldName, error) {
    const errorEl = document.getElementById(`${fieldName}-error`);
    errorEl.textContent = error;
    errorEl.style.opacity = "100%";
    setAriaInvalidToAllNames(fieldName);

    if (fieldName === "query-type" || fieldName === "consent") return;

    const el = document.querySelector(`input[name="${fieldName}"]`) || document.getElementById(fieldName);
    el.classList?.remove("renderValid");
    el.classList?.add("renderInvalid");
}

function renderValid (fieldName) {
    const errorEl = document.getElementById(`${fieldName}-error`);
    errorEl.style.opacity = "0";
    removeAriaInvalidToAllNames(fieldName);


    if (fieldName === 'query-type' || fieldName === 'consent') return;

    const el = document.getElementById(fieldName);
    el.classList?.remove("renderInvalid");
    el.classList?.add("renderValid");
}

function setAriaInvalidToAllNames (fieldName) {
    const elements = document.querySelectorAll(`[name="${fieldName}"]`);
    elements.forEach(el => el.setAttribute('aria-invalid', 'true'));
}

function removeAriaInvalidToAllNames (fieldName) {
    const elements = document.querySelectorAll(`[name="${fieldName}"]`);
    elements.forEach(el => el.removeAttribute('aria-invalid'));
}

export { mainViewInit, renderInvalid, renderValid };