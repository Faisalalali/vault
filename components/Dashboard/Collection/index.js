// component/Dashboard/Collection/index.js
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon
} from '@heroicons/react/24/solid';

import { CollectionItem } from './CollectionItem';
import { AddItem } from './AddItem';

export const Collection = ({ collection, index, scrollContainers, scrollPositions, setScrollPositions, setSelectedItem, onItemAdded }) => {

  // Scroll stuff
  const handleScroll = () => {
    setScrollPositions(scrollPositions.map((position, i) => {
      if (i === index) {
        return {
          scrollableWidth: scrollContainers[index].current.scrollWidth,
          actualWidth: scrollContainers[index].current.offsetWidth,
        };
      } else {
        return position;
      }
    }));
  };
  const scrollLeft = () => {
    scrollContainers[index].current.scrollTo({ left: scrollPositions[index].actualWidth - 200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainers[index].current.scrollTo({ left: scrollPositions[index].actualWidth + 200, behavior: 'smooth' });
  };

  // Check if the container is scrollable. //TODO: This is not working
  const isScrollable = scrollPositions[index] && scrollPositions[index].scrollableWidth > scrollPositions[index].actualWidth;

  // userLevel stuff
  const isAdmin = true; //TODO: Replace with actual userLevel

  return (
    <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-2xl">
          <div className="relative">
            {/* Parent container with relative positioning */}
            <div className="mr-8 ml-8 relative flex flex-nowrap text-center overflow-x-scroll" ref={scrollContainers[index]} onScroll={handleScroll}>

              {/* Card for the collection icon */}
              <div className="sticky left-0 pt-4">
                <div className="w-12 h-12 p-2 bg-gray-200 rounded-2xl flex justify-center">
                  {'📁'}
                </div>
              </div>

              {/* Cards for each item */}
              {collection.items.map((item, j) => (
                <CollectionItem key={j} item={item} onItemClick={() => setSelectedItem({ collectionId: collection._id, itemId: item._id })} />
              ))}

              {/* Add new Element */}
              {isAdmin && (<AddItem collection={collection} onItemAdded={onItemAdded} />)}
            </div>

            {/* Arrows */}
            {/* Hide arrows when the container is not scrollable */}
            {isScrollable && (
              <>
                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center z-30 cursor-pointer" onClick={scrollLeft}>
                  <ChevronLeftIcon className="w-6 h-6 mx-auto text-gray-600" />
                </div>
                <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center z-30 cursor-pointer" onClick={scrollRight}>
                  <ChevronRightIcon className="w-6 h-6 mx-auto text-gray-600" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
