import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './components/CartContext';
import HomePage from './components/HomePage';
import RestaurantList from './components/RestaurantList';
import SignupPage from './components/SignupPage';
import SignIn from './components/SignIn';
import ResetPassword from './components/ResetPassword';
import ForgotPasswordPage from './components/ForgotPassword';
import Main from './components/Main';
import Account from './components/Account';
import Tajmahal from './components/Tajmahal';
import Cart from './components/cart';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  /*const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
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
  };*/

  return (
    <GoogleOAuthProvider clientId="301937331218-tlfub18nnh092ibhsahfimlj6r96rocj.apps.googleusercontent.com">
      <CartProvider>
      <Router>
      
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/Main" element={
              <ErrorBoundary>
                <Main /*cartItems={cartItems} addToCart={addToCart}*/ />
              </ErrorBoundary>
            } />
            <Route path="/Account" element={<Account />} />
            <Route path="/Tajmahal" element={
              <Tajmahal /*cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart}*//>
            } />
            <Route path="/cart" element={
              <Cart 
              />
            } />

          
          </Routes>
        </div>


        
      </Router>
      </CartProvider>
    </GoogleOAuthProvider>
  );
}

export default App;