import React from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Custom Hook Demo</h1>
      <LoginForm />
      <hr />
      <SignupForm />
    </div>
  );
}

export default App;
