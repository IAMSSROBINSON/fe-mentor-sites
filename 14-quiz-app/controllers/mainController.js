import { mainModelInit  } from "../models/mainModel.js";
import { mainViewInit } from "../views/mainView.js";

function mainControllerInit() {
    console.log("mainControllerInit");
    mainModelInit();
    mainViewInit();
}

export { mainControllerInit };