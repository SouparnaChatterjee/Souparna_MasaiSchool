import React from 'react';

const QuoteCard = ({ content, author }) => {
  const cardStyle = {
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
    fontStyle: 'italic',
  };

  return (
    <div style={cardStyle}>
      <p style={{ fontSize: '1.2em' }}>"{content}"</p>
      <p style={{ textAlign: 'right', fontWeight: 'bold', marginTop: '10px' }}>– {author}</p>
    </div>
  );
};

export default QuoteCard;
