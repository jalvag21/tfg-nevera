import Food from '../models/Food.js';
import Reading from '../models/Reading.js';
import { upsertExpiryAlerts } from '../services/alerts.service.js';
import { computeFreshness } from '../services/freshness.service.js';

export async function listFoods(req,res,next){
  try{
    const { fridge } = req.query;
    const q = fridge ? { fridge } : {};
    const foods = await Food.find(q).sort({ expiryDate: 1 });
    res.json(foods);
  }catch(e){ next(e); }
}

export async function createFood(req,res,next){
  try{
    const payload = req.body;
    const temps = await Reading.find({ fridge: payload.fridge, zone: payload.storageZone, kind: 'temperature' }).sort({ ts: -1 }).limit(5);
    payload.freshnessScore = computeFreshness(payload, temps.map(t=>t.value));
    const f = await Food.create(payload);
    // Recalcular alertas de caducidad de la nevera
    await upsertExpiryAlerts(f.fridge);
    res.status(201).json(f);
  }catch(e){ next(e); }
}

export async function updateFood(req,res,next){
  try{
    const { id } = req.params;
    const existing = await Food.findById(id);
    if(!existing) return res.status(404).json({error:'No encontrado'});
    const updated = Object.assign(existing, req.body);
    const temps = await Reading.find({ fridge: updated.fridge, zone: updated.storageZone, kind: 'temperature' }).sort({ ts: -1 }).limit(5);
    updated.freshnessScore = computeFreshness(updated, temps.map(t=>t.value));
    await updated.save();
    // Recalcular alertas de caducidad de la nevera
    await upsertExpiryAlerts(updated.fridge);
    res.json(updated);
  }catch(e){ next(e); }
}

export async function deleteFood(req,res,next){
  try{
    const { id } = req.params;
    await Food.findByIdAndDelete(id);
    res.status(204).end();
  }catch(e){ next(e); }
}
