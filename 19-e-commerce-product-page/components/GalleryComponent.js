function createGallery ({isModal}) {
    const galleryMainPlusThumbnailWrapper = document.createElement("div");
    galleryMainPlusThumbnailWrapper.classList.add("gallery-main-plus-thumbnail-wrapper");

    const galleryMainImageContainer = document.createElement("div");
    galleryMainImageContainer.classList.add("gallery-main-image-container", "desktop");


    const mainImageContainerButton = isModal ? document.createElement("div") : document.createElement("button");
    mainImageContainerButton.classList.add("main-image-container-button", "pointer");

    const productImage = document.createElement("img");
    productImage.setAttribute("alt", "");
    productImage.classList.add("product-image");


    const arrowContainerPrevious = document.createElement("button");
    arrowContainerPrevious.classList.add("arrow-container", "previous-arrow-container");
    arrowContainerPrevious.dataset.direction = "previous";

    const arrowContainerPreviousHTML = `<svg class="previous-icon" width="12" height="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd" />
                    </svg>`;

    arrowContainerPrevious.innerHTML = arrowContainerPreviousHTML;
    

    const arrowContainerNext = document.createElement("button");
    arrowContainerNext.classList.add("arrow-container", "next-arrow-container");
    arrowContainerNext.dataset.direction = "next";

    const arrowContainerNextHTML = `<svg class="next-icon" width="13" height="18" xmlns="http://www.w3.org/2000/svg">
                        <path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd" />
                    </svg>`;

    arrowContainerNext.innerHTML = arrowContainerNextHTML;

    const thumbnailGalleryContainer = document.createElement("div");
    thumbnailGalleryContainer.classList.add("thumbnail-gallery-container");


    mainImageContainerButton.appendChild(productImage);

    galleryMainImageContainer.appendChild(mainImageContainerButton);
    galleryMainImageContainer.appendChild(arrowContainerPrevious);
    galleryMainImageContainer.appendChild(arrowContainerNext);

    galleryMainPlusThumbnailWrapper.appendChild(galleryMainImageContainer);
    galleryMainPlusThumbnailWrapper.appendChild(thumbnailGalleryContainer);

    return galleryMainPlusThumbnailWrapper;
    
}

export default createGallery;