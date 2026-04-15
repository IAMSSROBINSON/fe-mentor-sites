// imports
import Switch from "../components/Switch/Switch.js";

// elements
const wrapper = document.getElementById('wrapper');
const header = document.getElementById('header');



// functions
function mainViewInit() {
    console.log("mainViewInit");
    // console.log(Switch())'
    renderSwitch();
}

function renderSwitch () {
    console.log("render switch");
    header.appendChild(Switch());
}

export { mainViewInit };