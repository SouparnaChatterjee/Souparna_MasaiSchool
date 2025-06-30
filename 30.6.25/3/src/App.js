import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 10) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="App">
      <h1>Simple Counter App</h1>
      <h2>Count: {count}</h2>
      {count === 10 && <p className="goal">Goal Reached!</p>}

      <div className="buttons">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement} disabled={count === 0}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
