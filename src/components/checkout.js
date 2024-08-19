import React, { useState } from 'react';
import './checkout.css';

function Checkout({ cartItems, calculateTotal, onBackToCart }) {
  const [activeSection, setActiveSection] = useState('account');

  const renderSection = (section) => {
    switch(section) {
      case 'account':
        return (
          <div className="checkout-section">
          </div>
        );
      
      case 'payment':
        return (
          <div className="checkout-section">
            <h3>Payment Details</h3>
            <button className="payment-option">Add Card</button>
            <button className="payment-option">Make Payment with Zelle</button>
            <button className="payment-option">Make a PayPal Payment</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkout-container">
      <button onClick={onBackToCart} className="back-to-cart">Back to Cart</button>
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-sections">
          <div className="section-buttons">
            <button
              className={activeSection === 'account' ? 'active' : ''}
              onClick={() => setActiveSection('account')}
            >
              Account Information
            </button>
            <button
              className={activeSection === 'shipping' ? 'active' : ''}
              onClick={() => setActiveSection('shipping')}
            >
              Shipping Details
            </button>
            <button
              className={activeSection === 'payment' ? 'active' : ''}
              onClick={() => setActiveSection('payment')}
            >
              Payment Details
            </button>
          </div>
          <div className="section-content">
            {renderSection(activeSection)}
          </div>
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
          <div className="checkout-section">
            <h3>Shipping Details</h3>
            <input type="text" placeholder=" Delivery Address" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
            <input type="text" placeholder="Zip Code" />
          </div>
       
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotal()}</h3>
        </div>
      </div>
      <button className="place-order-btn">Place Order</button>
    </div>
  );
}

export default Checkout;