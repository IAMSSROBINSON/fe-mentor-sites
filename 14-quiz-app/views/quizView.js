// imports
import Header from "../components/Header/Header.js";


// functions

function quizViewInit () {
    console.log('quizViewInit');

}

function renderHeader () {
    console.log('renderHeader');
    const body = document.getElementById('body');
    body.insertAdjacentHTML('afterbegin', Header());
}

export { quizViewInit, renderHeader };