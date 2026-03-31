// imports

// elements
const generatedPasswordElement = document.getElementById("generated-password");
const copyButton = document.getElementById("copy-btn");
const copiedText = document.getElementById("copied-text");

// events
copyButton.addEventListener("click", handleCopy);

// functions
function mainViewInit() {
    console.log("mainViewInit :");
}  

function handleCopy (e) {
    console.log("handleCopy clicked");
    const passwordValue = generatedPasswordElement.value;
    if (passwordValue.trim() === "") {
        return;
    }
    navigator.clipboard.writeText(passwordValue);
    displayCopied();
}

function displayCopied () {
    copiedText.textContent = "Copied";
    setTimeout( () => {
        copiedText.textContent = "";
    }, 2000);
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