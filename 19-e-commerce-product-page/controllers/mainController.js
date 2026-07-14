// imports
import {
  mainViewInit,
  renderProfile,
  handleMenuIconClick,
  handleMenuContainerClick,
  renderSelectedThumbnailButton,
  increaseQuantity,
  decreaseQuantity,
  renderCartNumber,
  renderResetQuantity,
  renderCloseCartMenu,
  renderCartProduct,
  removeDeletedProductFromCart,
  hideCheckout,
  showCheckout,
  showEmptyCartMessage,
  removeEmptyCartMessage,
  showCartNumber,
  removeCartNumber,
  renderCartListItems,
  clearCartList,
  showCartMenuContainer,
  hideCartMenuContainer,
  toggleCartMenuContainer,
  updateCartNumber,
  addStyleToCartNumberDisplayContainer,
  renderInformation
} from "../views/mainView.js";
import { mainModelInit, User } from "../models/mainModel.js";
import { productModelInit, getProducts } from "../models/productModel.js";
import { mainGalleryInit, renderMainGalleryImage, renderProduct } from "../views/galleryView.js";

document.documentElement.addEventListener("keydown", (e) => {
  if (e.key == "Tab") {
    console.log("Key:", e.key);
    console.log("Component:", e.target);
  }
});

const user1 = new User("./assets/images/image-avatar.png");
console.log("user1:", user1);
console.log("user1 cart.items:", user1.cart.items);


// functions
async function mainControllerInit() {
  console.log("mainControllerInit");
  mainGalleryInit();
  mainViewInit();
  renderProfile(user1);
  mainModelInit();
  try {
    await productModelInit();
    const products = getProducts();
    console.log("products mainController:", products[0]);

    if (products.length > 0) {
      renderProduct({ data: products[0]});
      renderInformation(products[0]);
    } else {
      // render default product in view or display error fetching data
    }
  } catch (err) {
    // renderProduct({data: null, message: "Could not fetch data. Try again later..."});
    // instead of doing conditional in view explicitly render error from here in controller
  }

  const menuIconContainer = document.querySelector(".menu-icon-container");
  menuIconContainer.addEventListener("click", handleMenuIconClick);

  const menuContainer = document.getElementById("menu-container");
  menuContainer.addEventListener("click", handleMenuContainerClick);

  const cartIconContainer = document.querySelector(".cart-icon-container");
  cartIconContainer.addEventListener("click", handleCartClick);

  const galleryMainImageContainer = document.querySelector(
    ".gallery-main-image-container",
  );
  galleryMainImageContainer.addEventListener("click", handleArrowClick);

  const addToCartButton = document.querySelector(".add-to-cart-button");
  addToCartButton.addEventListener("click", handleAddToCartClick);

  const productQuantityContainer = document.querySelector(
    ".product-quantity-container",
  );
  console.log("productQuantityContainer", productQuantityContainer);
  productQuantityContainer.addEventListener(
    "click",
    handleProductQuantityContainer,
  );
}

// handlers
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

function handleAddToCartClick(e) {
  console.log("handleAddToCartClick");
  // get the quantity
  const quantity = parseInt(
    document.querySelector(".product-quantity").textContent,
  );

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
  }
}

function handleCartClick() {
  const cartItems = user1.getCartItems();
  console.log("handleCartClick cartItems:", cartItems);
  toggleCartMenuContainer();
  if (cartItems.length === 0) {
    showEmptyCartMessage();
    hideCheckout();
  } else {
    clearCartList();
    removeEmptyCartMessage();

    cartItems.forEach((itemObj) => {
      const { productId, quantity } = itemObj;
      console.log("productId: ", productId, "\n", "quantity :", quantity);

      const product = getProducts().filter(
        (productObj) => productObj.id === productId,
      )[0];

      renderCartListItems(product, quantity);
    });
    showCheckout();
  }
}

function handleArrowClick(e) {
  const button = e.target.closest(".arrow-container");
  if (button) {
    const id = button.id;
    const pathname = new URL(document.querySelector(".product-image").src)
      .pathname;
    const allImages = getProducts()[0].images;
    const indexOfCurrentImage = allImages.indexOf(pathname);
    console.log("indexOfCurrentImage:", indexOfCurrentImage);
    if (id === "previous-arrow-container") {
      let newIndex = indexOfCurrentImage - 1;
      if (newIndex < 0) {
        newIndex = allImages.length - 1;
      }
      const newPathname = allImages[newIndex];
      const className = `product-${newIndex + 1}`;
      console.log("className: previous", className);
      renderMainGalleryImage(newPathname, className);
    } else {
      let newIndex = indexOfCurrentImage + 1;
      if (newIndex > allImages.length - 1) {
        newIndex = 0;
      }
      const className = `product-${newIndex + 1}`;
      console.log("className: next", className);
      const newPathname = allImages[newIndex];
      renderMainGalleryImage(newPathname, className);
    }
  }
}

function handleThumbnailClick(e) {
  console.log("handleThumbnailClick");
  const targetButton = e.target.closest("button");
  console.log(
    "handleThumbnailClick button:",
    targetButton.firstChild.classList[1],
  );
  const productClass = targetButton.firstChild.classList[1];
  const mainImageSrc = getProducts()[0].images.filter(
    (src) => src === `/assets/images/image-${productClass}.jpg`,
  )[0];
  console.log("mainImageSrc", mainImageSrc);

  const allThumbnailButtons = Array.from(
    document.querySelectorAll(".thumbnail-button"),
  );

  if (targetButton) {
    renderSelectedThumbnailButton(allThumbnailButtons, targetButton);
    renderMainGalleryImage(mainImageSrc);
  }
  return;
}

function handleProductDelete(e) {
  console.log("deleteButtonClicked handleProductDelete:");
  e.stopPropagation();

  const target = e.target.closest("li");
  const cartItemId = target?.dataset.cartItemId;
  console.log("target:", target);
  console.log("cartItemId:", cartItemId);
  const deletedProduct = user1.deleteProductById(cartItemId);
  console.log("handleProductDelete deletedProduct:", deletedProduct);
  if (deletedProduct) {
    removeDeletedProductFromCart(target);
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

function handleMainImageClick(e) {
  console.log("handleMainImageClicked");
}

function handleButtonRoving(e) {
  const target = e.target.closest("button");

  const allThumbnailButtons = Array.from(
    document.querySelectorAll(".thumbnail-button"),
  );

  const indexOfCurrentThumbnail = allThumbnailButtons.indexOf(target);

  if (indexOfCurrentThumbnail === -1) {
    console.log("cannot find current image in list");
    return;
  }

  let newIndex;
  const key = e.key;

  if (key !== "ArrowRight" && key !== "ArrowLeft") return;

  if (key === "ArrowRight") {
    console.log("ArrowRight clicked");

    newIndex = indexOfCurrentThumbnail + 1;
    if (newIndex > allThumbnailButtons.length - 1) {
      newIndex = 0;
    }
  } else if (key === "ArrowLeft") {
    console.log("ArrowLeft Clicked.");

    if (indexOfCurrentThumbnail - 1 < 0) {
      newIndex = allThumbnailButtons.length - 1;
    } else {
      newIndex = indexOfCurrentThumbnail - 1;
    }
  }

  const nextButton = allThumbnailButtons[newIndex];
  target.setAttribute("tabindex", "-1");
  nextButton.setAttribute("tabindex", "0");
  nextButton.focus();
  renderSelectedThumbnailButton(allThumbnailButtons, nextButton);
  renderMainImageFromArrowClick(nextButton);
}

function renderMainImageFromArrowClick(button) {
  const buttonId = button.id;

  const mainImageSrc = getProducts()[0].images.filter(
    (src) => src === `/assets/images/image-${buttonId}.jpg`,
  )[0];

  renderMainGalleryImage(mainImageSrc);
}

// exports
export {
  mainControllerInit,
  handleThumbnailClick,
  handleProductDelete,
  handleMainImageClick,
  handleButtonRoving,
};
