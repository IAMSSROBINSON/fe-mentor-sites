// element cache
const metricInput = document.getElementById("metric-unit");
const imperialInput = document.getElementById("imperial-unit");

const metricContentContainer = document.querySelector(".metric-content-container");
const imperialContentContainer = document.querySelector(".imperial-content-container");

const inputs = [metricInput, imperialInput];

document.addEventListener("DOMContentLoaded", showCheckedUnitInputs);

// event listeners
for(const input of inputs) {
    console.log(input);

    input.addEventListener("change", handleInputChange);
}


// functions
function showCheckedUnitInputs (e) {
    const checkedInputValue = getCurrentlyCheckedInput();
    hideUncheckedInputContainer(checkedInputValue);
}

function hideUncheckedInputContainer (unit) {
    const showContainer = `${unit}` === "metric" ? metricContentContainer : imperialContentContainer;

    const hideContainer = `${unit}` === "metric" ? imperialContentContainer : metricContentContainer;

    console.log("hide this container:", hideContainer);

    hideContainer.style.display = "none";
    showContainer.style.display = "block";
}


function handleInputChange (e) {
    handleCheckedAndUnchecked(e.target);
}

function handleCheckedAndUnchecked (input) {
    const currentCheckedInputIndex = inputs.indexOf(input);
    console.log("currentCheckedInputIndex:", currentCheckedInputIndex);

    const uncheckedInputIndex = currentCheckedInputIndex === 0 ? 1 : 0;
    inputs[uncheckedInputIndex].checked = false;

    hideUncheckedInputContainer(input.value);

    console.log("currentCheckedInputIsChecked:", inputs[currentCheckedInputIndex].checked);
    console.log("otherInputIsChecked:", inputs[uncheckedInputIndex].checked);
}

function getCurrentlyCheckedInput () {
    const inputs = Array.from(document.querySelectorAll('input[name="unit"]'));
    let checkedInputValue;

    for(const input of inputs) {
        if (input.checked) {
            checkedInputValue = input.value;
            break;
        }
    }

    return checkedInputValue;
}