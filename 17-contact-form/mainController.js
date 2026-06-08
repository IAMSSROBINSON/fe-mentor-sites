import { mainViewInit } from "./mainView.js";

function mainControllerInit () {
    console.log("mainControllerInit")
    mainViewInit();
}

export { mainControllerInit };