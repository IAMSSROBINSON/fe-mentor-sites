// imports

// elements
const generatedPasswordElement = document.getElementById("generated-password");
const copyButton = document.getElementById("copy-btn");

// events
copyButton.addEventListener("click", handleCopy);

// functions
function mainViewInit() {
    console.log("mainViewInit :");
}  

function handleCopy (e) {
    console.log("handleCopy clicked");
    navigator.clipboard.writeText(generatedPasswordElement.value);
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