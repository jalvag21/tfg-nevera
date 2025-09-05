import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { listReadings, exportReadings } from '../services/api/readings'

export default function Readings(){
  const [fridge,setFridge] = useState(localStorage.getItem('fridge')||'')
  const { data: readings=[] } = useQuery({ enabled: !!fridge, queryKey: ['readings',fridge], queryFn: ()=> listReadings({fridge}) })
  const onExport = async (fmt)=>{
    if(!fridge) return;
    const data = await exportReadings(fridge, fmt);
    if(fmt==='csv'){
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download='readings.csv'; a.click(); URL.revokeObjectURL(url);
    }else{
      const blob = new Blob([JSON.stringify(data,null,2)], { type:'application/json' });
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download='readings.json'; a.click(); URL.revokeObjectURL(url);
    }
  }
  useEffect(()=>{},[fridge])
  return (
    <div className="grid gap-3">
      <div className="flex gap-2">
        <input className="border rounded px-3 py-2" placeholder="ID nevera" value={fridge} onChange={e=>setFridge(e.target.value)} />
        <button className="px-3 py-2 rounded bg-slate-800 text-white" onClick={()=> localStorage.setItem('fridge',fridge)}>Usar nevera</button>
        <button className="px-3 py-2 rounded bg-emerald-700 text-white" onClick={()=> onExport('csv')}>Exportar CSV</button>
        <button className="px-3 py-2 rounded bg-emerald-700 text-white" onClick={()=> onExport('json')}>Exportar JSON</button>
      </div>
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b"><h2 className="font-semibold">Últimas lecturas</h2></div>
        <ul className="divide-y max-h-[60vh] overflow-auto">
          {readings.map(r=>(
            <li key={r._id} className="p-3 flex justify-between">
              <span>{new Date(r.ts).toLocaleString()}</span>
              <span>{r.zone}</span>
              <span>{r.kind} = {r.value}{r.unit || ''}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
