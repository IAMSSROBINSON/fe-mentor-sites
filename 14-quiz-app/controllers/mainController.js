// imports
import { mainModelInit, loadData } from '../models/mainModel.js';
import { mainViewInit } from '../views/mainView.js';
import handleTheme from './themeController.js';

// elements

// events

// functions
async function mainControllerInit () {
  console.log('mainControllerInit');

  // handle setting of theme from local storage or system
  handleTheme();

  mainModelInit();
  try {
    const data = await loadData();

    // load data in ui through view with data
  }
  catch (err) {
    console.log('mainController error loading data');
    // load error in ui through view with error and empty data
  }

  mainViewInit();


}

export { mainControllerInit };