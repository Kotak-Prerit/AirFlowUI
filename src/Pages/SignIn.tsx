import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function SignInPage() {
  const API_BASE = import.meta.env.VITE_API_URL || 'https://airflow.onrender.com/api'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accept, setAccept] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !password) { toast.warning('All fields are required'); return }
    if (username.length < 2 || username.length > 20) { toast.warning('Username must be 2-20 characters'); return }
    if (!accept) { toast.warning('Please accept Terms and Conditions'); return }
    try {
      setLoading(true)
      const res = await fetch(`${API_BASE}/auth/signin`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const ct = res.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await res.json() : await res.text()
      if (!res.ok) throw new Error((ct.includes('application/json') ? (data as any)?.message : String(data)) || 'Failed to sign in')
      toast.success('Signed in')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-950 border border-zinc-800 rounded-3xl p-4 md:p-6">
        <div className="bg-zinc-900 rounded-2xl overflow-hidden h-[75vh] w-full flex items-center justify-center p-4 md:p-6">
          <img src="/illustration.png" alt="Illustration" className="w-full h-full object-contain" />
        </div>
        <div className="px-2 md:px-4 py-2 md:py-6">
          <div className="flex justify-end text-sm text-zinc-400 mb-6">
            <a href="/signup" className="hover:text-white">Don’t have an account? <span className="text-blue-400">Sign up</span></a>
          </div>
          <h1 className="text-4xl font-semibold mb-6">Sign in</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-3">
              <label className="block text-sm">Username</label>
              <input value={username} onChange={e=>setUsername(e.target.value)} required className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none" placeholder="yourname" />
            </div>
            <div className="space-y-3">
              <label className="block text-sm">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none" placeholder="••••••••" />
            </div>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <input type="checkbox" checked={accept} onChange={e=>setAccept(e.target.checked)} />
              I agree to the <a href="/terms" className="text-blue-400 hover:underline">Terms and Conditions</a>
            </label>
            <button disabled={loading} className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 font-medium disabled:opacity-50">{loading? 'Signing in...':'Sign in'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}


