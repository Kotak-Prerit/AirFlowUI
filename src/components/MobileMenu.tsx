import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const toggle = document.getElementById('af-mobile-toggle')
    function onClick() { setOpen(true) }
    toggle?.addEventListener('click', onClick)
    return () => toggle?.removeEventListener('click', onClick)
  }, [])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
      <div className="absolute inset-0 bg-zinc-950 p-6">
        <div className="flex items-center justify-between">
          <span className="tampron text-xl">Airflow</span>
          <button className="rounded-md border border-zinc-800 p-2" onClick={() => setOpen(false)} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <nav className="mt-8 grid gap-4 text-xl">
          <NavLink to="/components" onClick={() => setOpen(false)} className="text-zinc-300">components</NavLink>
          <NavLink to="/templates" onClick={() => setOpen(false)} className="text-zinc-300">templates</NavLink>
          <NavLink to="/signin" onClick={() => setOpen(false)} className="text-zinc-300">sign in</NavLink>
          <NavLink to="/signup" onClick={() => setOpen(false)} className="text-white">sign up</NavLink>
        </nav>
      </div>
    </div>
  )
}


