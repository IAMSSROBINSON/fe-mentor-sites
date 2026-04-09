// imports
import { stateManager } from "../models/mainModel.js";
import {
  clearPassword,
  updateGeneratedPassword,
  displayStrengthThresholdString,
  fillPasswordStrengthBoxes,
} from "../views/mainView.js";

// assets
const assets = {
  uppercase: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ],
  lowercase: [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ].map((char) => char.toLowerCase()),
  numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  symbols: [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "=",
    "{",
    "}",
    "[",
    "]",
    "|",
    ":",
    ";",
    "'",
    "<",
    ">",
    ".",
    "?",
    "/",
    "~",
    '"',
  ],
};

// elements
const generatePasswordForm = document.getElementById("create-password-form");
const rangeInput = document.getElementById("range");
const rangeDisplay = document.getElementById("character-length-number");
const checkboxesContainer = document.getElementById(
  "password-requirements-container",
);

// events
rangeInput.addEventListener("input", handleRange);
generatePasswordForm.addEventListener("submit", handleSubmit);
checkboxesContainer.addEventListener("click", handleCheck);

// functions
function mainControllerInit() {
  // display initial value of rangeInput in rangeDisplay and update state with value
  const rangeInputValue = Number(rangeInput.value);
  displayRangeValue(rangeInputValue);
  updateStateRange(rangeInputValue);
}

function displayRangeValue(value = 0) {
  rangeDisplay.textContent = value;
}

function handleRange(e) {
  const value = e.target.value;
  const max = e.target.max;
  const percent = (value / max) * 100;

  displayRangeValue(value);
  updateStateRange(value);

  e.target.style.setProperty("--clr-range", percent + "%");
}

function updateStateRange(value) {
  stateManager.range = Number(value);
}

function handleCheck(e) {
  const target = e.target;
  // check that an actual inputs container was clicked
  if (e.target.classList.contains("checkbox-input")) {
    updateStateChecked(target);
  }

  return;
}

function updateStateChecked(target) {
  stateManager[target.name] = target.checked;
}

function handleSubmit(e) {
  e.preventDefault();
  // clear current password in ui
  if (stateManager.range === 0) return;

  clearPassword();
  // getPassword
  const password = getPassword();

  if (!password) return;
  // display password in ui
  updateGeneratedPassword(password);

  // handle strength algorithm
  const checkboxScore = getCheckboxScore();
  const lengthScore = getLengthScore(password);
  const totalScore = checkboxScore + lengthScore;
  const strengthThresholdString = getStrengthThreshold(totalScore);

  // display strength boxes in UI + strength text
  displayStrengthThresholdString(strengthThresholdString);
  fillPasswordStrengthBoxes(strengthThresholdString);
}

function getCheckboxScore() {
  const numberOfTrueValues = Object.values(stateManager).filter(
    (value) => value === true,
  ).length;
  return numberOfTrueValues * 2;
}

function getLengthScore(password) {
  let score = 0;
  let length = password.length;

  if (length <= 5) {
    score += 0;
  } else if (length <= 8) {
    score += 1;
  } else if (length <= 12) {
    score += 2;
  } else if (length <= 16) {
    score += 3;
  } else {
    score += 4;
  }

  return score;
}

function getStrengthThreshold(score) {
  let strength = "";

  if (score <= 3) {
    strength = "too weak";
  } else if (score <= 7) {
    strength = "weak";
  } else if (score <= 11) {
    strength = "medium";
  } else {
    strength = "strong";
  }

  return strength;
}

function getPassword() {
  const numberOfCharactersForPassword = getRange();
  const checkedKeys = getCheckedKeys(); // ['uppercase', 'symbols']

  if (checkedKeys.length === 0) return;

  let password = "";
  for (let i = 0; i < numberOfCharactersForPassword; i++) {
    const randomKey = checkedKeys[getRandomIndex(checkedKeys)];
    const randomChar = getRandomCharFromAssetKey(randomKey);
    password += randomChar;
  }

  return password;
}

function getRandomIndex(keysArr) {
  const randomNumber = Math.floor(Math.random() * keysArr.length);
  return randomNumber;
}

function getCheckedKeys() {
  const keys = Object.keys(stateManager);
  const checkedKeys = keys.filter((key) => stateManager[key] === true);

  return checkedKeys;
}

function getRandomCharFromAssetKey(key) {
  const randomIndex = getRandomIndex(assets[key]);
  const randomCharFromAssetKey = assets[key][randomIndex];

  return randomCharFromAssetKey;
}

function getRange() {
  return stateManager.range;
}

export { mainControllerInit };
