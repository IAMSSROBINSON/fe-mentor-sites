function Logo (title) {

    const iconSrc = `../assets/images/icon-${title.toLowerCase() === 'javascript' ? 'js' : title.toLowerCase()}.svg`;

    const li = document.createElement('li');
    li.classList.add('list-item');
    li.dataset.title = "title";

    const iconContainer = document.createElement('div');
    iconContainer.classList.add(`${title.toLowerCase()}`, 'icon-container');

    const icon = document.createElement('img');
    icon.classList.add('list-item-icon');
    icon.setAttribute('alt', `${title} icon`);
    icon.src = iconSrc;

    const heading = document.createElement('p');
    heading.textContent = `${title}`;
    heading.classList.add('list-item-heading');

    iconContainer.appendChild(icon);
    iconContainer.appendChild(heading);
    li.appendChild(iconContainer);
    
    return li;
}

export default Logo;