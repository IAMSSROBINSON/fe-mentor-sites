// imports
import {
  stateManager,
  getTipAmount,
  getTipsPerPerson,
  getTotalPerPerson,
  setBill,
  setTipPercentage,
  setNumberOfPeople,
  resetStateManager,
} from "../models/mainModel.js";
import {
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
} from "../views/mainView.js";

// elements
const billInput = document.getElementById("bill");
const tipsButtonsContainer = document.getElementById("buttons-container");
const numberOfPeopleContainer = document.getElementById(
  "number-of-people-container",
);
const peopleErrorElement = document.getElementById("people-error-msg");
const numberOfPeopleInput = document.getElementById("person");
const customTipInput = document.getElementById("custom-btn");
const resetButton = document.getElementById("reset-btn");

// eventListeners
billInput.addEventListener("input", handleBillInput);
tipsButtonsContainer.addEventListener("click", handleTip);
numberOfPeopleInput.addEventListener("input", handleNumberOfPeople);
numberOfPeopleInput.addEventListener("blur", handleNumberOfPeople);
customTipInput.addEventListener("input", handleCustomTip);
resetButton.addEventListener("click", resetValues);

// functions
function mainControllerInit() {
  mainViewInit();
}

function handleBillInput(e) {
  const billAmount = convertStringToNumber(e.target.value.trim());
  const billInputParentElement = billInput.parentElement;

  if (!Number.isFinite(billAmount) || billAmount < 0) {
    renderInvalid(billInputParentElement);
    setBill(billAmount || 0);
    isValidReset();
    recalculateAll();
    return;
  } else if (billAmount === 0) {
    setElementBorderToInitial(billInputParentElement);
  }
  setBill(billAmount || 0);
  recalculateAll();
  isValidReset();
  renderValid(billInputParentElement);
}

function handleTip(e) {
  // check that a tip button was clicked
  const target = e.target;

  if (!target.classList.contains("tip-btn")) {
    return;
  }

  if (target.classList.contains("custom-btn")) {
    removeSelectedTipClassFromAllBtns();
    return;
  } else {
    const tipPercentageToNumber = convertStringToNumber(target.value.trim());
    setTipPercentage(tipPercentageToNumber);
    customTipInput.value = "";
    recalculateAll();
    isValidReset();
    applySelectedTipClass(target);
    return;
  }
}

function handleNumberOfPeople(e) {
  const numberOfPeopleToNumber = convertStringToNumber(e.target.value.trim());
  if (!isValidNumber(numberOfPeopleToNumber)) {
    renderInvalid(numberOfPeopleContainer);
    renderErrorMessage(peopleErrorElement, "Can’t be zero");

    setNumberOfPeople(0);
    recalculateAll();

    isValidReset();
    renderResetTrue();
    return;
  }
  setNumberOfPeople(numberOfPeopleToNumber);
  renderValid(numberOfPeopleContainer);
  removeErrorMessage(peopleErrorElement);
  recalculateAll();
  isValidReset();
}

function isValidNumber(value) {
  return Number.isFinite(value) && Number(value) > 0;
}

function handleCustomTip() {
  const customTipValue = customTipInput.value.trim();
  const customTipValueToNumber = convertStringToNumber(customTipValue);

  if (customTipValueToNumber < 0 || !Number.isFinite(customTipValueToNumber)) {
    customTipInput.value = "";
    return;
  }
  setTipPercentage(customTipValueToNumber || 0);
  recalculateAll();
  isValidReset();
}

function convertStringToNumber(value) {
  return Number(value);
}

function recalculateAll() {
  const tipAmount = getTipsPerPerson(stateManager);
  renderTipAmountPP(tipAmount);

  const totalPerPerson = getTotalPerPerson(stateManager);
  renderTotalAmountPP(totalPerPerson);
}

function resetValues() {
  billInput.value = "";
  numberOfPeopleInput.value = "";
  customTipInput.value = "";
  resetUIValues();
  resetStateManager();
  recalculateAll();
  isValidReset();
  setElementBorderToInitial(billInput.parentElement);
  removeSelectedTipClassFromAllBtns();
}

function isValidReset() {
  const stateValues = Object.values(stateManager);
  const isTruthyValue = stateValues.some((value) => value !== 0);
  if (isTruthyValue) {
    renderResetTrue();
  } else {
    renderResetFalse();
  }
}

export { mainControllerInit };
