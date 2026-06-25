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

    addItem(item) {
        this.cart.items.push(item);
        console.log("Item added:", "item:", item, "cart:", this.cart);
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