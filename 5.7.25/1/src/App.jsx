import React, { useState, useEffect } from 'react';
import ThemedBox from './ThemedBox';

const ThemeApp = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Theme Toggle App</h1>
      <button onClick={toggleTheme} style={{ marginBottom: '20px' }}>
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <div style={{ display: 'flex', gap: '20px' }}>
        <ThemedBox theme={theme}>Box 1</ThemedBox>
        <ThemedBox theme={theme}>Box 2</ThemedBox>
        <ThemedBox theme={theme}>Box 3</ThemedBox>
      </div>
    </div>
  );
};

export default ThemeApp;
