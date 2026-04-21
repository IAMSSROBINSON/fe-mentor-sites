// imports 
import { checkLocalTheme, setModelTheme, getTheme } from '../models/mainModel.js';
import { setViewDocElTheme, toggleThumb } from '../views/mainView.js';

// logic


// functions
function handleTheme () {
    console.log('handleThemeController');

    const isLocalTheme = checkLocalTheme();
    if (!isLocalTheme){
      // get system theme from view
      const systemTheme = getSystemTheme();

      // set the theme in model then docElView, not local yet
      handleSetTheme(systemTheme)
    }
    else {
      // set theme in model and then view, not local yet
        handleSetTheme(isLocalTheme.theme)
    }
  }

  function handleSetTheme (theme) {
    setModelTheme(theme);
    setViewDocElTheme(theme);
  }

  function getSystemTheme () {
  const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  console.log('getSystemTheme view: ', systemTheme);
  return systemTheme;
}


function handleSwitch (e) {
    console.log("switch clicked", getTheme());
    const newTheme = getTheme() === 'light' ? 'dark' : 'light'
    setModelTheme(newTheme);
    setViewDocElTheme(newTheme);
    toggleThumb(newTheme);
    // if current theme is light change to dark in state and docEl ui
    // if dark change to light in state and docEl ui
    // and apply
}


export  { handleTheme, handleSwitch };