import React from 'react'
import { usePerspective } from '@/context/PerspectiveContext'
import { Badge } from './Badge'
import { ShieldAlert, ArrowUpRight, Network, Lock, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'

interface RestrictedScopeNoticeProps {
  screenTitle: string
  requiredRole?: string
  requiredScope?: string
  customExplanation?: string
}

export const RestrictedScopeNotice: React.FC<RestrictedScopeNoticeProps> = ({
  screenTitle,
  requiredRole = 'Super Administrator',
  requiredScope = 'GLOBAL',
  customExplanation,
}) => {
  const { perspectiveLabel, perspectiveScope, setPerspective } = usePerspective()

  return (
    <div className="rounded-2xl border border-rose-200/90 dark:border-rose-900/40 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-xs text-center max-w-3xl mx-auto my-8 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 mx-auto shadow-2xs">
        <Lock className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="danger" size="sm">GLOBAL ONLY</Badge>
          <Badge variant="neutral" size="sm">UI/UX SIMULATION</Badge>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {screenTitle} Restricted
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
          {customExplanation || (
            `This screen operates at the cloud infrastructure and platform tenancy level. Under the currently selected perspective (${perspectiveLabel}), you are simulating ${perspectiveScope} authority.`
          )}
        </p>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs text-left space-y-2.5 max-w-lg mx-auto">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Required Authority:</span>
          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-500" /> {requiredRole}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Required Scope:</span>
          <Badge variant="global" size="sm">{requiredScope}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Current Lens:</span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">{perspectiveLabel}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => setPerspective('super-admin')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
        >
          <Crown className="w-4 h-4" />
          Switch to Super Administrator (Simulate Global Control)
        </button>
        <Link
          to="/admin/hierarchy-map"
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5"
        >
          <Network className="w-4 h-4 text-indigo-500" />
          Inspect Hierarchy Map
        </Link>
      </div>
    </div>
  )
}
