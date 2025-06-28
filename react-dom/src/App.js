import React, { useState } from 'react';

function App() {
  const [title, setTitle] = useState("Original Title (React)");
  const [reactCount, setReactCount] = useState(0);

  const handleChangeTitle = () => {
    setTitle("Title Changed (React)");
    setReactCount(prev => prev + 1);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleChangeTitle}>Change Title (React)</button>
      <p>React DOM Updates: {reactCount}</p>
    </div>
  );
}

export default App;
