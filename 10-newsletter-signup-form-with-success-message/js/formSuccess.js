// get ?key=value query string from url
const params = new URLSearchParams(window.location.search);

// get the value specifically for email key
const emailValue = params.get("email");

const dismissBtn = document.querySelector(".submit-btn");

// inject email value into page text
const insertEmail = document.querySelector(".insert-email");
insertEmail.textContent = emailValue;

// link back to index.html on dismiss click
dismissBtn.addEventListener("click", handleDismiss);
function handleDismiss(e) {
  window.location.href = "index.html";
}
