// imports
import { user1 } from "../models/mainModel.js";
import {
  getProductById,
} from "../models/productModel.js";
import {
  getQuantity,
  renderQuantity,
  renderCartNumber,
  renderResetQuantity,
  renderCloseCartMenu,
  addStyleToCartNumberDisplayContainer,
  clearCartList,
  removeEmptyCartMessage,
  toggleCartMenuContainer,
  renderCartListItems,
  removeDeletedProductFromCart,
  hideCheckout,
  showCheckout,
  showEmptyCartMessage,
  updateCartNumber,
  showCartNumber,
  focusOnCartButton,
} from "../views/cartView.js";

// functions
function cartControllerInit() {
  attachCartEvents();
}

function attachCartEvents() {
  const productQuantityContainer = document.querySelector(
    ".product-quantity-container",
  );
  productQuantityContainer.addEventListener("click", (e) => {
    handleProductQuantityContainer(e);
  });

  const addToCartButton = document.querySelector(".add-to-cart-button");
  addToCartButton.addEventListener("click", handleAddToCartClick);

  const cartIconContainer = document.querySelector(".cart-icon-container");
  cartIconContainer.addEventListener("click", handleCartClick);

  const cartList = document.querySelector(".cart-list");
  cartList.addEventListener("click", handleProductDelete);

  document.addEventListener("keydown", handleCartEscapeClick);
}

function handleCartEscapeClick(e) {
  const cartIconButton = document.querySelector(".cart-icon-button");

  const key = e.key;
  if (key === "Escape" && cartIconButton.ariaExpanded === "true") {
    toggleCartMenuContainer();
    focusOnCartButton();
  }
}

function handleProductDelete(e) {
  const targetButton = e.target.closest(".cart-delete-button");
  if (!targetButton) return;

  e.stopPropagation();

  const cartItem = e.target.closest("li");
  const cartItemId = cartItem?.dataset.cartItemId;
  const deletedProduct = user1.deleteProductById(cartItemId);

  if (deletedProduct) {
    removeDeletedProductFromCart(cartItem);
    user1.cart.items.length === 0
      ? removeEmptyCartMessage()
      : showCartNumber(user1.cart.items.length);
    user1.cart.items.length === 0 ? hideCheckout() : showCheckout();
    user1.cart.items.length === 0
      ? showEmptyCartMessage()
      : removeEmptyCartMessage();
    updateCartNumber(user1.cart.items.length);
    focusOnCartButton();
  }
}

function handleAddToCartClick(e) {
  const quantity = getQuantity();
  const addToCartButton = e.target.closest("button");
  const productId = addToCartButton.dataset.productId;

  if (quantity !== 0) {
    addProductIdToUserCart(productId, quantity);
    renderResetQuantity();
    disableDecreaseQuantityButton();
    renderCloseCartMenu();
    addStyleToCartNumberDisplayContainer();
  }
  return;
}

function addProductIdToUserCart(productId, quantity = 0) {
  const cartAnnouncement = document.querySelector("#cart-announcement");
  user1.addItem(productId, quantity);

  const cartLength = user1.cart.items.length;
  if (cartLength > 0) {
    const totalItemsInCart = user1.cart.items.reduce((acc, item) => {
      const count = acc + item.quantity;

      return count;
    }, 0);

    renderCartNumber(totalItemsInCart);
    const isSingleItem = quantity == 1 ? "" : "s";
    const isTotalItems = totalItemsInCart == 1 ? "" : "s";
    cartAnnouncement.textContent = `You added ${quantity} item${isSingleItem} to your cart. Your cart now has ${totalItemsInCart} item${isTotalItems}.`;
  }
}

function handleProductQuantityContainer(e) {
  const target = e.target.closest("button");
  if (target && target.classList?.contains("product-minus")) {
    decreaseQuantity();
  } else if (target && target.classList?.contains("product-plus")) {
    increaseQuantity();
  }
}

function decreaseQuantity() {
  const quantity = getQuantity();

  const newQuantity = quantity - 1;
  if (newQuantity === 1) {
    renderQuantity(newQuantity);
    disableDecreaseQuantityButton();
    return;
  }
  if (newQuantity > 0) {
    renderQuantity(newQuantity);
  }
  return;
}

function enableDecreaseQuantityButton() {
  const minusButton = document.querySelector(".product-minus");
  minusButton.disabled = false;
}

function disableDecreaseQuantityButton() {
  const minusButton = document.querySelector(".product-minus");
  minusButton.disabled = true;
}

function increaseQuantity() {
  const quantity = getQuantity();
  const newQuantity = quantity + 1;

  if (newQuantity <= 5) {
    renderQuantity(newQuantity);
    enableDecreaseQuantityButton();
  }
  return;
}

function handleCartClick(e) {
  const target = e.target;
  const targetButton = e.target.closest("button");

  if (
    target.classList?.contains("cart-number-display-container") ||
    targetButton.classList?.contains("cart-icon-button") ||
    targetButton.classList?.contains("cart-icon") ||
    targetButton.classList?.contains("cart-number-display-container")
  ) {
    const cartItems = user1.getCartItems();
    toggleCartMenuContainer();

    if (cartItems.length === 0) {
      showEmptyCartMessage();
      hideCheckout();
    } else {
      clearCartList();
      removeEmptyCartMessage();

      cartItems.forEach((itemObj) => {
        const { productId, quantity } = itemObj;
        const product = getProductById(productId);
        if (!product) return;

        renderCartListItems(product, quantity);
      });
      showCheckout();
    }
  } else return;
}

export { cartControllerInit };
