function Error () {
    const container = document.createElement('div');
    container.classList.add('error-container');

    const icon = document.createElement('img');
    icon.src = '/assets/images/icon-error.svg';
    icon.setAttribute('alt', 'error icon');
    icon.classList.add('error-icon');

    const p = document.createElement('p');
    p.textContent = "Please select an answer";
    p.classList.add('error-text');

    container.appendChild(icon);
    container.appendChild(p);

    return container;
}
export default Error;