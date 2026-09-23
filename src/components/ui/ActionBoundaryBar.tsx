import React, { useState } from 'react'
import { Badge } from './Badge'
import { 
  ShieldCheck, 
  HelpCircle, 
  X, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  Sparkles
} from 'lucide-react'

export interface ActionItem {
  label: string
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'EXPORT' | 'IMPORT' | 'PRINT' | string
  state: '✓ ALLOWED' | '— NOT AVAILABLE' | '◐ RBAC / SCOPE DEPENDENT' | 'G GLOBAL ONLY' | 'T TENANT SCOPED' | 'D DOMAIN SCOPED'
  description?: string
  scopeTag?: string
  onClick?: () => void
}

export interface ActionBoundaryBarProps {
  resourceName: string
  actions: ActionItem[]
  currentRole: string
  currentScope: string
  dataBoundary: string
  explanation: string
  whyItMatters?: string
}

export const ActionBoundaryBar: React.FC<ActionBoundaryBarProps> = ({
  resourceName,
  actions,
  currentRole,
  currentScope,
  dataBoundary,
  explanation,
  whyItMatters = 'Teaches the architectural difference between Screen Access (navigation visibility) and Action Access (granular CRUD authorization).'
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null)

  const handleOpenAction = (item: ActionItem) => {
    setSelectedAction(item)
    setIsDrawerOpen(true)
  }

  const getBadgeVariant = (state: string) => {
    if (state.includes('ALLOWED')) return 'success'
    if (state.includes('NOT AVAILABLE')) return 'neutral'
    if (state.includes('RBAC')) return 'purple'
    if (state.includes('GLOBAL')) return 'global'
    if (state.includes('TENANT')) return 'tenant'
    if (state.includes('DOMAIN')) return 'domain'
    return 'outline'
  }

  return (
    <>
      {/* Sleek Compact Action Reference Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Access Reference:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {actions.map((act, idx) => (
              <button
                key={idx}
                onClick={() => handleOpenAction(act)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                title={act.description || act.label}
              >
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{act.action}</span>
                <Badge variant={getBadgeVariant(act.state)} size="sm">
                  {act.state.replace('✓ ', '').replace('— ', '').replace('◐ ', '').replace('G ', '').replace('T ', '').replace('D ', '')}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedAction(actions[0] || null)
            setIsDrawerOpen(true)
          }}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <span>Action Access Details →</span>
        </button>
      </div>

      {/* Slide-over Action Details Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400">
                    Screen Access vs Action Access
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {resourceName}
                  </h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Core Governance Rule Banner */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                  Core Architectural Rule
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white leading-relaxed">
                  RBAC ("What can I do?") + DATA SCOPE ("Which records can I do it to?") = EFFECTIVE ACCESS
                </div>
              </div>

              {/* 5-Point Conceptual Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-500">WHO? (Role):</span>
                  <span className="font-bold text-slate-900 dark:text-white">{currentRole}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-500">WHAT? (Resource):</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{resourceName}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-500">WHERE? (Data Scope):</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{dataBoundary}</span>
                </div>
              </div>

              {/* Action State Breakdown List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Configured Actions for this Screen:
                </div>
                <div className="space-y-2">
                  {actions.map((act, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white font-mono">{act.label}</span>
                        <Badge variant={getBadgeVariant(act.state)} size="sm">{act.state}</Badge>
                      </div>
                      {act.description && (
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                          {act.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Why this matters */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1 text-xs">
                <div className="font-bold text-slate-700 dark:text-slate-300">Architectural Note:</div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {explanation || whyItMatters}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400">
                REFERENCE PERSPECTIVE • UI/UX SIMULATION
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
