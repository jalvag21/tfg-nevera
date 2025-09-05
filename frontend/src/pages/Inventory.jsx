import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listFoods, createFood, updateFood, deleteFood } from '../services/api/foods'

export default function Inventory(){
  const [fridge,setFridge] = useState(localStorage.getItem('fridge')||'')
  const qc = useQueryClient()
  const { data: foods=[] } = useQuery({ enabled: !!fridge, queryKey: ['foods',fridge], queryFn: ()=> listFoods(fridge) })
  const mCreate = useMutation({ mutationFn: createFood, onSuccess: ()=> qc.invalidateQueries({queryKey:['foods',fridge]}) })
  useEffect(()=>{ if(!fridge){ const last = sessionStorage.getItem('lastFridge'); if(last) setFridge(last) } },[])

  const onAdd = (e)=>{
    e.preventDefault();
    const form = new FormData(e.target)
    mCreate.mutate({
      fridge,
      name: form.get('name'),
      category: form.get('category'),
      expiryDate: form.get('expiryDate') || null,
      storageZone: form.get('zone') || 'fridge/shelf1'
    })
    e.target.reset()
  }

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        <input className="border rounded px-3 py-2" placeholder="ID nevera" value={fridge} onChange={e=>setFridge(e.target.value)} />
        <button className="px-3 py-2 rounded bg-slate-800 text-white" onClick={()=> localStorage.setItem('fridge',fridge)}>Usar nevera</button>
      </div>

      <section className="bg-white rounded-xl shadow">
        <div className="p-4 border-b"><h2 className="font-semibold">Añadir alimento</h2></div>
        <form onSubmit={onAdd} className="p-4 grid sm:grid-cols-4 gap-2">
          <input name="name" className="border rounded px-3 py-2" placeholder="Nombre" />
          <select name="category" className="border rounded px-3 py-2">
            <option value="lacteo">Lácteo</option><option value="carne">Carne</option><option value="pescado">Pescado</option>
            <option value="verdura">Verdura</option><option value="fruta">Fruta</option><option value="cereal">Cereal</option>
            <option value="huevo">Huevo</option><option value="preparado">Preparado</option><option value="otro">Otro</option>
          </select>
          <input name="expiryDate" type="date" className="border rounded px-3 py-2" />
          <input name="zone" className="border rounded px-3 py-2" placeholder="Zona (fridge/shelf1)" />
          <button className="bg-emerald-600 text-white px-4 py-2 rounded sm:col-span-4">Guardar</button>
        </form>
      </section>

      <section className="bg-white rounded-xl shadow">
        <div className="p-4 border-b"><h2 className="font-semibold">Inventario</h2></div>
        <ul className="divide-y">
          {foods.map(f=>(
            <li key={f._id} className="p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{f.name} <span className="text-sm text-slate-500">({f.category})</span></div>
                <div className="text-sm text-slate-600">Zona: {f.storageZone} · Frescura: {f.freshnessScore}</div>
              </div>
              <button className="text-red-600" onClick={()=> deleteFood(f._id).then(()=> qc.invalidateQueries({queryKey:['foods',fridge]}))}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
