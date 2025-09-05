import api from './client'
export async function listFoods(fridge){ const {data}=await api.get('/foods',{params:{fridge}}); return data; }
export async function createFood(payload){ const {data}=await api.post('/foods',payload); return data; }
export async function updateFood(id,payload){ const {data}=await api.patch(`/foods/${id}`,payload); return data; }
export async function deleteFood(id){ return api.delete(`/foods/${id}`); }
