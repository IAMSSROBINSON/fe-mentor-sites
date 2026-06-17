// imports
import { mainViewInit, renderProduct } from "../views/mainView.js";
import { mainModelInit } from "../models/mainModel.js";
import { productModelInit, getProducts } from "../models/productModel.js";

// functions
async function mainControllerInit () {
    console.log('mainControllerInit');
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