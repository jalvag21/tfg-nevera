// services/alerts.service.js
import mongoose from 'mongoose';
import Food from '../models/Food.js';
import Alert from '../models/Alert.js';

const toId = v => (v instanceof mongoose.Types.ObjectId ? v : new mongoose.Types.ObjectId(String(v)));

const daysBetween = (a, b) => Math.floor((a.getTime() - b.getTime()) / (24*60*60*1000));

export async function upsertExpiryAlerts(fridgeIdRaw) {
  const fridgeId = toId(fridgeIdRaw);
  const now = new Date();

  // 1) obtenemos foods con fecha
  const foods = await Food.find({ fridge: fridgeId, expiryDate: { $exists: true } })
                          .select('_id name expiryDate fridge');

  // DEBUG (puedes quitar luego):
  // console.log('[alerts] foods to evaluate:', foods.length);

  for (const f of foods) {
    const daysLeft = daysBetween(f.expiryDate, now);
    let severity = null;
    if (daysLeft <= 0) severity = 'critical';
    else if (daysLeft <= 2) severity = 'warning';

    if (severity) {
      const message = daysLeft <= 0
        ? `Caducado: ${f.name}`
        : `Caduca en ${daysLeft} día(s): ${f.name}`;

      await Alert.findOneAndUpdate(
        { fridge: fridgeId, type: 'expiry', food: f._id, active: true },
        {
          $set: { severity, message, active: true, updatedAt: new Date() },
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true, new: true }
      );
      // console.log('[alerts] upsert expiry ->', f.name, severity);
    } else {
      // si ya no aplica, desactivamos cualquier alerta activa de caducidad para ese food
      await Alert.updateMany(
        { fridge: fridgeId, type: 'expiry', food: f._id, active: true },
        { $set: { active: false, updatedAt: new Date() } }
      );
      // console.log('[alerts] clear expiry ->', f.name);
    }
  }
}





/*import Food from '../models/Food.js';
import Alert from '../models/Alert.js';

function daysBetween(a, b) {
  const MS = 24 * 60 * 60 * 1000;
  return Math.floor((a.getTime() - b.getTime()) / MS);
}

export async function upsertExpiryAlerts(fridgeId) {
  const now = new Date();
  const foods = await Food.find({
    fridge: fridgeId,
    expiryDate: { $exists: true },
  }).select('_id name expiryDate fridge');

  // Para no duplicar: una alerta activa por food+type
  for (const f of foods) {
    const daysLeft = daysBetween(f.expiryDate, now);
    let severity = null;
    if (daysLeft <= 0) severity = 'critical';
    else if (daysLeft <= 2) severity = 'warning';

    if (severity) {
      const message =
        daysLeft <= 0
          ? `Caducado: ${f.name}`
          : `Caduca en ${daysLeft} día(s): ${f.name}`;
      await Alert.findOneAndUpdate(
        { fridge: fridgeId, type: 'expiry', food: f._id, active: true },
        {
          $set: {
            severity,
            message,
            active: true,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true, new: true }
      );
    } else {
      // Si ya no aplica, desactiva (o borra) la alerta activa de caducidad para ese food
      await Alert.updateMany(
        { fridge: fridgeId, type: 'expiry', food: f._id, active: true },
        { $set: { active: false, updatedAt: new Date() } }
      );
    }
  }
}*/
