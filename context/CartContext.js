import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(currentItems => 
      currentItems.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
