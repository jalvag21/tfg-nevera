import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import app from './app.js';
import './jobs/cron.js';

dotenv.config();
const port = process.env.PORT || 4000;

connectDB().then(()=>{
  app.listen(port, ()=> console.log('API listening on', port));
});
