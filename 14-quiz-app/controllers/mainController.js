// imports
import { mainModelInit } from '../models/mainModel.js';
import { mainViewInit } from '../views/mainView.js';

// elements

// events

// functions
function mainControllerInit () {
  console.log('mainControllerInit');
  mainModelInit()
  mainViewInit();
  
}

export { mainControllerInit };