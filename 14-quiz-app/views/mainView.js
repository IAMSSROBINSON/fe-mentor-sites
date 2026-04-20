// imports
import ListItem from "../components/ListItem/ListItem.js";

// elements
const bottom = document.getElementById('bottom');

// events

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

export { mainViewInit, setViewDocElTheme, renderLoadingState, clearRenderLoadingState, renderCategories };