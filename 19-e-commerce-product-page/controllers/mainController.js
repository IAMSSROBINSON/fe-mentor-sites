// imports
    import { mainModelInit, user1, User } from "../models/mainModel.js";
    import { cartControllerInit } from "./cartController.js";
    import { productModelInit, getProducts } from "../models/productModel.js";
    import { galleryControllerInit } from "./galleryController.js";
    import { menuControllerInit } from "./menuController.js";
    import { modalControllerInit } from "./modalController.js";
    import { mainViewInit, renderProfile, injectGallery } from "../views/mainView.js";
    import createGallery from "../components/GalleryComponent.js";



    //  functions
    async function mainControllerInit () {
        console.log("mainControllerInit:");
        menuControllerInit();
        renderProfile(user1)

        const loader = document.getElementById("loader");

        const gallery = createGallery();
        console.log("GALLERY:", gallery);
        injectGallery(gallery);


        try {
            // load products on backend
            await productModelInit();
            const products = getProducts();
            console.log(products);

            if (products.length > 0) {
                const product = products[0];
                galleryControllerInit(gallery, product);
                cartControllerInit();
                modalControllerInit();
                loader.classList.add("hide");
            }
        }
        catch(err) {
            console.log("mainController Error:", err);
            loader.classList.remove("hide");

        }
    }


    // exports
    export {  mainControllerInit };

    