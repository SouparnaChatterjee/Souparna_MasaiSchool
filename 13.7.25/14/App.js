import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/quiz" element={
        <PrivateRoute>
          <Quiz />
        </PrivateRoute>
      } />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
};

export default App;
