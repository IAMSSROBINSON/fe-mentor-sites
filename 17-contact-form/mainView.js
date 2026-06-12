function mainViewInit() {
  console.log("mainViewInit");
}

function renderInvalid(fieldName, error) {
  const errorEl = document.getElementById(`${fieldName}-error`);
  errorEl.textContent = error;
  errorEl.style.opacity = "100%";
  setAriaInvalidToAllNames(fieldName);

  if (fieldName === "query-type" || fieldName === "consent") return;

  const el =
    document.querySelector(`input[name="${fieldName}"]`) ||
    document.getElementById(fieldName);
  el.classList?.remove("renderValid");
  el.classList?.add("renderInvalid");
}

function renderValid(fieldName) {
  const errorEl = document.getElementById(`${fieldName}-error`);
  errorEl.style.opacity = "0";
  removeAriaInvalidToAllNames(fieldName);

  if (fieldName === "query-type") {
    const radios = Array.from(document.querySelectorAll("input[type=radio]"));
    radios.forEach((radio) => {
      const radioGroup = radio.closest(".radio-group");
      if (radio.checked) {
        radioGroup.classList.add("success");
      } else {
        radioGroup.classList.remove("success");
      }
    });
    return;
  } else if (fieldName === "consent") {
    return;
  }

  const el = document.getElementById(fieldName);
  el.classList.remove("renderInvalid");
  el.classList.add("renderValid");
}

function setAriaInvalidToAllNames(fieldName) {
  const elements = document.querySelectorAll(`[name="${fieldName}"]`);
  elements.forEach((el) => el.setAttribute("aria-invalid", "true"));
}

function removeAriaInvalidToAllNames(fieldName) {
  const elements = document.querySelectorAll(`[name="${fieldName}"]`);
  elements.forEach((el) => el.removeAttribute("aria-invalid"));
}

function renderSuccess() {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.removeAttribute('hidden');
  renderReadOnly();
}

function renderReadOnly() {
  Array.from(document.querySelectorAll(".read-only")).forEach((ele) => {
    ele.setAttribute("readonly", "");
    console.log(ele);
  });

  Array.from(document.querySelectorAll("input[type=radio]")).forEach((radio) =>
    radio.setAttribute("disabled", ""),
  );

  document.getElementById("consent").setAttribute("disabled", "");

  document.getElementById("submit-button").setAttribute("disabled", "");
}

export { mainViewInit, renderInvalid, renderValid, renderSuccess };
