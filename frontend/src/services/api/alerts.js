import api from './client'
export async function listAlerts(fridge){ const {data}=await api.get('/alerts',{params:{fridge}}); return data; }
export async function ackAlert(id){ const {data}=await api.patch(`/alerts/${id}/ack`); return data; }
