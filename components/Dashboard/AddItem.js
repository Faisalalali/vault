import { PlusIcon } from "@heroicons/react/24/solid";

export const AddItem = ({ }) => {
  const handleClick = () => {
    alert("Add new item");
  };

  return (
    <div
      className="p-4 flex flex-col items-center sm:w-1/4 md:w-1/5 lg:w-1/6 cursor-pointer"
      onClick={handleClick} // Attach click event handler
    >
      <div className="bg-white rounded-2xl shadow-lg p-5 h-32 w-32 flex items-center justify-center">
        <PlusIcon className="w-16 h-16 mx-auto text-gray-400" />
      </div>
    </div>
  );
};
