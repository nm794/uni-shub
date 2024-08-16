import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import './HomePage.css';

function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign-in successful');
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_info', JSON.stringify({
          id: data.user_id,
          email: data.email,
          name: data.name,
          mobileNumber: data.mobile_number
        }));

        navigate('/Main');
        console.log('Navigated to Main');
      } else {
        setError(data.error || 'An error occurred during sign-in');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('An error occurred during sign-in. Please try again.');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google Sign-In successful:', tokenResponse);
      console.log('Simulating successful Google sign-in');
      navigate('/Main');
      console.log('Navigated to Main');
    },
    onError: (error) => {
      console.log('Google Sign-In Failed:', error);
      setError('Google Sign-In failed. Please try again.');
    }
  });

  return (
    <div className="signin-page">
      <h2>Sign In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <div className="forgot-password">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className="google-signin">
        <button onClick={() => googleLogin()}>Sign in with Google</button>
      </div>
      <div className="signup-link">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default SignInPage;