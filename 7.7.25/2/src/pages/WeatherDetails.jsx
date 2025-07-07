import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WeatherDetails = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, [city, API_KEY]);

  if (!weather) return <p>Loading...</p>;
  if (weather.cod !== 200) return <p>City not found!</p>;

  const { main, weather: weatherInfo } = weather;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Weather in {city}</h2>
      <p>🌡️ Temperature: {main.temp} °C</p>
      <p>💧 Humidity: {main.humidity}%</p>
      <p>☁️ Condition: {weatherInfo[0].description}</p>
    </div>
  );
};

export default WeatherDetails;
