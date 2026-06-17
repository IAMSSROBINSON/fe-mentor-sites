// imports
import { mainViewInit, renderProduct } from "../views/mainView.js";
import { mainModelInit } from "../models/mainModel.js";
import { productModelInit, getProducts } from "../models/productModel.js";

// functions
async function mainControllerInit () {
    console.log('mainControllerInit');
    mainViewInit();
    mainModelInit();
    await productModelInit()
    const products = getProducts();
    console.log("products mainController:", products[0]);
    renderProduct(products[0]);
}

// handlers


// exports
export { mainControllerInit };