// imports

// elements
const generatedPasswordElement = document.getElementById("generated-password");
const copyButton = document.getElementById("copy-btn");
const copiedText = document.getElementById("copied-text");
const strengthWarning = document.getElementById(
  "password-strength-warning-text",
);

// events
copyButton.addEventListener("click", handleCopy);

// functions
function handleCopy(e) {
  const passwordValue = generatedPasswordElement.value;
  if (passwordValue.trim() === "") {
    return;
  }
  navigator.clipboard.writeText(passwordValue);
  displayCopied();
}

function displayCopied() {
  copiedText.textContent = "Copied";
  setTimeout(() => {
    copiedText.textContent = "";
  }, 2000);
}

function clearPassword() {
  generatedPasswordElement.value = "";
}

function updateGeneratedPassword(value) {
  generatedPasswordElement.value = value;
}

function displayStrengthThresholdString(string) {
  strengthWarning.textContent =
    string === "too weak" ? string.toUpperCase() + "!" : string.toUpperCase();
}

function fillPasswordStrengthBoxes(string) {
  const strengthBoxes = Array.from(
    document.querySelectorAll(".password-strength-box"),
  );

  // reset all background colors to initial
  strengthBoxes.forEach((box) => {
    box.style.backgroundColor = "initial";
    box.style.border = "1px solid #E6E5EA";
  });

  const firstBox = strengthBoxes[0];
  const firstTwoBoxes = strengthBoxes.slice(0, 2);
  const firstThreeBoxes = strengthBoxes.slice(0, 3);
  const firstFourBoxes = strengthBoxes;

  switch (string) {
    case "too weak":
      firstBox.style.backgroundColor = "#F64A4A";
      firstBox.style.border = "none";
      break;

    case "weak":
      firstTwoBoxes.forEach((box) => {
        box.style.backgroundColor = "#FB7C58";
        box.style.border = "none";
      });
      break;

    case "medium":
      firstThreeBoxes.forEach((box) => {
        box.style.backgroundColor = "#F8CD65";
        box.style.border = "none";
      });
      break;

    case "strong":
      firstFourBoxes.forEach((box) => {
        box.style.backgroundColor = "#A4FFAF";
        box.style.border = "none";
      });
      break;
  }
  return;
}

export {
  clearPassword,
  updateGeneratedPassword,
  displayStrengthThresholdString,
  fillPasswordStrengthBoxes,
};
