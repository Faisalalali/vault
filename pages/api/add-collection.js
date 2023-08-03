// pages/api/add-collection.js
import { createCollection, getCollections } from '../../lib/mongodb';

const { eventEmitter } = require('./event-emitter');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const newCollection = JSON.parse(req.body);
      const result = await createCollection(newCollection);

      // Notify all connected clients about the change
      const collections = await getCollections();
      eventEmitter.emit('collections-update', collections);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error adding new collection:', error);
      res.status(500).json({ error: 'Error adding new collection' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}