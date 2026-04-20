// imports 
import { checkLocalTheme, setModelTheme } from '../models/mainModel.js';
import { setViewDocElTheme } from '../views/mainView.js';

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



export default handleTheme;