import React, { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import './styles/global.css';

function App() {
  const { state, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app ${state.theme}`}>
      <h1>React Country Search App</h1>
      <button onClick={toggleTheme}>
        Switch to {state.theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default App;
