// // imports

// // functions
// function mainGalleryInit () {
//     console.log("mainGalleryInit");
// }


// function renderMainGalleryImage (mainImageSrc, className) {
//     const productImage = document.querySelector('.product-image');
//     productImage.classList = `product-image ${className}`;

//     productImage.src = mainImageSrc;
// }

// function renderProduct (product, container) {
//         console.log("renderProduct gotData:", product);
        

//         const mainProductImage = document.querySelector('.product-image');
//         mainProductImage.src = product.images[0];
//         container.prepend(mainProductImage);
// }



// function renderInformation (data) {
//     console.log("renderInformation:", data);
//     const brandName = document.querySelector('.product-label');
//     brandName.textContent = data.brandName;

//     const name = document.querySelector('.product-title');
//     name.textContent = data.name;

//     const description = document.querySelector('.product-description');
//     description.textContent = data.description;

//     const productPrice = document.querySelector('.product-price');
//     const price = data.isDiscounted ? (data.price * data.discountPercentage /100).toFixed(2) : data.price.toFixed(2);
//     productPrice.textContent = `$${price}`;

//     const productDiscount = document.querySelector('.product-discount');
//     productDiscount.textContent = data.isDiscounted ? data.discountPercentage + "%" : "";

//     const previousPrice = document.querySelector('.product-previous-price');
//     previousPrice.textContent = `$${data.price.toFixed(2)}`;

//     const addToCartButton = document.querySelector('.add-to-cart-button');
//     addToCartButton.id = data.id;
//     addToCartButton.dataset.productId = data.id;
//     console.log("addToCartButton", addToCartButton);

// }







// function renderSelectedThumbnailButton(allThumbnailsArr, selectedThumbnail) {
//     allThumbnailsArr.forEach((thumbnail) => {
//         thumbnail.classList.remove('selected');
//     });
//     selectedThumbnail.classList.add('selected');
// }



// export { mainGalleryInit, renderMainGalleryImage, renderProduct, renderInformation, renderSelectedThumbnailButton };



// imports




// functions
function renderGallery (galleryElement, product) {
    console.log("renderGallery:", galleryElement, product);
    renderMainImage(galleryElement, product);
    renderThumbnails(galleryElement, product);
}

function renderMainImage (galleryElement, product, index = 0) {
    const productImage = galleryElement.querySelector(".product-image");
    const mainProductImageSrc = product.images[index];
    productImage.className = `product-image product-${index + 1}`;
    productImage.src = mainProductImageSrc;
}

function renderThumbnails (galleryElement, product) {
    const thumbnailGalleryContainer = galleryElement.querySelector(".thumbnail-gallery-container");
    const thumbnailsArr = product.thumbnails;
    console.log("renderThumbnails:", thumbnailsArr);
    

    thumbnailsArr.forEach((thumbnailSrc, index) => {
        const button = document.createElement('button');
        button.id = `product-${index+1}`
        button.classList.add(`product-${index+1}-button`, 'thumbnail-button');
        button.dataset.thumbnailNumber = `${index + 1}`;
        if (index === 0) {
            button.classList.add('selected');
            button.setAttribute("tabindex", "0");
           
        } else {
            button.setAttribute('tabindex', '-1');
        }

        //  button.addEventListener('keydown', handleButtonRoving);
        
        const img = document.createElement("img");
        img.src = thumbnailSrc;
        // img.classList.add('thumbnail', `product-${index + 1}`);
        img.classList.add('thumbnail');
        img.alt = `Luxury sneakers ${index === 0 ? "front" : index === 1 ? "back" : index === 2 ? "right side" : "left side"} view`;
        button.appendChild(img);
        thumbnailGalleryContainer.appendChild(button);
    });

    // thumbnailGalleryContainer.addEventListener("click", (e) => {
    //     handleThumbnailClick(e, data)
    // });

    
}

function renderSelectedThumbnailButton(allThumbnailsArr, selectedThumbnail) {
    allThumbnailsArr.forEach((thumbnail) => {
        thumbnail.classList.remove('selected');
    });
    selectedThumbnail.classList.add('selected');
}


// exports
export { renderGallery, renderSelectedThumbnailButton, renderMainImage };