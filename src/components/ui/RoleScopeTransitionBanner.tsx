import React from 'react'
import { usePerspective } from '@/context/PerspectiveContext'
import { Sparkles, ArrowRight, X, Info } from 'lucide-react'
import { Badge } from './Badge'

export const RoleScopeTransitionBanner: React.FC = () => {
  const { 
    showTransitionNotice, 
    dismissTransition, 
    activeProfile, 
    previousPerspective, 
    perspective 
  } = usePerspective()

  if (!showTransitionNotice || !previousPerspective || previousPerspective === perspective) {
    return null
  }

  return (
    <div className="mb-6 p-4 rounded-2xl border border-indigo-200/90 dark:border-indigo-800/60 bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-sky-50/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/60 shadow-xs animate-fade-in relative transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-2xs shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] font-mono uppercase font-bold text-indigo-700 dark:text-indigo-300 tracking-wider">
                Role & Scope Transition · UI/UX Simulation
              </span>
              <Badge variant={activeProfile.badgeVariant} size="sm">
                {activeProfile.scope}
              </Badge>
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed max-w-4xl">
              {activeProfile.transitionRationale}
            </p>
          </div>
        </div>

        <button
          onClick={dismissTransition}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors shrink-0"
          title="Dismiss notice"
          aria-label="Dismiss transition notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
