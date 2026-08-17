// cache
const body = document.querySelector("body");
const blurWrapper = document.getElementById("blur-wrapper");
const menu = document.querySelector("#menu-container");
const focusableElements = Array.from(menu.querySelectorAll("button, li a"));
const firstFocusableElement = focusableElements[0];
const lastFocusableElement = focusableElements[focusableElements.length - 1];
const hamburgerMenu = document.querySelector(".menu-icon-container");

// functions
function toggleMenu() {
  toggleBodyNoScroll(body);
  toggleElementShow(blurWrapper);
  toggleElementShow(menu);
  toggleAriaExpanded();
}

function toggleAriaExpanded() {
  if (menu.classList.contains("show")) {
    hamburgerMenu.setAttribute("aria-expanded", "true");
  } else {
    hamburgerMenu.setAttribute("aria-expanded", "false");
  }
}

function toggleBodyNoScroll(element) {
  element?.classList.toggle("no-scroll");
}

function toggleElementShow(element) {
  element?.classList.toggle("show");
}

function focusFirstMenuElement() {
  const firstChild = document.querySelector(".menu-list a");
  firstChild?.focus();
}

function focusHamburgerButton() {
  const menuIconContainerButton = document.querySelector(
    ".menu-icon-container",
  );
  menuIconContainerButton?.focus();
}

function handleMenuKeyDown(e) {
  if (!menu.classList.contains("show")) return;

  const key = e.key;
  if (key === "Escape") {
    toggleMenu();
    focusHamburgerButton();
    return;
  }

  const activeElement = document.activeElement;

  if (key === "Tab" && e.shiftKey && activeElement === firstFocusableElement) {
    e.preventDefault();
    lastFocusableElement.focus();
  }

  if (key === "Tab" && !e.shiftKey && activeElement === lastFocusableElement) {
    e.preventDefault();
    firstFocusableElement.focus();
  }
}

export {
  toggleMenu,
  focusFirstMenuElement,
  focusHamburgerButton,
  handleMenuKeyDown,
};
