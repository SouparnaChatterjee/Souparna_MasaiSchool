import { useState } from 'react';

const useToggleItems = (items, initialPosition = 0) => {
  const [index, setIndex] = useState(initialPosition % items.length);

  const toggle = () => {
    setIndex(prev => (prev + 1) % items.length);
  };

  return [items[index], toggle];
};

export default useToggleItems;
