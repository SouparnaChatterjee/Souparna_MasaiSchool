import React from 'react';
import Counter from './Counter';

const App = () => {
  return (
    <div>
      <h1>Counter App</h1>
      <Counter initialValue={0} />
    </div>
  );
};

export default App;
