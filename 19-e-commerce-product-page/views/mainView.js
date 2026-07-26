// imports
import { handleProductDelete } from '../controllers/mainController.js';

// functions
function mainViewInit () {
    console.log('mainViewInit');
}


function renderProfile (user) {
    const avatarContainer = document.getElementById('avatar-container');

    const img = document.createElement('img');
    img.classList.add('avatar-image');
    img.src = user?.profileSrc ? user?.profileSrc : "./assets/icons/avatar-placeholder.svg";
    img.alt = "Profile image";
    avatarContainer.appendChild(img);
}


// functions

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

// function getCartMenuContainer () {
//     return document.querySelector(".cart-menu-container");
// }

function showCartMenuContainer () {
    getCartMenuContainer().classList.remove('hide');
    getCartMenuContainer().classList.add('show');
}

function toggleCartMenuContainer() {
    getCartMenuContainer().classList.toggle('hide');
}

function hideCartMenuContainer () {
    getCartMenuContainer().classList.remove('show');
    getCartMenuContainer().classList.add('hide');
}

function getEmptyCartMessageElement () {
    return  document.querySelector(".cart-empty-message");
}

// function showEmptyCartMessage () {
//     const emptyCartMessage = getEmptyCartMessageElement();
//     emptyCartMessage.textContent = "Your cart is empty."
// }

// function removeEmptyCartMessage () {
//     const emptyCartMessage = getEmptyCartMessageElement();
//     emptyCartMessage.textContent = ""
// }

// function clearCartList () {
//     const cartList = document.querySelector(".cart-list");
//      cartList.innerHTML = "";
// }

function renderCartListItems (product , quantity) {
    const cartList = document.querySelector(".cart-list");

    console.log("renderCartListItems:", product);
    cartList.classList.add('show');

    const li = document.createElement('li');
    li.classList.add('cart-list-item');
    li.dataset.cartItemId = product.id;


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


// function increaseQuantity () {
//     console.log('increaseQuantity');

//     const quantity = getQuantity();
//     console.log('quantity quantity', quantity);
//     const newQuantity = quantity + 1;
//     if (newQuantity <= 5) {
//         console.log('increaseQuantity newQuantity', newQuantity);
//         renderQuantity(newQuantity);
//     }
//     return;
// }


// function decreaseQuantity () {
//     console.log('decreaseQuantity');
//     const quantity = getQuantity();
//     const newQuantity = quantity - 1;
//     if (newQuantity > 0) {
        
//         console.log('decreaseQuantity newQuantity', newQuantity);
//         renderQuantity(newQuantity);
//     }
//     return;
// }

// function renderQuantity (value) {
//     const quantityElement = document.querySelector(".product-quantity");
//     quantityElement.textContent = value;
// }

// function getQuantity () {
//     const quantity = parseInt(document.querySelector(".product-quantity").textContent);
//     return quantity;
// }

// function renderCartNumber (itemsInCart) {
//     const cartNumberElement = document.querySelector(".cart-number-display-container");
//     cartNumberElement.style.display = "flex";
//     cartNumberElement.textContent = itemsInCart;
// }

// function renderResetQuantity () {
//     const quantity = document.querySelector(".product-quantity");
//     quantity.textContent = 1;
// }

// function renderCloseCartMenu () {
//     const cartMenuContainer = document.querySelector(".cart-menu-container");
//     cartMenuContainer.classList.add('hide');
// }

// function renderCartProduct (product, quantity) {
//     const cartMenuContainer = document.querySelector(".cart-menu-container");
//     cartMenuContainer.classList.add('show');

//     const list = document.querySelector('.cart-list');
//     const li = document.createElement('li');
    
//     const {name} = product;
//     li.textContent = name;

//     const cartMenuLower = document.querySelector('.cart-menu-lower');
//     const checkoutButton = document.querySelector('.cart-checkout-button');

//     const emptyCartMessage = document.querySelector(".cart-empty-message");
//     if (state === "empty") {
//         emptyCartMessage.textContent = "Your cart is empty."
       
//     }
// }

// function removeDeletedProductFromCart (element) {
//         element.remove();
//     }



// function showCartNumber (numberOfItems = 0) {
//     const cartNumberContainer = getCartNumberContainer();
//     cartNumberContainer.classList.remove('hide');
//     cartNumberContainer.classList.add('show');
//     cartNumberContainer.textContent = numberOfItems;
// }

// function removeCartNumber () {
//     const cartNumberContainer = getCartNumberContainer();
//     cartNumberContainer.textContent = ""
//     cartNumberContainer.classList.remove('show');
//     cartNumberContainer.classList.add('hide');
//     cartNumberContainer.style.backgroundColor = 'transparent';
// }

// function updateCartNumber (number = 0) {
//     console.log("updateCartNumber", number);
//     const cartNumberContainer = getCartNumberContainer();
//     console.log('cartContainer before:', cartNumberContainer);
//     if (number !== 0) {
//         showCartNumber();
//         cartNumberContainer.textContent = number;
//         console.log('cartContainer after:', cartNumberContainer);
//         return;
//     }
//     cartNumberContainer.textContent = number;
//     removeCartNumber();
//     ;
//     console.log('cartContainer after:', cartNumberContainer);


// }

function addStyleToCartNumberDisplayContainer () {
    getCartNumberContainer().style.backgroundColor = '#FF7E1B';
}


// exports
export { mainViewInit, renderProfile, handleMenuIconClick, handleMenuContainerClick, increaseQuantity, decreaseQuantity, renderCartNumber, renderResetQuantity, renderCloseCartMenu, removeDeletedProductFromCart, hideCheckout, showCheckout, showEmptyCartMessage, removeEmptyCartMessage, showCartNumber, removeCartNumber, renderCartListItems, clearCartList, showCartMenuContainer, hideCartMenuContainer, toggleCartMenuContainer, updateCartNumber, addStyleToCartNumberDisplayContainer };