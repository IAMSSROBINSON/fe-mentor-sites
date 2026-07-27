const body = document.querySelector('body');
const blurWrapper = document.getElementById('blur-wrapper');
const menu = document.querySelector("#menu-container");

function toggleMenu () {
    console.log("toggleMenu");
   

    toggleBodyNoScroll(body)
    toggleBlurWrapper(blurWrapper);
    toggleMenuContainer(menu);
}

function toggleBodyNoScroll (element) {
    element?.classList.toggle('no-scroll');
}

function toggleBlurWrapper (element) {
    element?.classList.toggle('show');
}

function toggleMenuContainer (element) {
    element?.classList.toggle('show');
}

function focusFirstMenuElement () {
    const firstChild = document.querySelector(".menu-list a");
    firstChild?.focus();
}

function focusHamburgerButton () {
    const menuIconContainerButton = document.querySelector(".menu-icon-container");

    menuIconContainerButton?.focus();
}

function handleMenuKeyDown (e) {
    if (e.key === "Escape") {
        console.log("Escape key pressed");
        toggleMenu();
        focusHamburgerButton();
    }

}


export { toggleMenu, focusFirstMenuElement, focusHamburgerButton, handleMenuKeyDown  };