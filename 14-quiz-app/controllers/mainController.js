// imports
import StateManager from "../models/mainModel.js";
import { mainViewInit } from "../views/mainView.js";
import getData from "../database/db.js";

// elements
let stateManager = {};
const docEle = document.documentElement;
const switchContainer = document.getElementById("switch-container");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

// events
switchContainer.addEventListener("click", handleSwitch);

// functions
async function mainControllerInit() {
  console.log("mainControllerInit");

  try {
    const data = await getData();
    const currentTheme = matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    setDocElTheme(currentTheme);
    setToggleThumb();

    stateManager = new StateManager(data.quizzes, currentTheme);
    console.log("mainController stateManager:", stateManager);
    mainViewInit(stateManager.data);
  } catch (err) {
    // render error message in UI with {data: [], error: "Error message here"}
    console.error(err.message);
  }
}

function setDocElTheme(theme) {
  docEle.dataset.theme = theme;

  return;
}

function handleSwitch(e) {
  console.log("Switch container clicked");

  const theme = getCurrentTheme();
  const themeSwitched = theme === "dark" ? "light" : "dark";
  setDocElTheme(themeSwitched);
  stateManager.setTheme(themeSwitched);
  setToggleThumb();
}



function setToggleThumb() {
  const theme = getCurrentTheme();
  const switchThumb = document.querySelector(".switch-thumb");

  if (theme === "light") {
    switchThumb.classList.remove("moon");
  } else {
    switchThumb.classList.add("moon");
  }
  console.log("stateManager: ", stateManager);
}

function getCurrentTheme() {
  return docEle.dataset.theme;
}

export { mainControllerInit };
