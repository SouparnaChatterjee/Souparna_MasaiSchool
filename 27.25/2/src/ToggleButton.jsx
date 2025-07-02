import React, { useState } from 'react';
import './ToggleButton.css';

const ToggleButton = ({ label }) => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => setIsOn(!isOn);

  return (
    <div className="toggle-container">
      {label && <span className="label">{label}</span>}
      <button
        onClick={toggle}
        className={isOn ? 'toggle on' : 'toggle off'}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default ToggleButton;
