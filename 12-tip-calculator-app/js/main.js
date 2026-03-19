console.log("Hello World!");

// elements
const bill = document.getElementById('bill');
const buttonsContainer = document.getElementById('buttons-container');
const customTipBtn = document.getElementById('custom-btn');
const person = document.getElementById('person');
const personErrorMessage = document.getElementById('people-error-msg');
console.log("bill: ", bill);
console.log("buttons-container: ", buttonsContainer);

// events
bill.addEventListener('blur', handleBill);
buttonsContainer.addEventListener('click', handleTipClick);
customTipBtn.addEventListener('blur', handleCustomTip);
person.addEventListener('blur', handleNumberOfPeople)


// functions
function handleBill (e) {
    const billValue = getBillValue();
    const isValidBillValue = isValidNumber(billValue);

    if (billValue.trim() === "" || Number(billValue) === 0) {
        applyInitialToParent(e);
        bill.value = "";
        return
    }
    else if (isValidBillValue && Number(billValue) >= 1) {
        applyValidToParent(e);
         console.log("isValidBillValue:", isValidBillValue);
         return;
    }
    applyInvalidToParent(e);
    return;
}

function handleCustomTip (e) {
    const target = e.target;
    const targetValue = e.target.value;
    const isValidTip = isValidNumber(targetValue) && !isValueEmpty(e);
    if (isValueEmpty(e)) {
        target.value = "";
        target.classList.remove('selected-tip');
        target.style.border = "initial";
    }
    else if (!isValidTip) {
        // invalid number, apply error to custom tip border and error message
        isInvalidCustomTip(target);
        target.classList.remove('selected-tip');
    } else {
        isValidCustomTip(target);
    }
    console.log("handleCustomTip target", target);
    console.log("handleCustomTip value", target.value);
}

function renderTipAmount () {
    // get the bill amount

    // get the tip %

    // multiply the bill by the tip % = tip amount 

    // change value 
}

function isValueEmpty (e) {
    return e?.target?.value?.trim() === "";
}

function isValidCustomTip (target) {
    target.style.border = "2px solid #26C2AE";
}

function isInvalidCustomTip (target) {
    target.style.border = "2px solid #E17052";
}

function handleTipClick (e) {
    const target = e.target;
    if (target.classList.contains('tip-btn')) {
        console.log("handleTipClick valid btn");
        applySelectedTipClass(target);

        if (target.classList.contains('custom-btn')) {
            console.log("custom input button clicked");
            const customInputValue = document.querySelector('.custom-btn').value;
            console.log("custom tip button value", customInputValue);
        } else {
            console.log("regular tip button clicked");
            console.log("regular tip button value", target.value);
            resetCustomTipBtn();
        }
    }
    return;
}

function applySelectedTipClass (target) {
    // remove .selected-tip from all tip-btn's 
    const tipBtns = document.querySelectorAll('.tip-btn');
    tipBtns.forEach((btn) => {
        btn.classList.remove('selected-tip');
        console.log(btn);
    })
    target.classList.add('selected-tip');
    // apply .selected-tip to target
}

function resetCustomTipBtn () {
    customTipBtn.value = "";
    customTipBtn.style.border = "initial";
}

function applyInvalidToParent (e) {
    const target = e?.target || e;
    const parent = target.closest('.input-container');
    parent.style.border = "2px solid #E17052";
}

function applyInitialToParent (e) {
    const target = e?.target | e;
    const parent = target.closest('.input-container');
    parent.style.border = "initial";
}

function applyValidToParent (e) {
    const target = e?.target || e;
    const parent = target.closest('.input-container');
    parent.style.border = "2px solid #26C2AE";
}

function getBillValue () {
    const billInput = document.getElementById('bill');
    const billValue = billInput.value;
    console.log("billValue : ", billValue);
    return billValue;
}

function isValidNumber (value) {
    const valueToNumber = Number(value);
    console.log(typeof valueToNumber)
    return !Number.isNaN(valueToNumber) && valueToNumber >= 0;
}

function handleNumberOfPeople (e = null) {
    console.log("handleNumberOfPeople clicked", person);
    const numberOfPeopleValue = person.value;
    console.log("handleNumberOfPeople numberOfPeopleValue", numberOfPeopleValue);
    const isValidNumberOfPeople = isValidNumber(numberOfPeopleValue) && numberOfPeopleValue !== '0';
    if (isValueEmpty(e) || Number(person.value) === 0) {
        // apply error 
        applyPeopleError("Can't be zero");
        return
    }
    else if (!isValidNumberOfPeople) {
        applyPeopleError("Invalid value");
        return
    }
    person.value = Math.floor(person.value);
    applyValidToParent(person);
    removePeopleError();



}


function applyPeopleError (msg) {
    personErrorMessage.textContent = msg;
    applyInvalidToParent(person);
}

function removePeopleError() {
    personErrorMessage.textContent = "";
}