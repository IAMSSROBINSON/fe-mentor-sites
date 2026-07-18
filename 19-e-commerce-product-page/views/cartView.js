function getQuantity () {
    const quantity = parseInt(document.querySelector(".product-quantity").textContent);
    return quantity;
}

function renderQuantity (value) {
    const quantityElement = document.querySelector(".product-quantity");
    quantityElement.textContent = value;
}

export { getQuantity, renderQuantity };