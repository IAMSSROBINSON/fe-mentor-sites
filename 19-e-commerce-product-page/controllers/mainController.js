// imports
import { mainViewInit, renderProduct, renderProfile, handleMenuIconClick, handleMenuContainerClick, handleCartIconClick, handleNextImage } from "../views/mainView.js";
import { mainModelInit, User} from "../models/mainModel.js";
import { productModelInit, getProducts } from "../models/productModel.js";

let user1 = null;

// functions
async function mainControllerInit () {
    console.log('mainControllerInit');
    user1 = new User('./assets/images/image-avatar.png');
    console.log("user1:", user1);
    console.log("user1 cart.items:", user1.cart.items);
    mainViewInit();
    renderProfile(user1);
    mainModelInit();
    try {
        await productModelInit();
        const products = getProducts();
        console.log("products mainController:", products[0]);
        const { data, message} = products;
        renderProduct({data: products[0], message: "success"});
        if (message === "success") {
            renderProduct({data: products[0], message: "success"});
        } else {
            // render default product in view or backup
        }
    }
    catch (err) {
        // renderProduct({data: null, message: "Could not fetch data. Try again later..."});
        // instead of doing conditional in view explicitly render error from here in controller
    }

    const menuIconContainer = document.querySelector('.menu-icon-container');
    menuIconContainer.addEventListener('click', handleMenuIconClick);

    const menuContainer = document.getElementById('menu-container');
    menuContainer.addEventListener('click', handleMenuContainerClick);

    const cartIconContainer = document.querySelector(".cart-icon-container");
    cartIconContainer.addEventListener("click", handleCartClick);

    const galleryMainImageContainer = document.querySelector(".gallery-main-image-container");
    galleryMainImageContainer.addEventListener("click", handleArrowClick);
}

// handlers
function handleCartClick () {
    const cartItems = user1.getCartItems();

    if (cartItems.length === 0) {
         handleCartIconClick("empty");
    } else {
        handleCartIconClick("filled");
    }
}

function handleArrowClick(e) {
  const button = e.target.closest(".arrow-container");
  if (button) {
    const id = button.id;
    const pathname = new URL(document.querySelector(".product-image").src)
      .pathname;
    const allImages = getProducts()[0].images;
    const indexOfCurrentImage = allImages.indexOf(pathname);
    console.log("indexOfCurrentImage:", indexOfCurrentImage);
    if (id === "previous-arrow-container") {
      let newIndex = indexOfCurrentImage - 1;
      if (newIndex < 0) {
        newIndex = allImages.length - 1;
      }
      const newPathname = allImages[newIndex];
      const className = `product-${newIndex + 1}`;
      console.log("className: previous", className);
      handleNextImage(newPathname, className);
    } else {
      let newIndex = indexOfCurrentImage + 1;
      if (newIndex > allImages.length - 1) {
        newIndex = 0;
      }
      const className = `product-${newIndex + 1}`;
      console.log("className: next", className);
      const newPathname = allImages[newIndex];
      handleNextImage(newPathname, className);
    }
  }
}


 

// exports
export { mainControllerInit };