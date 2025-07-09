import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './index.css';

function App() {
  const { state, dispatch } = useContext(ThemeContext);
  const isLight = state.theme === 'light';

  return (
    <div className={`app-container ${isLight ? 'light' : 'dark'}`}>
      <h1>{`Current Theme: ${state.theme}`}</h1>
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
