// components/Dashboard/Collection/AddItem/index.js
import { useState } from 'react';
import axios from 'axios';
import { PlusIcon } from "@heroicons/react/24/solid";

export const AddItem = ({ collection, onItemAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", icon: "📄" });

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/collections/${collection._id}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item: newItem }),
      });
      
      if (response.status === 201) {
        const result = await response.json();
        onItemAdded(collection._id, result.data);
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClick = () => {
    setShowModal(true); // Open modal on click
  };

  return (
    <div className="p-4 flex flex-col items-center sm:w-1/4 md:w-1/5 lg:w-1/6">
      {showModal ? (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="bg-black absolute inset-0 opacity-50 cursor-pointer" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-lg p-5 w-1/3 z-50">
            <h2 className="mb-4 text-xl font-bold">Add New Item</h2>
            <input className="mb-2 p-2 border rounded" type="text" name="name" placeholder="Item Name" onChange={handleInputChange} />
            <input className="mb-2 p-2 border rounded" type="text" name="icon" placeholder="Item Icon" onChange={handleInputChange} />
            <div className="flex justify-end">
              <button className="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>Add</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-5 h-32 w-32 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition duration-200 ease-in-out" onClick={handleAddClick}>
          <PlusIcon className="w-16 h-16 mx-auto text-gray-400 hover:text-gray-500 transition duration-200 ease-in-out" />
        </div>
      )}
    </div>
  );
};
