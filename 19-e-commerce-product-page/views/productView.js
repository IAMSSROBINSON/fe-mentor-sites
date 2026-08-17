function renderInformation(data) {
  if (data) {
    const brandName = document.querySelector(".product-label");
    brandName.textContent = data.brandName;

    const name = document.querySelector(".product-title");
    name.textContent = data.name;

    const description = document.querySelector(".product-description");
    description.textContent = data.description;

    const productPrice = document.querySelector(".product-price");
    const price = Boolean(data.isDiscounted)
      ? ((data.price * data.discountPercentage) / 100).toFixed(2)
      : data.price.toFixed(2);
    productPrice.textContent = `$${price}`;

    const productDiscount = document.querySelector(".product-discount");
    productDiscount.textContent = Boolean(data.isDiscounted)
      ? data.discountPercentage + "%"
      : "";

    const previousPrice = document.querySelector(".product-previous-price");
    previousPrice.textContent = `$${data.price.toFixed(2)}`;

    const addToCartButton = document.querySelector(".add-to-cart-button");
    addToCartButton.id = data.id;
    addToCartButton.dataset.productId = data.id;
  }
}

export { renderInformation };
