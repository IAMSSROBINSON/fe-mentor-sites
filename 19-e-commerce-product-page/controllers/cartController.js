// imports
import { user1 } from "../models/mainModel.js";
import { productModelInit, getProducts, getProductById } from "../models/productModel.js";
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
  hideCheckout, showCheckout,
  showEmptyCartMessage,
  updateCartNumber,
  showCartNumber
 } from "../views/cartView.js";

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

    const addToCartButton = document.querySelector(".add-to-cart-button");
  addToCartButton.addEventListener("click", handleAddToCartClick);

    const cartIconContainer = document.querySelector(".cart-icon-container");
  cartIconContainer.addEventListener("click", handleCartClick);

  const cartList = document.querySelector(".cart-list");
  cartList.addEventListener("click", handleProductDelete);

  document.addEventListener("keydown", handleCartEscapeClick);
}

function handleCartEscapeClick (e) {
  const cartIconButton = document.querySelector(".cart-icon-button");

  const key = e.key;
  if (key === "Escape" && cartIconButton.ariaExpanded === "true") {
    console.log("Escape clicked");
    toggleCartMenuContainer();
    cartIconButton.focus();
  }
}

function handleProductDelete(e) {
  const targetButton = e.target.closest(".cart-delete-button");
  if (!targetButton) return;

  console.log("deleteButtonClicked handleProductDelete:");
  e.stopPropagation();

  const cartItem = e.target.closest("li");
  const cartItemId = cartItem?.dataset.cartItemId;
  console.log("target:", cartItem);
  console.log("cartItemId:", cartItemId);
  const deletedProduct = user1.deleteProductById(cartItemId);
  console.log("handleProductDelete deletedProduct:", deletedProduct);
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
  }
}


function handleAddToCartClick(e) {

  console.log("handleAddToCartClick");
  // get the quantity
  const quantity = getQuantity();
  const addToCartButton = e.target.closest("button");
  const productId = addToCartButton.dataset.productId;

  console.log("quantity:", quantity);
  console.log("BUTTON:", addToCartButton);
  console.log("button:", productId);
  if (quantity !== 0) {
    addProductIdToUserCart(productId, quantity);
    renderResetQuantity();
    renderCloseCartMenu();
    addStyleToCartNumberDisplayContainer();
  }
  return;
}

function addProductIdToUserCart(productId, quantity = 0) {
  const cartAnnouncement = document.querySelector("#cart-announcement");

  console.log("user1:", user1);
  console.log("user1:", user1.cart.items);
  user1.addItem(productId, quantity);
  const cartLength = user1.cart.items.length;
  if (cartLength > 0) {
    const totalItemsInCart = user1.cart.items.reduce((acc, item) => {
      const count = acc + item.quantity;

      return count;
    }, 0);
    console.log("cartLength:", totalItemsInCart);
    renderCartNumber(totalItemsInCart);
    const isSingleItem = quantity == 1 ? "" : "s";
    const isTotalItems = totalItemsInCart == 1 ? "" : "s";
    cartAnnouncement.textContent = `You added ${quantity} item${isSingleItem} to your cart. Your cart now has ${totalItemsInCart} item${isTotalItems}.`;
  }

  
}

function handleProductQuantityContainer(e) {
  console.log("productQuantityContainer clicked:");
  const target = e.target.closest("button");
  if (target && target.classList?.contains("product-minus")) {
    console.log("minusButtonClicked");
    decreaseQuantity();
  } else if (target && target.classList?.contains("product-plus")) {
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

function handleCartClick(e) {
  const target = e.target;
  const targetButton = e.target.closest("button");
  console.log("TARGET:", target);

  if (
    target.classList?.contains("cart-number-display-container") ||
    targetButton.classList?.contains("cart-icon-button") ||
    targetButton.classList?.contains("cart-icon") ||
    targetButton.classList?.contains("cart-number-display-container")
  ) {
    const cartItems = user1.getCartItems();
    console.log("handleCartClick cartItems:", cartItems);

    toggleCartMenuContainer();

    console.log("TARGET:", e.target);

    if (cartItems.length === 0) {
      showEmptyCartMessage();
      hideCheckout();
    } else {
      clearCartList();
      removeEmptyCartMessage();

      cartItems.forEach((itemObj) => {
        const { productId, quantity } = itemObj;
        console.log("productId: ", productId, "\n", "quantity :", quantity);

        const product = getProductById(productId);
        if (!product) return;

        renderCartListItems(product, quantity);
      });
      showCheckout();
    }
  } else return;
}



export { cartControllerInit };
