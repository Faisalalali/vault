// components/Dashboard.js
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client'; // Import socket.io-client

const ENDPOINT = 'http://localhost:5000'; // Replace with the correct endpoint of your server

import {
  InboxArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  AcademicCapIcon
} from '@heroicons/react/24/solid';

const CollectionItem = ({ item }) => (
  <div className="p-4 flex flex-col items-center sm:w-1/4 md:w-1/5 lg:w-1/6">
    <div className="bg-white rounded-2xl shadow-lg p-5 h-32 w-32 flex items-center justify-center">
      <img src={item.icon} alt={item.name} />
    </div>
    <div className="mt-2 max-h-16 max-w-full overflow-hidden">
      <h3 className="text-l p-1 text-center truncate">{item.name}</h3>
    </div>
  </div>
);

const Collection = ({ collection, index, scrollContainers, scrollPositions, setScrollPositions }) => {
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
                <CollectionItem key={j} item={item} />
              ))}

              {/* Add new Element */}
              <div className="p-4 flex flex-col items-center sm:w-1/4 md:w-1/5 lg:w-1/6">
                <div className="bg-white rounded-2xl shadow-lg p-5 h-32 w-32 flex items-center justify-center">
                  <PlusIcon className="w-16 h-16 mx-auto text-gray-400" />
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center z-30 cursor-pointer" onClick={scrollLeft}>
              <ChevronLeftIcon className="w-6 h-6 mx-auto text-gray-600" />
            </div>
            <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center z-30 cursor-pointer" onClick={scrollRight}>
              <ChevronRightIcon className="w-6 h-6 mx-auto text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const scrollContainers = useRef([]);
  const [scrollPositions, setScrollPositions] = useState([]);

  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState({ name: '', icon: '' });

  const collectionsUpdateHandler = (data) => {
    console.log('collections-update event received:', data);
    setCollections(data);
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT); // Connect to the server using socket.io-client

    const fetchCollections = async () => {
      try {
        const response = await axios.get('/api/collections');
        const data = response.data;
        setCollections(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();

    // Set up a Socket.IO listener to receive real-time updates
    socket.on('collections-updated', collectionsUpdateHandler);

    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {collections.map((collection, i) => (
        <Collection
          key={i}
          collection={collection}
          index={i}
          scrollContainers={scrollContainers.current}
          scrollPositions={scrollPositions}
          setScrollPositions={setScrollPositions}
        />
      ))}
      {/* Form for adding new collection */}
      {/* <form className="max-w-7xl mx-auto p-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Collection Name"
          value={newCollection.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="icon"
          placeholder="Icon URL"
          value={newCollection.icon}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Collection</button>
      </form> */}
    </div>
  );
};

export default Dashboard;