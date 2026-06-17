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
    const img = document.createElement('img');
    img.src = user.profileSrc;
    const body = document.querySelector('body');
    body.appendChild(img);
}
// handlers


// exports
export { mainViewInit, renderProduct, renderProfile };