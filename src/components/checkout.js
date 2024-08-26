import React, { useState } from 'react';
import './checkout.css';

function Checkout({ cartItems, calculateTotal, onBackToCart }) {
  const [showPaymentFields, setShowPaymentFields] = useState(false);

  const renderPaymentSection = () => {
    return (
      <div className="checkout-section">
        <h3>Payment Details</h3>
        <button className="payment-option" onClick={() => setShowPaymentFields(true)}>Add Card</button>
        <button className="payment-option">Make Payment with Zelle</button>
        <button className="payment-option">Make a PayPal Payment</button>
        {showPaymentFields && (
          <div className="payment-fields">
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Expiration Date" />
            <input type="text" placeholder="CVV" />
            <input type="text" placeholder="Name on Card" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="checkout-container">
      <button onClick={onBackToCart} className="back-to-cart">Back to Cart</button>
      <h1>Checkout</h1>
      <div className="checkout-content">
        <button className="section-button active">Payment Details</button>
        {renderPaymentSection()}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotal()}</h3>
        </div>
        <button className="place-order-btn">Place Order</button>
      </div>
    </div>
  );
}

export default Checkout;