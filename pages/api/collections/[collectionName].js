// pages/api/collections/[collectionName].js
import dbConnect from '@/lib/dbConnect';
import Item from '@/models/Item';
import Collection from "@/models/Collection";

export default async function handler(req, res) {
  const {
    query: { collectionName },
    method,
    body,
  } = req;

  const collectionId = req.query.collectionId;
  const itemId = req.query.itemId;

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
      case "POST":
        try {
          const collection = await Collection.findOne({ name: collectionName });
          if (!collection) {
            console.error("Collection not found", collectionName);
            return res.status(404).json({ message: "Collection not found." });
          }
          const newItem = req.body;
          collection.items.push(newItem);
          await collection.save();
          res.status(201).json({ success: true, data: newItem });
        } catch (error) {
          console.error("Error adding item", error);
          res.status(400).json({ message: "Something went wrong." });
        }
        break;
      case "POST":
        if (collectionId) {
          // Handle adding an item to the collection
          try {
            const collection = await Collection.findById(collectionId);
            if (!collection) {
              return res.status(404).json({ message: "Collection not found." });
            }
            const newItem = req.body;
            collection.items.push(newItem);
            await collection.save();
            res.status(201).json({ success: true, data: newItem });
          } catch (error) {
            res.status(400).json({ message: "Something went wrong." });
          }
        } else {
          // Handle creating a new collection
          try {
            const newCollection = await Collection.create(req.body);
            res.status(201).json({ success: true, data: newCollection });
          } catch (error) {
            res.status(400).json({ message: "Something went wrong." });
          }
        }
        break;
      case 'DELETE':
        // Perform delete operation here
        await Item.findByIdAndDelete(itemId);
        res.status(200).json({ message: 'Item deleted' });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
  return;
}