// imports
import { mainModelInit, stateManager } from '../models/mainModel.js';
import { mainViewInit, clearPassword, updateGeneratedPassword } from '../views/mainView.js';

// assets
const assets = {
    uppercase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    lowercase: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map(char => char.toLowerCase()),
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    symbols: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "=", "{", "}", "[", "]", "|", ":", ";", "'", "<", ">", ".", "?", "/", "~", "\""],
}

// elements
const generatePasswordForm = document.getElementById("create-password-form");
const rangeInput = document.getElementById("range");
const rangeDisplay = document.getElementById("character-length-number");
const checkboxesContainer = document.getElementById("password-requirements-container");
// const checkboxes = document.querySelectorAll(".checkbox-input");
const generateButton = document.getElementById("generate-password-button");


// events
rangeInput.addEventListener("change", handleRange);
generatePasswordForm.addEventListener("submit", handleSubmit);
checkboxesContainer.addEventListener("click", handleCheck);



// functions
function mainControllerInit() {
    console.log("mainControllerInit :");
    console.log("mainControllerInit :", stateManager);
    console.log("mainControllerInit rangeInput:", rangeInput);
    console.log("mainControllerInit rangeInput value:", rangeInput.value);
    // console.log("mainControllerInit checkboxes:", checkboxes);
    console.log("mainControllerInit assets:", assets);
    mainModelInit();
    mainViewInit();

    // display initial value of rangeInput in rangeDisplay and update state with value
    const rangeInputValue = Number(rangeInput.value);
    displayRangeValue(rangeInputValue);
    updateStateRange(rangeInputValue);
    console.log(stateManager);
}   

function displayRangeValue (value = 0) {
    rangeDisplay.textContent = value;
}

function handleRange (e) {
    console.log("RangeInput changed", e.target.value);
    displayRangeValue(e.target.value);
    updateStateRange(e.target.value);
    console.log(stateManager);
}

function updateStateRange (value) {
    stateManager.range = Number(value);
}

function handleCheck (e) {
    const target = e.target;
    // check that an actual inputs container was clicked
    if (e.target.classList.contains("checkbox-input")) {
        
    console.log("checkbox:", target);
    console.log("checkbox checked? :", target.checked, target.name);

    updateStateChecked(target)
    }

    return
}

function updateStateChecked (target) {
    stateManager[target.name] = target.checked;
    console.log(stateManager);
}


function handleSubmit (e) {
    e.preventDefault();
    // clear current password in ui 
    if (stateManager.range === 0) return;

    clearPassword()
    // getPassword
    const password = getPassword();
    
    if (!password) return;
    // display password in ui
    updateGeneratedPassword(password);

    // handle strength algorithm 

    // display strength boxes in UI + strength text
}

function getPassword () {
    const numberOfCharactersForPassword = getRange();
    console.log("numberOfCharactersForPassword:", numberOfCharactersForPassword);

    const checkedKeys = getCheckedKeys(); // ['uppercase', 'symbols']
    if (checkedKeys.length === 0) return;

    console.log("getPassword:", checkedKeys);
    // getRandomCharFromAssetKey(checkedKeys[0]);
    let password = "";
    for (let i = 0; i < numberOfCharactersForPassword; i++) {
        console.log("logs:", i);

        const randomKey = checkedKeys[getRandomIndex(checkedKeys)];
        console.log("randomKey:", randomKey);

        const randomChar = getRandomCharFromAssetKey(randomKey);
        console.log("randomChar:", randomChar);
        password += randomChar;
    }
    console.log("Password: ", password);
    return password;
}

function getRandomIndex (keysArr) {
        console.log("getRandomIndex keysArr: ", keysArr);

    const randomNumber =  Math.floor(Math.random() * keysArr.length);
    console.log("getRandomIndex:", randomNumber);
    return randomNumber;
}

function getCheckedKeys () {
    const keys = Object.keys(stateManager);
    const checkedKeys = keys.filter(key => stateManager[key] === true);
    console.log("checkedKeys: ", checkedKeys);
    return checkedKeys;
}

function getRandomCharFromAssetKey (key) {
    const lengthOfAssetValue = assets[key].length;
    const randomIndex = getRandomIndex(assets[key]);
    console.log("key", key, "length of keysValueArr:", lengthOfAssetValue, "randomIndex:", randomIndex);
    const randomCharFromAssetKey = assets[key][randomIndex];
    console.log("randomCharFromAssetKey:", randomCharFromAssetKey);
    return randomCharFromAssetKey;
}

function getRange () {
    return stateManager.range;
}


// exports
export { mainControllerInit };