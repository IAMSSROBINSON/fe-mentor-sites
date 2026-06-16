// imports
import {
  initMainView,
  showMenu,
  hideMenu,
  renderActiveLink,
} from "./mainView.js";

// elements

// functions
function initMainController() {
  initMainView();
}

// handlers
function handleMenuIcon(e) {
  showMenu();
}

function handleCloseMenuModal(e) {
  hideMenu();
}

function handleMenuLink(e) {
  if (e.target.classList.contains("menu-link")) {
    renderActiveLink(e.target);
  }
  return;
}

// exports
export {
  initMainController,
  handleMenuIcon,
  handleCloseMenuModal,
  handleMenuLink,
};
