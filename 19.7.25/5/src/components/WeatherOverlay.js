import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const WeatherOverlay = ({ location }) => {
  const map = useMap();
  const [layer, setLayer] = useState(null);

  useEffect(() => {
    if (!location) return;

    const { lat, lng } = location;
    const tileUrl = `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

    if (layer) {
      map.removeLayer(layer);
      setLayer(null);
    }

    const wmLayer = L.tileLayer(tileUrl, { opacity: 0.5 });
    wmLayer.addTo(map);
    setLayer(wmLayer);

    return () => {
      map.removeLayer(wmLayer);
    };
  }, [location, map]);

  return null;
};

export default React.memo(WeatherOverlay);
