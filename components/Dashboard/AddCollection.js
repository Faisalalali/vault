import { PlusIcon } from "@heroicons/react/24/solid";

export const AddCollection = ({ }) => {
  const handleClick = () => {
    alert("Add new collection");
  };

  return (
    <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-2xl flex justify-center items-center">
          <div
            className="p-4 cursor-pointer"
            onClick={handleClick} // Attach click event handler
          >
            <div className="bg-white rounded-2xl shadow-lg p-5 h-32 w-32 flex items-center justify-center">
              <PlusIcon className="w-16 h-16 mx-auto text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};