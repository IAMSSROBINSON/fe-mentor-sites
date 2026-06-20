// imports

// functions
function mainViewInit () {
    console.log('mainViewInit');
}

function renderProduct ({data, message}) {
    if (data) {
        console.log("renderProduct gotData:", data);
    } else {
        console.log("renderProduct noData:", message);
    }
}

function renderProfile (user) {
    const avatarContainer = document.getElementById('avatar-container');

    const img = document.createElement('img');
    img.classList.add('avatar-image');
    img.src = user?.profileSrc ? user?.profileSrc : "./assets/icons/avatar-placeholder.svg";
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




// exports
export { mainViewInit, renderProduct, renderProfile, handleMenuIconClick };