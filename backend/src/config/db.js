import mongoose from 'mongoose';
export const connectDB = async ()=>{
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/nevera';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: 'nevera' });
  console.log('MongoDB conectado');
};
