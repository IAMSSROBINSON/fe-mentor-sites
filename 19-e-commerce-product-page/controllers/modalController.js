// imports
import { renderModal } from "../views/modalView.js";
import createGallery from "../components/GalleryComponent.js";
import { galleryControllerInit } from "./galleryController.js";

// state
const modalState = {
  previouslyFocusedElement: null,
};

// functions

function modalControllerInit(product) {
  console.log("modalControllerInit");

  attachEvents(product);
}

function attachEvents(product) {
  document.addEventListener("keydown", handleEscapeKey);

  const galleryMainContainerDesktop = document.querySelector(
    ".gallery-main-image-container.desktop",
  );
  console.log("galleryMainContainerDesktop:", galleryMainContainerDesktop);

  galleryMainContainerDesktop.addEventListener("click", (e) => {
    handleMainProductClick(e, product);
  });
}

function handleEscapeKey(e) {
  const modal = document.querySelector(".modal-card");
  if (modal && e.key === "Escape") {
    handleCloseModal();
  }
}

function handleMainProductClick(e, product) {
  if (window.innerWidth >= 1440) {
    modalState.previouslyFocusedElement = document.activeElement;
    console.log(
      "previouslyFocusedElement:",
      modalState.previouslyFocusedElement,
    );

    const modalGallery = createGallery();
    console.log("main Product clicked desktop");
    renderModal(modalGallery);
    galleryControllerInit(modalGallery, product);

    const closeModalButton = document.querySelector(".close-modal-button");
    if (!closeModalButton) return;
    closeModalButton.focus();
    closeModalButton.addEventListener("click", () => {
      handleCloseModal();
    });

    const modalCard = document.querySelector(".modal-card");
    modalCard.addEventListener("keydown", (e) => {
      handleFocusableElements(e, modalCard);
    });
  } else {
    console.log("main Product clicked not desktop");
  }
}

function handleFocusableElements(e, modalCard) {
  const focusableElements = Array.from(modalCard.querySelectorAll("button"));
  console.log("modalCard focusable elements:", focusableElements);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];
  const currentFocussedElement = document.activeElement;

  if (
    currentFocussedElement === firstFocusableElement &&
    e.key === "Tab" &&
    e.shiftKey
  ) {
    e.preventDefault();
    lastFocusableElement.focus();
  }
  if (currentFocussedElement === lastFocusableElement && !e.key === "Tab") {
    e.preventDefault();

    firstFocusableElement.focus();
  }
}

function handleCloseModal() {
  removeModal();
  restoreFocusToPreviouslyFocussed();
}

function removeModal() {
  const modal = document.querySelector(".modal-card");
  if (modal) modal.remove();
  hideBlurWrapper();
}

function hideBlurWrapper() {
  const blurWrapper = document.querySelector(".blur-wrapper");
  blurWrapper.style.display = "none";
}

function restoreFocusToPreviouslyFocussed() {
  console.log("modalState:", modalState.previouslyFocusedElement);
  modalState.previouslyFocusedElement.focus();
}

// exports
export { modalControllerInit };
