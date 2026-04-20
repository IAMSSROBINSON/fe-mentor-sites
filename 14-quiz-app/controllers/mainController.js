// imports
import { mainModelInit } from '../models/mainModel.js';
import { mainViewInit } from '../views/mainView.js';
import handleTheme from './themeController.js';

// elements

// events

// functions
async function mainControllerInit () {
  console.log('mainControllerInit');
  handleTheme();

  mainModelInit();
  mainViewInit();


}

export { mainControllerInit };