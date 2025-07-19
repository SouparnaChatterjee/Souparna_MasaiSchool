import { useState, useEffect } from 'react';

const useFetchRoute = (origin, destination) => {
  const [routeCoords, setRouteCoords] = useState([]);

  useEffect(() => {
    if (!origin || !destination) return;

    const fetchRoute = async () => {
      const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.REACT_APP_ORS_API_KEY,
        },
        body: JSON.stringify({
          coordinates: [
            [origin.lng, origin.lat],
            [destination.lng, destination.lat],
          ],
        }),
      });
      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      setRouteCoords(coords);
    };

    fetchRoute();
  }, [origin, destination]);

  return routeCoords;
};

export default useFetchRoute;
