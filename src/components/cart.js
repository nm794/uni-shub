import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import './cart.css';
import { useCart } from './CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [orderType, setOrderType] = useState('delivery');
  const [accountExpanded, setAccountExpanded] = useState(false);
  const bannerContainerRef = useRef(null);

  const banners = [
    {
      img: "images/banner1.png",
      title: "Exclusive offers for all NJIT students",
      description: "5% off on your first order use code: NEWUSERS",
      button: { text: "Order Now", link: "/order", class: "maroon-btn" }
    },
    {
      img: "images/banner 2.png",
      title: "Food Trucks and More",
      description: "Grab yours without any waiting",
      button: { text: "Check Queue", link: "/queue", class: "blue-btn" }
    },
    {
      img: "images/banner3.png",
      title: "Free Delivery on  group orders Above $50",
      description: "Wait less, save more",
      button: { text: "Order Now", link: "/order", class: "green-btn" }
    },
    {
      img: "images/banner4.png",
      title: "Free Delivery on all orders with Cravepass",
      description: "Starting from $2.99/month",
      button: { text: "Learn More", link: "/martpass-info", class: "orange-btn" }
    }
  ];

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

  const nextBanner = useCallback(() => {
    setCurrentBannerIndex((prevIndex) => (prevIndex + 2) % banners.length);
  }, [banners.length]);

  const prevBanner = useCallback(() => {
    setCurrentBannerIndex((prevIndex) => (prevIndex - 2 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        nextBanner();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextBanner]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <section className="menu">
        <nav className="nav">
          <div className="nav-top">
            <div className="hamburger-menu" onClick={toggleSideNav}>
              <img src="images/user-icon.png" alt="Menu" />
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
              <img src="images/location-icon.png" alt="Location" />
            </div>
            <div className="search-container">
              <button className="search-button">
                <img src="images/search-icon.png" alt="Search" />
                <span>Search your Mart</span>
              </button>
            </div>
            <div className="cart-icon">
              <img src="images/cart-icon.png" alt="Cart" />
            </div>
          </div>
          <ul>
            <li><Link to="/main">Home</Link></li>
            <li><Link to="/queue-stats">Queue Stats</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
          </ul>
          <div className="filter-buttons">
            <button className="filter-btn offers-btn">
              <img src="images/offer-icon.png" alt="Offers" />
              <span>Offers</span>
            </button>
            <button className="filter-btn rating-btn">
              <img src="images/rating-icon.png" alt="Rating" />
              <span>Rating</span>
            </button>
            <button className="filter-btn delivery-fee-btn">
              <span>Delivery fee</span>
              <img src="images/deliveryfee-icon.png" alt="Delivery Fee" />
            </button>
            <button className="filter-btn price-btn">
              <span>Price</span>
              <img src="images/price-icon.png" alt="Price" />
            </button>
            <button className="filter-btn sort-btn">
              <span>Sort</span>
              <img src="images/sort-icon.png" alt="Sort" />
            </button>
          </div>
        </nav>
        <div className="banners-container" 
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave} 
             ref={bannerContainerRef}>
          <button className="banner-nav-btn prev-btn" onClick={prevBanner}>&lt;</button>
          <div className="banners"
               style={{ 
                 transform: `translateX(-${currentBannerIndex * 25}%)`,
                 transition: isHovered ? 'none' : 'transform 0.5s ease'
               }}>
            {banners.map((banner, index) => (
              <div key={index} className="banner">
                <img src={banner.img} alt={`Banner ${index + 1}`} />
                <div className="banner-content">
                  <h3>{banner.title}</h3>
                  <p>{banner.description}</p>
                  <div className="banner-buttons">
                    <Link to={banner.button.link} className={`banner-btn ${banner.button.class}`}>{banner.button.text}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="banner-nav-btn next-btn" onClick={nextBanner}>&gt;</button>
        </div>
      </section>

      <div className="cart-content">
        <h1>your cart</h1>
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
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>

      <div className={`overlay ${sideNavOpen ? 'open' : ''}`}></div>
      <div className={`side-nav ${sideNavOpen ? 'open' : ''}`}>
        <div className="side-nav-content">
          <ul>
            <li><Link to="/account"><img src="images/account-icon.png" alt="Account" />Account</Link></li>
            <li><Link to="#"><img src="images/order-icon.png" alt="Orders" />Orders</Link></li>
            <li><Link to="#"><img src="images/favorite-icon.png" alt="Favorites" />Favorites</Link></li>
            <li><Link to="#"><img src="images/promotions-icon.png" alt="Promotions" />Promotions</Link></li>
            <li><Link to="#"><img src="images/giftcard-icon.png" alt="Gift Cards" />Gift Cards</Link></li>
            <li><Link to="#"><img src="images/refer-icon.png" alt="Refer & Earn" />Refer & Earn</Link></li>
            <li><Link to="#"><img src="images/help-icon.png" alt="Help" />Help</Link></li>
            <li><Link to="/"><img src="images/signout-icon.png" alt="Sign Out" />Sign Out</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cart;