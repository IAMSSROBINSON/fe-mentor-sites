// imports

const products = [];

// functions
async function productModelInit () {
    console.log("productModelInit");
    await fetchProductData();
}

async function fetchProductData () {
    const response = await fetch('/database/db.json');
    const data = await response.json();
    setProductsData(data);
}

function setProductsData(data) {
    products.push(data);
    console.log("products:", products);
}

function getProducts () {
    return products;
}




// handlers

// exports
export { productModelInit, getProducts };