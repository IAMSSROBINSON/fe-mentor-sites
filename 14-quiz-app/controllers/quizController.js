
// imports
import { quizViewInit, renderHeader, renderLoadingState, clearRenderLoadingState, renderCurrentQuestion, renderOptions } from "../views/quizView.js";
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
    return;
  }
  const question = currentQuestions[currentQuestionIndex].question;
  renderCurrentQuestion(currentQuestionIndex, question, currentQuestions.length);

  console.log("handleQuestions:", question);

}

function handleOptions () {
  const options = currentQuestions[currentQuestionIndex].options;
  const answer = currentQuestions[currentQuestionIndex].answer;
  renderOptions(options, answer);
}


