// imports
import { initMainView, showMenu, hideMenu, renderActiveLink } from './mainView.js';

// elements

// functions
function initMainController () {
    console.log("initMainController");
    initMainView();
}



// handlers
function handleMenuIcon (e) {
    console.log("handleMenuIcon");

    showMenu();
}

function handleCloseMenuModal (e) {
    console.log("handleCloseMenuModal");
    hideMenu();
}

function handleMenuLink (e) {
    console.log("handleMenuLink target:", e.target);
    if (e.target.classList.includes('menu-link')) {
        renderActiveLink(e.target);
    }
    return;
}

// exports
export { initMainController, handleMenuIcon, handleCloseMenuModal, handleMenuLink};