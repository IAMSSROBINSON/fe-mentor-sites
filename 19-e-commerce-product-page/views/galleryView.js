// functions
function renderGallery(galleryElement, product, selectedImageIndex) {
  console.log("renderGallery:", galleryElement, product);
  renderMainImage(galleryElement, product, selectedImageIndex);
  renderThumbnails(galleryElement, product, selectedImageIndex);
}

function renderMainImage(galleryElement, product, selectedImageIndex = 0) {
  const productImage = galleryElement.querySelector(".product-image");
  const mainProductImageSrc = product.images[selectedImageIndex];
  productImage.className = `product-image product-${selectedImageIndex + 1}`;
  productImage.src = mainProductImageSrc;
}

function renderThumbnails(galleryElement, product, selectedImageIndex) {
  const thumbnailGalleryContainer = galleryElement.querySelector(
    ".thumbnail-gallery-container",
  );
  thumbnailGalleryContainer.innerHTML = "";

  const thumbnailsArr = product.thumbnails;
  console.log("renderThumbnails:", thumbnailsArr);
 
  thumbnailsArr.forEach((thumbnailSrc, index) => {
    const button = document.createElement("button");
    button.classList.add(`product-${index + 1}-button`, "thumbnail-button");
    button.dataset.thumbnailNumber = `${index + 1}`;
    if (index === selectedImageIndex) {
      button.classList.add("selected");
      button.setAttribute("tabindex", "0");
      
    } else {
      button.setAttribute("tabindex", "-1");
    }

    const img = document.createElement("img");
    img.src = thumbnailSrc;
    img.classList.add('thumbnail');
    img.alt = `Luxury sneakers ${index === 0 ? "front" : index === 1 ? "back" : index === 2 ? "right side" : "left side"} view`;
    button.appendChild(img);
    thumbnailGalleryContainer.appendChild(button);
    
  });


}

function renderSelectedThumbnailButton(allThumbnailsArr, selectedThumbnail) {
  allThumbnailsArr.forEach((thumbnail) => {
    thumbnail.classList.remove("selected");
  });
  selectedThumbnail.classList.add("selected");

}

function renderThumbnailTabIndexes (allThumbnails, selectedThumbnail) {
  allThumbnails.forEach((thumbnail) => {
    thumbnail.setAttribute("tabindex", "-1");
  });
  selectedThumbnail.setAttribute("tabindex", "0");
}

function renderModalArrowTabIndexes (modalGallery) {
  
  const arrows = Array.from(modalGallery.querySelectorAll(".arrow-container"));
  arrows.forEach((arrow) => {
    arrow.setAttribute("tabindex", "-1");
  });
}

// exports
export { renderGallery, renderSelectedThumbnailButton, renderMainImage, renderThumbnailTabIndexes, renderModalArrowTabIndexes };
