// utils/db.js
import clientPromise, { connectToDatabase } from "../lib/mongodb";

export async function createCollection(data) {
  const client = connectToDatabase();
  const db = client.db("vault");
  const collection = await db.collection("collections").insertOne(data);
  return collection.ops[0];
}

export async function getCollections() {
  const client = connectToDatabase();
  const db = client.db("vault");
  const collection = await db.collection("collections");
  console.log("Connected to MongoDB, fetching collections...");
  const emails = await collection.find({}).toArray();
  const changeStream = collection.watch();

  changeStream.on("change", (change) => {
    console.log("Change detected:", change);
  });

  return emails;
}

export async function getCollectionChangeStream() {
  const client = connectToDatabase();
  console.log("Connected to MongoDB, watching collection changes...");
  const db = client.db("vault");
  return db.collection("collections").watch();
}
