import api from './client'
export async function listFridges(){ const {data} = await api.get('/fridges'); return data; }
export async function createFridge(payload){ const {data} = await api.post('/fridges', payload); return data; }
