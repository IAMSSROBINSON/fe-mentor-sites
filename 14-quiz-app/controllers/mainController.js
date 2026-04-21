// imports
import { mainModelInit, initData } from '../models/mainModel.js';
import { mainViewInit, renderLoadingState, clearRenderLoadingState, renderCategories } from '../views/mainView.js';
import {handleTheme} from './themeController.js';

// elements

// events

// functions
async function mainControllerInit () {
  console.log('mainControllerInit'); // initial check that modules are invoking
  mainModelInit(); // initial check that modules are invoking
  mainViewInit(); // initial check that modules are invoking

  // handle setting of theme from local storage or system
  handleTheme();
  // render loading state in ui
  renderLoadingState();

  try {
    const data = await initData(); // initialize data in model
    clearRenderLoadingState();
    // load data in ui through view with data
    renderCategories(data);

  }
  catch (err) {
    clearRenderLoadingState();
    console.log('mainController error loading data', err);
    // load error in ui through view with error and empty data
    renderCategories({data: [], error: "Could not load data. Please refresh and try again later.."});

  }

}

export { mainControllerInit };