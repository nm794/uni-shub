import React from 'react';

function Header() {
  return (
    <header>
      <h1>Student Food & Grocery Delivery</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/restaurants">Restaurants</a></li>
          <li><a href="/groceries">Groceries</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;