import React from 'react';
import './App.css';
import PostList from './components/PostList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>TypeScript + React API Demo</h1>
      <PostList />
    </div>
  );
};

export default App;
