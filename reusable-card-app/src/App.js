import React from 'react';
import Card from './Card';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Card title="Card One">
        <p>This is the content of the first card.</p>
      </Card>
      <Card title="Card Two">
        <ul>
          <li>Item A</li>
          <li>Item B</li>
        </ul>
      </Card>
      <Card title="Card Three">
        <p><strong>Note:</strong> This card contains bold content.</p>
      </Card>
    </div>
  );
};

export default App;
