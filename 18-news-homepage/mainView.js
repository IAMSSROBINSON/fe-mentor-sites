// imports 
import { handleMenuIcon, handleCloseMenuModal } from './mainController.js';

// functions
function initMainView () {
    console.log("initMainView");

    const menuIcon = document.getElementById('menu-icon');
    menuIcon.addEventListener("click", handleMenuIcon);

    const closeModalMenuIcon = document.getElementById('close-modal-menu-icon');
    closeModalMenuIcon.addEventListener("click", handleCloseMenuModal);


}

function showMenu () {
    const modalMenu = getMenuModal();
    modalMenu.classList.remove('hideMenu');
    modalMenu.classList.add('showMenu');
    modalMenu.removeAttribute('hidden');
    modalMenu.setAttribute('aria-hidden', 'false');
    getBlurWrapper().style.display = "block";
}

function hideMenu () {
    const modalMenu = getMenuModal();
    modalMenu.classList.remove('hideMenu');
    modalMenu.classList.add('hideMenu');
    modalMenu.setAttribute('hidden', '');
    modalMenu.setAttribute('aria-hidden', 'true');
    getBlurWrapper().style.display = "none";
}

function getBlurWrapper () {
    return document.getElementById('blur-wrapper');
}

function getMenuModal () {
    return document.getElementById('modal-menu');
}


// exports
export { initMainView, showMenu, hideMenu };