// component/Dashboard/ItemInfoCard/index.js
import { useState } from 'react';

const ItemInfoCard = ({ selectedItem, onClose, onUpdateItem, onDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...selectedItem });

  if (!selectedItem) return null; // If no selectedItem, don't render the modal
  const { collectionId, itemId } = selectedItem;

  const handleInputChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = () => {
    onUpdateItem(itemId, editedItem);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDeleteItem(collectionId, itemId);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8">
        {/* Render item details */}
        {isEditing ? (
          <div>
            <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} className="border p-2 rounded-md mb-2 w-full" />
            <input type="text" name="icon" value={editedItem.icon} onChange={handleInputChange} className="border p-2 rounded-md mb-2 w-full" />
            <button onClick={handleUpdateClick} className="bg-blue-500 text-white p-2 rounded-md mr-2">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-300 p-2 rounded-md">Cancel</button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-2">{selectedItem?.name}</h2>
            <p className="mb-2">{selectedItem?.icon}</p>
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white p-2 rounded-md mr-2">Edit</button>
            <button onClick={handleDeleteClick} className="bg-red-500 text-white p-2 rounded-md mr-2">Delete</button>
            <button onClick={onClose} className="bg-gray-300 p-2 rounded-md">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemInfoCard;
