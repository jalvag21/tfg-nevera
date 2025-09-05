import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listFridges, createFridge } from '../services/api/fridges'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Fridges(){
  const qc = useQueryClient()
  const { data: fridges=[] } = useQuery({ queryKey: ['fridges'], queryFn: listFridges })
  const [name,setName] = useState(''); const [loc,setLoc] = useState(''); const [zones,setZones] = useState('fridge/shelf1,freezer/top')
  const m = useMutation({ mutationFn: createFridge, onSuccess: ()=> qc.invalidateQueries({queryKey:['fridges']}) })
  const onCreate = (e)=>{ e.preventDefault(); m.mutate({ name, location: loc, zones: zones.split(',').map(s=>s.trim()) }) }
  return (
    <div className="grid gap-6">
      <section>
        <h1 className="text-xl font-semibold mb-2">Mis neveras</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fridges.map(f=>(
            <Link key={f._id} to={`/fridges/${f._id}`} className="bg-white p-4 rounded-xl shadow hover:shadow-md">
              <h3 className="font-semibold">{f.name}</h3>
              <p className="text-sm text-slate-600">{f.location || 'Sin ubicación'}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-white rounded-xl p-4 shadow">
        <h2 className="font-semibold mb-2">Conectar nueva nevera</h2>
        <form onSubmit={onCreate} className="grid sm:grid-cols-3 gap-2">
          <input className="border rounded px-3 py-2" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Ubicación" value={loc} onChange={e=>setLoc(e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Zonas (coma)" value={zones} onChange={e=>setZones(e.target.value)} />
          <button className="bg-emerald-600 text-white px-4 py-2 rounded sm:col-span-3">Crear</button>
        </form>
      </section>
    </div>
  )
}
