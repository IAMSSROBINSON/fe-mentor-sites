// imports
import { stateManager, getTipAmount, getTipsPerPerson, getTotalPerPerson, setBill,  setTipPercentage, setNumberOfPeople } from '../models/mainModel.js';
import { mainViewInit, renderTipAmountPP, renderTotalAmountPP  } from '../views/mainView.js';

// elements
const billInput = document.getElementById('bill');
console.log("billInput: ", billInput);

const tipsButtonsContainer = document.getElementById('buttons-container');
console.log("tipsButtonsContainer: ", tipsButtonsContainer);

const numberOfPeopleInput = document.getElementById('person');
console.log("numberOfPeopleInput: ", numberOfPeopleInput);

const customTipInput = document.getElementById('custom-btn');
console.log("customTipInput: ", customTipInput);

// eventListeners
billInput.addEventListener('input', handleBillInput);
tipsButtonsContainer.addEventListener('click', handleTip);
numberOfPeopleInput.addEventListener('input', handleNumberOfPeople);
customTipInput.addEventListener('input', handleCustomTip);


// functions
function mainControllerInit () {
    console.log("MainControllerInit");
    console.log("MainControllerInit stateManager: ", stateManager);
    mainViewInit();
}

function handleBillInput (e) {
    console.log("handleBillInput", e.target.value);
    const billAmount = convertStringToNumber(e.target.value);
    setBill(billAmount);
    recalculateAll();
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
        const tipPercentageToNumber = convertStringToNumber(target.value);
        setTipPercentage(tipPercentageToNumber);
        recalculateAll();
        return
    }

}

function handleNumberOfPeople (e) {
    console.log("handleNumberOfPeople", e.target.value);
    const numberOfPeopleToNumber = convertStringToNumber(e.target.value);
    if (!isValidPeopleNumber(numberOfPeopleToNumber)) {
        console.log(" handleNumberOfPeopleCannot be 0", numberOfPeopleToNumber)
        return;
    }
    setNumberOfPeople(numberOfPeopleToNumber);
    recalculateAll();
}

function isValidPeopleNumber (value) {
    return Number.isFinite(value) && Number(value) > 0;
}

function handleCustomTip () {
    console.log("handleCustomTip");
    const customTipValue = customTipInput.value;
    const customTipValueToNumber = convertStringToNumber(customTipValue);
    setTipPercentage(customTipValueToNumber);
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

export  { mainControllerInit };