import React from "react";

// default context state
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: () => {},
    removeItem: () => {}
});

export default CartContext;