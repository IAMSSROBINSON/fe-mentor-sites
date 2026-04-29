
function Option (optionTextValue, index) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

    const li = document.createElement('li');
    li.classList.add('option-item');
    

    const button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.classList.add('option-button');
    button.value = `${optionTextValue}`;
    button.textContent = `${optionTextValue}`;

    const optionAvatarContainer = document.createElement('div');
    optionAvatarContainer.classList.add('option-avatar-container');

    const optionAvatarText = document.createElement('p');
    optionAvatarText.textContent = `${alphabet[index].toUpperCase()}`;

    const optionText = document.createElement('p');
    optionText.textContent = `${optionTextValue}`;


    optionAvatarContainer.appendChild(optionAvatarText);
    button.appendChild(optionAvatarContainer);
    button.appendChild(optionText);
    li.appendChild(button);

   return li;
}

export default Option;