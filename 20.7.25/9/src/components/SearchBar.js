import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setMarkers, setRouteCoords }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const getCoords = async (place) => {
    const key = process.env.REACT_APP_OPENCAGE_KEY;
    const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${key}`);
    return res.data.results[0]?.geometry;
  };

  const getRoute = async (startCoords, endCoords) => {
    const key = process.env.REACT_APP_ORS_KEY;
    const res = await axios.post(`https://api.openrouteservice.org/v2/directions/driving-car/geojson`, {
      coordinates: [[startCoords.lng, startCoords.lat], [endCoords.lng, endCoords.lat]]
    }, {
      headers: {
        Authorization: key,
        'Content-Type': 'application/json',
      }
    });

    const coords = res.data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    setRouteCoords(coords);
  };

  const handleSearch = async () => {
    try {
      const startCoords = await getCoords(start);
      const endCoords = await getCoords(end);

      if (startCoords && endCoords) {
        setMarkers([[startCoords.lat, startCoords.lng], [endCoords.lat, endCoords.lng]]);
        getRoute(startCoords, endCoords);
      }
    } catch (err) {
      alert('Error fetching route');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <input placeholder="Start" value={start} onChange={e => setStart(e.target.value)} />
      <input placeholder="End" value={end} onChange={e => setEnd(e.target.value)} />
      <button onClick={handleSearch}>Search Route</button>
    </div>
  );
};

export default SearchBar;
