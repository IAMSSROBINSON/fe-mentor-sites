// User class
class User {
  cart = {
    id: "c0001",
    items: [],
  };

  constructor(profileSrc) {
    this.profileSrc = profileSrc;
  }

  getProfileSrc() {
    return this.profileSrc;
  }

  setProfileSrc(path) {
    this.profileSrc = path;
  }

  addItem(productId, quantity = 0) {
    const presentProduct = this.cart.items.filter(
      (productObj) => productObj.productId === productId,
    );
    if (presentProduct.length !== 0) {
      presentProduct[0].quantity += quantity;
    } else {
      this.cart.items.push({ productId: productId, quantity: quantity });
    }
  }

  clearCart() {
    this.cart.items = [];
  }

  getCartItems() {
    return this.cart.items;
  }

  deleteProductById(id) {
    const productIdMatch = this.cart.items.filter(
      (product) => product.productId === id,
    );
    if (productIdMatch.length !== 0) {
      const productToDelete = productIdMatch[0];
      const productToDeleteIndex = this.cart.items.indexOf(productToDelete);
      if (productToDeleteIndex !== -1) {
        const deletedProduct = this.cart.items.splice(productToDeleteIndex, 1);
        return deletedProduct[0];
      }
    } else return null;
  }
}

const user1 = new User("./assets/images/image-avatar.png");

// exports
export { user1, User };
