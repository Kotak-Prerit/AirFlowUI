import { Outlet, NavLink } from 'react-router-dom'
import SearchModal from './components/SearchModal'
import MobileMenu from './components/MobileMenu'
import Avatar from './components/Avatar'
import { Toaster } from 'sonner'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="tampron text-xl">Airflow</span>
            <span className="sr-only">Airflow UI</span>
          </NavLink>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink to="/components" className={({isActive})=>`hover:text-blue-400 ${isActive? 'text-blue-400':'text-zinc-300'}`}>components</NavLink>
            <NavLink to="/templates" className={({isActive})=>`hover:text-blue-400 ${isActive? 'text-blue-400':'text-zinc-300'}`}>templates</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" className={({isActive})=>`hover:text-blue-400 ${isActive? 'text-blue-400':'text-zinc-300'}`}>dashboard</NavLink>
                <Avatar size="sm" />
              </>
            ) : (
              <>
                <NavLink to="/signin" className="text-zinc-300 hover:text-blue-400">sign in</NavLink>
                <NavLink to="/signup" className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white">sign up</NavLink>
              </>
            )}
            <button id="af-k-search" className="group flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-zinc-400 hover:text-white">
              <span className="text-xs">Search</span>
              <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">Ctrl</kbd>
              <span className="text-[10px]">+</span>
              <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">K</kbd>
            </button>
          </nav>
          <button className="md:hidden inline-flex items-center justify-center rounded-md border border-zinc-800 p-2" id="af-mobile-toggle" aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <SearchModal />
      <MobileMenu />
      <Toaster richColors theme="dark" />
    </div>
  )
}

export default App
