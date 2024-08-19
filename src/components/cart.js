import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cart.css';
import { useCart } from './CartContext';
import Checkout from './checkout';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (showCheckout) {
    return (
      <Checkout 
        cartItems={cartItems} 
        calculateTotal={calculateTotal} 
        onBackToCart={() => setShowCheckout(false)} 
      />
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Total: ${calculateTotal()}</h2>
            <button className="checkout-btn" onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
          </div>
        </>
      )}
      <Link to="/main" className="continue-shopping">Continue Shopping</Link>
    </div>
  );
}

export default Cart;