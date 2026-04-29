// imports
import Header from "../components/Header/Header.js";
import ListItem from "../components/ListItem/ListItem.js";
import Question from "../components/Question/Question.js";
import Option from "../components/Option/Option.js";


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


    const docFrag = document.createDocumentFragment();
    options.forEach((optionText, index) => {
        console.log(optionText, index);
        docFrag.append(Option(optionText, index));
    });
    bottom.appendChild(docFrag);
}

export { quizViewInit, renderHeader, renderLogoInHeader, renderLoadingState, clearRenderLoadingState, renderCurrentQuestion, renderOptions };