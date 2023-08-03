// lib/mongodb.js
import { MongoClient } from 'mongodb';
import eventEmitter from '@/pages/api/event-emitter';
import { initializeSocketIO } from '@/utils/socketManager';

const { MONGODB_URI } = process.env;

let cachedClient = null;

const uri = MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let io;

export async function connectToDatabase(server) {
  if (cachedClient) {
    return cachedClient;
  }

  io = initializeSocketIO(server); // Initialize Socket.IO and pass the server

  const client = await MongoClient.connect(uri, options);

  cachedClient = client;
  return client;
}

export async function getCollections() {
  let pipeline = [];

  const client = await connectToDatabase();
  const db = client.db('vault');
  const collection = db.collection('collections');
  const array = await collection.find().toArray(); // Fix: Assign the results to a new variable 'array'
  console.log('Connected to MongoDB, fetching collections...');
  
  const changeStream = collection.watch(pipeline);
  changeStream.on('change', async (change) => {
    const updatedCollections = await getCollections();
    io.emit('collections-updated', updatedCollections); // Emit the updated collections to all connected clients
    console.log('emitted');
  });

  return array;
}

export async function createCollection(newCollection) { // Fix: Use 'newCollection' instead of 'collection'
  const client = await connectToDatabase();
  const db = client.db('vault');
  const collection = db.collection('collections');
  const result = await collection.insertOne(newCollection); // Fix: Use 'newCollection' instead of 'collection'
  return result.ops[0];
}
