import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RestaurantList from './components/RestaurantList';
import SignupPage from './components/SignupPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignIn from './components/SignIn';
import ResetPassword from './components/ResetPassword';
import ForgotPasswordPage from './components/ForgotPassword';
import Main from './components/Main';
import Account from './components/Account';
import Tajmahal from './components/Tajmahal';

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
  return (
    <GoogleOAuthProvider clientId="301937331218-tlfub18nnh092ibhsahfimlj6r96rocj.apps.googleusercontent.com">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/Main" element={<ErrorBoundary><Main /></ErrorBoundary>} />
            <Route path="/Account" element={<Account/>}/>
            <Route path="/Tajmahal" element={<Tajmahal/>}/>
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;