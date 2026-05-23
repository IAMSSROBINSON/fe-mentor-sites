// imports
import getTheData from "../database/db.js";

// elements
const stateManager = {
  data: [],
  theme: null,
};

// functions
function checkLocalTheme() {
  try {
    const isLocal = localStorage.getItem("quizApp");

    if (!JSON.parse(isLocal).theme) {
      return;
    }
    return JSON.parse(isLocal);
  } catch (err) {
    console.log("Error checking local theme");
    return null;
  }
}

async function initData() {
  const isLocal = checkLocalTheme();
  if (!isLocal) {
    const data = await getTheData();
    setData(data.quizzes);
    return stateManager.data;
  }
  const data = isLocal.data;
  setData(data);

  return data;
}

function setData(data) {
  stateManager.data = data;
  saveStateToLocalStorage();
}

function setModelTheme(theme) {
  stateManager.theme = theme;
  saveStateToLocalStorage();
}

function getTheme() {
  return stateManager.theme;
}

function saveStateToLocalStorage() {
  if (stateManager.data.length != 0 && stateManager.theme) {
    localStorage.setItem(
      "quizApp",
      JSON.stringify({
        data: stateManager.data,
        theme: stateManager.theme,
      }),
    );
  }
}

function getData() {
  return stateManager.data;
}

function getQuestionsByCategory(category) {
  return stateManager.data.filter((cat) => cat.title === category)[0].questions;
}

export {
  checkLocalTheme,
  setModelTheme,
  initData,
  getTheme,
  getData,
  getQuestionsByCategory,
};
