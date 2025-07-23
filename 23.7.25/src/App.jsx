import React from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { ChatProvider } from './context/ChatContext';

const App = () => {
  return (
    <ChatProvider>
      <div style={{ maxWidth: 600, margin: '20px auto' }}>
        <h1>Gemini Chat</h1>
        <ChatWindow />
        <ChatInput />
      </div>
    </ChatProvider>
  );
};

export default App;
