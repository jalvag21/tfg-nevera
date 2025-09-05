import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function register(req,res,next){
  try{
    const { email, password, name } = req.body;
    if(!email || !password || !name) return res.status(400).json({error:'Campos requeridos'});
    const exists = await User.findOne({email});
    if(exists) return res.status(409).json({error:'Email ya registrado'});
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name });
    res.status(201).json({ id: user._id });
  }catch(e){ next(e); }
}

export async function login(req,res,next){
  try{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(401).json({error:'Credenciales inválidas'});
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(401).json({error:'Credenciales inválidas'});
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'devsecret', { expiresIn: process.env.JWT_EXPIRES || '7d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name }});
  }catch(e){ next(e); }
}
