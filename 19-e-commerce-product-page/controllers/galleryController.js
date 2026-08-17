// imports
import {
  renderGallery,
  renderSelectedThumbnailButton,
  renderMainImage,
  renderThumbnailTabIndexes,
} from "../views/galleryView.js";
import { renderInformation } from "../views/productView.js";

// gallery state
const galleryState = {
  currentlySelectedImageIndex: 0,
};

//  functions
function galleryControllerInit(galleryElement, product) {
  renderGallery(galleryElement, product, getSelectedImageIndex());
  attachGalleryEvents(galleryElement, product);
  renderInformation(product);
}

function attachGalleryEvents(galleryElement, product) {
  const thumbnailGalleryContainer = galleryElement.querySelector(
    ".thumbnail-gallery-container",
  );
  thumbnailGalleryContainer.addEventListener("click", (e) => {
    handleThumbnailClick(e, galleryElement, product);
  });

  const galleryMainImageContainer = galleryElement.querySelector(
    ".gallery-main-image-container",
  );
  galleryMainImageContainer.addEventListener("click", (e) => {
    handleArrowClick(e, galleryElement, product);
  });

  const thumbnailButtons = galleryElement.querySelectorAll(".thumbnail-button");
  thumbnailButtons.forEach((button) => {
    button.addEventListener("keydown", (e) => {
      handleButtonRoving(e, galleryElement, product);
    });
  });
}

function handleArrowClick(e, galleryElement, product) {
  const button = e.target.closest(".arrow-container");
  if (!button) return;

  const direction = button.dataset.direction;
  const pathname = new URL(galleryElement.querySelector(".product-image").src)
    .pathname;
  const allImages = product.images;
  const indexOfCurrentImage = allImages.indexOf(pathname);
  const allThumbnailButtons = Array.from(
    galleryElement.querySelectorAll(".thumbnail-button"),
  );

  let newIndex;
  if (direction === "previous") {
    newIndex = indexOfCurrentImage - 1;
    if (newIndex < 0) {
      newIndex = allImages.length - 1;
    }
  } else {
    newIndex = indexOfCurrentImage + 1;
    if (newIndex > allImages.length - 1) {
      newIndex = 0;
    }
  }

  setSelectedImageIndex(newIndex);
  renderMainImage(galleryElement, product, newIndex);
  renderSelectedThumbnailButton(
    allThumbnailButtons,
    allThumbnailButtons[newIndex],
  );
  renderThumbnailTabIndexes(allThumbnailButtons, allThumbnailButtons[newIndex]);
}

function handleThumbnailClick(e, galleryElement, product) {
  const targetButton = e.target.closest("button");
  if (!targetButton) return;

  const imageNumber = targetButton.dataset.thumbnailNumber;
  const imageIndex = imageNumber - 1 || 0;
  const allThumbnailButtons = Array.from(
    galleryElement.querySelectorAll(".thumbnail-button"),
  );

  if (targetButton) {
    renderSelectedThumbnailButton(allThumbnailButtons, targetButton);
    renderThumbnailTabIndexes(allThumbnailButtons, targetButton);
    renderMainImage(galleryElement, product, imageIndex);
    setSelectedImageIndex(imageIndex);
  }
  return;
}

function handleButtonRoving(e, galleryElement, product) {
  const target = e.target.closest("button");
  if (!target) return;

  const allThumbnailButtons = Array.from(
    galleryElement.querySelectorAll(".thumbnail-button"),
  );

  const indexOfCurrentThumbnail = allThumbnailButtons.indexOf(target);

  if (indexOfCurrentThumbnail === -1) {
    return;
  }

  let newIndex;
  const key = e.key;
  if (key !== "ArrowRight" && key !== "ArrowLeft") return;
  if (key === "ArrowRight") {
    newIndex = indexOfCurrentThumbnail + 1;
    if (newIndex > allThumbnailButtons.length - 1) {
      newIndex = 0;
    }
  } else if (key === "ArrowLeft") {
    if (indexOfCurrentThumbnail - 1 < 0) {
      newIndex = allThumbnailButtons.length - 1;
    } else {
      newIndex = indexOfCurrentThumbnail - 1;
    }
  }

  const nextButton = allThumbnailButtons[newIndex];
  renderSelectedThumbnailButton(allThumbnailButtons, nextButton);
  renderThumbnailTabIndexes(allThumbnailButtons, nextButton);
  nextButton.focus();

  renderMainImage(galleryElement, product, newIndex);
  setSelectedImageIndex(newIndex);
}

function setSelectedImageIndex(index) {
  galleryState.currentlySelectedImageIndex = index;
}

function getSelectedImageIndex() {
  return galleryState.currentlySelectedImageIndex;
}

// exports
export { galleryControllerInit, getSelectedImageIndex };
