// element cache
const metricInput = document.getElementById("metric-unit");
const imperialInput = document.getElementById("imperial-unit");
const inputs = [metricInput, imperialInput];

const metricContentContainer = document.querySelector(".metric-content-container");
const imperialContentContainer = document.querySelector(".imperial-content-container");



// event listeners
document.addEventListener("DOMContentLoaded", showCheckedUnitInputs);

for(const input of inputs) {
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

    hideContainer.style.display = "none";
    showContainer.style.display = "block";
}


function handleInputChange (e) {
    handleCheckedAndUnchecked(e.target);
}

function handleCheckedAndUnchecked (input) {
    const currentCheckedInputIndex = inputs.indexOf(input);

    const uncheckedInputIndex = currentCheckedInputIndex === 0 ? 1 : 0;
    inputs[currentCheckedInputIndex].checked = true;
    inputs[uncheckedInputIndex].checked = false;

    hideUncheckedInputContainer(input.value);
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