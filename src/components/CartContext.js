
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(i => i.id === item.id);
        if (existingItem) {
          const updatedItems = prevItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          console.log('Cart after adding:', updatedItems);
          return updatedItems;
        }
        const updatedItems = [...prevItems, { ...item, quantity: 1 }];
        console.log('Cart after adding:', updatedItems);
        return updatedItems;
      });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === itemId);
      if (itemIndex >= 0) {
        const newItems = [...prevItems];
        if (newItems[itemIndex].quantity > 1) {
          newItems[itemIndex] = {...newItems[itemIndex], quantity: newItems[itemIndex].quantity - 1};
        } else {
          newItems.splice(itemIndex, 1);
        }
        return newItems;
      }
      return prevItems;
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

