
// imports
import { handleSwitch } from "./themeController.js";
import Header from "../components/Header/Header.js";
import { handleTheme } from './themeController.js';


// elements
const top = document.getElementById('top');
const bottom = document.getElementById('bottom');

// logic
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
console.log('Category title:', category);

// functions
(function quizControllerInit () {
    console.log('quizControllerInit');
    renderHeader();
    handleTheme();

    
    const switchContainer = document.getElementById('switch-container');
    console.log("switchContainer", switchContainer);

    // events
    switchContainer.addEventListener('click', handleSwitch);
})();

function renderHeader () {
    console.log('renderHeader');
    const body = document.getElementById('body');
    body.insertAdjacentHTML('afterbegin', Header());
}