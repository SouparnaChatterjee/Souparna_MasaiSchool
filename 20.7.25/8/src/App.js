import React from 'react';
import useToggleItems from './hooks/useToggleItems';

function App() {
  const [item, toggleItem] = useToggleItems(['A', 'B', 'C'], 1);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Current Item: {item}</h1>
      <button onClick={toggleItem} style={{ padding: '10px 20px' }}>
        Toggle Item
      </button>
    </div>
  );
}

export default App;
