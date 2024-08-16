import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import './HomePage.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '', // Added mobile number
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(`Field ${e.target.name} changed to: ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const dataToSend = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      mobileNumber: formData.mobileNumber // Added mobile number
    };

    console.log('Sending data to server:', dataToSend);

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        console.log('Signup successful, redirecting...');
        navigate('/Main');
      } else {
        console.error('Server response:', data);
        setError(data.error || 'An error occurred during signup');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred during signup: ' + error.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google Sign-In successful:', tokenResponse);
      
      console.log('Simulating successful Google signup');
      navigate('/Main');
    },
    onError: (error) => {
      console.log('Google Sign-In Failed:', error);
      setError('Google Sign-In failed. Please try again.');
    }
  });

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="google-signup">
        <button onClick={() => googleLogin()}>Sign up with Google</button>
      </div>
      <div className="login-link">
        Already have an account? <Link to="/signin">Log in</Link>
      </div>
    </div>
  );
}

export default SignupPage;