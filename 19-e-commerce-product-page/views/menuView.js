const body = document.querySelector('body');
const blurWrapper = document.getElementById('blur-wrapper');
const menu = document.querySelector("#menu-container");
 const focusableElements = Array.from(menu.querySelectorAll("button, li a"));
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];

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
    const key = e.key;
    if (key === "Escape") {
        console.log("Escape key pressed");
        toggleMenu();
        focusHamburgerButton();
        return;
    }

   



        focusableElements.forEach((ele) => console.log("ele:", ele));

    const activeElement = document.activeElement;
    
    
    if (key === 'Tab' && e.shiftKey && activeElement === firstFocusableElement)  {
        e.preventDefault();
        lastFocusableElement.focus();        
    } 

    if (key === 'Tab' && !e.shiftKey && activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
    }

    console.log("activeElement", activeElement)

}


export { toggleMenu, focusFirstMenuElement, focusHamburgerButton, handleMenuKeyDown  };