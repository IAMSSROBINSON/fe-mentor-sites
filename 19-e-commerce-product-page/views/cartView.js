

function getQuantity () {
    const quantity = parseInt(document.querySelector(".product-quantity").textContent);
    return quantity;
}

function renderQuantity (value) {
    const quantityElement = document.querySelector(".product-quantity");
    quantityElement.textContent = value;
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

function addStyleToCartNumberDisplayContainer () {
    getCartNumberContainer().style.backgroundColor = '#FF7E1B';
}

function getCartNumberContainer () {
    return document.querySelector('.cart-number-display-container');
}

function clearCartList () {
    const cartList = document.querySelector(".cart-list");
     cartList.innerHTML = "";
}

function removeEmptyCartMessage () {
    const emptyCartMessage = getEmptyCartMessageElement();
    emptyCartMessage.textContent = ""
}

function toggleCartMenuContainer() {
    getCartMenuContainer().classList.toggle('hide');
    toggleAriaExpanded();
}

function toggleAriaExpanded () {
   

   const cartButton = document.querySelector(".cart-icon-button");
   console.log("cart-icon-button aria-expanded before:", cartButton);

     const isExpanded = cartButton.getAttribute("aria-expanded");
     console.log("attribute:", isExpanded)

   if (isExpanded === "false") {
    cartButton.setAttribute("aria-expanded", "true");
   }
   else {
    cartButton.setAttribute("aria-expanded", "false");
   }

   console.log("cart-icon-button aria-expanded after:", cartButton);

}

function getCartMenuContainer () {
    return document.querySelector(".cart-menu-container");
}

function getEmptyCartMessageElement () {
    return  document.querySelector(".cart-empty-message");
}

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

    li.appendChild(img);
    cartItemMiddleContainer.appendChild(name);
    cartItemMiddleBottomContainer.append(priceQuantity);
    cartItemMiddleBottomContainer.appendChild(totalPrice);
    cartItemMiddleContainer.appendChild(cartItemMiddleBottomContainer);
    li.appendChild(cartItemMiddleContainer);
    li.appendChild(deleteButton);


    cartList.appendChild(li);
}

function removeDeletedProductFromCart (element) {
        element.remove();
    }

    // function handleProductDelete(e, user1) {
    //   console.log("deleteButtonClicked handleProductDelete:");
    //   e.stopPropagation();
    
    //   const target = e.target.closest("li");
    //   const cartItemId = target?.dataset.cartItemId;
    //   console.log("target:", target);
    //   console.log("cartItemId:", cartItemId);
    //   const deletedProduct = user1.deleteProductById(cartItemId);
    //   console.log("handleProductDelete deletedProduct:", deletedProduct);
    //   if (deletedProduct) {
    //     removeDeletedProductFromCart(target);
    //     user1.cart.items.length === 0
    //       ? removeEmptyCartMessage()
    //       : showCartNumber(user1.cart.items.length);
    //     user1.cart.items.length === 0 ? hideCheckout() : showCheckout();
    //     user1.cart.items.length === 0
    //       ? showEmptyCartMessage()
    //       : removeEmptyCartMessage();
    //     updateCartNumber(user1.cart.items.length);
    //   }
    // }

    function hideCheckout () {
     const checkoutButton = document.getElementById('checkout');
     checkout.classList.remove('show');
     checkout.classList.add('hide');
}

function showCheckout () {
 const checkoutButton = document.getElementById('checkout');
 checkout.classList.remove('hide');
 checkout.classList.add('show');
}

function showEmptyCartMessage () {
    const emptyCartMessage = getEmptyCartMessageElement();
    emptyCartMessage.textContent = "Your cart is empty."
}

function updateCartNumber (number = 0) {
    console.log("updateCartNumber", number);
    const cartNumberContainer = getCartNumberContainer();
    console.log('cartContainer before:', cartNumberContainer);
    if (number !== 0) {
        showCartNumber();
        cartNumberContainer.textContent = number;
        console.log('cartContainer after:', cartNumberContainer);
        return;
    }
    cartNumberContainer.textContent = number;
    removeCartNumber();
    ;
    console.log('cartContainer after:', cartNumberContainer);


}

function removeCartNumber () {
    const cartNumberContainer = getCartNumberContainer();
    cartNumberContainer.textContent = ""
    cartNumberContainer.classList.remove('show');
    cartNumberContainer.classList.add('hide');
    cartNumberContainer.style.backgroundColor = 'transparent';
}

function showCartNumber (numberOfItems = 0) {
    const cartNumberContainer = getCartNumberContainer();
    cartNumberContainer.classList.remove('hide');
    cartNumberContainer.classList.add('show');
    cartNumberContainer.textContent = numberOfItems;
}



export { getQuantity, renderQuantity, renderCartNumber, renderResetQuantity, renderCloseCartMenu, addStyleToCartNumberDisplayContainer, clearCartList, removeEmptyCartMessage, toggleCartMenuContainer, renderCartListItems, removeDeletedProductFromCart, hideCheckout, showCheckout, showEmptyCartMessage, updateCartNumber, showCartNumber };