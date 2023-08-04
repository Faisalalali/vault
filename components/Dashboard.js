// components/Dashboard.js
import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getCollections } from '../utils/apiHelpers';
import ItemInfoCard from './ItemInfoCard';

import {
  InboxArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  AcademicCapIcon
} from '@heroicons/react/24/solid';

const CollectionItem = ({ item, onItemClick }) => {
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

const Collection = ({ collection, index, scrollContainers, scrollPositions, setScrollPositions, setSelectedItem }) => {
  const scrollLeft = () => {
    scrollContainers[index].current.scrollTo({ left: scrollPositions[index] - 200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainers[index].current.scrollTo({ left: scrollPositions[index] + 200, behavior: 'smooth' });
  };

  const handleScroll = () => {
    setScrollPositions((prevScrollPositions) => {
      const newScrollPositions = [...prevScrollPositions];
      newScrollPositions[index] = scrollContainers[index].current.scrollLeft;
      return newScrollPositions;
    });
  };

  // Check if the container is scrollable
  const isScrollable = scrollPositions[index]?.scrollableWidth > scrollPositions[index]?.actualWidth;

  return (
    <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-2xl">
          <div className="relative">
            {/* Parent container with relative positioning */}
            <div className="mr-8 ml-8 relative flex flex-nowrap text-center overflow-x-scroll" ref={scrollContainers[index]} onScroll={handleScroll}>

              {/* Card for the collection icon */}
              <div className="sticky left-0 pt-4">
                <div className="w-12 h-12 p-2 bg-gray-200 rounded-2xl flex items-center">
                  {collection.icon}
                </div>
              </div>

              {/* Cards for each item */}
              {collection.items.map((item, j) => (
                <CollectionItem key={j} item={item} onItemClick={() => setSelectedItem(item)} />
              ))}

              {/* Add new Element */}
              <div className="p-4 flex flex-col items-center sm:w-1/4 md:w-1/5 lg:w-1/6">
                <div className="bg-white rounded-2xl shadow-lg p-5 h-32 w-32 flex items-center justify-center">
                  <PlusIcon className="w-16 h-16 mx-auto text-gray-400" />
                </div>
              </div>
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

const Dashboard = () => {
  const [scrollContainers, setScrollContainers] = useState([]);
  const [scrollPositions, setScrollPositions] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Function to fetch collections from the database
    async function fetchCollections() {
      try {
        const collections = await getCollections();
        setCollections(collections);

        // Create refs for each collection once we have the collections data
        const newScrollContainers = collections.map(() => useRef(null));
        setScrollContainers(newScrollContainers);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    }

    // Fetch initial collections data
    fetchCollections();

    // Socket.io setup for real-time changes
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000'
    );

    // Listen for real-time changes and update the collections state accordingly
    socket.on('databaseChange', (change) => {
      fetchCollections();
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Add collections as a dependency here

  // Update the state with the scrollable and actual width of each container
  useEffect(() => {
    const updateScrollableWidth = () => {
      const updatedScrollPositions = scrollContainers.map((ref) => {
        return {
          scrollableWidth: ref.current.scrollWidth,
          actualWidth: ref.current.offsetWidth,
        };
      });
      setScrollPositions(updatedScrollPositions);
    };
    updateScrollableWidth();
    window.addEventListener('resize', updateScrollableWidth);
    return () => {
      window.removeEventListener('resize', updateScrollableWidth);
    };
  }, [scrollContainers]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {collections.map((collection, i) => (
        <Collection
          key={i}
          collection={collection}
          index={i}
          scrollContainers={scrollContainers}
          scrollPositions={scrollPositions}
          setScrollPositions={setScrollPositions}
          setSelectedItem={setSelectedItem} // Pass setSelectedItem to Collection
        />
      ))}
      <ItemInfoCard selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default Dashboard;