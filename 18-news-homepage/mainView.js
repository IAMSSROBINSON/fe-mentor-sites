// imports
import {
  handleMenuIcon,
  handleCloseMenuModal,
  handleMenuLink,
} from "./mainController.js";

// functions
function initMainView() {
  const menuIcon = document.getElementById("menu-icon");
  menuIcon.addEventListener("click", handleMenuIcon);

  const closeModalMenuIcon = document.getElementById("close-modal-menu-icon");
  closeModalMenuIcon.addEventListener("click", handleCloseMenuModal);

  const menuContainer = document.getElementById("menu-container");
  menuContainer.addEventListener("click", handleMenuLink);
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
  modalMenu.classList.remove("hideMenu");
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
