function renderMainGalleryImage (mainImageSrc, className) {
    const productImage = document.querySelector('.product-image');
    productImage.classList = `product-image ${className}`;

    productImage.src = mainImageSrc;
}

export { renderMainGalleryImage };