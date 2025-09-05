import { useParams, Link } from 'react-router-dom'
export default function FridgeDashboard(){
  const { id } = useParams()
  sessionStorage.setItem('lastFridge', id)
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">Nevera seleccionada</h1>
        <span className="px-2 py-1 rounded bg-slate-200 text-sm">{id}</span>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <Link to="/inventory" className="bg-white p-4 rounded-xl shadow">Inventario</Link>
        <Link to="/readings" className="bg-white p-4 rounded-xl shadow">Lecturas</Link>
        <Link to="/alerts" className="bg-white p-4 rounded-xl shadow">Alertas</Link>
      </div>
    </div>
  )
}
