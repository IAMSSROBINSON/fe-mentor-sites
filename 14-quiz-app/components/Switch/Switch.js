const leftIconSrc = '/assets/images/icon-sun-dark.svg';
const rightIconSrc = '/assets/images/icon-moon-dark.svg';

function Switch () {

    // switch container
    const container = document.createElement('div');
    container.classList.add('switch-container');
    container.id = 'switch-container';

    // left icon
    const leftIcon = document.createElement('img');
    leftIcon.classList.add('left-icon');
    leftIcon.id = 'left-icon';
    leftIcon.src = leftIconSrc;

    // thumb container
    const thumbContainer = document.createElement('div');
    thumbContainer.classList.add('thumb-container');
    thumbContainer.id = 'thumb-container';

    // toggle thumb
    const switchThumb = document.createElement('div');
    switchThumb.classList.add('switch-thumb');
    switchThumb.id = 'switch-thumb';

    // right icon
    const rightIcon = document.createElement('img');
    rightIcon.classList.add('right-icon');
    rightIcon.id = 'right-icon';
    rightIcon.src = rightIconSrc;

    container.appendChild(leftIcon);
    thumbContainer.appendChild(switchThumb)
    container.appendChild(thumbContainer);
    container.appendChild(rightIcon);

    const p = document.createElement("p");

    console.log("Switch component");
    p.textContent = "Switch";

    return container
};

export default Switch;