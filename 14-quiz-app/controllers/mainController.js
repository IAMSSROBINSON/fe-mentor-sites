import StateManger from "../models/mainModel.js";
import { mainViewInit } from "../views/mainView.js";

async function mainControllerInit() {
    console.log("mainControllerInit");
    const stateManager = new StateManger();
    await stateManager.mainModelInit();
    console.log("mainControllerInit:", stateManager);
    mainViewInit();
}

export { mainControllerInit };