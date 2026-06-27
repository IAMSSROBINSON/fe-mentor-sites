// imports

// functions
function mainViewInit () {
    console.log('mainViewInit');
}

function renderProduct ({data, message}) {
    if (message === "success") {
        console.log("renderProduct gotData:", data);
        const galleryImageContainer = document.querySelector(".gallery-image-container");
        const img = document.createElement('img');
        img.src = data.images[0];
        img.classList.add("product-image");
        img.alt = "Hero image of white sneakers";
        galleryImageContainer.appendChild(img);

    } else {
        console.log("renderProduct noData:", message);
    }
}

function renderProfile (user) {
    const avatarContainer = document.getElementById('avatar-container');

    const img = document.createElement('img');
    img.classList.add('avatar-image');
    img.src = user?.profileSrc ? user?.profileSrc : "./assets/icons/avatar-placeholder.svg";
    img.alt = "Profile image";
    avatarContainer.appendChild(img);
}

// handlers
function handleMenuIconClick(e) {
    console.log("menu icon clicked");
    const body = document.querySelector('body');
    body.classList.add('no-scroll');
    toggleBlurWrapper();
    toggleMenuContainer();
   
    const closeMenuIcon = document.getElementById('close-menu-icon');
    closeMenuIcon.addEventListener("click", handleCloseMenu);
}

function handleCloseMenu (e) {
    toggleMenuContainer()
    toggleBlurWrapper();
}

function toggleBlurWrapper () {
    const blurWrapper = document.getElementById('blur-wrapper');
    blurWrapper.classList.toggle('show');
}


function toggleMenuContainer () {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.classList.toggle('show');
    console.log("menuContainer:", menuContainer);
}

function handleMenuContainerClick (e) {
    

    const link = e.target.closest("li");
    if (link) {
        const links = Array.from(document.querySelectorAll('.menu-link-item'));
        links.forEach((el) => el.classList.remove("link-underline"));
        console.log("handleMenuContainerClick", e.target);
        link.classList.add("link-underline");
    }
   
}

function handleCartIconClick (state = "empty") {
    
    const cartMenuContainer = document.querySelector(".cart-menu-container");
    cartMenuContainer.classList.toggle('hide');

    const emptyCartMessage = document.getElementById("cart-empty-message");
    if (state === "empty") {
        emptyCartMessage.textContent = "Your cart is empty to."
    }

}

function handlePrevious (newPathname) {
    const productImage = document.querySelector(".product-image");
    productImage.src = newPathname;
}

// exports
export { mainViewInit, renderProduct, renderProfile, handleMenuIconClick, handleMenuContainerClick, handleCartIconClick, handlePrevious };