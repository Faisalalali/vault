// models/collection.js

import mongoose from 'mongoose';
import Item from './Item';

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  icon: {
    type: String,
    default: '📁',
  },
  items: {
    type: [Item.schema],
    required: false,
  },
});

export default mongoose.models.Collection || mongoose.model('Collection', collectionSchema);