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
    return JSON.parse(isLocal);
  }
  catch (err) {
    console.log("Error checking local theme");
    return null;
  }
}

async function loadData () {
  
  const isLocal = checkLocalTheme();
  if (!isLocal) {
    console.log('no local data');
    const data = await getTheData();
    stateManager.data = data;
    console.log('stateManager data set:', stateManager.data);
    console.log("loadData data:", stateManager);
    return data;
  }

  console.log('is local data');
  const data = isLocal.data;
  stateManager.data = data;
  console.log('stateManager data set:', stateManager.data);

  return data;
}

function setModelTheme (theme) {
  stateManager.theme = theme;
  console.log('setModelTheme model: ', stateManager);

}

export { mainModelInit, checkLocalTheme, setModelTheme, loadData};