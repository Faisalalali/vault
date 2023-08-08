import React from 'react';
import { useState, useEffect } from 'react';

const ItemInfoCard = ({ selectedItem, onClose }) => {
  if (!selectedItem) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="item-info-card bg-white p-8 rounded-lg">
        <h2 className="text-xl font-semibold">{selectedItem.name}</h2>
        <p className="mt-2 text-gray-600">{selectedItem.description}</p>
        {/* Add other item info here */}
        <p className="mt-2 text-gray-600">{selectedItem.icon}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemInfoCard;
