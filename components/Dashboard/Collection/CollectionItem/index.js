// component/Dashboard/Collection/CollectionItem/index.js
export const CollectionItem = ({ item, onItemClick }) => {
  const handleClick = () => {
    onItemClick(item);
  };

  return (
    <div
      className="p-4 flex flex-col items-center sm:w-1/4 md:w-1/5 lg:w-1/6 cursor-pointer"
      onClick={handleClick} // Attach click event handler
    >
      <div className="bg-white rounded-2xl shadow-lg p-5 h-32 w-32 flex items-center justify-center">
        <img src={item.icon} alt={item.name} />
      </div>
      <div className="mt-2 max-h-16 max-w-full overflow-hidden">
        <h3 className="text-l p-1 text-center truncate">{item.name}</h3>
      </div>
    </div>
  );
};
