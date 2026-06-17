// imports
import { mainViewInit } from "../views/mainView.js";
import { mainModelInit } from "../models/mainModel.js";
import { productModelInit } from "../models/productModel.js";

// functions
async function mainControllerInit () {
    console.log('mainControllerInit');
    mainViewInit();
    mainModelInit();
    productModelInit()
}

// handlers


// exports
export { mainControllerInit };