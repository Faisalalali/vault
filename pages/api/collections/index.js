// pages/api/collections/index.js
import dbConnect from "@/lib/dbConnect";
import Collection from "@/models/Collection";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const collections = await Collection.find({});
        res.status(200).json({ success: true, data: collections});
      } catch (error) {
        res.status(400).json({ message: "Something went wrong." });
      }
      break;
    case "POST":
      try {
        const newCollection = await Collection.create(req.body);
        res.status(201).json({ success: true, data: newCollection });
      } catch (error) {
        res.status(400).json({ message: "Something went wrong." });
      }
      break;
    default:
      res.status(400).json({ message: "Something went wrong." });
      break;
  }
}