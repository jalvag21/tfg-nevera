import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/api/auth'
export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [err,setErr] = useState('')
  const nav = useNavigate()
  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      await login(email,password)
      nav('/fridges')
    }catch(e){ setErr(e?.response?.data?.error || 'Error'); }
  }
  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Iniciar sesión</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Entrar</button>
      </form>
      <p className="text-sm mt-3">¿Sin cuenta? <Link to="/register" className="text-blue-600">Regístrate</Link></p>
    </div>
  )
}
