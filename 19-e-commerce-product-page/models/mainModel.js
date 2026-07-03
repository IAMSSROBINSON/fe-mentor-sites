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
        // this.cart.items.push(item);
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
}


// handlers


// exports
export { mainModelInit, User };