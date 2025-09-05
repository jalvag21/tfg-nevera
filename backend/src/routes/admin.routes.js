// routes/admin.routes.js (solo para el desarrollo)
import express from 'express';
import { upsertExpiryAlerts } from '../services/alerts.service.js';
const router = express.Router();

router.post('/alerts/rebuild', async (req, res, next) => {
  try {
    const { fridge } = req.body;
    await upsertExpiryAlerts(fridge);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

export default router;
