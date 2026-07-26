// // imports
// import {
//   mainViewInit,
//   renderProfile,
//   handleMenuIconClick,
//   handleMenuContainerClick,
//   increaseQuantity,
//   decreaseQuantity,
//   renderCartNumber,
//   renderResetQuantity,
//   renderCloseCartMenu,
//   removeDeletedProductFromCart,
//   hideCheckout,
//   showCheckout,
//   showEmptyCartMessage,
//   removeEmptyCartMessage,
//   showCartNumber,
//   removeCartNumber,
//   renderCartListItems,
//   clearCartList,
//   showCartMenuContainer,
//   hideCartMenuContainer,
//   toggleCartMenuContainer,
//   updateCartNumber,
//   addStyleToCartNumberDisplayContainer
// } from "../views/mainView.js";
// import { mainModelInit, User } from "../models/mainModel.js";
// import { productModelInit, getProducts } from "../models/productModel.js";
// import { galleryControllerInit } from "./galleryController.js";


// const user1 = new User("./assets/images/image-avatar.png");

// // functions
// async function mainControllerInit() {
//   console.log("mainControllerInit");
//   mainViewInit();
//   renderProfile(user1);
//   mainModelInit();
//   try {
//     await productModelInit();
//     const products = getProducts();

//     console.log("products mainController:", products[0]);

//     if (products.length > 0) {
//       galleryControllerInit(products);
//     } else {
//       // render default product in view or display error fetching data
//     }
//   } catch (err) {
//     console.log("Could not load products, please refresh and try again later..");
//   }

//   const menuIconContainer = document.querySelector(".menu-icon-container");
//   menuIconContainer.addEventListener("click", handleMenuIconClick);

//   const menuContainer = document.getElementById("menu-container");
//   menuContainer.addEventListener("click", handleMenuContainerClick);

//   const cartIconContainer = document.querySelector(".cart-icon-container");
//   cartIconContainer.addEventListener("click", handleCartClick);

//   const addToCartButton = document.querySelector(".add-to-cart-button");
//   addToCartButton.addEventListener("click", handleAddToCartClick);

//   const productQuantityContainer = document.querySelector(
//     ".product-quantity-container",
//   );
//   console.log("productQuantityContainer", productQuantityContainer);
//   productQuantityContainer.addEventListener(
//     "click",
//     handleProductQuantityContainer,
//   );
// }

// // handlers
// function handleProductQuantityContainer(e) {
//   console.log("productQuantityContainer clicked:");
//   const target = e.target.closest("button");
//   if (target && target.classList?.contains("product-minus")) {
//     console.log("minusButtonClicked");
//     decreaseQuantity();
//   } else {
//     increaseQuantity();
//     console.log("plusButtonClicked");
//   }
// }

// function handleAddToCartClick(e) {
//   console.log("handleAddToCartClick");
//   // get the quantity
//   const quantity = parseInt(
//     document.querySelector(".product-quantity").textContent,
//   );

//   const addToCartButton = e.target.closest("button");
//   const productId = addToCartButton.dataset.productId;

//   console.log("quantity:", quantity);
//   console.log("BUTTON:", addToCartButton);
//   console.log("button:", productId);
//   if (quantity !== 0) {
//     addProductIdToUserCart(productId, quantity);
//     renderResetQuantity();
//     renderCloseCartMenu();
//     addStyleToCartNumberDisplayContainer();
//   }
//   return;
// }

// function addProductIdToUserCart(productId, quantity = 0) {
//   console.log("user1:", user1);
//   console.log("user1:", user1.cart.items);
//   user1.addItem(productId, quantity);
//   const cartLength = user1.cart.items.length;
//   if (cartLength > 0) {
//     const totalItemsInCart = user1.cart.items.reduce((acc, item) => {
//       const count = acc + item.quantity;
//       return count;
//     }, 0);
//     console.log("cartLength:", totalItemsInCart);
//     renderCartNumber(totalItemsInCart);
//   }
// }

// function handleCartClick() {
//   const cartItems = user1.getCartItems();
//   console.log("handleCartClick cartItems:", cartItems);
//   toggleCartMenuContainer();
//   if (cartItems.length === 0) {
//     showEmptyCartMessage();
//     hideCheckout();
//   } else {
//     clearCartList();
//     removeEmptyCartMessage();

//     cartItems.forEach((itemObj) => {
//       const { productId, quantity } = itemObj;
//       console.log("productId: ", productId, "\n", "quantity :", quantity);

//       const product = getProducts().filter(
//         (productObj) => productObj.id === productId,
//       )[0];

//       renderCartListItems(product, quantity);
//     });
//     showCheckout();
//   }
// }


// function handleProductDelete(e) {
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



// // exports
// export {
//   mainControllerInit,
//   handleProductDelete,
// };





/* --------------------------------------------------------- */



// imports
import { mainModelInit, User } from "../models/mainModel.js";
import { cartControllerInit } from "./cartController.js";
import { productModelInit, getProducts } from "../models/productModel.js";
import { galleryControllerInit } from "./galleryController.js";


//  functions
async function mainControllerInit () {
    console.log("mainControllerInit:");

    const loader = document.getElementById("loader");
    const galleryElement = document.getElementById("gallery-main-plus-thumbnail-wrapper");

    try {
        // load products on backend
        await productModelInit();
        const products = getProducts();
        console.log(products);

        if (products.length > 0) {
            const product = products[0];
            galleryControllerInit(galleryElement, product);
            cartControllerInit();
            loader.classList.add("hide");
        }
    }
    catch(err) {
        console.log("mainController Error:", err);
        loader.classList.remove("hide");

    }
}




// exports
export {  mainControllerInit };