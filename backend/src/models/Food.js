import mongoose from 'mongoose';
const foodSchema = new mongoose.Schema({
  fridge: { type: mongoose.Schema.Types.ObjectId, ref: 'Fridge', required: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['lacteo','carne','pescado','verdura','fruta','cereal','bebida','huevo','preparado','otro'], default: 'otro' },
  brand: String,
  quantity: { amount: { type: Number, default: 1 }, unit: { type: String, default: 'ud' } },
  batchId: { type: String },
  purchaseDate: { type: Date },
  openDate: { type: Date },
  expiryDate: { type: Date },
  storageZone: { type: String, default: 'fridge/shelf1' },
  state: { type: String, enum: ['cerrado','abierto','consumido','desechado'], default: 'cerrado' },
  freshnessScore: { type: Number, default: 100 },
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{ timestamps: true });
foodSchema.index({ expiryDate: 1 });
export default mongoose.model('Food', foodSchema);
