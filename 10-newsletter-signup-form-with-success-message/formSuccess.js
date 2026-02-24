const params = new URLSearchParams(window.location.search);
const emailValue = params.get('email');
console.log("Params: ", params);
console.log("Params: ", params.get('email'));

const insertEmail = document.querySelector('.insert-email');
insertEmail.textContent = emailValue;