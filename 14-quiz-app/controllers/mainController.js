// imports
import StateManger from "../models/mainModel.js";
import { mainViewInit } from "../views/mainView.js";

// elements
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    console.log("sunIcon: ", sunIcon);
    console.log("moonIcon: ", moonIcon);

// events

// functions

async function mainControllerInit() {
    console.log("mainControllerInit");
    mainViewInit();
    const stateManager = new StateManger();
    await stateManager.mainModelInit();
    console.log("mainControllerInit:", stateManager);

   
}





export { mainControllerInit };