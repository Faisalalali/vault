// components/Dashboard/Dashboard.js
import { useState, useEffect } from 'react';
import EventSource from 'eventsource';

import ItemInfoCard from './ItemInfoCard';
import { Collection as CollectionContainer } from './Collection';
import { AddCollection } from './AddCollection';

const Dashboard = ({ collections: initialCollections }) => {
  const [scrollContainers, setScrollContainers] = useState([]);
  const [scrollPositions, setScrollPositions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [collections, setCollections] = useState(initialCollections);

  useEffect(() => {
    async function fetchCollections() {
      const res = await fetch('/api/collections');
      const { data } = await res.json();
      setCollections(data);
    }

    // Replace socket.io with Server-Sent Events (SSE)
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event) => {
      if (event.data === 'update') {
        fetchCollections();
      }
    };

    // Clean up the SSE connection on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

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

  const onCollectionAdded = (newCollection) => {
    setCollections([...collections, newCollection]);
  };

  const onItemAdded = (collectionId, newItem) => {
    const collectionIndex = collections.findIndex(collection => collection._id === collectionId);
    const newCollections = [...collections];
    newCollections[collectionIndex].items.push(newItem);
    setCollections(newCollections);
  };

  const onUpdateItem = async (collectionId, itemId, updatedItem) => {
    try {
      const response = await fetch(`/api/collections/${collectionId}/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const updatedCollections = collections.map((collection) => {
          if (collection._id === collectionId) {
            return {
              ...collection,
              items: collection.items.map((item) => {
                if (item._id === itemId) {
                  return updatedItem;
                }
                return item;
              }),
            };
          }
          return collection;
        });
        setCollections(updatedCollections);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const onDeleteItem = async (collectionId, itemId) => {
    try {
      const response = await fetch(`/api/collections/${collectionId}/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedCollections = collections.map((collection) => {
          if (collection._id === collectionId) {
            return {
              ...collection,
              items: collection.items.filter((item) => item._id !== itemId),
            };
          }
          return collection;
        });
        setCollections(updatedCollections);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      {
        collections.map((collection, i) => (
          <CollectionContainer
            key={i}
            collection={collection}
            index={i}
            scrollContainers={scrollContainers}
            scrollPositions={scrollPositions}
            setScrollPositions={setScrollPositions}
            setSelectedItem={setSelectedItem}
            onItemAdded={onItemAdded}
          />
        ))}
      <ItemInfoCard selectedItem={selectedItem} onClose={() => setSelectedItem(null)} onUpdateItem={onUpdateItem} onDeleteItem={onDeleteItem} />

      <AddCollection onCollectionAdded={onCollectionAdded} />
    </div>
  );
};

export default Dashboard;