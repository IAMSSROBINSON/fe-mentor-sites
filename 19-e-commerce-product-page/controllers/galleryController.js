// imports
import { renderGallery, renderSelectedThumbnailButton, renderMainImage } from "../views/galleryView.js";
import { renderInformation } from "../views/productView.js";


//  functions
function galleryControllerInit (galleryElement, product) {
    console.log("galleryControllerInit:", galleryElement, product);

    renderGallery(galleryElement, product);
    attachGalleryEvents(galleryElement, product);
    renderInformation(product);
}

function attachGalleryEvents (galleryElement, product) {
    const thumbnailGalleryContainer = galleryElement.querySelector(".thumbnail-gallery-container");
    thumbnailGalleryContainer.addEventListener("click", (e) => {
        handleThumbnailClick(e, galleryElement, product);
    });

    const galleryMainImageContainer = galleryElement.querySelector(".gallery-main-image-container");
    galleryMainImageContainer.addEventListener("click", (e) => {
        handleArrowClick(e, galleryElement, product);
    });

    const thumbnailButtons = galleryElement.querySelectorAll('.thumbnail-button');
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
  if (direction === "previous") {
    let newIndex = indexOfCurrentImage - 1;
    if (newIndex < 0) {
      newIndex = allImages.length - 1;
    }
    renderMainImage(galleryElement, product, newIndex);
  } else {
    let newIndex = indexOfCurrentImage + 1;
    if (newIndex > allImages.length - 1) {
      newIndex = 0;
    }

    renderMainImage(galleryElement, product, newIndex);
  }
}

function handleThumbnailClick(e, galleryElement, product) {
  console.log("handleThumbnailClick");
  const targetButton = e.target.closest("button");
  if (!targetButton) return;
  const imageNumber = targetButton.dataset.thumbnailNumber;
  const imageIndex = imageNumber - 1 || 0;
  console.log("handleThumbnailClick imageNumber:", imageNumber);

  const allThumbnailButtons = Array.from(
    galleryElement.querySelectorAll(".thumbnail-button"),
  );

  if (targetButton) {
    renderSelectedThumbnailButton(allThumbnailButtons, targetButton);
    renderMainImage(galleryElement, product, imageIndex);
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
    console.log("cannot find current image in list");
    return;
  }

  let newIndex;
  const key = e.key;

  if (key !== "ArrowRight" && key !== "ArrowLeft") return;

  if (key === "ArrowRight") {
    console.log("ArrowRight clicked");

    newIndex = indexOfCurrentThumbnail + 1;
    if (newIndex > allThumbnailButtons.length - 1) {
      newIndex = 0;
    }
  } else if (key === "ArrowLeft") {
    console.log("ArrowLeft Clicked.");

    if (indexOfCurrentThumbnail - 1 < 0) {
      newIndex = allThumbnailButtons.length - 1;
    } else {
      newIndex = indexOfCurrentThumbnail - 1;
    }
  }

  const nextButton = allThumbnailButtons[newIndex];
  target.setAttribute("tabindex", "-1");
  nextButton.setAttribute("tabindex", "0");
  nextButton.focus();
  renderSelectedThumbnailButton(allThumbnailButtons, nextButton);
  renderMainImage(galleryElement, product, newIndex);
}


// exports
export { galleryControllerInit };