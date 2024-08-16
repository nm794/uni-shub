const API_BASE_URL = 'http://localhost:5000/api';

export const fetchRestaurants = async () => {
  const response = await fetch(`${API_BASE_URL}/restaurants`);
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants');
  }
  return response.json();
};

// Add more API functions as needed