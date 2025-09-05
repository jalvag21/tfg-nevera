import Reading from '../models/Reading.js';

export async function listReadings(req,res,next){
  try{
    const { fridge, zone, from, to } = req.query;
    const q = {};
    if(fridge) q.fridge = fridge;
    if(zone) q.zone = zone;
    if(from || to){
      q.ts = {};
      if(from) q.ts.$gte = new Date(from);
      if(to) q.ts.$lte = new Date(to);
    }
    const rows = await Reading.find(q).sort({ ts: -1 }).limit(500);
    res.json(rows);
  }catch(e){ next(e); }
}

export async function createReading(req,res,next){
  try{
    const r = await Reading.create(req.body);
    res.status(201).json(r);
  }catch(e){ next(e); }
}
