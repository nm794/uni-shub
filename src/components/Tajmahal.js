import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Main.css';

function Main() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [orderType, setOrderType] = React.useState('delivery');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const bannerContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState('home');

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

  const menuCategories = {
    'All': [],
    'Signature Dishes': [
      {name: 'Chicken Over Rice', price: '$7.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Lamb Over Rice', price: '$7.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Shrimp Over Rice', price: '$8.00', image: 'images/food-trucks-image.jpeg' },
      { name: 'Samosa Over Rice', price: '$8.00', image: 'images/samosa-over-rice.jpg' },
      { name: 'Lamb Steak Over Rice', price: '$9.00', image: 'images/lamb-over-rice.jpg' },
    ],
    'Rice Platter': [
      {name: 'Chicken Over Rice', price: '$7.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Lamb Over Rice', price: '$7.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Shrimp Over Rice', price: '$8.00', image: 'images/food-trucks-image.jpeg' },
      { name: 'Samosa Over Rice', price: '$8.00', image: 'images/samosa-over-rice.jpg' },
      { name: 'Lamb Steak Over Rice', price: '$9.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Falafel Over Rice', price: '$8.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Falafel & Lamb Over Rice', price: '$9.00', image: 'images/food-trucks-image.jpeg' },
      { name: 'Falafel & chicken Over Rice', price: '$9.00', image: 'images/food-trucks-image.jpeg' },
      { name: 'Lamb & Steak Over Rice', price: '$11.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Mix Over Rice', price: '$8.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Chicken Steak Over Rice', price: '$11.00', image: 'images/food-trucks-image.jpeg' },
      { name: 'Steak Over Rice', price: '$9.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Falafel Steak Over Rice', price: '$9.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Lamb Steak Falafel Over Rice', price: '$12.00', image: 'images/food-trucks-image.jpeg' },
      { name: 'Chicken Steak Falafel Over Rice', price: '$12.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Samosa Falafel Over Rice', price: '$9.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Samosa Mozzarella Steak', price: '$9.00', image: 'images/food-trucks-image.jpeg' },
      { name: 'Mozzarella Steak Over Rice', price: '$9.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Samosa Mozzarella Steak Falafel Over Rice', price: '$11.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Falafel Veggie Burger', price: '$10.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Lamb Mozzarella Steak', price: '$10.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Chicken Mozzarella Steak', price: '$10.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Steak Mozzarella', price: '$10.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Steak& Mozzarella Steak', price: '$10.00', image: 'images/lamb-over-rice.jpg' },
      { name: 'Chicken Tender Over Rice', price: '$10.00', image: 'images/lamb-over-rice.jpg' },
    ],
    'Gyro': [
      { name: 'Chicken Gyro', price: '$5.00', image: 'images/chicken gyro.jpg' },
      { name: 'Lamb Gyro', price: '$5.00', image: 'images/chicken gyro.jpg' },
      { name: 'Mix Gyro', price: '$5.00', image: 'images/chicken gyro.jpg' },
      { name: 'Steak Gyro', price: '$5.00', image: 'images/chicken gyro.jpg' },
      { name: 'Veggy Gyro', price: '$5.00', image: 'images/chicken gyro.jpg' },
      { name: 'Lamb Steak Gyro', price: '$6.00', image: 'images/chicken gyro.jpg' },
    ],
    'Fried': [
      { name: 'Onion Rings', price: '$4.00', image: 'images/onion-rings.jpg' },
      { name: 'Chicken Nuggets', price: '$5.00', image: 'images/chicken-nuggets.jpeg' },
      { name: 'Chicken Tender', price: '$7.00', image: 'images/ChickenTenders.jpg' },
      { name: 'Chicken Wings', price: '$7.00', image: 'images/chicken-wings.jpg' },
      { name: 'Samosa', price: '$2.00', image: 'images/samosa.jpg' },
      { name: 'Samosa on Roll', price: '$3.00', image: 'images/samosa-on-roll.jpg' },
      { name: 'Samosa Tiki', price: '$7.00', image: 'images/samosa-on-roll.jpg' },
    ],
    'Desi': [
      { name: 'Alu Tika', price: '$7.00', image: 'images/alu-tika.jpg' },
      { name: 'Anda Palac', price: '$5.00', image: 'images/anda-palac.jpg' },
      { name: 'Baga Ravi', price: '$8.00', image: 'images/baga-ravi.jpg' },
      { name: 'Mota Ravi', price: '$8.00', image: 'images/mota-ravi.jpg' },
      { name: 'Motimorgi', price: '$8.00', image: 'images/motimorgi.jpg' },
      { name: 'Tandori', price: '$8.00', image: 'images/tandori.jpg' },
      { name: 'Davi Dosa', price: '$8.00', image: 'images/davi-dosa.jpg' },
      { name: 'Veggie Davi Dosa', price: '$7.00', image: 'images/veggie-davi-dosa.jpg' },
      { name: 'Lamb Tika', price: '$5.00', image: 'images/lamb-tika.jpg' },
      { name: 'Chicken Tika', price: '$5.00', image: 'images/chicken-tika.jpg' },
    ],
    'Sandwiches': [
      { name: 'Chicken Cheese Steak', price: '$8.00', image: 'images/chicken-cheese-steak.jpg' },
      { name: 'Beef Steak', price: '$8.00', image: 'images/beaf-steak.jpg' },
      { name: 'Fat Burger', price: '$8.00', image: 'images/fat-burger.jpg' },
      { name: 'Chicken Hero', price: '$8.00', image: 'images/chicken-hero.jpg' },
      { name: 'Lamb Hero', price: '$8.00', image: 'images/lamb-hero.jpg' },
      { name: 'Mix Hero', price: '$9.00', image: 'images/mix-hero.jpg' },
      { name: 'Chicken/Bacon/Cheddar-Ranch', price: '$10.00', image: 'images/cheddar-ranch.jpg' },
    ],
    'Burger': [
      { name: 'Chicken Burger', price: '$5.00', image: 'images/burger.jpg' },
      { name: 'Veggie Burger', price: '$5.00', image: 'images/burger2.png' },
      { name: 'Beef Burger', price: '$5.00', image: 'images/burger.jpg' },
      { name: 'Falafel Burger', price: '$5.00', image: 'images/burger.jpg' },
      { name: 'Steak Burger', price: '$6.00', image: 'images/burger2.png' },
      { name: 'Samosa Burger', price: '$5.00', image: 'images/burger.jpg' },
      { name: 'Cajun Fries', price: '$4.00', image: 'images/cheddar-ranch.jpg' },
      { name: 'Regular Fries', price: '$4.00', image: 'images/regular-fries.jpg' },
    ],
    'Specialites': [
      { name: 'Fat Liv', price: '$12.00', image: 'images/fat-liv.jpg' },
      { name: 'Fish & Chips', price: '$8.00', image: 'images/fish-chips.jpg' },
      { name: 'Fat Farag', price: '$8.00', image: 'images/fat-farag.jpg' },
      { name: 'Fat Maryann', price: '$8.00', image: 'images/fat-maryann.jpg' },
    ],
    'Fat Menu': [
      { name: 'Fat Mena', price: '$12.00', image: 'images/fat-mena.jpg' },
      { name: 'Fat Joe', price: '$12.00', image: 'images/fat-joe.jpg' },
      { name: 'Big Momma', price: '$10.00', image: 'images/big-momma.jpg' },
      { name: 'Fat Koko', price: '$11.00', image: 'images/fat-koko.jpg' },
      { name: 'Big Daddy', price: '$11.00', image: 'images/big-daddy.jpg' },
      { name: 'Big Babe', price: '$8.00', image: 'images/big-babe.jpg' },
      { name: 'Fat Steven', price: '$8.00', image: 'images/fat-steven.jpg' },
      { name: 'Fat Brandon', price: '$12.00', image: 'images/fat-brandon.jpg' },
    ],
    'Veggie Menu': [
      { name: 'Veggie Burger', price: '$5.00', image: 'images/burger.jpg' },
      { name: 'Veggie Pizza Burger', price: '$6.00', image: 'images/burger.jpg' },
      { name: 'Veggie Hero', price: '$5.00', image: 'images/pizza-burger.jpg' }
    ],
  };
  

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
    }, 3000); // Change banner every 5 seconds
    return () => clearInterval(interval);
  }, [isHovered, nextBanner]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const itemsPerPage = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((prevIndex) => 
        (prevIndex + 1) % Math.max(menuCategories[selectedCategory].length - itemsPerPage + 1, 1)
      );
    }, 5000); // Change items every 5 seconds

    return () => clearInterval(interval);
  }, [selectedCategory]);

  const chunkedMenuItems = (category) => {
    const items = menuCategories[category];
    const chunked = [];
    for (let i = 0; i < items.length; i += 3) {
      chunked.push(items.slice(i, i + 3));
    }
    return chunked;
  };

  return (
    <div className="home-page">
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
            <li><a className="active" href="/main">Home</a></li>
            <li><a href="/queue-stats">Queue Stats</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/delivery">Delivery</a></li>
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
                    <a href={banner.button.link} className={`banner-btn ${banner.button.class}`}>{banner.button.text}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="banner-nav-btn next-btn" onClick={nextBanner}>&gt;</button>
        </div>
      </section>

      {/* Add gap */}
      <div style={{ height: '2em' }}></div>

      

      {/*<section className="menu-section">
        <h2>Menu</h2>
        <div className="menu-container">
          <nav className="menu-nav">
            <h3>Categories</h3>
            <ul>
              {Object.keys(menuCategories).map(category => (
                <li key={category}>
                  <button
                    className={selectedCategory === category ? 'active' : ''}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentItemIndex(0);
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-items">
            <h3>{selectedCategory}</h3>
            {chunkedMenuItems(selectedCategory).map((row, rowIndex) => (
              <div key={rowIndex} className="menu-row">
                {row.map(item => (
                  <div key={item.name} className="menu-item">
                    <div className="image-container">
                      <img src={item.image} alt={item.name} />
                      <button className="add-to-cart-btn">+</button>
                    </div>
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>*/}
      <div className="food-truck-section">
        <div className="food-truck-header">
          <h2>Taj Mahal Food Truck</h2>
          <button className="search-button">
            <img src="images/search-icon.png" alt="Search" />
            <span>Search Menu</span>
          </button>
        </div>
        <div className="food-truck-info">
          <div className="store-info">
            <p>CravePass</p>
            <p>Rating: 4.7 ★</p>
            <p>15-25 min  . 0.5mi</p>
            <p>$1.99 Delivery Fee</p>
          </div>
          {/*<div className="order-options">
            <div className="order-type-toggle">
              <button 
                className={`toggle-btn ${orderType === 'delivery' ? 'active' : ''}`}
                onClick={() => setOrderType('delivery')}
              >
                Delivery
              </button>
              <button 
                className={`toggle-btn ${orderType === 'pickup' ? 'active' : ''}`}
                onClick={() => setOrderType('pickup')}
              >
                Pickup
              </button>
            </div>
            <button className="group-order-btn">Group Order</button>
          </div>*/}
        </div>
        <section className="menu-section">
        <h2>Menu</h2>
        <div className="menu-container">
          <nav className="menu-nav">
            <h3>Categories</h3>
            <ul>
              {Object.keys(menuCategories).map(category => (
                <li key={category}>
                  <button
                    className={selectedCategory === category ? 'active' : ''}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentItemIndex(0);
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-items">
            <h3>{selectedCategory}</h3>
            {chunkedMenuItems(selectedCategory).map((row, rowIndex) => (
              <div key={rowIndex} className="menu-row">
                {row.map(item => (
                  <div key={item.name} className="menu-item">
                    <div className="image-container">
                      <img src={item.image} alt={item.name} />
                      <button className="add-to-cart-btn">+</button>
                    </div>
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      <div className={`overlay ${sideNavOpen ? 'open' : ''}`}></div>
      <div className={`side-nav ${sideNavOpen ? 'open' : ''}`}>
        <div className="side-nav-content">
          <ul>
            <li><a href="account"><img src="images/account-icon.png" alt="Account" />Account</a></li>
            <li><a href="#"><img src="images/order-icon.png" alt="Orders" />Orders</a></li>
            <li><a href="#"><img src="images/favorite-icon.png" alt="Favorites" />Favorites</a></li>
            <li><a href="#"><img src="images/promotions-icon.png" alt="Promotions" />Promotions</a></li>
            <li><a href="#"><img src="images/giftcard-icon.png" alt="Gift Cards" />Gift Cards</a></li>
            <li><a href="#"><img src="images/refer-icon.png" alt="Refer & Earn" />Refer & Earn</a></li>
            <li><a href="#"><img src="images/help-icon.png" alt="Help" />Help</a></li>
            <li><a href="/"><img src="images/signout-icon.png" alt="Sign Out" />Sign Out</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Main;