// imports
import { user1, User } from "../models/mainModel.js";
import { cartControllerInit } from "./cartController.js";
import { productModelInit, getProducts } from "../models/productModel.js";
import { galleryControllerInit } from "./galleryController.js";
import { menuControllerInit } from "./menuController.js";
import { modalControllerInit } from "./modalController.js";
import {
  renderProfile,
  injectGallery,
} from "../views/mainView.js";
import createGallery from "../components/GalleryComponent.js";

// elements
const skipLink = document.querySelector("#skip-link");
const mainContent = document.querySelector("#main-content");
skipLink.addEventListener("click", handleSkipLinkClick);

//  functions
function handleSkipLinkClick(e) {
  e.preventDefault;
  mainContent.focus();
}

async function mainControllerInit() {
  menuControllerInit();
  renderProfile(user1);

  const loader = document.getElementById("loader");
  const gallery = createGallery({ isModal: false });
  injectGallery(gallery);

  try {
    await productModelInit();
    const products = getProducts();

    if (products.length > 0) {
      const product = products[0];
      galleryControllerInit(gallery, product);
      cartControllerInit();
      modalControllerInit(product);
      loader.classList.add("hide");
    }
  } catch (err) {
    loader.classList.remove("hide");
  }
}

// exports
export { mainControllerInit };
