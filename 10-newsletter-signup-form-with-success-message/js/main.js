// Elements
const form = document.getElementById("card-form");
const submitBtn = document.getElementById("submit-btn");
const emailInput = document.getElementById("email");

// Validation functions
function required(string) {
  if (string.trim() === "") {
    return "This field is required";
  }
  return null;
}

function emailFormat(string) {
  if (!string.includes("@") || !string.includes(".")) {
    return "Valid email required";
  }
  return null;
}

// Input fields with associated validation functions
const fields = {
  email: [required, emailFormat],
};

// Validate input field value against validation functions
function validateFields(value, arrayOfValidationFunctions) {
  for (const func of arrayOfValidationFunctions) {
    const result = func(value);

    if (result !== null) {
      return result;
    }
  }
  return null;
}

function validateForm(formDataObj) {
  const errorsObj = {};

  for (const key in formDataObj) {
    errorsObj[key] = validateFields(formDataObj[key], fields[key]);
  }
  return errorsObj;
}

// Events
form.addEventListener("submit", handleSubmit);
function handleSubmit(e) {
  e.preventDefault();

  const formDataObj = objFromForm(form);
  const formValidationErrorsObj = validateForm(formDataObj);
  const formValidationErrorsObjValues = Object.values(formValidationErrorsObj);

  if (formValidationErrorsObjValues.some((value) => value !== null)) {
    return;
  }

  if (formDataObj["email"]) {
    window.location.href = `formSuccess.html?email=${encodeURIComponent(formDataObj["email"])}`;
    return form.reset();
  }
  return;
}

emailInput.addEventListener("blur", handleBlur);
function handleBlur(e) {

  // get form data obj
  const formDataObj = objFromForm(form);

  // Form values validated, returned obj {key: value string if invalid or null if valid}
  const formValidationErrorsObj = validateForm(formDataObj);

  for (const key in formValidationErrorsObj) {
    const domErrorElement = document.getElementById(
      `${key}-error-message-element`,
    );

    if (formValidationErrorsObj[key] !== null) {
      domErrorElement.textContent = formValidationErrorsObj[key];
      emailInput.style.border = "1px solid var(--clr-red)";
      emailInput.style.backgroundColor = "var(--clr-red-100)";
      emailInput.style.color = "var(--clr-red)";
    } else {
      domErrorElement.textContent = "";
      emailInput.style.border = "1px solid var(--clr-grey)";
      emailInput.style.backgroundColor = " var(--clr-white)";
      emailInput.style.color = " var(--clr-blue-800)";
    }
  }
}

// helper functions
function objFromForm(formElement) {
  const formData = new FormData(formElement);
  return Object.fromEntries(formData);
}
