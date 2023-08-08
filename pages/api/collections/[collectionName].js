// pages/api/collections/[collectionName].js
import dbConnect from '@/lib/dbConnect';
import Item from '@/models/Item';
// import { getSession } from 'next-auth/react';


export default async function handler(req, res) {
  const {
    query: { collectionName },
    method,
    body,
  } = req;

  /* const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  } */


  // Connect to the database
  await dbConnect();

  try {
    switch (method) {
      case 'GET':
        const items = await Item.find({
          name: collectionName,
        }).sort({ createdAt: -1 });
        res.status(200).json(items);
        break;
      case 'POST':
        const newItem = new Item(body);
        const item = await newItem.save();
        res.status(201).json(item);
        break;
      default:
        res.status(405).json({ message: 'Method Not Allowed' });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
  return;
  if (req.method === 'GET') {
    // Get collection info
    const item = await collection.findOne({ name: collectionName });
    if (!item) {
      res.status(404).json({ message: 'Collection not found' });
    } else {
      res.status(200).json(item);
    }
  } else if (req.method === 'POST') {
    // Create new item in the collection
    const { newItem } = req.body;
    const result = await collection.insertOne(newItem);
    res.status(201).json(result.ops[0]);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}