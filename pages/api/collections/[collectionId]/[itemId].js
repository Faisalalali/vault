// pages/api/collections/[collectionName]/[itemId].js
import dbConnect from '@/lib/dbConnect';
import Collection from "@/models/Collection";

async function findCollectionAndItem(collectionId, itemId) {
  const collection = await Collection.findById(collectionId);
  if (!collection) {
    throw new Error("Collection not found.");
  }
  const item = itemId ? collection.items.id(itemId) : null;
  if (itemId && !item) {
    throw new Error("Item not found.");
  }
  return { collection, item };
}

export default async function handler(req, res) {
  const {
    query: { collectionId, itemId },
    method,
    body,
  } = req;

  // Connect to the database
  await dbConnect();

  try {
    const { collection, item } = await findCollectionAndItem(collectionId, itemId);

    switch (method) {
      case 'GET':
        res.status(200).json(item);
        break;
      case 'PUT':
        item.set(body);
        await collection.save();
        res.status(200).json({ success: true, data: item });
        break;
      case 'DELETE':
        if (item) {
          collection.items = collection.items.filter(i => i._id.toString() !== itemId);
          await collection.save();
          res.status(200).json({ success: true, data: item });
        } else {
          throw new Error("Item not found.");
        }
        break;
      default:
        res.status(400).json({ message: "Method not supported." });
    }
  } catch (error) {
    console.error(error);
    if (error.message === "Collection not found." || error.message === "Item not found.") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error' });
    }
  }
  return;
}
