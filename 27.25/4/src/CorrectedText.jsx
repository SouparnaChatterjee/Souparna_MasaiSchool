import React from 'react';

const CorrectedText = ({ text, corrections }) => {
  const words = text.split(' ');
  let correctionCount = 0;

  const correctedWords = words.map((word) => {
    if (corrections[word]) {
      correctionCount++;
      return corrections[word];
    }
    return word;
  });

  return (
    <div>
      <p style={{ fontSize: '18px', color: '#333' }}>{correctedWords.join(' ')}</p>
      <p style={{ fontSize: '14px', color: 'gray' }}>
        Words corrected: {correctionCount}
      </p>
    </div>
  );
};

export default CorrectedText;
