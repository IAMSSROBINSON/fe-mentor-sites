// elements 
const tipDollarAmount = document.querySelector('.tip-amount .dollar-amount');
const totalDollarAmount = document.querySelector('.total-amount .dollar-amount');

// functions
function mainViewInit () {
    console.log("MainViewInit");
}

function renderTipAmountPP (value) {
     console.log("renderTipAmountPP:", value);
     console.log("renderTipAmountPP typeof:",typeof value);
     if (!isValidNumber(value)) {
        console.log("renderTipAmountPP is not a number:", value);
        return;
    }
    tipDollarAmount.textContent = `$${fixedDigits(value, 2)}`;
}

function renderTotalAmountPP (value) {
    console.log('renderTotalAmountPP:', value);
    if (!isValidNumber(value)) {
        console.log("renderTotalAmountPP is not a number:", value);
        console.log("renderTotalAmountPP is not a number typeof:", typeof value);
        return;
    }
    totalDollarAmount.textContent = `$${fixedDigits(value, 2)}`;
}

function fixedDigits(value, fixedDigit) {
    return value.toFixed(fixedDigit);
}

function isValidNumber (value) {
    return Number.isFinite(value);
}


export { mainViewInit, renderTipAmountPP, renderTotalAmountPP};