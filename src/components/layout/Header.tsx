import React, { useState } from 'react'
import { usePerspective } from '@/context/PerspectiveContext'
import { mockTenants, mockSecurityAlertsList } from '@/mock'
import { 
  Sun, 
  Moon, 
  Building2, 
  UserCheck, 
  Bell, 
  Layers, 
  Sparkles,
  ShieldAlert,
  Globe
} from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  const { 
    perspective, 
    setPerspective, 
    perspectiveLabel, 
    perspectiveScope,
    selectedTenant,
    setSelectedTenant,
    isDark,
    toggleTheme 
  } = usePerspective()

  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="h-18 px-8 border-b border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between shrink-0 select-none z-20 transition-colors duration-200">
      {/* Left: Perspective Switcher & Current Scope Context */}
      <div className="flex items-center gap-5">
        {/* Prominent Perspective Lens Selector */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-2xs">
            <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              REFERENCE PERSPECTIVE • UI/UX SIMULATION
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <UserCheck className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <select
                value={perspective}
                onChange={(e) => setPerspective(e.target.value as any)}
                className="bg-transparent text-xs font-bold text-slate-900 dark:text-white focus:outline-none cursor-pointer pr-2"
                aria-label="Simulated User Perspective Selector"
              >
                <option value="super-admin" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  Super Administrator (Global Platform Authority)
                </option>
                <option value="org-admin" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  Organization Administrator (Tenant Scope: Acme Tech)
                </option>
                <option value="hr-manager" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  HR Manager (Domain Operational: HRMS & Workforce)
                </option>
                <option value="sales-manager" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  Sales Manager (Domain Operational: CRM & Pipeline)
                </option>
                <option value="finance-manager" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  Finance Manager (Domain Operational: Finance & GL)
                </option>
                <option value="procurement-manager" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  Procurement Manager (Domain Operational: ERP Sourcing)
                </option>
                <option value="warehouse-manager" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  Warehouse Manager (Domain Operational: Inventory)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Tenant Switcher Context (Visible when tenant-scoped or global) */}
        {perspective !== 'super-admin' && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tenant Scope:</span>
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {mockTenants.map(t => (
                <option key={t.id} value={t.name} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {t.name} ({t.code})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quick Link to Hierarchy Map */}
        <Link
          to="/admin/hierarchy-map"
          className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200/90 dark:border-indigo-500/30 transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          Hierarchy Map
        </Link>
        <Link
          to="/admin/access-matrix"
          className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-purple-800 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-500/15 border border-purple-200/90 dark:border-purple-500/30 transition-colors"
        >
          Access Matrix
        </Link>
        <Link
          to="/"
          className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          title="Return to Public Landing Page"
        >
          <Globe className="w-3.5 h-3.5 text-indigo-500" />
          Public Site
        </Link>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Educational Scope Badge */}
        <div className="hidden lg:block text-right pr-2">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">Simulated Context</div>
          <Badge variant={perspectiveScope === 'GLOBAL' ? 'global' : perspectiveScope === 'ORGANIZATION / TENANT' ? 'tenant' : 'domain'} size="sm">
            {perspectiveScope}
          </Badge>
        </div>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(prev => !prev)}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            title="Recent Security & Administrative Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xl z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">System Alerts & Feed</span>
                <Badge variant="danger" size="sm">3 Critical</Badge>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2 max-h-64 overflow-y-auto">
                {mockSecurityAlertsList.map(alt => (
                  <div key={alt.id} className="py-2.5 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span className="truncate">{alt.title}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">{alt.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Target: {alt.user}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle (Light by default, can toggle dark preview) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isDark ? 'Switch to Default Light Mode' : 'Preview Dark Mode'}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* User profile capsule */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-xs">
            {perspective === 'super-admin' ? 'SA' : perspective === 'org-admin' ? 'OA' : 'DM'}
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {perspectiveLabel}
            </div>
            <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 truncate max-w-[140px]">
              {perspective === 'super-admin' ? 'alex.root@platform.io' : 'admin@acme.com'}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
