import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
  
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleForgotPassword}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <div className="signin-link">
        Remember your password? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;