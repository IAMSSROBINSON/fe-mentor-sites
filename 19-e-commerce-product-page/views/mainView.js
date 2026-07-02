// imports

// functions
function mainViewInit () {
    console.log('mainViewInit');
}

function renderProduct ({data, message}) {
    if (message === "success") {
        console.log("renderProduct gotData:", data);
        const galleryMainImageContainer = document.querySelector(".gallery-main-image-container");
        // const img = document.createElement('img');
        // img.src = data.images[0];
        // img.classList.add("product-image", "product-1");
        // img.alt = "Hero image of white sneakers";
        // galleryMainImageContainer.appendChild(img);

        const mainProductImage = document.querySelector('.product-image');
        mainProductImage.src = data.images[0];

        renderThumbnails(data.thumbnails);
        renderInformation(data);

    } else {
        console.log("renderProduct noData:", message);
    }
}

function renderInformation (data) {
    console.log("renderInformation:", data);
    const brandName = document.querySelector('.product-label');
    brandName.textContent = data.brandName;

    const name = document.querySelector('.product-title');
    name.textContent = data.name;

    const description = document.querySelector('.product-description');
    description.textContent = data.description;

    const productPrice = document.querySelector('.product-price');
    const price = data.isDiscounted ? (data.price * data.discountPercentage /100).toFixed(2) : data.price.toFixed(2);
    productPrice.textContent = `$${price}`;

    const productDiscount = document.querySelector('.product-discount');
    productDiscount.textContent = data.isDiscounted ? data.discountPercentage + "%" : "";

    const previousPrice = document.querySelector('.product-previous-price');
    previousPrice.textContent = `$${data.price.toFixed(2)}`;
}

function renderThumbnails (thumbnailsArr) {
    console.log("renderThumbnails:", thumbnailsArr);
    const thumbNailGalleryContainer = document.querySelector('.thumbnail-gallery-container');

    thumbnailsArr.forEach((thumbnailSrc, index) => {
        const img = document.createElement("img");
        img.src = thumbnailSrc;
        img.classList.add('thumbnail', `product-${index + 1}`);
        img.alt = "";
        thumbNailGalleryContainer.appendChild(img);
    });


}

function renderProfile (user) {
    const avatarContainer = document.getElementById('avatar-container');

    const img = document.createElement('img');
    img.classList.add('avatar-image');
    img.src = user?.profileSrc ? user?.profileSrc : "./assets/icons/avatar-placeholder.svg";
    img.alt = "Profile image";
    avatarContainer.appendChild(img);
}

// handlers
function handleMenuIconClick(e) {
    console.log("menu icon clicked");
    const body = document.querySelector('body');
    body.classList.add('no-scroll');
    toggleBlurWrapper();
    toggleMenuContainer();
   
    const closeMenuIcon = document.getElementById('close-menu-icon');
    closeMenuIcon.addEventListener("click", handleCloseMenu);
}

function handleCloseMenu (e) {
    toggleMenuContainer()
    toggleBlurWrapper();
}

function toggleBlurWrapper () {
    const blurWrapper = document.getElementById('blur-wrapper');
    blurWrapper.classList.toggle('show');
}


function toggleMenuContainer () {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.classList.toggle('show');
    console.log("menuContainer:", menuContainer);
}

function handleMenuContainerClick (e) {
    

    const link = e.target.closest("li");
    if (link) {
        const links = Array.from(document.querySelectorAll('.menu-link-item'));
        links.forEach((el) => el.classList.remove("link-underline"));
        console.log("handleMenuContainerClick", e.target);
        link.classList.add("link-underline");
    }
   
}

function handleCartIconClick (state = "empty") {
    
    const cartMenuContainer = document.querySelector(".cart-menu-container");
    cartMenuContainer.classList.toggle('hide');

    const emptyCartMessage = document.getElementById("cart-empty-message");
    if (state === "empty") {
        emptyCartMessage.textContent = "Your cart is empty to."
    }

}

function handleNextImage (newPathname, className) {
    console.log("className :", className);
    const productImage = document.querySelector(".product-image");
    productImage.classList = `product-image ${className}`;
    console.log("handlePrevious newPathname:", newPathname);
    productImage.src = newPathname;
    console.log("Product image:", productImage);
}

// exports
export { mainViewInit, renderProduct, renderProfile, handleMenuIconClick, handleMenuContainerClick, handleCartIconClick, handleNextImage };