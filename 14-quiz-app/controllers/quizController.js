
// imports
import { quizViewInit, renderHeader, renderLoadingState, clearRenderLoadingState, renderCurrentQuestion, renderOptions, renderSubmitButton, handleSelectedStyles, renderError, removeError, renderCorrectAnswerStyles, renderIncorrectAnswerStyles, showCorrectAnswer, renderNextQuestionButton, updateProgress } from "../views/quizView.js";
import Header from "../components/Header/Header.js";
import { handleTheme, handleSwitch } from "./themeController.js";
import { initData, getData, getQuestionsByCategory } from '../models/mainModel.js';

// logic
let currentQuestionIndex = 0;
let currentScore = 0;
let currentQuestions = [];


// elements
const top = document.getElementById('top');
const bottom = document.getElementById('bottom');

// functions
(async function quizControllerInit () {

    console.log('quizControllerInit');


    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    console.log('Category title:', category);
    
    // theme operations
    renderHeader(category);
    handleTheme();

    const switchContainer = document.getElementById('switch-container');
    console.log("switchContainer", switchContainer);

    // events
    switchContainer.addEventListener('click', handleSwitch);
    console.log('quizController data:', getData());

  renderLoadingState();

  try {
    const data = await initData(); // initialize data in model
    clearRenderLoadingState();
    const { icon, questions, title } = data.filter(obj => obj.title === category)[0];

    currentQuestions = questions;
    
    console.log(icon, questions, title);
    handleQuestion();
    handleOptions();
    renderSubmitButton();
  }
  catch (err) {
    clearRenderLoadingState();
    console.log('mainController error loading data', err);
    // load error in ui through view with error and empty data
    // renderCategories({data: [], error: "Could not load data. Please refresh and try again later.."});
  }
  
})();

function handleQuestion () {
  if (currentQuestionIndex >= currentQuestions.length) {
    // end of quiz, render results
    console.log("currentQuestionIndex >= currentQuestions.length, end of quiz");
    return;
  }
  const question = currentQuestions[currentQuestionIndex].question;
  renderCurrentQuestion(currentQuestionIndex, question, currentQuestions.length);
  updateProgress(currentQuestionIndex);

  console.log("handleQuestions:", question);

}

function handleOptions () {
  const options = currentQuestions[currentQuestionIndex].options;
  const answer = currentQuestions[currentQuestionIndex].answer;
  renderOptions(options, answer);
}

function handleSelectedOption (e) {

  const optionLi = e.target.closest('li');
  const isValidOption = optionLi?.classList?.contains('option');
  if (isValidOption) {
      console.log('handleSelectedOption quizController OPTION clicked');
      console.log("optionLi", optionLi);
      handleSelectedStyles(optionLi);
  }
}

function handleSubmitButtonClick (e) {
        console.log('SubmitButtonClicked');
        console.log('isOptionSelected:', isOptionSelected());
        const hasSelected = isOptionSelected();
        if (!hasSelected) {
          // render wrong answer notification in the ui
          renderError();
          return;
        }
        removeError();
        // work out if answer is correct or false
        const correctAnswer = getCorrectAnswer();
        const selectedAnswer = getSelectedOptionValue();
        const isCorrectAnswer = correctAnswer === selectedAnswer;

        console.log("correctAnswer:", correctAnswer)
        console.log("selectedAnswer:", selectedAnswer)
        console.log("isCorrectAnswer:", isCorrectAnswer);

        if (!isCorrectAnswer) {
          // if answer is incorrect handle here
          const selectedOption = getSelectedOptionLi();
          renderIncorrectAnswerStyles(selectedOption);
          // disable all button options
          // disableAllOptions();
          // show correct answer, render check inside correct option
          const correctAnswerLi = getCorrectAnswerLi(correctAnswer);
          console.log('correctAnswerLi:', correctAnswerLi);
          showCorrectAnswer(correctAnswerLi);
          // change submit button into next question button
          increaseCurrentQuestionIndex();
          renderNextQuestionButton();
          return;
        }
        // if answer is correct handle here
        /*

        apply a class to apply correct answer styles to li option

        */
       const selectedOption = getSelectedOptionLi();
       renderCorrectAnswerStyles(selectedOption);
       increaseCurrentQuestionIndex();
       increaseScore();
       console.log("currentQuestionIndex:", currentQuestionIndex);
       console.log("currentScore:", currentScore);
       renderNextQuestionButton();
      //  disableAllOptions();

        
}

function isOptionSelected () {
  const options = Array.from(document.querySelectorAll('.option-item'));
  return options.some((option) => option.classList.contains('selected-option'));
}

function getCorrectAnswer () {
  const correctAnswer = currentQuestions[currentQuestionIndex].answer;
  console.log("getCorrectAnswer", correctAnswer);
  return correctAnswer;
}

function getSelectedOptionValue () {
  const selectedOption = getSelectedOptionLi();
  const optionButtonValue = selectedOption.querySelector('.option-button').value;
  return optionButtonValue;
}

function getSelectedOptionLi () {
    const selectedOption = document.querySelector('.selected-option');
    return selectedOption;
}

function disableAllOptions () {
  const allOptionClassButtons = Array.from(document.querySelectorAll('.option'));
  allOptionClassButtons.forEach((button) => {
    button.disable = true;
  });
  console.log("All option buttons disabled");

}

function getCorrectAnswerLi (correctAnswer) {
  const options = Array.from(document.querySelectorAll('.option'));
  return options.filter((option) => option.firstElementChild.value === correctAnswer)[0];
}

function handleNextQuestionButton () {
  console.log('handleNextQuestionButton');
  handleQuestion();
  handleOptions();
  renderSubmitButton();
}

function increaseCurrentQuestionIndex () {
  currentQuestionIndex += 1;
}

function increaseScore () {
  currentScore += 1;
}

export { handleSelectedOption, handleSubmitButtonClick, handleNextQuestionButton };

