// pages/test.js
import React, { useState } from 'react';
import axios from 'axios';

const TestPage = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/collections/collectionName'); // Replace with your collection name
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createItem = async () => {
    try {
      const newItem = {
        name: newItemName, // Replace with the appropriate fields
        type: 'type',
        logo: 'logo',
      };
      const response = await axios.post('/api/collections/collectionName', newItem); // Replace with your collection name
      console.log('Created item:', response.data);
      setNewItemName(''); // Clear the input field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <div>
        <button onClick={fetchItems}>Fetch Items</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="New Item Name"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
        />
        <button onClick={createItem}>Create Item</button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
