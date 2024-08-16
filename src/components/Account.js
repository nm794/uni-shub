import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Main.css';
import axios from 'axios';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const navigate = useNavigate();
  

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
  };
  const closeSideNav = (e) => {
    if (e.target.classList.contains('overlay')) {
      setSideNavOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', closeSideNav);
    return () => {
      document.removeEventListener('click', closeSideNav);
    };
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const decodedToken = parseJwt(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error('Token has expired. Please log in again.');
        }

        const response = await axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user info:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/signin');
        } else {
          setError(err.message || 'Failed to fetch user information');
          setLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const decodedToken = parseJwt(token);
      const userId = decodedToken.sub;

      console.log('Sending update request with data:', editedUser);

      const response = await axios.patch(`http://localhost:5000/api/user/${userId}`, editedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Received response:', response.data);

      if (response.status === 200) {
        setUser(response.data.user);
        setIsEditing(false);
        console.log('User data updated successfully:', response.data.user);
      } else {
        console.error('Error updating user information:', response.data);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };
  

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    navigate('/signin');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user information available</div>;

  return (
    <div className="home-page">
      <section className="menu">
        <nav className="nav">
          <div className="nav-top">
            <div className="hamburger-menu" onClick={toggleSideNav}>
              <img src="/images/user-icon.png" alt="Menu" />
            </div>
            <div className="logo">
              <h1>Uni<b>Hub</b></h1>
            </div>
            <div className="order-type-container">
              <button className="order-type-button">
                <span className="delivery">Delivery</span>
                <span className="pickup">Pickup</span>
              </button>
            </div>
            <div className="location-icon">
              <img src="/images/location-icon.png" alt="Location" />
            </div>
            <div className="search-container">
              <button className="search-button">
                <img src="/images/search-icon.png" alt="Search" />
                <span>Search NJIT Mart</span>
              </button>
            </div>
            <div className="cart-icon">
              <img src="/images/cart-icon.png" alt="Cart" />
            </div>
          </div>
          <ul>
            <li><Link to="/Main">Home</Link></li>
            <li><Link to="/queue-stats">Queue Stats</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
          </ul>
          <div className="filter-buttons">
            <button className="filter-btn offers-btn">
              <img src="/images/offer-icon.png" alt="Offers" />
              <span>Offers</span>
            </button>
            <button className="filter-btn rating-btn">
              <img src="/images/rating-icon.png" alt="Rating" />
              <span>Rating</span>
            </button>
            <button className="filter-btn delivery-fee-btn">
              <span>Delivery fee</span>
              <img src="/images/deliveryfee-icon.png" alt="Delivery Fee" />
            </button>
            <button className="filter-btn price-btn">
              <span>Price</span>
              <img src="/images/price-icon.png" alt="Price" />
            </button>
            <button className="filter-btn sort-btn">
              <span>Sort</span>
              <img src="/images/sort-icon.png" alt="Sort" />
            </button>
          </div>
        </nav>
      </section>
      <section className="category">
        <div className="profile-container">
          <div className="profile-card">
            <div className="avatar">
              {user.name.charAt(0)}
            </div>
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.mobile_number}</p>
              <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
            </div>
          </div>
          
          {isEditing && (
            <div className="user-details">
              <h2>Edit Profile</h2>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile_number">Number:</label>
                <input
                  type="tel"
                  id="mobile_number"
                  name="mobile_number"
                  value={editedUser.mobile_number}
                  onChange={handleInputChange}
                />
              </div>
              <button onClick={handleSaveClick}>Save Changes</button>
            </div>
          )}
        </div>
      </section>
      <div className={`overlay ${sideNavOpen ? 'open' : ''}`}></div>
      <div className={`side-nav ${sideNavOpen ? 'open' : ''}`}>
        <div className="side-nav-content">
          <ul>
            <li><Link to="/account"><img src="/images/account-icon.png" alt="Account" />Account</Link></li>
            <li><Link to="/orders"><img src="/images/order-icon.png" alt="Orders" />Orders</Link></li>
            <li><Link to="/favorites"><img src="/images/favorite-icon.png" alt="Favorites" />Favorites</Link></li>
            <li><Link to="/promotions"><img src="/images/promotions-icon.png" alt="Promotions" />Promotions</Link></li>
            <li><Link to="/gift-cards"><img src="/images/giftcard-icon.png" alt="Gift Cards" />Gift Cards</Link></li>
            <li><Link to="/refer"><img src="/images/refer-icon.png" alt="Refer & Earn" />Refer & Earn</Link></li>
            <li><Link to="/help"><img src="/images/help-icon.png" alt="Help" />Help</Link></li>
            <li><button onClick={handleSignOut}><img src="/images/signout-icon.png" alt="Sign Out" />Sign Out</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;