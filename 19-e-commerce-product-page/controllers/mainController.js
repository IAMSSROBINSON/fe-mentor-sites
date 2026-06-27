// imports
import { mainViewInit, renderProduct, renderProfile, handleMenuIconClick, handleMenuContainerClick, handleCartIconClick, handlePrevious } from "../views/mainView.js";
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

    const previousArrowContainer = document.querySelector(".previous-arrow-container");
    previousArrowContainer.addEventListener("click", handlePreviousClick);
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

function handlePreviousClick (e) {
    // get the pathname of the current image in its container
    const pathname = new URL(document.querySelector(".product-image").src).pathname;
    console.log("pathname:", pathname);
    // get all the image paths in an array collection
    const allImages = getProducts()[0].images;
    console.log("allImages:", allImages);
    // get the index of the current image in the collection
    const indexOfCurrentIndex = allImages.indexOf(pathname);
    console.log("indexOfCurrentIndex:", indexOfCurrentIndex);
    // if the index - 1 is less than 0 then do nothing 
    let newIndex = indexOfCurrentIndex - 1;
    if (newIndex < 0) {
        newIndex = allImages.length - 1;
        console.log("newIndex:", newIndex)
        console.log("this is the first image");
    }
    // else currentIndex = index found - 1 
    // get the pathname from the collection with the currentIndex
    const newPathname = allImages[newIndex];
    // send the pathname to handlePrevious to render in the dom
    handlePrevious(newPathname);

}
 

// exports
export { mainControllerInit };