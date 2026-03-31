// imports

// elements
const generatedPasswordElement = document.getElementById("generated-password");

function mainViewInit() {
    console.log("mainViewInit :");
}   

function clearPassword () {
    generatedPasswordElement.value = "";
    console.log("clearPassword : ", generatedPasswordElement.textContent);

}

function updateGeneratedPassword(value) {
    console.log("updateGeneratedPassword : ", value);
    generatedPasswordElement.value = value;
}

export { mainViewInit, clearPassword, updateGeneratedPassword };