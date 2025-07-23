import React from 'react';
import styles from '../styles/Chat.module.css';

const MessageBubble = ({ role, text }) => {
  return (
    <div className={role === 'user' ? styles.user : styles.assistant}>
      <p>{text}</p>
    </div>
  );
};

export default MessageBubble;
