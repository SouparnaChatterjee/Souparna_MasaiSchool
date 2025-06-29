import React, { useState } from 'react';

const ColorToggleButton = () => {
  const [isGreen, setIsGreen] = useState(true);

  const handleToggle = () => {
    setIsGreen(prev => !prev);
  };

  const backgroundColor = isGreen ? 'green' : 'yellow';
  const textColor = isGreen ? 'white' : 'black';

  const buttonStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={handleToggle} style={buttonStyle}>
        Color: {isGreen ? 'Green' : 'Yellow'}
      </button>
      <p style={{ marginTop: '20px', fontSize: '18px' }}>
        Current Color: {isGreen ? 'Green' : 'Yellow'}
      </p>
    </div>
  );
};

export default ColorToggleButton;
