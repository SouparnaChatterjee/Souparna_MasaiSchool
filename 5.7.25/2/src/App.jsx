import React, { useEffect, useState } from 'react';
import QuoteCard from './QuoteCard';

const App = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      setQuote({ content: "Failed to fetch quote", author: "System" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
    const intervalId = setInterval(fetchQuote, 30000); // 30 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Daily Quote Generator</h1>
      {loading ? (
        <div className="spinner" />
      ) : (
        quote && <QuoteCard content={quote.content} author={quote.author} />
      )}
      <button onClick={fetchQuote} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Get New Quote
      </button>
    </div>
  );
};

export default App;
