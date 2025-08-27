import { useEffect, useRef, useState } from 'react'

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const combo = (isMac && e.metaKey && e.key.toLowerCase() === 'k') || (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k')
      if (combo) {
        e.preventDefault()
        setOpen(true)
      }
    }
    function onClick() {
      setOpen(true)
    }
    const btn = document.getElementById('af-k-search')
    btn?.addEventListener('click', onClick)
    window.addEventListener('keydown', onKey)
    return () => {
      btn?.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0)
  }, [open])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
      <div className="absolute inset-x-0 top-24 mx-auto w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/></svg>
          <input ref={inputRef} type="text" placeholder="Search components..." className="flex-1 bg-transparent outline-none placeholder:text-zinc-500" />
          <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">Esc</kbd>
        </div>
      </div>
    </div>
  )
}


