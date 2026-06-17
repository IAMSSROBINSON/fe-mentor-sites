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
// handlers


// exports
export { mainViewInit, renderProduct };