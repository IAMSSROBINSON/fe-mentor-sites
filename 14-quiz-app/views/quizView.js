// imports
import Header from "../components/Header/Header.js";
import ListItem from "../components/ListItem/ListItem.js";


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

export { quizViewInit, renderHeader, renderLogoInHeader };