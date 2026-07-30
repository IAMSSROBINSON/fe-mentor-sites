// imports

// cache
const blurWrapper = document.getElementById('blur-wrapper');
const closeIconSrc = "/assets/icons/icon-close.svg";


function renderModal (modalGallery) {
    console.log("modalView renderModal");

    blurDocument(blurWrapper);
    renderModalCard(modalGallery);
    console.log("blurWrapper", blurWrapper);
}

function blurDocument (element) {
    element.style.display = "grid";
    element.style.zIndex = "3";
}

function removeDocumentBlur (element) {
    element.style.display = "none";;
}

function renderModalCard (modalGallery) {
    console.log("modalGallery", modalGallery);
    const modalCard = document.createElement('div');

    const closeModalButton = document.createElement("button");
    closeModalButton.classList.add("close-modal-button");


    const closeIconImg = document.createElement("img");
    closeIconImg.src = closeIconSrc;

    const modalGalleryContainer = document.createElement('div');
    modalGalleryContainer.classList.add('modal-gallery-container');

    modalGalleryContainer.appendChild(modalGallery)
    closeModalButton.appendChild(closeIconImg);
    modalCard.classList.add("modal-card");
    modalCard.appendChild(closeModalButton);
    modalCard.appendChild(modalGalleryContainer);
    blurWrapper.appendChild(modalCard);

}

export { renderModal };