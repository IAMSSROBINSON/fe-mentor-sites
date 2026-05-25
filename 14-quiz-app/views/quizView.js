// imports
import {
  handleSelectedOption,
  handleSubmitButtonClick,
  handleNextQuestionButton,
  handlePlayAgain,
} from "../controllers/quizController.js";
import Header from "../components/Header/Header.js";
import ListItem from "../components/ListItem/ListItem.js";
import Question from "../components/Question/Question.js";
import Option from "../components/Option/Option.js";
import Button from "../components/Button/Button.js";
import Error from "../components/Error/Error.js";
import ResultCard from "../components/ResultCard/ResultCard.js";
import Logo from "../components/Logo/Logo.js";

// functions
function quizViewInit() {
  console.log("quizViewInit");
}

function renderHeader(title) {
  const body = document.getElementById("body");
  body.insertAdjacentHTML("afterbegin", Header());
  renderLogoInHeader(title);
}

function renderLogoInHeader(title) {
  const logoContainer = document.getElementById("logo-container");
  logoContainer.appendChild(ListItem(title, true));
  logoContainer.firstElementChild.style.background = "none";
  logoContainer.firstElementChild.style.boxShadow = "none";
  logoContainer.querySelector(".list-item").style.padding = "0";
}

function renderLoadingState() {
  const bottom = getBottomSectionElement();
  bottom.innerHTML = "<p>Loading data...</p>";
}

function clearRenderLoadingState() {
  const bottom = getBottomSectionElement();
  bottom.innerHTML = "";
}

function getBottomSectionElement() {
  return document.getElementById("bottom");
}

function renderCurrentQuestion(index, question, questionsArrLength) {
  const top = document.getElementById("top");
  top.innerHTML = "";
  top.insertAdjacentHTML(
    "afterbegin",
    Question(index, question, questionsArrLength),
  );
  const questionEl = document.querySelector('.question');
  questionEl.textContent = question;
}

function renderOptions(options, answer) {
  const bottom = document.getElementById("bottom");
  bottom.innerHTML = "";
  bottom.addEventListener("click", handleSelectedOption);

  const docFrag = document.createDocumentFragment();
  options.forEach((optionText, index) => {
    docFrag.append(Option(optionText, index));
  });
  bottom.appendChild(docFrag);
}

function renderSubmitButton() {
  const bottom = document.getElementById("bottom");
  const submitButton = Button("Submit Answer");
  submitButton.addEventListener("click", handleSubmitButtonClick);
  bottom.appendChild(submitButton);
}

function handleSelectedStyles(option) {
  removeSelectedStylesFromAllOptions();
  option.classList.add("selected-option");
}

function removeSelectedStylesFromAllOptions() {
  const allOptions = document.querySelectorAll(".option-item");
  allOptions.forEach((option) => {
    option.classList.remove("selected-option");
  });
}

function renderError() {
  const bottom = document.getElementById("bottom");
  const isError = bottom.querySelector(".error-container");
  if (!isError) {
    return bottom.appendChild(Error());
  }
  return;
}

function removeError() {
  const errorContainer = document.querySelector(".error-container");
  if (errorContainer) {
    return errorContainer.remove();
  }
  return;
}
function renderCorrectAnswerStyles(optionLi) {
  optionLi.classList.add("correct-answer");
  insertAnswerIcon(optionLi, "correct");
}

function insertAnswerIcon(optionLi, answerType) {
  const buttonInsideOption = optionLi.querySelector(".option-button");
  const answerTypeIcon = document.createElement("img");
  answerTypeIcon.src =
    answerType === "correct"
      ? "/assets/images/icon-correct.svg"
      : "/assets/images/icon-incorrect.svg";
  answerTypeIcon.classList.add(
    answerType === "correct" ? "correct-icon" : "incorrect-icon",
  );
  answerTypeIcon.setAttribute("alt", "answerType-icon");
  buttonInsideOption.appendChild(answerTypeIcon);
}

function renderIncorrectAnswerStyles(optionLi) {
  optionLi.classList.add("incorrect-answer");
  insertAnswerIcon(optionLi, "incorrect");
}

function showCorrectAnswer(correctLi) {
  insertAnswerIcon(correctLi, "correct");
}

function renderNextQuestionButton() {
  removeMainButton("submit-answer");

  const bottom = document.getElementById("bottom");
  const nextQuestionButton = Button("Next Question");

  nextQuestionButton.addEventListener("click", handleNextQuestionButton);

  bottom.appendChild(nextQuestionButton);
}

function removeMainButton(className) {
  const element = document.querySelector(`.${className}`);
  element.remove();
}

function updateProgress(index) {
  const progress = document.querySelector("input[type=range]");
  progress.style.width = `${(index + 1) * 10}%`;
}

function renderResultsTitle() {
  const top = document.getElementById("top");
  top.innerHTML = "";
  top.innerHTML =
    "<p class='results-title'>Quiz Completed</p><p class='results-subtitle'>You scored...</p>";
}

function renderResultsCard(category, score, questionArr) {
  const bottom = document.getElementById("bottom");
  bottom.innerHTML = "";
  bottom.appendChild(ResultCard(category, score, questionArr));
  const bottomLogoContainer = bottom.querySelector(".logo-container");
  bottomLogoContainer.appendChild(ListItem(category, true));
  bottomLogoContainer.firstElementChild.style.background = "none";
  bottomLogoContainer.firstElementChild.style.boxShadow = "none";
  bottomLogoContainer.querySelector(".list-item").style.padding = "0";
}

function renderPlayAgainButton(buttonText) {
  const bottom = document.getElementById("bottom");
  bottom.appendChild(Button(buttonText));
  const buttonTextElement = document.querySelector(".option-text");
  const playAgainButton = buttonTextElement.closest("li");
  playAgainButton.addEventListener("click", handlePlayAgain);
}

export {
  quizViewInit,
  renderHeader,
  renderLogoInHeader,
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
};
