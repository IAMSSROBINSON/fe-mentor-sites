// imports 
import { checkLocalTheme, setModelTheme } from '../models/mainModel.js';
import { getSystemTheme, setViewDocElTheme } from '../views/mainView.js';

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
        handleSetTheme(isLocalTheme)
    }
  }

  function handleSetTheme (theme) {
    setModelTheme(theme);
    setViewDocElTheme(theme);
  }


export default handleTheme;