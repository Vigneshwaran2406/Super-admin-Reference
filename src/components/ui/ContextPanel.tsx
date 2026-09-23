import React, { useState } from 'react'
import { ScreenContextInfo } from '@/types'
import { Badge } from './Badge'
import { HelpCircle, X, ShieldCheck, Users, Network, Lock, Layers } from 'lucide-react'

export const ContextPanel: React.FC<ScreenContextInfo> = ({
  title,
  managedBy,
  scope,
  purpose,
  accessLevel,
  hierarchyPosition,
  whyItExists,
  educationalNotes,
  tags,
}) => {
  const [showDrawer, setShowDrawer] = useState(false)

  const resolvedHierarchy = hierarchyPosition || (
    scope === 'GLOBAL' 
      ? 'Platform Tier → Super Administrator (Global Platform Authority)'
      : scope === 'ORGANIZATION / TENANT'
      ? 'Tenant Tier → Organization Administrator (Tenant Boundary)'
      : 'Domain Tier → Domain Operational Manager (Functional Workflow)'
  )

  const resolvedWhyExists = whyItExists || educationalNotes || (
    scope === 'GLOBAL'
      ? 'This screen operates at the cloud infrastructure and tenant boundary layer across all enterprise organizations.'
      : scope === 'ORGANIZATION / TENANT'
      ? 'This screen governs internal organizational boundaries, users, and departments within the isolated scope of a specific tenant.'
      : 'This screen executes specialized domain workflows without granting global platform administration privileges.'
  )

  const scopeVariant = scope === 'GLOBAL' ? 'global' : scope === 'ORGANIZATION / TENANT' ? 'tenant' : 'domain'

  return (
    <div className="mb-6 space-y-2">
      {/* 1. Clean, Spacious Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
              {managedBy} • {scope}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {purpose}
          </p>
        </div>

        {/* Lightweight Educational Trigger */}
        <button
          onClick={() => setShowDrawer(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100/80 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700 transition-colors shrink-0 self-start md:self-center"
        >
          <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
          <span>Why does this screen exist?</span>
        </button>
      </div>

      {/* Slide-over Educational Detail Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={() => setShowDrawer(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400">
                    Educational Architecture Context
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scope & Role Summary */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Managed By:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{managedBy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Operational Scope:</span>
                  <Badge variant={scopeVariant} size="sm">{scope}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Access Boundary:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{accessLevel}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 dark:border-slate-700">
                  <span className="text-slate-500">Enterprise Hierarchy:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{resolvedHierarchy}</span>
                </div>
              </div>

              {/* Why this screen exists */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-500" /> Architectural Purpose
                </h4>
                <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/80 dark:border-indigo-900/30 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {resolvedWhyExists}
                </div>
              </div>

              {tags && tags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Architecture Tags
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t, idx) => (
                      <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[10px] font-mono text-slate-400">
                REFERENCE PERSPECTIVE • UI/UX SIMULATION
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
