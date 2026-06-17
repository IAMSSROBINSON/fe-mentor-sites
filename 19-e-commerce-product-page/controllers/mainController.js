// imports
import { mainViewInit } from "../views/mainView.js";
import { mainModelInit } from "../models/mainModel.js";

// functions
function mainControllerInit () {
    console.log('mainControllerInit');
    mainViewInit();
    mainModelInit();

}

// handlers


// exports
export { mainControllerInit };