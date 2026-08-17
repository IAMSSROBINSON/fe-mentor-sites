// state
const products = [];

// functions
async function productModelInit() {
  await fetchProductData();
}

async function fetchProductData() {
  const response = await fetch("/database/db.json");
  const data = await response.json();
  setProductsData(data);
}

function setProductsData(data) {
  products.push(data);
}

function getProducts() {
  return products;
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

// exports
export { productModelInit, getProducts, getProductById };
