import React from 'react';

const ThemedBox = ({ theme, children }) => {
  const boxStyle = {
    padding: '30px',
    borderRadius: '10px',
    color: theme === 'light' ? '#000' : '#fff',
    backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
    flex: 1,
    textAlign: 'center'
  };

  return <div style={boxStyle}>{children}</div>;
};

export default ThemedBox;
