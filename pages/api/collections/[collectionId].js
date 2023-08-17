// pages/api/collections/[collectionName].js
import dbConnect from '@/lib/dbConnect';
import Collection from "@/models/Collection";

export default async function handler(req, res) {
  const {
    query: { collectionId },
    method,
    body,
  } = req;

  // Connect to the database
  await dbConnect();

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      throw new Error("Collection not found.");
    }

    switch (method) {
      case 'GET':
        res.status(200).json(collection);
        break;
      case 'PUT':
        collection.set(body);
        await collection.save();
        res.status(200).json({ success: true, data: collection });
        break;
      case 'DELETE':
        await collection.remove();
        res.status(200).json({ success: true, data: {} });
        break;
      default:
        res.status(400).json({ message: "Method not supported." });
    }
  } catch (error) {
    console.error(error);
    if (error.message === "Collection not found.") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
  return;
}
