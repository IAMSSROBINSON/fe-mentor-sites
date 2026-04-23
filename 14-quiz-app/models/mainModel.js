// imports
import getTheData from "../database/db.js";

// elements
const stateManager = {
  data: [],
  theme: null,
};

// functions
function mainModelInit() {
  console.log("mainModelInit");
}

function checkLocalTheme() {
  try {
    const isLocal = localStorage.getItem("quizApp");
    console.log("isLocal model: ", isLocal);

    if (!JSON.parse(isLocal).theme) {
      console.log("no local theme model: ", isLocal);
      return;
    }
    console.log("is local theme model: ");
    return JSON.parse(isLocal);
  } catch (err) {
    console.log("Error checking local theme");
    return null;
  }
}


async function initData() {
  const isLocal = checkLocalTheme();
  if (!isLocal) {
    console.log("no local data");
    const data = await getTheData();
    setData(data.quizzes);
    console.log("initData data:", stateManager);
    return stateManager.data;
  }

  console.log("is local data");
  const data = isLocal.data;
  setData(data);

  return data;
}

function setData(data) {
  stateManager.data = data;
  console.log("data set to:", stateManager);
  saveStateToLocalStorage();
}

function setModelTheme(theme) {
  stateManager.theme = theme;
  console.log("setModelTheme model: ", stateManager);
  saveStateToLocalStorage();
}

function getTheme() {
  return stateManager.theme;
}

function saveStateToLocalStorage () {
  if (stateManager.data.length != 0 && stateManager.theme) {
    localStorage.setItem('quizApp', JSON.stringify({
      data: stateManager.data, theme: stateManager.theme
    }))
  }
  console.log("LocalStorage updated:", stateManager.theme);
}

function getData () {
  return stateManager.data;
}

export {
  mainModelInit,
  checkLocalTheme,
  setModelTheme,
  initData,
  getTheme,
  getData,
};
