import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { usePerspective } from '@/context/PerspectiveContext'
import { ActivePerspective } from '@/types'
import { 
  Users, 
  Building2, 
  Key, 
  Server, 
  Activity, 
  Database, 
  ShieldAlert, 
  ShieldCheck, 
  ChevronRight, 
  TrendingUp, 
  Sparkles, 
  Briefcase, 
  DollarSign, 
  ShoppingCart, 
  Boxes, 
  Clock, 
  CheckCircle2, 
  FolderTree, 
  MapPin, 
  HardDrive,
  HelpCircle,
  X
} from 'lucide-react'

export const SuperAdminDashboard: React.FC = () => {
  const { perspective, setPerspective, selectedTenant, perspectiveScope, activeProfile } = usePerspective()
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false)

  const renderKpiIcon = (iconName: string) => {
    const iconProps = { className: 'w-5 h-5' }
    switch (iconName) {
      case 'Users': return <Users {...iconProps} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      case 'Building2': return <Building2 {...iconProps} className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      case 'Key': return <Key {...iconProps} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      case 'Server': return <Server {...iconProps} className="w-5 h-5 text-sky-600 dark:text-sky-400" />
      case 'FolderTree': return <FolderTree {...iconProps} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      case 'MapPin': return <MapPin {...iconProps} className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      case 'Briefcase': return <Briefcase {...iconProps} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      case 'CheckCircle2': return <CheckCircle2 {...iconProps} className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      case 'TrendingUp': return <TrendingUp {...iconProps} className="w-5 h-5 text-sky-600 dark:text-sky-400" />
      case 'DollarSign': return <DollarSign {...iconProps} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      case 'Clock': return <Clock {...iconProps} className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      case 'ShoppingCart': return <ShoppingCart {...iconProps} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      case 'Boxes': return <Boxes {...iconProps} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      case 'HardDrive': return <HardDrive {...iconProps} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      default: return <Activity {...iconProps} className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    }
  }

  const currentData = activeProfile.dashboard
  const scopeInfo = activeProfile.administrationScope

  return (
    <div className="space-y-8 pb-16">
      {/* 1. CLEAN PAGE HEADER WITH COMPACT ROLE LENS SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {currentData.title}
            </h1>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
              {currentData.managedBy} • {currentData.scope}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {currentData.purpose}
          </p>
        </div>

        {/* Compact Perspective Switcher Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setPerspective('super-admin')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                perspective === 'super-admin'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Super Admin
            </button>
            <button
              onClick={() => setPerspective('org-admin')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                perspective === 'org-admin'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Org Admin
            </button>
            <select
              value={perspective.startsWith('super-admin') || perspective.startsWith('org-admin') ? '' : perspective}
              onChange={(e) => {
                if (e.target.value) setPerspective(e.target.value as ActivePerspective)
              }}
              className={`text-xs px-2.5 py-1.5 rounded-lg font-bold bg-transparent cursor-pointer focus:outline-none ${
                perspectiveScope === 'DOMAIN OPERATIONAL'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <option value="" disabled className="text-slate-500 bg-white dark:bg-slate-900">
                Domain Roles ▾
              </option>
              <option value="hr-manager" className="text-slate-900 dark:text-white bg-white dark:bg-slate-900">
                HR Manager (HRMS)
              </option>
              <option value="sales-manager" className="text-slate-900 dark:text-white bg-white dark:bg-slate-900">
                Sales Manager (CRM)
              </option>
              <option value="finance-manager" className="text-slate-900 dark:text-white bg-white dark:bg-slate-900">
                Finance Manager (Finance)
              </option>
              <option value="procurement-manager" className="text-slate-900 dark:text-white bg-white dark:bg-slate-900">
                Procurement Manager (ERP)
              </option>
              <option value="warehouse-manager" className="text-slate-900 dark:text-white bg-white dark:bg-slate-900">
                Warehouse Manager (ERP)
              </option>
            </select>
          </div>

          <button
            onClick={() => setIsScopeModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Scope Guide</span>
          </button>
        </div>
      </div>

      {/* 2. 4 KEY METRIC CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {currentData.kpis.slice(0, 4).map((kpi, idx) => (
          <StatCard
            key={idx}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            icon={renderKpiIcon(kpi.iconName)}
            description={kpi.description}
          />
        ))}
      </section>

      {/* 3. PRIMARY LARGE CHART */}
      <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {currentData.primaryChart1.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {currentData.primaryChart1.subtitle}
            </p>
          </div>
          <Badge variant="indigo" size="sm">{currentData.primaryChart1.badgeText}</Badge>
        </div>

        <div className="pt-2 space-y-3.5">
          {currentData.primaryChart1.data.map((item, idx) => {
            const percentage = Math.round((item.value / item.max) * 100)
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.label}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {typeof item.value === 'number' && item.value > 999 ? item.value.toLocaleString() : item.value}
                    <span className="text-slate-400 font-normal ml-1 text-[11px]">({percentage}%)</span>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 4. SECONDARY CHARTS ROW */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Secondary Chart 2: Category Breakdown */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {currentData.primaryChart2.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {currentData.primaryChart2.subtitle}
              </p>
            </div>
            <Badge variant="neutral" size="sm">Distribution</Badge>
          </div>

          <div className="space-y-3 pt-2">
            {currentData.primaryChart2.data.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {item.used} / {item.total} <span className="text-slate-400 font-normal">({item.percent}%)</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200/80 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color || 'bg-indigo-600'}`}
                    style={{ width: `${Math.min(100, item.percent)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary: Operational Activity Telemetry */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent {activeProfile.roleName} Activity Log
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Audit trail within active authority scope
              </p>
            </div>
            <Badge variant="success" size="sm">Live Feed</Badge>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {currentData.activity.map((act) => (
              <div key={act.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="space-y-0.5 truncate">
                  <div className="font-semibold text-slate-900 dark:text-white truncate">{act.title}</div>
                  <div className="text-[11px] text-slate-400 truncate">{act.type}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-[10px] text-slate-400 block">{act.time}</span>
                  <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400">{act.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE-OVER ROLE & SCOPE GUIDE DRAWER */}
      {isScopeModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={() => setIsScopeModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400">
                    Governance Architecture Guide
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {scopeInfo.myRole} Administration Scope
                  </h3>
                </div>
                <button
                  onClick={() => setIsScopeModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Core Governance Rule Banner */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                  The Governance Principle
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white leading-relaxed">
                  {scopeInfo.governanceEquation.action} + {scopeInfo.governanceEquation.dataBoundary} = {scopeInfo.governanceEquation.result}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                  {scopeInfo.rbacExplanation}
                </p>
              </div>

              {/* The 4 Visual Blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* 1. MY ROLE */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                    1. My Role
                  </span>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {scopeInfo.myRole}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {scopeInfo.dataScopeExplanation}
                  </p>
                </div>

                {/* 2. MY SCOPE */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                    2. My Scope
                  </span>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {scopeInfo.myScope}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {scopeInfo.governanceEquation.dataBoundary}
                  </p>
                </div>

                {/* 3. MY RESPONSIBILITIES */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-600 dark:text-purple-400">
                    3. Responsibilities
                  </span>
                  <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                    {scopeInfo.myResponsibilities.slice(0, 4).map((r, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-purple-500 shrink-0" />
                        <span className="truncate">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. MY ACTION BOUNDARY */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-sky-600 dark:text-sky-400">
                    4. Action Boundary
                  </span>
                  <div className="font-semibold text-xs text-slate-900 dark:text-white">
                    {scopeInfo.myActionBoundary}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    Mutations strictly bounded within authorized administrative scope.
                  </p>
                </div>
              </div>

              {/* Outside My Responsibility Card */}
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-2 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider text-[10px] block">
                  Outside My Responsibility (Safeguards)
                </span>
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  {scopeInfo.outsideResponsibility}
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
    </div>
  )
}
