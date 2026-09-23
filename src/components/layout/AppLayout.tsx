import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { RoleScopeTransitionBanner } from '@/components/ui/RoleScopeTransitionBanner'
import { usePerspective } from '@/context/PerspectiveContext'
import { ToastProvider } from '@/context/ToastContext'
import { ChevronRight, Home } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export const AppLayout: React.FC = () => {
  const location = useLocation()
  const { perspectiveLabel, perspectiveScope, activeProfile } = usePerspective()

  // Generate breadcrumb items from path
  const pathSegments = location.pathname.split('/').filter(Boolean)
  const breadcrumbTrail = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`
    const formatted = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    return { url, label: formatted }
  })

  return (
    <ToastProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
        {/* Sidebar with Two Distinct Navigation Concepts: Educational Architecture vs Role Simulation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header with Role Lens Switcher */}
          <Header />

          {/* Spacious Breadcrumb Navigation Bar */}
          <div className="h-12 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 backdrop-blur px-8 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Link to="/console" className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                <Home className="w-3.5 h-3.5" />
                <span>Console</span>
              </Link>
              {breadcrumbTrail.map((crumb, idx) => (
                <React.Fragment key={crumb.url}>
                  <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
                  {idx === breadcrumbTrail.length - 1 ? (
                    <span className="text-slate-900 dark:text-slate-100 font-bold">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.url} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <Badge variant={activeProfile.badgeVariant} size="sm">
                {perspectiveScope}
              </Badge>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="text-slate-800 dark:text-slate-200 font-bold">{perspectiveLabel}</span>
            </div>
          </div>

          {/* Scrollable Page Body with generous padding */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto pb-20 animate-fade-in">
              {/* Role-Scope Educational Transition Indicator Banner */}
              <RoleScopeTransitionBanner />
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
