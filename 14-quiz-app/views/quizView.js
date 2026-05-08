// imports
import { handleSelectedOption, handleSubmitButtonClick } from "../controllers/quizController.js";
import Header from "../components/Header/Header.js";
import ListItem from "../components/ListItem/ListItem.js";
import Question from "../components/Question/Question.js";
import Option from "../components/Option/Option.js";
import Button from "../components/Button/Button.js";
import Error from "../components/Error/Error.js";

// functions

function quizViewInit () {
    console.log('quizViewInit');
}

function renderHeader (title) {
    console.log('renderHeader');
    const body = document.getElementById('body');
    body.insertAdjacentHTML('afterbegin', Header());
    renderLogoInHeader(title);
}

function renderLogoInHeader (title) {
    // get the logo-container by id
    // append ListItem to it and pass in title 
    const logoContainer = document.getElementById('logo-container');
    logoContainer.appendChild(ListItem(title));
    logoContainer.firstElementChild.style.background = "none";
    logoContainer.firstElementChild.style.boxShadow = "none";
}

function renderLoadingState () {
  const bottom =  getBottomSectionElement();
  bottom.innerHTML = '<p>Loading data...</p>';
  console.log('loading data...');

}

function clearRenderLoadingState () {
  const bottom =  getBottomSectionElement();
  bottom.innerHTML = "";
  console.log('clear loading data...');
}

function getBottomSectionElement() {
    return document.getElementById('bottom');
}

function renderCurrentQuestion (index, question, questionsArrLength) {
    const top = document.getElementById('top');
    console.log('top:', top);
    top.insertAdjacentHTML('afterbegin', Question(index, question, questionsArrLength));
}

function renderOptions (options, answer) {
    console.log("options:", options);
    console.log("answer:", answer);

    const bottom = document.getElementById('bottom');
    bottom.addEventListener('click', handleSelectedOption);

    const docFrag = document.createDocumentFragment();
    options.forEach((optionText, index) => {
        console.log(optionText, index);
        docFrag.append(Option(optionText, index));
    });
    bottom.appendChild(docFrag);
}

function renderSubmitButton () {
    const bottom = document.getElementById('bottom');
    const submitButton = Button('Submit Answer');

    submitButton.addEventListener('click', handleSubmitButtonClick);

    bottom.appendChild(submitButton);
}

function handleSelectedStyles (option) {
    removeSelectedStylesFromAllOptions();
    option.classList.add('selected-option');
    console.log("selectedOption class added to option");
}

function removeSelectedStylesFromAllOptions () {
    const allOptions = document.querySelectorAll('.option-item');
    allOptions.forEach((option) => {
        option.classList.remove('selected-option');
    })
}

function renderError () {
    const bottom = document.getElementById('bottom');
    const isError = bottom.querySelector('.error-container');
    if (!isError) {
        return bottom.appendChild(Error());
    }
    return;
}

function removeError () {
    const errorContainer = document.querySelector('.error-container');
    if (errorContainer) {
        return errorContainer.remove();
    }
    return;
}
function renderCorrectAnswerStyles (optionLi) {
    removeSelectedStylesFromAllOptions();
    optionLi.classList.add('correct-answer');
    insertCheckMark(optionLi);
}

function insertCheckMark (optionLi) {
    const buttonInsideOption = optionLi.querySelector('.option-button');
    const correctIcon = document.createElement('img');
    correctIcon.src = '/assets/images/icon-correct.svg';
    correctIcon.classList.add('correct-icon');
    correctIcon.setAttribute('alt', 'correct-icon');
    buttonInsideOption.appendChild(correctIcon);
    // console.log("insertCheckMark:", correctIcon);
    console.log(buttonInsideOption);
}

export { quizViewInit, renderHeader, renderLogoInHeader, renderLoadingState, clearRenderLoadingState, renderCurrentQuestion, renderOptions, renderSubmitButton, handleSelectedStyles, renderError, removeError, renderCorrectAnswerStyles};