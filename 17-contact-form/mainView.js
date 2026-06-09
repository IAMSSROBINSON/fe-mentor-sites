function mainViewInit () {
    console.log("mainViewInit");
}

function renderInvalid(fieldName, error) {
    console.log("renderInvalid fieldname error:", fieldName, error);
    const errorEl = document.getElementById(`${fieldName}-error`);
    errorEl.textContent = error;
    errorEl.style.visibility = "visible";
    console.log("renderInvalid:", fieldName);

    if (fieldName === "query-type" || fieldName === "consent") return;

        const el = document.querySelector(`input[name="${fieldName}"]`) || document.getElementById(fieldName);
        console.log("renderInvalid fieldName:", fieldName);
        console.log("renderInvalid fieldName el:", el);

        el.classList?.remove("renderValid");
        el.classList?.add("renderInvalid");
        console.log('el:', el);
}

function renderValid (fieldName) {
    const errorEl = document.getElementById(`${fieldName}-error`);
    errorEl.style.visibility = "hidden";
    console.log("renderValid:", fieldName);

      if (fieldName === 'query-type' || fieldName === 'consent') return;

        const el = document.getElementById(fieldName);
        el.classList?.remove("renderInvalid");
        el.classList?.add("renderValid");
        console.log('el:', el);

}

export { mainViewInit, renderInvalid, renderValid };