import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react'

export type ModuleHealthStatus = 'Active' | 'Attention Needed' | 'Unconfigured'

export interface ModuleHealthCardProps {
  title: string
  status: ModuleHealthStatus
  description: string
  icon?: React.ReactNode
  category?: string
  lastUpdated?: string
  to?: string
  actionLabel?: string
  onAction?: () => void
}

/**
 * UI-004 Shared Component: ModuleHealthCard
 * Displays administrative module status (Active, Attention Needed, Unconfigured)
 * with visual health badges, icons, descriptions, and optional navigation shortcuts.
 */
export const ModuleHealthCard: React.FC<ModuleHealthCardProps> = ({
  title,
  status,
  description,
  icon,
  category,
  lastUpdated,
  to,
  actionLabel = 'Manage Module',
  onAction,
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold border text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Active</span>
          </span>
        )
      case 'Attention Needed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold border text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
            <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Attention Needed</span>
          </span>
        )
      case 'Unconfigured':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold border text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />
            <HelpCircle className="w-3 h-3 text-slate-500" />
            <span>Unconfigured</span>
          </span>
        )
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top bar with category and status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {category ? (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
              {category}
            </span>
          ) : <span />}
          {getStatusBadge()}
        </div>

        {/* Module Title and Icon */}
        <div className="flex items-start gap-3">
          {icon && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-100 dark:border-slate-700/60 shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
              {title}
            </h3>
            {lastUpdated && (
              <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                {lastUpdated}
              </span>
            )}
          </div>
        </div>

        {/* Module Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      {(to || onAction) && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400">
            Status: <strong className="text-slate-700 dark:text-slate-300 font-bold">{status}</strong>
          </span>
          {to ? (
            <Link
              to={to}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <span>{actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <span>{actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
