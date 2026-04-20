// imports

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
}

function clearRenderLoadingState () {
  bottom.innerHTML = "";
}

function renderCategories (data) {
  console.log('view renderCategories data:', data);
}

export { mainViewInit, setViewDocElTheme, renderLoadingState, clearRenderLoadingState, renderCategories };