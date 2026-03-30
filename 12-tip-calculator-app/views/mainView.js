// elements
const tipDollarAmount = document.querySelector(".tip-amount .dollar-amount");
const totalDollarAmount = document.querySelector(
  ".total-amount .dollar-amount",
);

const numberOfPeopleContainer = document.getElementById(
  "number-of-people-container",
);
const peopleErrorElement = document.getElementById("people-error-msg");
const resetButton = document.getElementById("reset-btn");

// functions
function mainViewInit() {}

function renderTipAmountPP(value) {
  console.log("renderTipAmountPP:", value);
  console.log("renderTipAmountPP typeof:", typeof value);
  if (!isValidNumber(value)) {
    return;
  }
  tipDollarAmount.textContent = `$${fixedDigits(value, 2)}`;
}

function renderTotalAmountPP(value) {
  if (!isValidNumber(value)) {
    return;
  }
  totalDollarAmount.textContent = `$${fixedDigits(value, 2)}`;
}

function fixedDigits(value, fixedDigit) {
  return value.toFixed(fixedDigit);
}

function isValidNumber(value) {
  return Number.isFinite(value);
}

function renderInvalid(container) {
  container.style.outline = "2px solid #E17052";
}

function renderValid(container) {
  container.style.outline = "2px solid #26C2AE";
}

function setElementBorderToInitial(element) {
  element.style.border = "initial";
  element.style.outline = "initial";
}

function renderErrorMessage(element, message) {
  element.textContent = message;
}

function removeErrorMessage(element) {
  element.textContent = "";
}

function renderResetTrue() {
  resetButton.disabled = false;
  resetButton.style.backgroundColor = "#26C2AE";
  resetButton.style.color = "#00474B";
}

function renderResetFalse() {
  resetButton.disabled = true;
  resetButton.style.backgroundColor = "#0D686D";
  resetButton.style.color = "#085C61";
}

function resetUIValues(element) {
  numberOfPeopleContainer.style.border = "initial";
  numberOfPeopleContainer.style.outline = "initial";
  peopleErrorElement.textContent = "";
}

function applySelectedTipClass(target) {
  removeSelectedTipClassFromAllBtns();
  target.classList.add("selected-tip");
}

function removeSelectedTipClassFromAllBtns() {
  const tipButtons = document.querySelectorAll(".tip-btn");
  tipButtons.forEach((btn) => {
    if (btn.classList.contains("selected-tip")) {
      btn.classList.remove("selected-tip");
    }
  });
}

export {
  mainViewInit,
  renderTipAmountPP,
  renderTotalAmountPP,
  renderInvalid,
  renderValid,
  renderErrorMessage,
  removeErrorMessage,
  resetUIValues,
  renderResetTrue,
  renderResetFalse,
  applySelectedTipClass,
  removeSelectedTipClassFromAllBtns,
  setElementBorderToInitial,
};
