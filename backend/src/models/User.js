import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  roles: { type: [String], default: ['owner'] }
},{ timestamps: true });
export default mongoose.model('User', userSchema);
