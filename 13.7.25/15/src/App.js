import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ProfileCard from './components/ProfileCard';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <ProfileCard />
      </div>
    </ChakraProvider>
  );
}

export default App;
