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


// exports
export { mainViewInit, renderProduct, renderProfile };