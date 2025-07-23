import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { addMessage } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    addMessage(userMessage);
    setLoading(true);
    setInput('');

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_GEMINI_API_KEY}`,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Error: No response';
      addMessage({ role: 'assistant', text: reply });
    } catch (err) {
      addMessage({ role: 'assistant', text: 'Something went wrong. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={loading}
        style={{ flexGrow: 1 }}
      />
      <button type="submit" disabled={loading}>
        {loading ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;
