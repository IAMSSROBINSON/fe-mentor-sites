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
      handleSetTheme(systemTheme);
    }
    else {
      // set theme in model and then view, not local yet
        handleSetTheme(isLocalTheme.theme);
    }
    // set local storage now 
  
  }

  function handleSetTheme (theme) {
    setModelTheme(theme);
    setViewDocElTheme(theme);
    // set local storage with new theme data
  

  }

  function getSystemTheme () {
  const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  console.log('getSystemTheme view: ', systemTheme);
  return systemTheme;
}


function handleSwitch (e) {
    console.log("switch clicked", getTheme());
    const newTheme = getTheme() === 'light' ? 'dark' : 'light';

    // set new theme in model
    setModelTheme(newTheme);

    // change document element to dataset.theme = newTheme
    setViewDocElTheme(newTheme);

    // switch over the thumb in the switcher toggle
    toggleThumb(newTheme);

    // set local storage with new theme data
  
}


export  { handleTheme, handleSwitch };