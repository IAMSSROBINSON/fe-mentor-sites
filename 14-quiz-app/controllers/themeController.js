// imports
import {
  checkLocalTheme,
  setModelTheme,
  getTheme,
} from "../models/mainModel.js";
import { setViewDocElTheme, toggleThumb } from "../views/mainView.js";

// functions
function handleTheme() {
  const isLocalTheme = checkLocalTheme();
  if (!isLocalTheme) {
    const systemTheme = getSystemTheme();
    handleSetTheme(systemTheme);
    toggleThumb(systemTheme);
  } else {
    handleSetTheme(isLocalTheme.theme);
    toggleThumb(isLocalTheme.theme);
  }
}

function handleSetTheme(theme) {
  setModelTheme(theme);
  setViewDocElTheme(theme);
}

function getSystemTheme() {
  const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  return systemTheme;
}

function handleSwitch(e) {
  const newTheme = getTheme() === "light" ? "dark" : "light";

  // set new theme in model
  setModelTheme(newTheme);

  // change document element to dataset.theme = newTheme
  setViewDocElTheme(newTheme);

  // switch over the thumb in the switcher toggle
  toggleThumb(newTheme);
}

export { handleTheme, handleSwitch };
