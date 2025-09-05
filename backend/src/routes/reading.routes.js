import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { listReadings, createReading } from '../controllers/reading.controller.js';
const r = Router();
r.use(auth);
r.get('/', listReadings);
r.post('/', createReading);
export default r;
