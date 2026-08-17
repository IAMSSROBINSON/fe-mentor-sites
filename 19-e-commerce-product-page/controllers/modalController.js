// imports
import { renderModal } from "../views/modalView.js";
import createGallery from "../components/GalleryComponent.js";
import {
  galleryControllerInit,
  getSelectedImageIndex,
} from "./galleryController.js";
import { renderModalArrowTabIndexes } from "../views/galleryView.js";

// state
const modalState = {
  previouslyFocusedElement: null,
};

// functions
function modalControllerInit(product) {
  attachEvents(product);
}

function attachEvents(product) {
  document.addEventListener("keydown", handleEscapeKey);

  const galleryMainContainerDesktop = document.querySelector(
    ".gallery-main-image-container.desktop",
  );

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
    const modalGallery = createGallery({ isModal: true });
    renderModal(modalGallery);
    galleryControllerInit(modalGallery, product);
    renderModalArrowTabIndexes(modalGallery);

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
  }

  if (window.innerWidth >= 1440) {
    window.addEventListener("resize", handleCloseModalOnResize);
  }
}

function handleCloseModalOnResize(e) {
  if (window.innerWidth < 1440) {
    handleCloseModal();
  }
}

function handleFocusableElements(e, modalCard) {
  const thumbnailGalleryContainer = modalCard.querySelector(
    ".thumbnail-gallery-container",
  );
  const galleryButtons =
    thumbnailGalleryContainer.querySelectorAll(".thumbnail-button");
  const closeModalButton = modalCard.querySelector(".close-modal-button");
  const focusableElements = [
    closeModalButton,
    document.querySelector('.thumbnail-button[tabindex="0"]'),
  ];
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
  if (
    currentFocussedElement === lastFocusableElement &&
    e.key === "Tab" &&
    !e.shiftKey
  ) {
    e.preventDefault();
    firstFocusableElement.focus();
  }
}

function handleCloseModal() {
  removeModal();
  restoreFocusToPreviouslyFocussed();
  removeHandleCloseModalOnResize();
}

function removeHandleCloseModalOnResize() {
  window.removeEventListener("resize", handleCloseModalOnResize);
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
  modalState.previouslyFocusedElement.focus();
}

// exports
export { modalControllerInit };
