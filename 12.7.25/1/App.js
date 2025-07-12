import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './actions';

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Redux Counter App</h1>
      <p>Count: {count}</p>
      <pre>{JSON.stringify({ count }, null, 2)}</pre>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())} style={{ marginLeft: '10px' }}>
        Decrement
      </button>
    </div>
  );
}

export default App;
