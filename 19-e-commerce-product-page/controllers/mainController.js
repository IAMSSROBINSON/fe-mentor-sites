// imports
import { mainViewInit, renderProduct, renderProfile, handleMenuIconClick, handleMenuContainerClick, handleCartIconClick } from "../views/mainView.js";
import { mainModelInit, User} from "../models/mainModel.js";
import { productModelInit, getProducts } from "../models/productModel.js";

let user1 = null;

// functions
async function mainControllerInit () {
    console.log('mainControllerInit');
    user1 = new User('./assets/images/image-avatar.png');
    console.log("user1:", user1);
    mainViewInit();
    renderProfile(user1);
    mainModelInit();
    try {
        await productModelInit();
        const products = getProducts();
        console.log("products mainController:", products[0]);
        renderProduct({data: products[0], message: "success"});
    }
    catch (err) {
        renderProduct({data: null, message: "Could not fetch data. Try again later..."});
    }

    const menuIconContainer = document.querySelector('.menu-icon-container');
    menuIconContainer.addEventListener('click', handleMenuIconClick);

    const menuContainer = document.getElementById('menu-container');
    menuContainer.addEventListener('click', handleMenuContainerClick);

    const cartIconContainer = document.querySelector(".cart-icon-container");
    cartIconContainer.addEventListener("click", handleCartIconClick);
}

// handlers
 

// exports
export { mainControllerInit };