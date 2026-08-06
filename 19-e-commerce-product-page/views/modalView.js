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
    blurWrapper.innerHTML = "";
    
    console.log("modalGallery", modalGallery);
    const modalCard = document.createElement('div');
    modalCard.classList.add("modal-card");
    modalCard.setAttribute("role", "dialog");
    modalCard.setAttribute("aria-modal", "true");
    modalCard.setAttribute("aria-labelledby", "product-gallery");

    const title = document.createElement("h2");
    title.textContent = "Product Gallery";
    title.setAttribute("id", "product-gallery");
    title.classList.add("visually-hidden");

    const closeModalButton = document.createElement("button");
    closeModalButton.classList.add("close-modal-button");

    closeModalButton.innerHTML = `
    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#ffffff" fill-rule="evenodd"/></svg>`;

    const modalGalleryContainer = document.createElement('div');
    modalGalleryContainer.classList.add('modal-gallery-container');

    modalGalleryContainer.appendChild(modalGallery)
    modalCard.appendChild(title);
    modalCard.appendChild(closeModalButton);
    modalCard.appendChild(modalGalleryContainer);
    blurWrapper.appendChild(modalCard);

    freezeBody();
}

function freezeBody () {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
}



export { renderModal };