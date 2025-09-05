import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { listAlerts, ackAlert } from '../controllers/alert.controller.js';
const r = Router();
r.use(auth);
r.get('/', listAlerts);
r.patch('/:id/ack', ackAlert);
export default r;
