console.log("Hello World!");

// elements
const bill = document.getElementById("bill");
console.log("bill: ", bill);

// events
bill.addEventListener("blur", handleBill);


// functions
function handleBill (e) {
    const billValue = getBillValue();
    const isValidBillValue = validateBillValue(billValue);

    if (billValue.trim() === "") {
        applyInitialToParent(e);
        return
    }
    else if (isValidBillValue) {
        applyValidToParent(e);
    } else if (!isValidBillValue) {
        applyInvalidToParent(e);
    }
    console.log("isValidBillValue:", isValidBillValue);
}

function applyInvalidToParent (e) {
    const target = e.target;
    const parent = target.closest('.input-container');
    parent.style.border = "1px solid #E17052";
}

function applyInitialToParent (e) {
    const target = e.target;
    const parent = target.closest('.input-container');
    parent.style.border = "initial";
}

function applyValidToParent (e) {
    const target = e.target;
    const parent = target.closest('.input-container');
    parent.style.border = "1px solid #26C2AE";
}

function getBillValue () {
    const billInput = document.getElementById('bill');
    const billValue = billInput.value;
    console.log("billValue : ", billValue);
    return billValue;
}

function validateBillValue (value) {
    const valueToNumber = Number(value);
    console.log(typeof valueToNumber)
    return !Number.isNaN(valueToNumber) && valueToNumber > 0;
}