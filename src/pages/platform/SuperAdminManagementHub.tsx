import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { RestrictedScopeNotice } from '@/components/ui/RestrictedScopeNotice'
import { ModuleHealthCard, ModuleHealthStatus } from '@/components/ui/ModuleHealthCard'
import { usePerspective } from '@/context/PerspectiveContext'
import { mockUsers } from '@/mock'
import {
  Shield,
  Sliders,
  Settings,
  Palette,
  KeyRound,
  ToggleRight,
  Building2,
  Users,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
  Activity,
  Layers,
  FileText,
  UserCheck,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react'

interface AdminModuleConfig {
  title: string
  category: string
  status: ModuleHealthStatus
  description: string
  to: string
  lastUpdated: string
  icon: React.ReactNode
}

export const SuperAdminManagementHub: React.FC = () => {
  const { perspective } = usePerspective()
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'super-admin' | 'org-admin'>('all')

  // Access guard for Super Admin perspective
  if (perspective !== 'super-admin') {
    return (
      <div className="space-y-6 pb-12">
        <RestrictedScopeNotice
          screenTitle="Super Admin Management Hub"
          customExplanation="The Super Admin Management Hub provides root-level executive control over platform configuration, administrator directories, role governance, and cloud modules. Organization Administrators and Domain Managers are partitioned within tenant and departmental boundaries and do not possess cross-tenant root authority."
        />
      </div>
    )
  }

  // 1. Module Health Cards Data
  const modules: AdminModuleConfig[] = [
    {
      title: 'Platform Configuration',
      category: 'CORE INFRASTRUCTURE',
      status: 'Active',
      description: 'Global runtime parameters, multi-tenant database isolation policy, and edge API rate limiting.',
      to: '/platform/configuration',
      lastUpdated: 'Runtime baseline verified',
      icon: <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    },
    {
      title: 'Global Settings',
      category: 'SECURITY & SESSIONS',
      status: 'Active',
      description: 'Enterprise cloud session timeouts, password strength baselines, and cross-origin security rules.',
      to: '/platform/settings',
      lastUpdated: 'Security baseline enforced',
      icon: <Settings className="w-5 h-5 text-sky-600 dark:text-sky-400" />
    },
    {
      title: 'Platform Branding',
      category: 'WHITE-LABEL & THEMES',
      status: 'Active',
      description: 'Platform corporate brand identity, custom logo assets, color palettes, and global favicon configuration.',
      to: '/platform/branding',
      lastUpdated: 'Default theme active',
      icon: <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
    },
    {
      title: 'License Management Engine',
      category: 'SUBSCRIPTIONS & TIERS',
      status: 'Active',
      description: 'Platform seat allocations (420 / 500 Enterprise seats utilized) and cross-tenant contract tier enforcement.',
      to: '/platform/licenses',
      lastUpdated: '84.0% pool allocated',
      icon: <KeyRound className="w-5 h-5 text-amber-600 dark:text-amber-400" />
    },
    {
      title: 'Feature Management',
      category: 'CAPABILITY TOGGLES',
      status: 'Active',
      description: 'Dynamic capability toggles, preview features, and beta capability distribution across tenants.',
      to: '/platform/features',
      lastUpdated: '12 feature flags registered',
      icon: <ToggleRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: 'Security & Session Broker',
      category: 'ZERO-TRUST POSTURE',
      status: 'Attention Needed',
      description: 'Platform SSO brokers, MFA enforcement verification, and concurrent active online user sessions.',
      to: '/security/sessions',
      lastUpdated: 'Pending quarterly session audit',
      icon: <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />
    }
  ]

  // Filter administrative users from mockUsers
  const adminUsers = mockUsers.filter(u => 
    u.userClass === 'SUPER ADMINISTRATOR' || 
    u.userClass === 'ORGANIZATION ADMINISTRATOR' ||
    u.role.includes('Administrator')
  )

  const filteredAdmins = adminUsers.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.tenantName.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (!matchesSearch) return false
    if (roleFilter === 'super-admin') return u.userClass === 'SUPER ADMINISTRATOR'
    if (roleFilter === 'org-admin') return u.userClass === 'ORGANIZATION ADMINISTRATOR'
    return true
  })

  // Management Shortcuts Data
  const shortcuts = [
    { label: 'Platform Configuration', to: '/platform/configuration', icon: <Sliders className="w-4 h-4 text-indigo-500" />, desc: 'Global runtime switches & edge throttling' },
    { label: 'Global Settings', to: '/platform/settings', icon: <Settings className="w-4 h-4 text-sky-500" />, desc: 'Session timeout & password rules' },
    { label: 'Platform Branding', to: '/platform/branding', icon: <Palette className="w-4 h-4 text-purple-500" />, desc: 'Custom logos, favicons, & palettes' },
    { label: 'License Management', to: '/platform/licenses', icon: <KeyRound className="w-4 h-4 text-amber-500" />, desc: 'Quota allocation & seat management' },
    { label: 'Feature Flags', to: '/platform/features', icon: <ToggleRight className="w-4 h-4 text-emerald-500" />, desc: 'Dynamic feature switches & beta releases' },
    { label: 'Tenant Management', to: '/tenants', icon: <Building2 className="w-4 h-4 text-indigo-500" />, desc: 'Provision & monitor enterprise tenants' },
    { label: 'Audit Ledger', to: '/audit/logs', icon: <FileText className="w-4 h-4 text-rose-500" />, desc: 'Immutable platform-wide audit trail' },
    { label: 'Access Matrix', to: '/admin/access-matrix', icon: <Layers className="w-4 h-4 text-purple-500" />, desc: 'Cross-role permission breakdown' }
  ]

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Context Panel */}
      <ContextPanel
        title="Super Admin Management Hub"
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Centralized operational hub for overseeing platform administrative users, role governance policies, core module configuration health, and direct management shortcuts."
        accessLevel="ALL TENANTS (Full Global Authority)"
        whyItExists="Provides Super Administrators with a single operational control center to oversee administrative personnel, verify module configuration health, review platform governance, and access management shortcuts."
        tags={['Super Admin Hub', 'Platform Governance', 'Module Health', 'Administrative Directory']}
      />

      {/* 2. Direct Management Action Shortcuts */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Direct Management Action Shortcuts
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Direct shortcuts to platform administration modules across the cloud suite
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            8 Administrative Modules
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shortcuts.map((sc, idx) => (
            <Link
              key={idx}
              to={sc.to}
              className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60">
                    {sc.icon}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white mt-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {sc.label}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {sc.desc}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Navigate Module →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Module Configuration Health Cards */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Module Configuration Health Cards
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
                UI-004
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live configuration and readiness status across platform core modules
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              5 Active
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              1 Attention Needed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, idx) => (
            <ModuleHealthCard
              key={idx}
              title={m.title}
              status={m.status}
              description={m.description}
              icon={m.icon}
              category={m.category}
              lastUpdated={m.lastUpdated}
              to={m.to}
              actionLabel="Configure Module"
            />
          ))}
        </div>
      </section>

      {/* 4. Platform Role Governance Overview */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Platform Role Governance Overview
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Hierarchical administrative boundary partitions enforcing Zero-Trust multi-tenancy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pillar 1: Root Global Authority */}
          <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-900 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-100/70 dark:bg-indigo-900/60 px-2 py-0.5 rounded-md">
                  TIER 1 • ROOT PLATFORM
                </span>
                <Badge variant="global" size="sm">GLOBAL</Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-3">
                Super Administrator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Holds root governance authority across cloud infrastructure, cross-tenant telemetry, global licensing, and system resilience.
              </p>
              <div className="mt-4 space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between py-1 border-b border-indigo-100 dark:border-slate-800">
                  <span>Authorized Accounts:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">2 Verified Super Admins</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-indigo-100 dark:border-slate-800">
                  <span>Enforcement:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">MFA + Hardware Key</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Data Boundary:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">ALL TENANTS</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-slate-800/80 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              ROOT CLOUD GOVERNANCE
            </div>
          </div>

          {/* Pillar 2: Tenant Isolation Governance */}
          <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-slate-900 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-900/60 px-2 py-0.5 rounded-md">
                  TIER 2 • TENANT SCOPED
                </span>
                <Badge variant="tenant" size="sm">TENANT</Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-3">
                Organization Administrator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Restricted to single tenant boundaries. Manages internal company setup, departments, branches, and tenant user onboarding.
              </p>
              <div className="mt-4 space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between py-1 border-b border-emerald-100 dark:border-slate-800">
                  <span>Authorized Accounts:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">5 Tenant Administrators</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-emerald-100 dark:border-slate-800">
                  <span>Enforcement:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">MFA Enforced</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Data Boundary:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">TENANT ISOLATED</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100 dark:border-slate-800/80 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              TENANT PARTITION STRICT
            </div>
          </div>

          {/* Pillar 3: Domain Operational Roles */}
          <div className="p-5 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-slate-900 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-100/70 dark:bg-purple-900/60 px-2 py-0.5 rounded-md">
                  TIER 3 • FUNCTIONAL DOMAIN
                </span>
                <Badge variant="domain" size="sm">DOMAIN</Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-3">
                Domain Operational Roles
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Confined to functional business suites (HRMS, CRM, ERP, Finance). Bound strictly by departmental scopes and row-level policies.
              </p>
              <div className="mt-4 space-y-2 text-[11px] text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between py-1 border-b border-purple-100 dark:border-slate-800">
                  <span>Active Roles:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">14 Domain Managers</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-purple-100 dark:border-slate-800">
                  <span>Enforcement:</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">Least-Privilege RBAC</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Data Boundary:</span>
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">DEPARTMENTAL SCOPED</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-100 dark:border-slate-800/80 text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">
              FUNCTIONAL SCOPE BOUNDED
            </div>
          </div>
        </div>

        {/* Governance Equation Box */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Zero-Trust Platform Governance Equation:</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                Every administrative invocation requires cryptographic JWT authentication, tenant boundary verification, and RBAC matrix validation.
              </p>
            </div>
          </div>
          <Link
            to="/admin/hierarchy-map"
            className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-xs shrink-0"
          >
            <span>View Hierarchy Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 5. Administrative User Directory */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Administrative User Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Super Administrators and Organization Administrators holding elevated credentials
            </p>
          </div>

          {/* Search and Role Filter Toolbar */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search administrators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 w-48 sm:w-56 transition-colors"
                aria-label="Search administrative users"
              />
            </div>

            <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setRoleFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  roleFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('super-admin')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  roleFilter === 'super-admin'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Super Admins
              </button>
              <button
                type="button"
                onClick={() => setRoleFilter('org-admin')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  roleFilter === 'org-admin'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Org Admins
              </button>
            </div>
          </div>
        </div>

        {/* Directory Table Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/90 dark:border-slate-800 text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-3 px-4">Administrator</th>
                  <th className="py-3 px-4">Authority Scope</th>
                  <th className="py-3 px-4">Assigned Partition</th>
                  <th className="py-3 px-4">MFA Security</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No administrative users found matching filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs ${
                            user.userClass === 'SUPER ADMINISTRATOR'
                              ? 'bg-gradient-to-tr from-indigo-600 to-purple-600'
                              : 'bg-gradient-to-tr from-emerald-600 to-teal-600'
                          }`}>
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Scope Badge */}
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={user.scope === 'GLOBAL' ? 'global' : 'tenant'}
                          size="sm"
                        >
                          {user.scope}
                        </Badge>
                      </td>

                      {/* Tenant Partition */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-semibold">{user.tenantName}</span>
                        </div>
                      </td>

                      {/* MFA Security */}
                      <td className="py-3.5 px-4">
                        {user.mfaEnabled ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>MFA Enforced</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                            <Lock className="w-3.5 h-3.5" />
                            <span>Password Only</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {user.status}
                        </span>
                      </td>

                      {/* Last Activity */}
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                        {user.lastLogin || 'Recent login activity'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Showing {filteredAdmins.length} of {adminUsers.length} platform administrative accounts</span>
            <span className="font-mono text-[10px] uppercase">READ-ONLY AUDIT DIRECTORY • UI PROTOTYPE</span>
          </div>
        </div>
      </section>
    </div>
  )
}
