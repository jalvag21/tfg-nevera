import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listAlerts, ackAlert } from '../services/api/alerts'

export default function Alerts(){
  const [fridge,setFridge] = useState(localStorage.getItem('fridge')||'')
  const qc = useQueryClient()
  const { data: alerts=[] } = useQuery({ enabled: !!fridge, queryKey: ['alerts',fridge], queryFn: ()=> listAlerts(fridge) })
  const m = useMutation({ mutationFn: ackAlert, onSuccess: ()=> qc.invalidateQueries({queryKey:['alerts',fridge]}) })
  return (
    <div className="grid gap-3">
      <div className="flex gap-2">
        <input className="border rounded px-3 py-2" placeholder="ID nevera" value={fridge} onChange={e=>setFridge(e.target.value)} />
        <button className="px-3 py-2 rounded bg-slate-800 text-white" onClick={()=> localStorage.setItem('fridge',fridge)}>Usar nevera</button>
      </div>
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b"><h2 className="font-semibold">Alertas</h2></div>
        <ul className="divide-y">
          {alerts.map(a=>(
            <li key={a._id} className="p-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{a.type} · {a.severity}</div>
                <div className="text-sm text-slate-600">{a.message}</div>
              </div>
              {!a.ackBy && <button className="px-3 py-1 rounded bg-emerald-600 text-white" onClick={()=> m.mutate(a._id)}>OK</button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
