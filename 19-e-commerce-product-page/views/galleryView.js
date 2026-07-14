// imports
import { handleMainImageClick, handleButtonRoving, handleThumbnailClick } from "../controllers/mainController.js";

// functions
function mainGalleryInit () {
    console.log("mainGalleryInit");
}


function renderMainGalleryImage (mainImageSrc, className) {
    const productImage = document.querySelector('.product-image');
    productImage.classList = `product-image ${className}`;

    productImage.src = mainImageSrc;
}

function renderProduct ({data}) {
        console.log("renderProduct gotData:", data);
        const galleryMainImageContainer = document.querySelector(".gallery-main-image-container");
        galleryMainImageContainer.addEventListener('click', handleMainImageClick);

        const mainProductImage = document.querySelector('.product-image');
        mainProductImage.src = data.images[0];
        galleryMainImageContainer.prepend(mainProductImage);

        renderThumbnails(data.thumbnails);
}

function renderThumbnails (thumbnailsArr) {
    console.log("renderThumbnails:", thumbnailsArr);
    const thumbNailGalleryContainer = document.querySelector('.thumbnail-gallery-container');

    thumbnailsArr.forEach((thumbnailSrc, index) => {
        const button = document.createElement('button');
        button.id = `product-${index+1}`
        button.classList.add(`product-${index+1}-button`, 'thumbnail-button');
        if (index === 0) {
            button.classList.add('selected');
            button.setAttribute("tabindex", "0");
           
        } else {
            button.setAttribute('tabindex', '-1');
        }

         button.addEventListener('keydown', handleButtonRoving)
        
        const img = document.createElement("img");
        img.src = thumbnailSrc;
        img.classList.add('thumbnail', `product-${index + 1}`);
        img.alt = `Luxury sneakers ${index === 0 ? "front" : index === 1 ? "back" : index === 2 ? "right side" : "left side"} view`;
        button.appendChild(img);
        thumbNailGalleryContainer.appendChild(button);
    });

    thumbNailGalleryContainer.addEventListener("click", handleThumbnailClick);
}

export { mainGalleryInit, renderMainGalleryImage, renderProduct };