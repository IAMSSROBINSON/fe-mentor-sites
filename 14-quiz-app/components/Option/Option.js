function Option(optionTextValue, index) {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g"];

  const li = document.createElement("li");
  li.classList.add("option-item", "option");
  li.dataset.option = optionTextValue.split(" ").join("-").toLowerCase();

  const button = document.createElement("button");
  button.classList.add("option-button");
  button.value = `${optionTextValue}`;

  const optionAvatarContainer = document.createElement("span");
  optionAvatarContainer.classList.add("option-avatar-container");

  const optionAvatarText = document.createElement("p");
  optionAvatarText.textContent = `${alphabet[index].toUpperCase()}`;
  optionAvatarText.classList.add("option-avatar-text");

  const optionText = document.createElement("p");
  optionText.textContent = `${optionTextValue}`;
  optionText.classList.add("option-text");

  optionAvatarContainer.appendChild(optionAvatarText);
  button.appendChild(optionAvatarContainer);
  button.appendChild(optionText);
  li.appendChild(button);

  return li;
}

export default Option;
