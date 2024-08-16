import React, { useState, useEffect } from 'react';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/restaurants')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setRestaurants(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading... Please wait.</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Restaurants</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul>
          {restaurants.map(restaurant => (
            <li key={restaurant.name}>{restaurant.name} - {restaurant.cuisine}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantList;