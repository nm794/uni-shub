import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <section className="menu">
        <div className="nav">
          <div className="logo"><h1>Uni-<b>sHub</b></h1></div>
          <ul>
            <li><Link className="active" to="/">Home</Link></li>
            <li><Link to="/signin">Queue Stats</Link></li>
            <li><Link to="/signin">Delivery</Link></li>
            <li><Link to="/signin">Events</Link></li>
            <li><Link to="/signin">Blogs</Link></li>
          </ul>
          <div className="auth-buttons"><Link to="/signin">
            <input className="signin" type="submit" value="Sign In" name="signin" /> </Link> 
            <Link to="/signup">
            <input className="signup" type="submit" value="Sign Up" name="signup" />
            </Link>
          </div>
        </div>
      </section>
      <section className="grid">
        <div className="content">
          <div className="content-left">
            <div className="info">
              <h2>Welcome   <br />folks</h2>
              <p>Hey, your delicious food is waiting for you, <br />
                We are always near to you with your food</p>
            </div><Link to="/signin">
            <button>Need Some</button></Link>
          </div>
          <div className="content-right">
          <img src="/images/2image.png" alt="Food" />
          </div>
        </div>
      </section>
      <section className="category">
        <div className="list-items">
          <div className="card-list">
            {/* Add your card list items here */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;