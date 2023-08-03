import { getCollections, createCollection } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const collections = await getCollections();
      res.status(200).json(collections);
    } catch (error) {
      console.error('Error fetching collections:', error);
      res.status(500).json({ error: 'Error fetching collections' });
    }
  } else if (req.method === 'POST') {
    try {
      const newCollection = req.body;
      const result = await createCollection(newCollection);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error adding new collection:', error);
      res.status(500).json({ error: 'Error adding new collection' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
