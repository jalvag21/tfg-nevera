import User from '../models/User.js';
export async function me(req,res,next){
  try{
    const u = await User.findById(req.user.id).select('-passwordHash');
    res.json(u);
  }catch(e){ next(e); }
}
export async function updateMe(req,res,next){
  try{
    const { name } = req.body;
    const u = await User.findByIdAndUpdate(req.user.id, { name }, { new: true }).select('-passwordHash');
    res.json(u);
  }catch(e){ next(e); }
}
