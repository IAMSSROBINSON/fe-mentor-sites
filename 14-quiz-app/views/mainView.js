// imports
import ListItem from "../components/ListItem/ListItem.js";
import { handleSwitch } from "../controllers/themeController.js";
import Header from "../components/Header/Header.js";

// elements
const bottom = document.getElementById("bottom");

// functions
function mainViewInit() {
  renderHeader();

  const switchContainer = document.getElementById("switch-container");
  // events
  switchContainer.addEventListener("click", handleSwitch);
}

function renderHeader() {
  const body = document.getElementById("body");
  body.insertAdjacentHTML("afterbegin", Header());
}

function setViewDocElTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

function renderLoadingState() {
  bottom.innerHTML = "<p>Loading data...</p>";
}

function clearRenderLoadingState() {
  bottom.innerHTML = "";
}

function renderCategories(data, error) {
  if (error || data.length === 0) {
    bottom.innerHTML = `<p>${error}</p>`;
    return;
  }

  const docFrag = document.createDocumentFragment();
  data.forEach((category) => {
    docFrag.append(ListItem(category.title));
  });
  bottom.appendChild(docFrag);
}

function toggleThumb(theme) {
  const switchThumb = document.getElementById("switch-thumb");

  if (theme === "light") {
    switchThumb.style.marginLeft = "0";
  } else {
    switchThumb.style.marginLeft = "auto";
  }
}

export {
  mainViewInit,
  setViewDocElTheme,
  renderLoadingState,
  clearRenderLoadingState,
  renderCategories,
  toggleThumb,
};
