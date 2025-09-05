import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { me, updateMe } from '../controllers/user.controller.js';
const r = Router();
r.use(auth);
r.get('/me', me);
r.patch('/me', updateMe);
export default r;
