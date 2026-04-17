// imports
import StateManager from "../models/mainModel.js";
import { mainViewInit } from "../views/mainView.js";
import getData from '../database/db.js';

// elements
    const docEle = document.documentElement;
    const switchContainer = document.getElementById('switch-container');
    // const switchThumb = document.getElementById('switch-thumb');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

// events
switchContainer.addEventListener('click', handleSwitch);

// functions

async function mainControllerInit() {
    console.log("mainControllerInit");
    
    try {
        const data = await getData();
        const currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
        setNewTheme(currentTheme);
        renderSwitchThumb();
        console.log("initial theme:", currentTheme);

        const stateManager = new StateManager(data.quizzes, currentTheme);
        mainViewInit();
        console.log("mainController stateManager", stateManager);
    }
    catch (err) {
        // render error message in UI with {data: [], error: "Error message here"}
        console.error(err.message);
    }


}

function setTheme (theme) {
    docEle.dataset.theme = theme;
    return;
}

function handleSwitch (e) {
    console.log("Switch container clicked");

    const theme = getCurrentTheme();
    console.log("handleSwitch currentTheme", theme)

    const themeSwitched = theme === 'dark' ? 'light' : 'dark';
    setNewTheme(themeSwitched);

    console.log("handleSwitch docEl dataset.theme switched to:", themeSwitched);

    renderSwitchThumb();
}

function renderSwitchThumb () {
    const theme = getCurrentTheme();
    const switchThumb = document.querySelector('.switch-thumb');
    console.log("switchThumb:", switchThumb, theme);
    if (theme === 'light') {
        switchThumb.classList.remove('moon');
        console.log("switchThumb:", switchThumb, theme);

    } else {
        switchThumb.classList.add('moon');
        console.log("switchThumb:", switchThumb, theme);
    }
}

function getCurrentTheme () {
    return docEle.dataset.theme;
}

function setNewTheme (theme) {
    docEle.dataset.theme = theme;
}

export { mainControllerInit };