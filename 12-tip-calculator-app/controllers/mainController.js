// imports
import { stateManager, getTipAmount, getTipsPerPerson, getTotalPerPerson, setBill,  setTipPercentage, setNumberOfPeople, resetStateManager } from '../models/mainModel.js';
import { mainViewInit, renderTipAmountPP, renderTotalAmountPP, renderInvalidNumberOfPeople, renderValidNumberOfPeople, renderErrorMessage, removeErrorMessage } from '../views/mainView.js';

// elements
const billInput = document.getElementById('bill');
console.log("billInput: ", billInput);

const tipsButtonsContainer = document.getElementById('buttons-container');
console.log("tipsButtonsContainer: ", tipsButtonsContainer);

const numberOfPeopleContainer = document.getElementById('number-of-people-container');
const peopleErrorElement = document.getElementById('people-error-msg');
const numberOfPeopleInput = document.getElementById('person');
console.log("numberOfPeopleInput: ", numberOfPeopleInput);

const customTipInput = document.getElementById('custom-btn');
console.log("customTipInput: ", customTipInput);

const resetButton = document.getElementById('reset-btn');

// eventListeners
billInput.addEventListener('input', handleBillInput);
tipsButtonsContainer.addEventListener('click', handleTip);
numberOfPeopleInput.addEventListener('input', handleNumberOfPeople);
numberOfPeopleInput.addEventListener('blur', handleNumberOfPeople);
customTipInput.addEventListener('input', handleCustomTip);
resetButton.addEventListener('click', resetValues);


// functions
function mainControllerInit () {
    console.log("MainControllerInit");
    console.log("MainControllerInit stateManager: ", stateManager);
    mainViewInit();
}

function handleBillInput (e) {
    console.log("handleBillInput", e.target.value);
    const billAmount = convertStringToNumber(e.target.value.trim());
    setBill(billAmount || 0);
    recalculateAll();
    isValidReset();
}

function handleTip (e) {
    // check that a tip button was clicked
    const target = e.target;
    console.log("handleTip", target);


    if (!target.classList.contains('tip-btn')) {
        return;
    }

    if (target.classList.contains('custom-btn')){
        console.log("custom-btn tip", customTipInput.value);
       return;
    } 
    else {
        console.log("tip-btn tip", target.value);
        const tipPercentageToNumber = convertStringToNumber(target.value.trim());
        setTipPercentage(tipPercentageToNumber);
        customTipInput.value = "";
        recalculateAll();
        isValidReset();
        return
    }

}

function handleNumberOfPeople (e) {
    console.log("handleNumberOfPeople", e.target.value);
    const numberOfPeopleToNumber = convertStringToNumber(e.target.value.trim());
    if (!isValidPeopleNumber(numberOfPeopleToNumber)) {
        console.log(" handleNumberOfPeopleCannot be 0", numberOfPeopleToNumber);
        renderInvalidNumberOfPeople(numberOfPeopleContainer);
        renderErrorMessage(peopleErrorElement, "Can’t be zero");
       
        // numberOfPeopleInput.value = "";
        setNumberOfPeople();
            recalculateAll();

        isValidReset();
        return;
    }
    setNumberOfPeople(numberOfPeopleToNumber);
    renderValidNumberOfPeople(numberOfPeopleContainer);
    removeErrorMessage(peopleErrorElement, " ");
    recalculateAll();
    isValidReset();
    
}

function isValidPeopleNumber (value) {
    return Number.isFinite(value) && Number(value) > 0;
}

function handleCustomTip () {
    console.log("handleCustomTip");
    const customTipValue = customTipInput.value.trim();
    const customTipValueToNumber = convertStringToNumber(customTipValue);

    setTipPercentage(customTipValueToNumber || 0);
    recalculateAll();
    isValidReset();
}

function convertStringToNumber (value) {
    return Number(value);
}

function recalculateAll() {
    const tipAmount = getTipsPerPerson(stateManager);
    renderTipAmountPP(tipAmount);

    const totalPerPerson = getTotalPerPerson(stateManager);
    renderTotalAmountPP(totalPerPerson);

    console.log("stateManager:", stateManager)
}

function resetValues () {
    console.log("resetValues");
    billInput.value = "";
    numberOfPeopleInput.value = "";
    customTipInput.value = "";
    numberOfPeopleContainer.style.border = "initial";
    peopleErrorElement.textContent = "";
    resetStateManager();
    recalculateAll();
    isValidReset();
}

function isValidReset () {
    console.log("isRest");
    console.log("isRest state", stateManager);

    const stateValues = Object.values(stateManager);
    const isTruthyValue = stateValues.some((value) => Number(value) !== 0);
    if (isTruthyValue) {
        console.log("isTruthyValue yes", stateManager);
        resetButton.disabled = false;
        resetButton.style.backgroundColor = "#26C2AE";
        resetButton.style.color = "#00474B";
    } else {
        console.log("isTruthyValue no", stateManager);
        resetButton.disabled = true;
        resetButton.style.backgroundColor = "#0D686D";
        resetButton.style.color = "#085C61";
    }
}


export  { mainControllerInit };