import api from './client'
export async function listReadings(params){ const {data}=await api.get('/readings',{ params }); return data; }
export async function exportReadings(fridge, format='json'){ const url = `/export/readings?fridge=${fridge}&format=${format}`; const res = await api.get(url, { responseType: format==='csv' ? 'blob' : 'json' }); return res.data; }
