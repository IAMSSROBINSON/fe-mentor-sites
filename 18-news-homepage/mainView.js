// imports
import {
  handleMenuIcon,
  handleCloseMenuModal,
  handleMenuLink,
} from "./mainController.js";

// functions
function initMainView() {
  const menuIcon = document.getElementById("menu-icon");
  menuIcon ? menuIcon.addEventListener("click", handleMenuIcon) :  null;

  const closeModalMenuIcon = document.getElementById("close-modal-menu-icon");
  closeModalMenuIcon ? closeModalMenuIcon.addEventListener("click", handleCloseMenuModal) : null;


  const menuContainer = document.getElementById("menu-container");
  menuContainer ? menuContainer.addEventListener("click", handleMenuLink) : null;
}

function showMenu() {
  const modalMenu = getMenuModal();
  modalMenu.classList.remove("hideMenu");
  modalMenu.classList.add("showMenu");
  modalMenu.removeAttribute("hidden");
  modalMenu.setAttribute("aria-hidden", "false");
  getBlurWrapper().style.display = "block";
}

function hideMenu() {
  const modalMenu = getMenuModal();
  modalMenu.classList.remove("showMenu");
  modalMenu.classList.add("hideMenu");
  modalMenu.setAttribute("hidden", "");
  modalMenu.setAttribute("aria-hidden", "true");
  getBlurWrapper().style.display = "none";
}

function getBlurWrapper() {
  return document.getElementById("blur-wrapper");
}

function getMenuModal() {
  return document.getElementById("modal-menu");
}

function renderActiveLink(target) {
  const allMenuLinks = Array.from(document.querySelectorAll(".menu-link"));
  allMenuLinks.forEach((link) => {
    link.classList.remove("active-link");
  });

  target.classList.add("active-link");
}

// exports
export { initMainView, showMenu, hideMenu, renderActiveLink };
