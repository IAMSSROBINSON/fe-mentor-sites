import { stateManager } from '../models/mainModel.js';
import { mainViewInit  } from "../views/mainView.js";

function mainControllerInit () {
    console.log("MainControllerInit");
    console.log("MainControllerInit stateManager: ", stateManager);
    mainViewInit();
}

export  { mainControllerInit };