// imports
import { mainViewInit, renderProduct } from "../views/mainView.js";
import { mainModelInit, User} from "../models/mainModel.js";
import { productModelInit, getProducts } from "../models/productModel.js";

// functions
async function mainControllerInit () {
    console.log('mainControllerInit');
    const user1 = new User('./assets/images/image-avatar.png');
    console.log("user1:", user1);
    mainViewInit();
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
}

// handlers


// exports
export { mainControllerInit };