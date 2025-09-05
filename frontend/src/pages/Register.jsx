import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/api/auth'
export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [ok,setOk] = useState(false)
  const [err,setErr] = useState('')
  const nav = useNavigate()
  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      await register({ name, email, password })
      setOk(true)
      setTimeout(()=> nav('/login'), 800)
    }catch(e){ setErr(e?.response?.data?.error || 'Error'); }
  }
  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Crear cuenta</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border px-3 py-2 rounded" placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Crear</button>
      </form>
      {ok && <p className="text-green-700 mt-2">Cuenta creada.</p>}
      <p className="text-sm mt-3">¿Ya tienes cuenta? <Link to="/login" className="text-blue-600">Inicia sesión</Link></p>
    </div>
  )
}
