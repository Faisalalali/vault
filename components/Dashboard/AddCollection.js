// component/Dashboard/AddCollection.js
import { PlusIcon } from "@heroicons/react/24/solid";

export const AddCollection = ({ onCollectionAdded }) => {
  const newCollection = {
    name: "New Collection",
    icon: "📁",
  };

  const handleClick = async () => {
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCollection),
      });
      if (response.status === 201) {
        const result = await response.json();
        onCollectionAdded(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="cursor-pointer border-4 border-dashed border-gray-200 rounded-2xl flex justify-center items-center hover:bg-gray-100 transition duration-200 ease-in-out"
          onClick={handleClick} // Attach click event handler
        >
          <PlusIcon className="w-24 h-24 mx-auto m-4 p-4 text-gray-400 hover:text-gray-500 transition duration-200 ease-in-out" />
        </div>
      </div>
    </div>
  );
};