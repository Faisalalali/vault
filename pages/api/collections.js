// pages/api/collections.js
const { connectToDatabase } = require('../../lib/mongodb'); // Changed the import path for connectToDatabase

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const collections = await db.collection('collections').find().toArray();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
