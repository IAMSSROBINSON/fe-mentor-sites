import { mainViewInit } from "./mainView.js";

// functions
function mainControllerInit () {
    console.log("mainControllerInit")
    mainViewInit();

    // get elements
    const form = document.getElementById("contact-us-form");
    console.log("form :", form);
    
    // event listeners
    form.addEventListener("blur", handleBlur, true);
    form.addEventListener("submit", handleSubmit, true);
}


// handlers
function handleBlur (e) {
    console.log("ThunderCats Are Go!");
    const target = e.target;
    if (target.id === 'submit-button') return;

    

}

function handleSubmit (e) {
    e.preventDefault();
}


export { mainControllerInit };