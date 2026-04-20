// imports

// elements

// events

// functions
function mainViewInit () {
  console.log('mainViewInit');
}

function setViewDocElTheme (theme) {
  document.documentElement.dataset.theme = theme;
  console.log('setViewDocElTheme view: ', document.documentElement.dataset.theme);

}


export { mainViewInit, setViewDocElTheme };