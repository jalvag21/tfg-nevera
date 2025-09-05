import { Router } from 'express';
import auth from '../middlewares/auth.js';
import Food from '../models/Food.js';
import Reading from '../models/Reading.js';

const r = Router();
r.use(auth);

function toCSV(rows){
  if(!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = (v)=>{
    if(v === null || v === undefined) return '';
    const s = String(v).replaceAll('"','""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  }
  const lines = [headers.join(',')];
  for(const row of rows){
    lines.push(headers.map(h=> escape(row[h])).join(','));
  }
  return lines.join('\n');
}

r.get('/foods', async (req,res,next)=>{
  try{
    const { fridge, format='json' } = req.query;
    const q = fridge ? { fridge } : {};
    const docs = await Food.find(q).lean();
    if(format === 'csv'){
      const flat = docs.map(d=> ({
        id: d._id,
        fridge: d.fridge,
        name: d.name,
        category: d.category,
        amount: d.quantity?.amount ?? '',
        unit: d.quantity?.unit ?? '',
        expiryDate: d.expiryDate ?? '',
        openDate: d.openDate ?? '',
        storageZone: d.storageZone ?? '',
        freshnessScore: d.freshnessScore ?? '',
        createdAt: d.createdAt ?? '',
        updatedAt: d.updatedAt ?? ''
      }));
      const csv = toCSV(flat);
      res.setHeader('Content-Type','text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="foods.csv"');
      return res.send(csv);
    }
    res.json(docs);
  }catch(e){ next(e); }
});

r.get('/readings', async (req,res,next)=>{
  try{
    const { fridge, format='json' } = req.query;
    const q = fridge ? { fridge } : {};
    const docs = await Reading.find(q).lean();
    if(format === 'csv'){
      const flat = docs.map(d=> ({
        id: d._id,
        fridge: d.fridge,
        zone: d.zone,
        kind: d.kind,
        value: d.value,
        unit: d.unit,
        ts: d.ts,
        source: d.source
      }));
      const csv = toCSV(flat);
      res.setHeader('Content-Type','text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="readings.csv"');
      return res.send(csv);
    }
    res.json(docs);
  }catch(e){ next(e); }
});

export default r;
