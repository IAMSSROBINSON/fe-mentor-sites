// imports
import { initMainView, showMenu, hideMenu } from './mainView.js';

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

// exports
export { initMainController, handleMenuIcon, handleCloseMenuModal };