// imports
import { renderModal } from "../views/modalView.js";

// functions

function modalControllerInit () {
    console.log("modalControllerInit");

    attachEvents();
}

function attachEvents () {
    const galleryMainContainerDesktop = document.querySelector('.gallery-main-image-container.desktop');
    console.log("galleryMainContainerDesktop:", galleryMainContainerDesktop);

    galleryMainContainerDesktop.addEventListener("click", handleMainProductClick)
}

function handleMainProductClick (e) {
    if (window.innerWidth >= 1440) {
        console.log("main Product clicked desktop");
        renderModal();
    } else {
      console.log("main Product clicked not desktop");
    }
}



// exports
export { modalControllerInit };