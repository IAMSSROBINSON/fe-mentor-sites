function Input (name) {
    return `
        <div class='input-group-container'>
            <label for=${name} class=${name}-label>${name}</label>
            <div class='input-container'>
                <span class=${name}-icon></span>
                <input type='number' name=${name} id=${name} placeholder='0' />
            </div>
        </div>
    `;
}

export default Input;