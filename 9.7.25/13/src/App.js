import React, { useReducer } from 'react';
import { toggleReducer, initialState } from './reducer';

function App() {
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  return (
    <div className="container">
      <h1>Toggle Message with useReducer</h1>
      <button onClick={() => dispatch({ type: 'TOGGLE_VISIBILITY' })}>
        Toggle Message
      </button>
      {state.isVisible && <p className="message">Hello, World!</p>}
    </div>
  );
}

export default App;
