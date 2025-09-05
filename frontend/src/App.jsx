import { Link, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Fridges from './pages/Fridges.jsx'
import FridgeDashboard from './pages/FridgeDashboard.jsx'
import Inventory from './pages/Inventory.jsx'
import Readings from './pages/Readings.jsx'
import Alerts from './pages/Alerts.jsx'
import Settings from './pages/Settings.jsx'
import User from './pages/User.jsx'
import { getToken } from './services/api/auth.js'

function Layout({ children }){
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow px-4 py-3 flex gap-4 sticky top-0">
        <Link to="/fridges" className="font-semibold">Neveras</Link>
        <Link to="/inventory">Inventario</Link>
        <Link to="/readings">Lecturas</Link>
        <Link to="/alerts">Alertas</Link>
        <Link to="/settings">Ajustes</Link>
        <div className="ml-auto">
          <Link to="/user">Cuenta</Link>
        </div>
      </nav>
      <main className="p-4 max-w-6xl mx-auto">{children}</main>
    </div>
  )
}

function PrivateRoute({ children }){
  const token = getToken()
  if(!token) return <Navigate to="/login" replace />
  return children
}

export default function App(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={
        <PrivateRoute>
          <Layout>
            <Routes>
              <Route path="fridges" element={<Fridges />} />
              <Route path="fridges/:id" element={<FridgeDashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="readings" element={<Readings />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="settings" element={<Settings />} />
              <Route path="user" element={<User />} />
              <Route path="*" element={<Navigate to="/fridges" />} />
            </Routes>
          </Layout>
        </PrivateRoute>
      } />
    </Routes>
  )
}
