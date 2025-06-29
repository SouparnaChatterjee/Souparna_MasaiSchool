import React from 'react';

const Card = ({ title, children }) => {
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    width: '300px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px'
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
