// imports
import ListItem from "../components/ListItem/ListItem.js";
import { handleSwitch } from "../controllers/themeController.js";

// elements
const bottom = document.getElementById('bottom');
const switchContainer = document.getElementById('switch-container');
console.log("switchContainer", switchContainer);
const switchThumb = document.getElementById('switch-thumb');

// events
switchContainer.addEventListener('click', handleSwitch);


// functions
function mainViewInit () {
  console.log('mainViewInit');
}

function setViewDocElTheme (theme) {
  document.documentElement.dataset.theme = theme;
  console.log('setViewDocElTheme view: ', document.documentElement.dataset.theme);
}

function renderLoadingState () {
  bottom.innerHTML = '<p>Loading data...</p>';
  console.log('loading data...');

}

function clearRenderLoadingState () {
  bottom.innerHTML = "";
  console.log('clear loading data...');
}

function renderCategories (data, error) {
  console.log('view renderCategories data:', data);


  if (error || data.length === 0) {
    console.log('renderCategories error:', error);
    bottom.innerHTML =  `<p>${error}</p>`;
    return;
  }

  const docFrag = document.createDocumentFragment();
  data.forEach((category) => {
    docFrag.append(ListItem(category.title));
  })
  bottom.appendChild(docFrag);

}

function toggleThumb(theme) {
  console.log("theme switched to:", theme);
  if (theme === 'light') {
    switchThumb.style.marginLeft = '0';
  }
  else {
    switchThumb.style.marginLeft = 'auto';
  }
}



export { mainViewInit, setViewDocElTheme, renderLoadingState, clearRenderLoadingState, renderCategories, toggleThumb };