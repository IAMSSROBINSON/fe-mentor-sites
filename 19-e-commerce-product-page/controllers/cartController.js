// imports

import { getQuantity, renderQuantity } from "../views/cartView.js";

// functions

function cartControllerInit() {
  console.log("cartControllerInit");

  attachCartEvents();
}

function attachCartEvents() {
  const productQuantityContainer = document.querySelector(
    ".product-quantity-container",
  );
  productQuantityContainer.addEventListener("click", (e) => {
    handleProductQuantityContainer(e);
  });
}

function handleProductQuantityContainer(e) {
  console.log("productQuantityContainer clicked:");
  const target = e.target.closest("button");
  if (target && target.classList?.contains("product-minus")) {
    console.log("minusButtonClicked");
    decreaseQuantity();
  } else {
    increaseQuantity();
    console.log("plusButtonClicked");
  }
}

function decreaseQuantity() {
  console.log("decreaseQuantity");
  const quantity = getQuantity();
  const newQuantity = quantity - 1;
  if (newQuantity > 0) {
    console.log("decreaseQuantity newQuantity", newQuantity);
    renderQuantity(newQuantity);
  }
  return;
}

function increaseQuantity() {
  console.log("increaseQuantity");

  const quantity = getQuantity();
  console.log("quantity quantity", quantity);
  const newQuantity = quantity + 1;
  if (newQuantity <= 5) {
    console.log("increaseQuantity newQuantity", newQuantity);
    renderQuantity(newQuantity);
  }
  return;
}

export { cartControllerInit };
