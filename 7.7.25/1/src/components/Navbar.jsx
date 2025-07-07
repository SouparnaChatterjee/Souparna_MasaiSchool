// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', background: '#ddd' }}>
    <Link to='/' style={{ marginRight: '10px' }}>Home</Link>
    <Link to='/about'>About</Link>
  </nav>
);

export default Navbar;
