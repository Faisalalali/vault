// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

export default mongoose.models.User || mongoose.model('User', userSchema);