import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
// import Lenis from 'lenis'

// React Router v7 lazy route helpers
const lazyHome = async () => ({ Component: (await import('./Pages/Home')).default })
const lazyComponents = async () => ({ Component: (await import('./Pages/Components')).default })
const lazyTemplates = async () => ({ Component: (await import('./Pages/Templates')).default })
const lazySignIn = async () => ({ Component: (await import('./Pages/SignIn')).default })
const lazySignUp = async () => ({ Component: (await import('./Pages/SignUp')).default })
const lazyDashboard = async () => ({ Component: (await import('./Pages/Dashboard')).default })
const lazyTerms = async () => ({ Component: (await import('./Pages/Terms')).default })

// Individual Component Pages
const lazyAccordion = async () => ({ Component: (await import('./Pages/AccordionPage.tsx')).default })
const lazyButton = async () => ({ Component: (await import('./Pages/ButtonPage')).default })
const lazyComponent = async () => ({ Component: (await import('./Pages/GenericComponentPage')).default })

// Admin Pages
const lazyAdminDashboard = async () => ({ Component: (await import('./Pages/AdminDashboard')).default })
const lazyCodeEditor = async () => ({ Component: (await import('./Pages/CodeEditor')).default })

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return children as any
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, lazy: lazyHome },
      { path: 'components', lazy: lazyComponents },
      { path: 'components/accordion', lazy: lazyAccordion },
      { path: 'components/button', lazy: lazyButton },
      { path: 'components/:componentId', lazy: lazyComponent },
      { path: 'templates', lazy: lazyTemplates },
      { path: 'signin', lazy: lazySignIn },
      { path: 'signup', lazy: lazySignUp },
      { path: 'dashboard', lazy: lazyDashboard },
      { path: 'terms', lazy: lazyTerms },
      // Admin routes
      { path: 'admin/:userID', lazy: lazyAdminDashboard },
      { path: 'admin/codeEditor', lazy: lazyCodeEditor },
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
