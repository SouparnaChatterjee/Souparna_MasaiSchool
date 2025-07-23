import React, { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import MessageBubble from './MessageBubble';
import styles from '../styles/Chat.module.css';

const ChatWindow = () => {
  const { messages } = useChat();
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatWindow}>
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} role={msg.role} text={msg.text} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
