import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { listFridges, createFridge } from '../controllers/fridge.controller.js';
const r = Router();
r.use(auth);
r.get('/', listFridges);
r.post('/', createFridge);
export default r;
