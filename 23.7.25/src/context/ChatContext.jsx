import React, { createContext, useContext, useEffect, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chat');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
