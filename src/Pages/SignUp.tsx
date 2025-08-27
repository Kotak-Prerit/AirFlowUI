import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function SignUpPage() {
  const API_BASE = (import.meta as any).env?.VITE_API_URL || '/api'
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [sending, setSending] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function requestOtp() {
    setMessage(null)
    if (!username || !email) { setMessage('Username and email are required'); return }
    try {
      setSending(true)
      const res = await fetch(`${API_BASE}/auth/request-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username })
      })
      const ct = res.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await res.json() : await res.text()
      if (!res.ok) throw new Error((ct.includes('application/json') ? (data as any)?.message : String(data)) || 'Failed to send OTP')
      setMessage('Verification code sent to your email')
      toast.success('Verification code sent')
    } catch (err: any) {
      setMessage(err.message)
      toast.error(err.message)
    } finally { setSending(false) }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!username || !email || !otp || !password) { setMessage('All fields are required'); toast.warning('All fields are required'); return }
    if (password.length < 8 || !/[@_$]/.test(password)) {
      const msg = 'Password must be at least 8 characters and include one of @ _$'
      setMessage(msg)
      toast.warning(msg)
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, otp })
      })
      const ct = res.headers.get('content-type') || ''
      const data = ct.includes('application/json') ? await res.json() : await res.text()
      if (!res.ok) {
        const msg = (ct.includes('application/json') ? (data as any)?.message : String(data)) || 'Failed to create account'
        if (typeof msg === 'string' && msg.toLowerCase().includes('username')) {
          toast.error('Username already exists')
        }
        throw new Error(msg)
      }
      setMessage('Account created. You can sign in now.')
      toast.success('Account created')
      navigate('/signin')
    } catch (err: any) {
      setMessage(err.message)
      toast.error(err.message)
    } finally { setSubmitting(false) }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-950 border border-zinc-800 rounded-3xl p-4 md:p-6">
        <div className="bg-zinc-900 rounded-2xl overflow-hidden h-[75vh] w-full flex items-center justify-center p-4 md:p-6">
          <img src="/illustration.png" alt="Illustration" className="w-full h-full object-contain" />
        </div>
        <div className="px-2 md:px-4 py-2 md:py-6">
          <div className="flex justify-end text-sm text-zinc-400 mb-6">
            <a href="/signin" className="hover:text-white">Already have an account? <span className="text-blue-400">Sign in</span></a>
          </div>
          <h1 className="text-4xl font-semibold mb-6">Sign up</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 py-2.5 text-sm hover:bg-zinc-800">
              <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.047,6.053,28.761,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.047,6.053,28.761,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.176,0,9.86-1.982,13.409-5.221l-6.19-5.238C29.127,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.952l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.092,5.571c0.001-0.001,0.001-0.001,0.002-0.002l6.19,5.238C36.271,40.017,44,35,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              Sign up with Google
            </button>

            <div className="h-px bg-zinc-800" />

            <div className="space-y-3">
              <label className="block text-sm">Username</label>
              <input required value={username} onChange={e=>setUsername(e.target.value)} className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none" placeholder="yourname" />
            </div>
            <div className="space-y-3">
              <label className="block text-sm">Email</label>
              <div className="flex gap-2">
                <input required value={email} onChange={e=>setEmail(e.target.value)} className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none" placeholder="you@example.com" type="email" />
                <button type="button" onClick={requestOtp} disabled={sending} className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-800 disabled:opacity-50">{sending? 'Sending...':'Verify'}</button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm">OTP</label>
              <input required value={otp} onChange={e=>setOtp(e.target.value)} className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none" placeholder="6-digit code" />
            </div>
            <div className="space-y-3">
              <label className="block text-sm">Password</label>
              <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 outline-none" placeholder="••••••••" />
            </div>
            {message && <p className="text-sm text-zinc-400">{message}</p>}
            <button disabled={submitting} className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 font-medium disabled:opacity-50">{submitting? 'Creating...':'Create account'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}


