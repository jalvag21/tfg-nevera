import Alert from '../models/Alert.js';
export async function listAlerts(req,res,next){
  try{
    const { fridge } = req.query;
    const q = fridge ? { fridge } : {};
    const alerts = await Alert.find(q).sort({ createdAt: -1 });
    res.json(alerts);
  }catch(e){ next(e); }
}
export async function ackAlert(req,res,next){
  try{
    const { id } = req.params;
    const a = await Alert.findByIdAndUpdate(id, { ackBy: req.user.id }, { new: true });
    res.json(a);
  }catch(e){ next(e); }
}
