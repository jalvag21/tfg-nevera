/*import mongoose from 'mongoose';
const alertSchema = new mongoose.Schema({
  fridge: { type: mongoose.Schema.Types.ObjectId, ref: 'Fridge', required: true },
  type: { type: String, enum: ['expiry','temperature','stock'], required: true },
  severity: { type: String, enum: ['info','warn','critical'], default: 'info' },
  message: { type: String, required: true },
  food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  zone: { type: String },
  ackBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
},{ timestamps: true });
export default mongoose.model('Alert', alertSchema);*/
// models/Alert.js
import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const AlertSchema = new Schema({
  fridge: { type: Types.ObjectId, ref: 'Fridge', required: true, index: true },
  type:   { type: String, enum: ['expiry','temperature','stock'], required: true, index: true },
  severity: { type: String, enum: ['info','warning','critical'], default: 'info' },
  message:  { type: String, required: true },
  food:   { type: Types.ObjectId, ref: 'Food', index: true },
  zone:   { type: String },
  active: { type: Boolean, default: true, index: true },
  ackBy:  { type: Types.ObjectId, ref: 'User' }
}, { timestamps: true });

AlertSchema.index({ fridge: 1, type: 1, food: 1, active: 1 });

export default model('Alert', AlertSchema);
