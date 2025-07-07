import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/weather/${city}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Weather Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
