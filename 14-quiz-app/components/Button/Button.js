function Button(text = "Submit Answer") {
  const li = document.createElement("li");
  li.classList.add("option-item", `${text.split(" ").join("-").toLowerCase()}`);

  const button = document.createElement("button");
  button.classList.add("option-button");

  const optionText = document.createElement("p");
  optionText.textContent = text;
  optionText.classList.add("option-text");
  
  button.appendChild(optionText);
  li.appendChild(button);

  return li;
}

export default Button;
