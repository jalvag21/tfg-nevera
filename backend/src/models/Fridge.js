import mongoose from 'mongoose';
const fridgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  zones: [{ type: String }]
},{ timestamps: true });
export default mongoose.model('Fridge', fridgeSchema);
