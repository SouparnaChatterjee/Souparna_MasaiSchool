import React, { useState } from 'react';
import CorrectedText from './CorrectedText';

const corrections = {
  teh: 'the',
  recieve: 'receive',
  adress: 'address',
  wierd: 'weird',
  thier: 'their',
};

const AutoCorrectApp = () => {
  const [inputText, setInputText] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        placeholder="Type your sentence..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />

      <div style={{ marginTop: '20px' }}>
        <h3>Corrected Preview:</h3>
        <CorrectedText text={inputText} corrections={corrections} />
      </div>
    </div>
  );
};

export default AutoCorrectApp;
