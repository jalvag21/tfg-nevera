import { useQuery } from '@tanstack/react-query'
import { me } from '../services/api/auth'
export default function User(){
  const { data:user } = useQuery({ queryKey:['me'], queryFn: me })
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h1 className="text-xl font-semibold mb-2">Mi cuenta</h1>
      <pre className="text-sm">{JSON.stringify(user,null,2)}</pre>
    </div>
  )
}
