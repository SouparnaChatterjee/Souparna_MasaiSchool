import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import WeatherDetails from './pages/WeatherDetails';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/weather/:city" element={<WeatherDetails />} />
    </Routes>
  </>
);

export default App;
