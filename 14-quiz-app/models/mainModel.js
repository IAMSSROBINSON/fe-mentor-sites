// imports
import getTheData from '../database/db.js';

// elements
const stateManager = {
    data: [],
    theme: null,
}

// functions
function mainModelInit () {
  console.log('mainModelInit');
}

function checkLocalTheme () {
  try {
    const isLocal = localStorage.getItem('quizApp');
    console.log('isLocal model: ', isLocal);

    if (!isLocal) {
      console.log('no local theme model: ', isLocal);
      return;
    };
    console.log('is local theme model: ', isLocal);

    return JSON.parse(isLocal).theme;
  }
  catch (err) {
    console.log("Error checking local theme");
    return null;
  }
}

function setModelTheme (theme) {
  stateManager.theme = theme;
  console.log('setModelTheme model: ', stateManager);

}

export { mainModelInit, checkLocalTheme, setModelTheme };