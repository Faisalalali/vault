// models/Item.js
import mongoose from "mongoose";

const passwordHistorySchema = new mongoose.Schema({
  date: Date,
  password: String,
});

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  username: {
    type: String,
    required: false,
  },
  passwordHistory: [passwordHistorySchema],
  password: String,
  type: {
    type: String,
    required: [true, "Please provide a type"],
  },
  apiKey: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  logo: {
    type: String,
    required: [true, "Please provide a logo"],
  },
  notes: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);