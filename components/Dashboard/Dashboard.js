// components/Dashboard.js
import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getCollections } from '../../utils/apiHelpers';

import ItemInfoCard from './ItemInfoCard';
import { Collection } from './Collection';
import { AddCollection } from './AddCollection';

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

      <AddCollection />
    </div>
  );
};

export default Dashboard;