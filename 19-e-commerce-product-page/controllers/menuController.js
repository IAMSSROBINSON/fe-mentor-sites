// imports
import { toggleMenu, focusFirstMenuElement, focusHamburgerButton, handleMenuKeyDown } from "../views/menuView.js";

// functions
function menuControllerInit () {
     console.log("menuControllerInit");

     attachEvents();
}

function attachEvents () {
    const menuButton = document.querySelector(".menu-icon-container");
    menuButton?.addEventListener("click", handleMenuClick);

    const menuContainer = document.querySelector(".menu-container");
    menuContainer?.addEventListener("keydown", handleMenuKeyDown);

      const closeMenuIcon = document.getElementById('close-menu-icon');
    closeMenuIcon?.addEventListener("click", handleCloseMenuClick);
}

function handleCloseMenuClick () {
    toggleMenu();
    focusHamburgerButton();
}

function handleMenuClick () {
    console.log("menuButton Clicked");
    toggleMenu();
    focusFirstMenuElement();
}

// exports
export { menuControllerInit };