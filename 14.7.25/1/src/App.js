import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  const sampleItem = { id: 1, name: 'Apple', price: 10 };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Shopping Cart</h1>
      <button onClick={() => dispatch(addItem(sampleItem))}>Add Item</button>
      <button onClick={() => dispatch(removeItem(sampleItem.id))}>Remove Item</button>

      <h2>Cart Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>

      <h2>Total: ${total}</h2>
    </div>
  );
}

export default App;
