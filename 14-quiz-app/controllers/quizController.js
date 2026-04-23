
// imports
import { quizViewInit, renderHeader, renderLoadingState, clearRenderLoadingState } from "../views/quizView.js";
import Header from "../components/Header/Header.js";
import { handleTheme, handleSwitch } from "./themeController.js";
import { initData, getData } from '../models/mainModel.js';


// elements
const top = document.getElementById('top');
const bottom = document.getElementById('bottom');

// functions
(async function quizControllerInit () {

    console.log('quizControllerInit');


    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    console.log('Category title:', category);
    initData();
    

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
    // load data in ui through view with data
    // renderCategories(data);
  }
  catch (err) {
    clearRenderLoadingState();
    console.log('mainController error loading data', err);
    // load error in ui through view with error and empty data
    // renderCategories({data: [], error: "Could not load data. Please refresh and try again later.."});
  }
  
})();

