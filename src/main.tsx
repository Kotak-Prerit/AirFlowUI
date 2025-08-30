import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Lenis from 'lenis'

// React Router v7 lazy route helpers
const lazyHome = async () => ({ Component: (await import('./Pages/Home')).default })
const lazyComponents = async () => ({ Component: (await import('./Pages/Components')).default })
const lazyTemplates = async () => ({ Component: (await import('./Pages/Templates')).default })
const lazySignIn = async () => ({ Component: (await import('./Pages/SignIn')).default })
const lazySignUp = async () => ({ Component: (await import('./Pages/SignUp')).default })
const lazyDashboard = async () => ({ Component: (await import('./Pages/Dashboard')).default })
const lazyTerms = async () => ({ Component: (await import('./Pages/Terms')).default })

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      // smoothTouch: false, // Removed this property as it doesn't exist in LenisOptions
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => {
      lenis.destroy?.()
    }
  }, [])
  return children as any
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, lazy: lazyHome },
      { path: 'components', lazy: lazyComponents },
      { path: 'templates', lazy: lazyTemplates },
      { path: 'signin', lazy: lazySignIn },
      { path: 'signup', lazy: lazySignUp },
      { path: 'dashboard', lazy: lazyDashboard },
      { path: 'terms', lazy: lazyTerms },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SmoothScrollProvider>
        <RouterProvider router={router} />
      </SmoothScrollProvider>
    </AuthProvider>
  </StrictMode>,
)
