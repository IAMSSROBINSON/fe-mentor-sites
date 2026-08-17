// functions
function getQuantity() {
  const quantity = parseInt(
    document.querySelector(".product-quantity").textContent,
  );
  return quantity;
}

function renderQuantity(value) {
  const quantityElement = document.querySelector(".product-quantity");
  quantityElement.textContent = value;
}

function renderCartNumber(itemsInCart) {
  const cartNumberElement = document.querySelector(
    ".cart-number-display-container",
  );
  cartNumberElement.style.display = "flex";
  cartNumberElement.textContent = itemsInCart;
}

function renderResetQuantity() {
  const quantity = document.querySelector(".product-quantity");
  quantity.textContent = 1;
}

function renderCloseCartMenu() {
  const cartMenuContainer = document.querySelector(".cart-menu-container");
  cartMenuContainer.classList.add("hide");
}

function addStyleToCartNumberDisplayContainer() {
  getCartNumberContainer().style.backgroundColor = "#FF7E1B";
}

function getCartNumberContainer() {
  return document.querySelector(".cart-number-display-container");
}

function clearCartList() {
  const cartList = document.querySelector(".cart-list");
  cartList.innerHTML = "";
}

function removeEmptyCartMessage() {
  const emptyCartMessage = getEmptyCartMessageElement();
  emptyCartMessage.textContent = "";
}

function toggleCartMenuContainer() {
  getCartMenuContainer().classList.toggle("hide");
  toggleAriaExpanded();
}

function toggleAriaExpanded() {
  const cartButton = document.querySelector(".cart-icon-button");
  const isExpanded = cartButton.getAttribute("aria-expanded");

  if (isExpanded === "false") {
    cartButton.setAttribute("aria-expanded", "true");
  } else {
    cartButton.setAttribute("aria-expanded", "false");
  }
}

function getCartMenuContainer() {
  return document.querySelector(".cart-menu-container");
}

function getEmptyCartMessageElement() {
  return document.querySelector(".cart-empty-message");
}

function renderCartListItems(product, quantity) {
  const cartList = document.querySelector(".cart-list");
  cartList.classList.add("show");

  const li = document.createElement("li");
  li.classList.add("cart-list-item");
  li.dataset.cartItemId = product.id;

  const img = document.createElement("img");
  img.src = product.thumbnails[0];
  img.classList.add("cart-image");
  img.setAttribute("alt", "");

  const cartItemMiddleContainer = document.createElement("div");
  cartItemMiddleContainer.classList.add("cart-item-middle-container");

  const name = document.createElement("p");
  name.textContent = product.name;
  name.classList.add("cart-name");

  const cartItemMiddleBottomContainer = document.createElement("div");
  cartItemMiddleBottomContainer.classList.add(
    "cart-item-middle-bottom-container",
  );

  const priceQuantity = document.createElement("p");
  const discountedPrice = product.isDiscounted
    ? ((product.price * product.discountPercentage) / 100).toFixed(2)
    : product.price.toFixed(2);
  priceQuantity.classList.add("cart-price");

  const priceQuantityString = `$${discountedPrice} x ${quantity}`;
  priceQuantity.textContent = priceQuantityString;

  const totalPrice = document.createElement("p");
  totalPrice.classList.add("cart-total-price");
  const priceAmount = `$${(discountedPrice * quantity).toFixed(2)}`;
  totalPrice.textContent = priceAmount;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("cart-delete-button");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/icons/icon-delete.svg";
  deleteIcon.classList.add("cart-delete-icon");
  deleteButton.setAttribute("aria-label", `Delete ${product.name} from cart`);
  deleteButton.append(deleteIcon);
  deleteButton.setAttribute(
    "aria-describedby",
    `product-purchase-described-${product.id}`,
  );

  const describedByElement = document.createElement("p");
  describedByElement.textContent = `${discountedPrice} dollars each, quantity ${quantity}, total ${priceAmount}`;
  describedByElement.classList.add("visually-hidden");
  describedByElement.setAttribute(
    "id",
    `product-purchase-described-${product.id}`,
  );

  li.appendChild(img);
  li.appendChild(describedByElement);
  cartItemMiddleContainer.appendChild(name);
  cartItemMiddleBottomContainer.append(priceQuantity);
  cartItemMiddleBottomContainer.appendChild(totalPrice);
  cartItemMiddleContainer.appendChild(cartItemMiddleBottomContainer);
  li.appendChild(cartItemMiddleContainer);
  li.appendChild(deleteButton);

  cartList.appendChild(li);
}

function removeDeletedProductFromCart(element) {
  element.remove();
}

function focusOnCartButton() {
  const cartIconButton = document.querySelector(".cart-icon-button");
  cartIconButton.focus();
}

function hideCheckout() {
  const checkoutButton = document.getElementById("checkout");
  checkout.classList.remove("show");
  checkout.classList.add("hide");
}

function showCheckout() {
  const checkoutButton = document.getElementById("checkout");
  checkout.classList.remove("hide");
  checkout.classList.add("show");
}

function showEmptyCartMessage() {
  const emptyCartMessage = getEmptyCartMessageElement();
  emptyCartMessage.textContent = "Your cart is empty.";
}

function updateCartNumber(number = 0) {
  const cartNumberContainer = getCartNumberContainer();
  if (number !== 0) {
    showCartNumber();
    cartNumberContainer.textContent = number;
    return;
  }
  cartNumberContainer.textContent = number;
  removeCartNumber();
}

function removeCartNumber() {
  const cartNumberContainer = getCartNumberContainer();
  cartNumberContainer.textContent = "";
  cartNumberContainer.classList.remove("show");
  cartNumberContainer.classList.add("hide");
  cartNumberContainer.style.backgroundColor = "transparent";
}

function showCartNumber(numberOfItems = 0) {
  const cartNumberContainer = getCartNumberContainer();
  cartNumberContainer.classList.remove("hide");
  cartNumberContainer.classList.add("show");
  cartNumberContainer.textContent = numberOfItems;
}

export {
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
};
