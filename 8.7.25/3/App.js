import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "#e0f7fa"; // change bg color
    setIsFocused(true);
  };

  return (
    <div className="container">
      <h2>Focus Input with useRef</h2>
      <input ref={inputRef} type="text" placeholder="Click the button..." />
      <button onClick={handleFocus}>Focus Input</button>
      {isFocused && <p className="focused-message">Focused!</p>}
    </div>
  );
}

export default App;
