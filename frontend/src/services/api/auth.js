import api from './client'
export function setToken(t){ localStorage.setItem('token', t); }
export function getToken(){ return localStorage.getItem('token'); }
export function clearToken(){ localStorage.removeItem('token'); }
export async function login(email,password){
  const { data } = await api.post('/auth/login',{email,password})
  setToken(data.token)
  return data.user
}
export async function register(payload){
  const { data } = await api.post('/auth/register', payload)
  return data
}
export async function me(){
  const { data } = await api.get('/users/me')
  return data
}
