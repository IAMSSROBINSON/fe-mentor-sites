// imports

// elements

// events

// functions
function mainViewInit () {
  console.log('mainViewInit');
}

function getSystemTheme () {
  const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  console.log('getSystemTheme view: ', systemTheme);

  return systemTheme;
}

function setViewDocElTheme (theme) {
  document.documentElement.dataset.theme = theme;
  console.log('setViewDocElTheme view: ', document.documentElement.dataset.theme);

}


export { mainViewInit, getSystemTheme, setViewDocElTheme };