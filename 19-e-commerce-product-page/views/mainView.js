// imports
import { handleThumbnailClick, handleProductDelete } from '../controllers/mainController.js';

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

    const addToCartButton = document.querySelector('.add-to-cart-button');
    addToCartButton.id = data.id;
    addToCartButton.dataset.productId = data.id;
    console.log("addToCartButton", addToCartButton);

}

function renderThumbnails (thumbnailsArr) {
    console.log("renderThumbnails:", thumbnailsArr);
    const thumbNailGalleryContainer = document.querySelector('.thumbnail-gallery-container');

    thumbnailsArr.forEach((thumbnailSrc, index) => {
        const button = document.createElement('button');
        button.classList.add(`product-${index+1}-button`, 'thumbnail-button');
        if (index === 0) {
            button.classList.add('selected');
        }
        const img = document.createElement("img");
        img.src = thumbnailSrc;
        img.classList.add('thumbnail', `product-${index + 1}`);
        img.alt = `Luxury sneakers ${index === 0 ? "front" : index === 1 ? "back" : index === 2 ? "right side" : "left side"} view`;
        button.appendChild(img);
        thumbNailGalleryContainer.appendChild(button);
    });

    thumbNailGalleryContainer.addEventListener("click", handleThumbnailClick);
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
function renderSelectedThumbnailButton(allThumbnailsArr, selectedThumbnail) {
    allThumbnailsArr.forEach((thumbnail) => {
        thumbnail.classList.remove('selected');
    });
    selectedThumbnail.classList.add('selected');
}

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

function handleCartIconClick (state = "empty", cartItems, product, quantity) {
    
    const cartMenuContainer = document.querySelector(".cart-menu-container");
    cartMenuContainer.classList.toggle('hide');
    const cartMenuLower = document.querySelector('.cart-menu-lower');
    const checkoutButton = document.querySelector('.cart-checkout-button');


    const emptyCartMessage = document.querySelector(".cart-empty-message");
    if (state === "empty") {
        emptyCartMessage.textContent = "Your cart is empty."
    } else {
        emptyCartMessage.textContent = "";
        console.log("cartNow: ", cartItems);
        checkoutButton.classList.add('show');
        renderCartListItems(product, quantity);
        
    }
}

function renderCartListItems (product , quantity) {
    console.log("renderCartListItems:", product);
    const cartList = document.querySelector(".cart-list");
    cartList.classList.add('show');

    cartList.innerHTML = "";

    const li = document.createElement('li');
    li.classList.add('cart-list-item');


    // left of item
    const img = document.createElement('img');
    img.src = product.thumbnails[0];
    img.classList.add('cart-image');
    img.setAttribute('alt', "White with tan panels, Luxury sneakers product shot");

    // middle of item
     const cartItemMiddleContainer = document.createElement('div');
    cartItemMiddleContainer.classList.add('cart-item-middle-container');

    // middle top of item
    const name = document.createElement('p');
    name.textContent = product.name;
    name.classList.add('cart-name');

    // middle bottom of item
    const cartItemMiddleBottomContainer = document.createElement('div');
    cartItemMiddleBottomContainer.classList.add('cart-item-middle-bottom-container');

    const priceQuantity = document.createElement('p');
    const discountedPrice = product.isDiscounted ? (product.price * product.discountPercentage /100).toFixed(2) : product.price.toFixed(2);
    priceQuantity.classList.add('cart-price');

    const priceQuantityString = `$${discountedPrice} x ${quantity}`;
    priceQuantity.textContent = priceQuantityString;

    const totalPrice = document.createElement('p');
    totalPrice.classList.add('cart-total-price')
    totalPrice.textContent = `$${(discountedPrice * quantity).toFixed(2)}`;
    console.log("totalPrice: ", totalPrice);

    // right of item
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("cart-delete-button");
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './assets/icons/icon-delete.svg';
    deleteIcon.classList.add('cart-delete-icon')
    deleteButton.append(deleteIcon);
    deleteButton.addEventListener('click', handleProductDelete, true);

    li.appendChild(img);
    cartItemMiddleContainer.appendChild(name);
    cartItemMiddleBottomContainer.append(priceQuantity);
    cartItemMiddleBottomContainer.appendChild(totalPrice);
    cartItemMiddleContainer.appendChild(cartItemMiddleBottomContainer);
    li.appendChild(cartItemMiddleContainer);
    li.appendChild(deleteButton);


    cartList.appendChild(li);
}

function handleNextImage (newPathname, className) {
    console.log("className :", className);
    const productImage = document.querySelector(".product-image");
    productImage.classList = `product-image ${className}`;
    console.log("handlePrevious newPathname:", newPathname);
    productImage.src = newPathname;
    console.log("Product image:", productImage);
}

function renderMainGalleryImage (mainImageSrc) {
    const productImage = document.querySelector('.product-image');
    productImage.src = mainImageSrc;
}

function increaseQuantity () {
    console.log('increaseQuantity');

    const quantity = getQuantity();
    console.log('quantity quantity', quantity);
    const newQuantity = quantity + 1;
    if (newQuantity <= 5) {
        console.log('increaseQuantity newQuantity', newQuantity);
        renderQuantity(newQuantity);
    }
    return;
}


function decreaseQuantity () {
    console.log('decreaseQuantity');
    const quantity = getQuantity();
    const newQuantity = quantity - 1;
    if (newQuantity > 0) {
        
        console.log('decreaseQuantity newQuantity', newQuantity);
        renderQuantity(newQuantity);
    }
    return;
}

function renderQuantity (value) {
    const quantityElement = document.querySelector(".product-quantity");
    quantityElement.textContent = value;
}

function getQuantity () {
    const quantity = parseInt(document.querySelector(".product-quantity").textContent);
    return quantity;
}

function renderCartNumber (itemsInCart) {
    const cartNumberElement = document.querySelector(".cart-number-display-container");
    cartNumberElement.style.display = "flex";
    cartNumberElement.textContent = itemsInCart;
}

function renderResetQuantity () {
    const quantity = document.querySelector(".product-quantity");
    quantity.textContent = 1;
}

function renderCloseCartMenu () {
    const cartMenuContainer = document.querySelector(".cart-menu-container");
    cartMenuContainer.classList.add('hide');
}

function renderCartProduct (product, quantity) {
    const cartMenuContainer = document.querySelector(".cart-menu-container");
    cartMenuContainer.classList.add('show');


    const list = document.querySelector('.cart-list');

    const li = document.createElement('li');
    
    const {name} = product;
    li.textContent = name;




    
    const cartMenuLower = document.querySelector('.cart-menu-lower');
    const checkoutButton = document.querySelector('.cart-checkout-button');


    const emptyCartMessage = document.querySelector(".cart-empty-message");
    if (state === "empty") {
        emptyCartMessage.textContent = "Your cart is empty."
    // } else {
    //     emptyCartMessage.textContent = "";
    //     console.log("cartNow: ", cartItems);
    //     renderCartListItems(cartItems);
    //     checkoutButton.classList.add('show');
    // }
    }


}

// exports
export { mainViewInit, renderProduct, renderProfile, handleMenuIconClick, handleMenuContainerClick, handleCartIconClick, handleNextImage, renderSelectedThumbnailButton, renderMainGalleryImage, increaseQuantity, decreaseQuantity, renderCartNumber, renderResetQuantity, renderCloseCartMenu, renderCartProduct };