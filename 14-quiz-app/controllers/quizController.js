// imports
import {
  quizViewInit,
  renderHeader,
  renderLoadingState,
  clearRenderLoadingState,
  renderCurrentQuestion,
  renderOptions,
  renderSubmitButton,
  handleSelectedStyles,
  renderError,
  removeError,
  renderCorrectAnswerStyles,
  renderIncorrectAnswerStyles,
  showCorrectAnswer,
  renderNextQuestionButton,
  updateProgress,
  renderResultsTitle,
  renderResultsCard,
  renderPlayAgainButton,
} from "../views/quizView.js";
import Header from "../components/Header/Header.js";
import { handleTheme, handleSwitch } from "./themeController.js";
import {
  initData,
  getData,
  getQuestionsByCategory,
} from "../models/mainModel.js";

// logic
let currentQuestionIndex = 0;
let currentScore = 0;
let currentQuestions = [];

// elements
const top = document.getElementById("top");
const bottom = document.getElementById("bottom");

// functions
(async function quizControllerInit() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  // theme operations
  renderHeader(category);
  handleTheme();

  const switchContainer = document.getElementById("switch-container");

  // events
  switchContainer.addEventListener("click", handleSwitch);
  renderLoadingState();

  try {
    const data = await initData(); // initialize data in model
    clearRenderLoadingState();
    const { icon, questions, title } = data.filter(
      (obj) => obj.title === category,
    )[0];

    currentQuestions = questions;

    console.log(icon, questions, title);
    handleQuestion();
    handleOptions();
    renderSubmitButton();
  } catch (err) {
    clearRenderLoadingState();
    console.log("mainController error loading data", err);
  }
})();

function handleQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    renderResultsTitle();

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    renderResultsCard(category, currentScore, currentQuestions);
    renderPlayAgainButton("Play Again");
    return;
  }
  const question = currentQuestions[currentQuestionIndex].question;
  renderCurrentQuestion(
    currentQuestionIndex,
    question,
    currentQuestions.length,
  );
  updateProgress(currentQuestionIndex);
}

function handleOptions() {
  const options = currentQuestions[currentQuestionIndex].options;
  const answer = currentQuestions[currentQuestionIndex].answer;
  renderOptions(options, answer);
}

function handleSelectedOption(e) {
  const optionLi = e.target.closest("li");
  const isValidOption = optionLi?.classList?.contains("option");
  if (isValidOption) {
    handleSelectedStyles(optionLi);
  }
}

function handleSubmitButtonClick(e) {
  const hasSelected = isOptionSelected();
  if (!hasSelected) {
    renderError();
    return;
  }
  removeError();
  // work out if answer is correct or false
  const correctAnswer = getCorrectAnswer();
  const selectedAnswer = getSelectedOptionValue();
  const isCorrectAnswer = correctAnswer === selectedAnswer;

  if (!isCorrectAnswer) {
    const selectedOption = getSelectedOptionLi();
    renderIncorrectAnswerStyles(selectedOption);

    const correctAnswerLi = getCorrectAnswerLi(correctAnswer);
    console.log("correctAnswerLi:", correctAnswerLi);
    showCorrectAnswer(correctAnswerLi);

    // change submit button into next question button
    increaseCurrentQuestionIndex();
    renderNextQuestionButton();
    return;
  }

  const selectedOption = getSelectedOptionLi();
  renderCorrectAnswerStyles(selectedOption);
  increaseCurrentQuestionIndex();
  increaseScore();
  renderNextQuestionButton();
}

function isOptionSelected() {
  const options = Array.from(document.querySelectorAll(".option-item"));
  return options.some((option) => option.classList.contains("selected-option"));
}

function getCorrectAnswer() {
  const correctAnswer = currentQuestions[currentQuestionIndex].answer;
  return correctAnswer;
}

function getSelectedOptionValue() {
  const selectedOption = getSelectedOptionLi();
  const optionButtonValue =
    selectedOption.querySelector(".option-button").value;
  return optionButtonValue;
}

function getSelectedOptionLi() {
  const selectedOption = document.querySelector(".selected-option");
  return selectedOption;
}

function getCorrectAnswerLi(correctAnswer) {
  const options = Array.from(document.querySelectorAll(".option"));
  return options.filter(
    (option) => option.firstElementChild.value === correctAnswer,
  )[0];
}

function handleNextQuestionButton() {
  handleQuestion();
  handleOptions();
  renderSubmitButton();
}

function increaseCurrentQuestionIndex() {
  currentQuestionIndex += 1;
}

function increaseScore() {
  currentScore += 1;
}

function handlePlayAgain(e) {
  window.location = "index.html";
}

export {
  handleSelectedOption,
  handleSubmitButtonClick,
  handleNextQuestionButton,
  handlePlayAgain,
};
