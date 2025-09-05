import Fridge from '../models/Fridge.js';

export async function listFridges(req,res,next){
  try{
    const userId = req.user.id;
    const fridges = await Fridge.find({ $or: [{owner: userId},{members: userId}] });
    res.json(fridges);
  }catch(e){ next(e); }
}

export async function createFridge(req,res,next){
  try{
    const { name, location, zones=[] } = req.body;
    const owner = req.user.id;
    const fridge = await Fridge.create({ name, location, zones, owner, members: [owner] });
    res.status(201).json(fridge);
  }catch(e){ next(e); }
}
