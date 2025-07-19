import React from 'react';
import useToggleItems from './hooks/useToggleItems';

function App() {
  const [item, toggleItem] = useToggleItems(['A', 'B', 'C'], 1); // Initial = 'B'

  return (
    <div className="app">
      <h1>useToggleItems Hook Demo</h1>
      <div className="display-box">
        <p>Current Item: <strong>{item}</strong></p>
        <button onClick={toggleItem}>Toggle</button>
      </div>
    </div>
  );
}

export default App;
