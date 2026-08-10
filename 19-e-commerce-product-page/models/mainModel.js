// imports

// state


// functions
function mainModelInit () {
    console.log('mainModelInit');
}

class User {
    
    cart = {
        id: "c0001",
        items: []
    }

    constructor (profileSrc) {
        this.profileSrc = profileSrc;
    }

    getProfileSrc () {
        return this.profileSrc;
    }

    setProfileSrc (path) {
        this.profileSrc = path;
    }

    addItem(productId, quantity = 0) {
        const presentProduct = this.cart.items.filter(productObj => productObj.productId === productId);
        if (presentProduct.length !== 0) {
            presentProduct[0].quantity += quantity;
        } else {
            this.cart.items.push({productId: productId, quantity: quantity})
        }
        console.log("Item added:", "item:", productId, "quantity:", quantity, "cart:", this.cart);
    }

    clearCart () {
        this.cart.items = [];
        console.log("Cart cleared:", this.cart);
    }
    
    getCartItems () {
        return this.cart.items;
    }

    deleteProductById (id) {
        const productIdMatch = this.cart.items.filter(product => product.productId === id);
        if (productIdMatch.length !== 0) {
            const productToDelete = productIdMatch[0];
            const productToDeleteIndex = this.cart.items.indexOf(productToDelete);
            if (productToDeleteIndex !== -1) {
                console.log('newCartItems before:', this.cart.items);

                const deletedProduct = this.cart.items.splice(productToDeleteIndex, 1);
                console.log('ProductDeleted: ', deletedProduct);
                console.log('newCartItems after:', this.cart.items);
                return deletedProduct[0];
            }
        } else return null;
    }
}


const user1 = new User("./assets/images/image-avatar.png");


// exports
export { mainModelInit, user1, User };