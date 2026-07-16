// imports
import { mainGalleryInit, renderMainGalleryImage, renderProduct, renderInformation, handleArrowClick, handleThumbnailClick, renderSelectedThumbnailButton, handleButtonRoving } from "../views/galleryView.js";


// functions
function galleryControllerInit (products) {
    console.log("galleryControllerInit", products);
    const product = products[0];
    mainGalleryInit();
    renderProduct(product);
    renderInformation(product);

     const galleryMainImageContainer = document.querySelector(
    ".gallery-main-image-container",
  );
  galleryMainImageContainer.addEventListener("click", (e) => {
    handleArrowClick(e, products[0]);
  });

}






// exports
export { galleryControllerInit };