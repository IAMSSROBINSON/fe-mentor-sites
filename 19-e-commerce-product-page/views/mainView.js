// imports

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


function injectGallery (gallery) {
    const galleryContainer = document.querySelector('.gallery-container');

    galleryContainer.appendChild(gallery);
}



// function handleMenuContainerClick (e) {
    
//     const link = e.target.closest("li");
//     if (link) {
//         const links = Array.from(document.querySelectorAll('.menu-link-item'));
//         links.forEach((el) => el.classList.remove("link-underline"));
//         console.log("handleMenuContainerClick", e.target);
//         link.classList.add("link-underline");
//     }
   
// }

// function getEmptyCartMessageElement () {
//     return  document.querySelector(".cart-empty-message");
// }


// function renderCartListItems (product , quantity) {
//     const cartList = document.querySelector(".cart-list");

//     console.log("renderCartListItems:", product);
//     cartList.classList.add('show');

//     const li = document.createElement('li');
//     li.classList.add('cart-list-item');
//     li.dataset.cartItemId = product.id;


//     // left of item
//     const img = document.createElement('img');
//     img.src = product.thumbnails[0];
//     img.classList.add('cart-image');
//     img.setAttribute('alt', "White with tan panels, Luxury sneakers product shot");

//     // middle of item
//      const cartItemMiddleContainer = document.createElement('div');
//     cartItemMiddleContainer.classList.add('cart-item-middle-container');

//     // middle top of item
//     const name = document.createElement('p');
//     name.textContent = product.name;
//     name.classList.add('cart-name');

//     // middle bottom of item
//     const cartItemMiddleBottomContainer = document.createElement('div');
//     cartItemMiddleBottomContainer.classList.add('cart-item-middle-bottom-container');

//     const priceQuantity = document.createElement('p');
//     const discountedPrice = product.isDiscounted ? (product.price * product.discountPercentage /100).toFixed(2) : product.price.toFixed(2);
//     priceQuantity.classList.add('cart-price');

//     const priceQuantityString = `$${discountedPrice} x ${quantity}`;
//     priceQuantity.textContent = priceQuantityString;

//     const totalPrice = document.createElement('p');
//     totalPrice.classList.add('cart-total-price')
//     totalPrice.textContent = `$${(discountedPrice * quantity).toFixed(2)}`;
//     console.log("totalPrice: ", totalPrice);

//     // right of item
//     const deleteButton = document.createElement('button');
//     deleteButton.classList.add("cart-delete-button");
//     const deleteIcon = document.createElement('img');
//     deleteIcon.src = './assets/icons/icon-delete.svg';
//     deleteIcon.classList.add('cart-delete-icon')
//     deleteButton.append(deleteIcon);
//     deleteButton.addEventListener('click', handleProductDelete, true);

//     li.appendChild(img);
//     cartItemMiddleContainer.appendChild(name);
//     cartItemMiddleBottomContainer.append(priceQuantity);
//     cartItemMiddleBottomContainer.appendChild(totalPrice);
//     cartItemMiddleContainer.appendChild(cartItemMiddleBottomContainer);
//     li.appendChild(cartItemMiddleContainer);
//     li.appendChild(deleteButton);


//     cartList.appendChild(li);
// }

// function addStyleToCartNumberDisplayContainer () {
//     getCartNumberContainer().style.backgroundColor = '#FF7E1B';
// }


//     function injectGallery (gallery) {
//     const galleryContainer = document.querySelector('.gallery-container');

//     galleryContainer.insertAdjacentHTML("afterbegin", gallery);
// }




// exports
export { mainViewInit, renderProfile, injectGallery };