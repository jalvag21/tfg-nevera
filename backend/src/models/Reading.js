import mongoose from 'mongoose';
const readingSchema = new mongoose.Schema({
  fridge: { type: mongoose.Schema.Types.ObjectId, ref: 'Fridge', required: true },
  zone: { type: String, required: true },
  kind: { type: String, enum: ['temperature','humidity'], required: true },
  value: { type: Number, required: true },
  unit: { type: String, default: '°C' },
  source: { type: String, default: 'sensor_sim' },
  ts: { type: Date, default: Date.now }
});
readingSchema.index({ fridge:1, zone:1, ts: -1 });
export default mongoose.model('Reading', readingSchema);
