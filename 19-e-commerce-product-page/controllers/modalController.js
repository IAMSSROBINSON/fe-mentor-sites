// imports
import { renderModal } from "../views/modalView.js";
import createGallery from "../components/GalleryComponent.js";
import { galleryControllerInit } from "./galleryController.js";

// functions

function modalControllerInit (product) {
    console.log("modalControllerInit");

    attachEvents(product);
}

function attachEvents (product) {
    const galleryMainContainerDesktop = document.querySelector('.gallery-main-image-container.desktop');
    console.log("galleryMainContainerDesktop:", galleryMainContainerDesktop);

    galleryMainContainerDesktop.addEventListener("click", (e) => {
        handleMainProductClick(e, product)
    })
}

function handleMainProductClick (e, product) {
    if (window.innerWidth >= 1440) {
        const modalGallery = createGallery();
        console.log("main Product clicked desktop");
        renderModal(modalGallery);
        galleryControllerInit(modalGallery, product);

    } else {
      console.log("main Product clicked not desktop");
    }
}



// exports
export { modalControllerInit };