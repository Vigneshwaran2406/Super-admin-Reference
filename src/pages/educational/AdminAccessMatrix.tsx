import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { usePerspective } from '@/context/PerspectiveContext'
import { ROLE_PROFILES } from '@/config/perspectiveConfig'
import { 
  Search, 
  Layers, 
  HelpCircle,
  X,
  Sparkles,
  CheckCircle2,
  TableProperties,
  LayoutGrid
} from 'lucide-react'

export type PermissionState = 
  | 'ALLOWED' 
  | 'NOT_AVAILABLE' 
  | 'RBAC_DEPENDENT' 
  | 'GLOBAL_ONLY' 
  | 'TENANT_SCOPED' 
  | 'DOMAIN_SCOPED'

export interface MatrixRowItem {
  id: string
  resource: string
  category: 'Platform Core' | 'Organization Setup' | 'HRMS Domain' | 'CRM Domain' | 'Finance Domain' | 'Procurement Domain' | 'Warehouse Domain' | 'Security & Audit'
  scope: 'GLOBAL' | 'ORGANIZATION / TENANT' | 'DOMAIN OPERATIONAL'
  managedBy: string
  description: string
  actions: {
    create: PermissionState
    read: PermissionState
    update: PermissionState
    delete: PermissionState
    approve: PermissionState
    export: PermissionState
    import: PermissionState
    print: PermissionState
  }
}

export const AdminAccessMatrix: React.FC = () => {
  const { perspective, setPerspective, perspectiveLabel, perspectiveScope } = usePerspective()

  // View Mode: Default to 'simple' per design mandate
  const [viewMode, setViewMode] = useState<'simple' | 'matrix'>('simple')
  const [selectedRole, setSelectedRole] = useState<string>(perspective)
  const [selectedResourceId, setSelectedResourceId] = useState<string>('res-user-dir')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')

  // Drawer state for action details
  const [selectedDrawerAction, setSelectedDrawerAction] = useState<{
    actionName: string
    state: PermissionState
    resourceName: string
    scope: string
    explanation: string
  } | null>(null)

  // Sync selectedRole with perspective change
  React.useEffect(() => {
    setSelectedRole(perspective)
  }, [perspective])

  // Catalog of 20 enterprise resources
  const getResourceCatalog = (role: string): MatrixRowItem[] => {
    const isSuper = role === 'super-admin'
    const isOrg = role === 'org-admin'
    const isHR = role === 'hr-manager'
    const isSales = role === 'sales-manager'
    const isFinance = role === 'finance-manager'
    const isProc = role === 'procurement-manager'
    const isWh = role === 'warehouse-manager'

    return [
      {
        id: 'res-plat-cfg',
        resource: 'Platform Configuration & Runtime',
        category: 'Platform Core',
        scope: 'GLOBAL',
        managedBy: 'Super Administrator',
        description: 'Global infrastructure toggles, edge rate limits, and multi-tenant database partitioning.',
        actions: {
          create: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          read: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          update: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          delete: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          approve: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          export: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          import: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          print: 'NOT_AVAILABLE',
        },
      },
      {
        id: 'res-lic-mgmt',
        resource: 'License & Subscription Tiers',
        category: 'Platform Core',
        scope: 'GLOBAL',
        managedBy: 'Super Administrator',
        description: 'Commercial contract tiers, seat quotas, cryptographic keys, and module entitlements.',
        actions: {
          create: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          read: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          update: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          delete: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          approve: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          export: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          import: 'NOT_AVAILABLE',
          print: 'NOT_AVAILABLE',
        },
      },
      {
        id: 'res-tenant-mgmt',
        resource: 'Tenant Onboarding & Clusters',
        category: 'Platform Core',
        scope: 'GLOBAL',
        managedBy: 'Super Administrator',
        description: 'Multi-tenant lifecycle provisioning, database cluster allocation, and tenant suspension.',
        actions: {
          create: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          read: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          update: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          delete: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          approve: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          export: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          import: isSuper ? 'ALLOWED' : 'GLOBAL_ONLY',
          print: 'NOT_AVAILABLE',
        },
      },
      {
        id: 'res-org-setup',
        resource: 'Organization Business Units & Branches',
        category: 'Organization Setup',
        scope: 'ORGANIZATION / TENANT',
        managedBy: 'Organization Administrator',
        description: 'Hierarchical companies, regional branches, operating divisions, and cost centers.',
        actions: {
          create: isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          read: 'ALLOWED',
          update: isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          delete: isSuper || isOrg ? 'RBAC_DEPENDENT' : 'NOT_AVAILABLE',
          approve: isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          export: isSuper || isOrg ? 'TENANT_SCOPED' : 'NOT_AVAILABLE',
          import: isSuper || isOrg ? 'TENANT_SCOPED' : 'NOT_AVAILABLE',
          print: 'NOT_AVAILABLE',
        },
      },
      {
        id: 'res-user-dir',
        resource: 'User Accounts & Enterprise Directory',
        category: 'Organization Setup',
        scope: 'ORGANIZATION / TENANT',
        managedBy: 'Organization Administrator',
        description: 'Corporate user directory, credential assignment, and account deactivation.',
        actions: {
          create: isSuper ? 'ALLOWED' : isOrg ? 'TENANT_SCOPED' : 'NOT_AVAILABLE',
          read: 'ALLOWED',
          update: isSuper ? 'ALLOWED' : isOrg ? 'TENANT_SCOPED' : 'RBAC_DEPENDENT',
          delete: isSuper ? 'ALLOWED' : isOrg ? 'TENANT_SCOPED' : 'NOT_AVAILABLE',
          approve: isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          export: isSuper ? 'GLOBAL_ONLY' : isOrg ? 'TENANT_SCOPED' : 'NOT_AVAILABLE',
          import: isSuper ? 'GLOBAL_ONLY' : isOrg ? 'TENANT_SCOPED' : 'NOT_AVAILABLE',
          print: 'ALLOWED',
        },
      },
      {
        id: 'res-dept-mgmt',
        resource: 'Department Hierarchies & Delegations',
        category: 'Organization Setup',
        scope: 'ORGANIZATION / TENANT',
        managedBy: 'Organization Administrator',
        description: 'Inter-department delegations, approval matrices, and unit boundary inheritance.',
        actions: {
          create: isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          read: 'ALLOWED',
          update: isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          delete: isSuper || isOrg ? 'RBAC_DEPENDENT' : 'NOT_AVAILABLE',
          approve: isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          export: 'ALLOWED',
          import: isSuper || isOrg ? 'TENANT_SCOPED' : 'NOT_AVAILABLE',
          print: 'NOT_AVAILABLE',
        },
      },
      {
        id: 'res-hrms-emp',
        resource: 'Employee Profiles & Records',
        category: 'HRMS Domain',
        scope: 'DOMAIN OPERATIONAL',
        managedBy: 'HR Manager',
        description: 'Personnel records, job assignments, disciplinary notes, and confidential contracts.',
        actions: {
          create: isSuper ? 'ALLOWED' : isOrg ? 'ALLOWED' : isHR ? 'ALLOWED' : 'NOT_AVAILABLE',
          read: isHR || isSuper || isOrg ? 'ALLOWED' : 'RBAC_DEPENDENT',
          update: isHR || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          delete: isSuper ? 'ALLOWED' : isOrg || isHR ? 'RBAC_DEPENDENT' : 'NOT_AVAILABLE',
          approve: isHR ? 'ALLOWED' : isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          export: isHR || isOrg ? 'DOMAIN_SCOPED' : 'GLOBAL_ONLY',
          import: isHR || isOrg ? 'DOMAIN_SCOPED' : 'GLOBAL_ONLY',
          print: 'ALLOWED',
        },
      },
      {
        id: 'res-hrms-leave',
        resource: 'Leave Requests & Attendance Ledger',
        category: 'HRMS Domain',
        scope: 'DOMAIN OPERATIONAL',
        managedBy: 'HR Manager',
        description: 'Time-off requests, vacation balances, statutory leave entitlements, and approvals.',
        actions: {
          create: 'ALLOWED',
          read: 'ALLOWED',
          update: isHR || isOrg ? 'ALLOWED' : 'RBAC_DEPENDENT',
          delete: isHR ? 'ALLOWED' : 'NOT_AVAILABLE',
          approve: isHR ? 'ALLOWED' : 'RBAC_DEPENDENT',
          export: isHR ? 'ALLOWED' : 'NOT_AVAILABLE',
          import: 'NOT_AVAILABLE',
          print: 'ALLOWED',
        },
      },
      {
        id: 'res-crm-leads',
        resource: 'Sales Leads & Territory Pipelines',
        category: 'CRM Domain',
        scope: 'DOMAIN OPERATIONAL',
        managedBy: 'Sales Manager',
        description: 'Commercial prospect database, outbound lead assignments, and territory quotas.',
        actions: {
          create: isSales || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          read: isSales || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          update: isSales ? 'ALLOWED' : isSuper || isOrg ? 'RBAC_DEPENDENT' : 'NOT_AVAILABLE',
          delete: isSales || isSuper ? 'RBAC_DEPENDENT' : 'NOT_AVAILABLE',
          approve: isSales ? 'ALLOWED' : 'NOT_AVAILABLE',
          export: isSales ? 'DOMAIN_SCOPED' : 'NOT_AVAILABLE',
          import: isSales ? 'DOMAIN_SCOPED' : 'NOT_AVAILABLE',
          print: 'ALLOWED',
        },
      },
      {
        id: 'res-fin-ledger',
        resource: 'Financial Ledger & Invoices',
        category: 'Finance Domain',
        scope: 'DOMAIN OPERATIONAL',
        managedBy: 'Finance Manager',
        description: 'Accounts payable/receivable, general ledger, tax schedules, and invoice approvals.',
        actions: {
          create: isFinance || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          read: isFinance || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          update: isFinance ? 'ALLOWED' : 'NOT_AVAILABLE',
          delete: isSuper ? 'RBAC_DEPENDENT' : 'NOT_AVAILABLE',
          approve: isFinance ? 'ALLOWED' : 'NOT_AVAILABLE',
          export: isFinance ? 'DOMAIN_SCOPED' : 'NOT_AVAILABLE',
          import: isFinance ? 'DOMAIN_SCOPED' : 'NOT_AVAILABLE',
          print: 'ALLOWED',
        },
      },
      {
        id: 'res-proc-po',
        resource: 'Purchase Orders & Supplier Catalogs',
        category: 'Procurement Domain',
        scope: 'DOMAIN OPERATIONAL',
        managedBy: 'Procurement Manager',
        description: 'Sourcing requests, vendor quotations, commercial PO issuance, and supplier SLAs.',
        actions: {
          create: isProc || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          read: isProc || isFinance || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          update: isProc ? 'ALLOWED' : 'NOT_AVAILABLE',
          delete: isSuper ? 'RBAC_DEPENDENT' : 'NOT_AVAILABLE',
          approve: isProc || isFinance ? 'ALLOWED' : 'NOT_AVAILABLE',
          export: isProc ? 'DOMAIN_SCOPED' : 'NOT_AVAILABLE',
          import: isProc ? 'DOMAIN_SCOPED' : 'NOT_AVAILABLE',
          print: 'ALLOWED',
        },
      },
      {
        id: 'res-wh-inventory',
        resource: 'Warehouse Stock & Shipments',
        category: 'Warehouse Domain',
        scope: 'DOMAIN OPERATIONAL',
        managedBy: 'Warehouse Manager',
        description: 'Bin storage locations, stock intake receipts, transfer manifests, and inventory counts.',
        actions: {
          create: isWh || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          read: isWh || isProc || isSuper || isOrg ? 'ALLOWED' : 'NOT_AVAILABLE',
          update: isWh ? 'ALLOWED' : 'NOT_AVAILABLE',
          delete: isSuper ? 'RBAC_DEPENDENT' : 'NOT_AVAILABLE',
          approve: isWh ? 'ALLOWED' : 'NOT_AVAILABLE',
          export: isWh ? 'DOMAIN_SCOPED' : 'NOT_AVAILABLE',
          import: isWh ? 'DOMAIN_SCOPED' : 'NOT_AVAILABLE',
          print: 'ALLOWED',
        },
      },
    ]
  }

  const catalog = getResourceCatalog(selectedRole)
  const selectedResource = catalog.find(r => r.id === selectedResourceId) || catalog[4]

  const formatBadgeState = (state: PermissionState) => {
    switch (state) {
      case 'ALLOWED': return { text: 'Allowed', variant: 'success' as const, symbol: '✓' }
      case 'NOT_AVAILABLE': return { text: 'Not Available', variant: 'neutral' as const, symbol: '—' }
      case 'RBAC_DEPENDENT': return { text: 'RBAC Dependent', variant: 'purple' as const, symbol: '◐' }
      case 'GLOBAL_ONLY': return { text: 'Global Only', variant: 'global' as const, symbol: 'G' }
      case 'TENANT_SCOPED': return { text: 'Tenant Scoped', variant: 'tenant' as const, symbol: 'T' }
      case 'DOMAIN_SCOPED': return { text: 'Domain Scoped', variant: 'domain' as const, symbol: 'D' }
    }
  }

  const roleList = [
    { id: 'super-admin', label: 'Super Administrator' },
    { id: 'org-admin', label: 'Organization Administrator' },
    { id: 'hr-manager', label: 'HR Manager' },
    { id: 'sales-manager', label: 'Sales Manager' },
    { id: 'finance-manager', label: 'Finance Manager' },
    { id: 'procurement-manager', label: 'Procurement Manager' },
    { id: 'warehouse-manager', label: 'Warehouse Manager' },
  ]

  const filteredCatalog = catalog.filter(item => {
    const matchesSearch = item.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Page Header with Clean Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Permission & CRUD Center
            </h1>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/50">
              Universal Educational Reference
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Explore what a role can do across enterprise resources and data boundaries.
          </p>
        </div>

        {/* View Toggle: Simple View vs Matrix View */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 self-start md:self-center">
          <button
            onClick={() => setViewMode('simple')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'simple'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Simple View</span>
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'matrix'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TableProperties className="w-3.5 h-3.5" />
            <span>Matrix View</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: SIMPLE VIEW (Default - Clean Role & Resource Explorer)           */}
      {/* ========================================================================= */}
      {viewMode === 'simple' && (
        <div className="space-y-6">
          {/* Controls Bar: Select Role + Select Resource */}
          <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-1/2 space-y-1">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                1. Select Role to Explore:
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {roleList.map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-1/2 space-y-1">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                2. Select Enterprise Resource:
              </label>
              <select
                value={selectedResourceId}
                onChange={(e) => setSelectedResourceId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {catalog.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.resource} ({r.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Resource Clean Focal Card */}
          <div className="p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {selectedResource.category}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedResource.resource}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  {selectedResource.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant={selectedResource.scope === 'GLOBAL' ? 'global' : selectedResource.scope === 'ORGANIZATION / TENANT' ? 'tenant' : 'domain'}>
                  {selectedResource.scope}
                </Badge>
              </div>
            </div>

            {/* Clean Action Grid (8 Actions) */}
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Action Grants for {roleList.find(r => r.id === selectedRole)?.label}:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'CREATE', state: selectedResource.actions.create },
                  { name: 'READ', state: selectedResource.actions.read },
                  { name: 'UPDATE', state: selectedResource.actions.update },
                  { name: 'DELETE', state: selectedResource.actions.delete },
                  { name: 'APPROVE', state: selectedResource.actions.approve },
                  { name: 'EXPORT', state: selectedResource.actions.export },
                  { name: 'IMPORT', state: selectedResource.actions.import },
                  { name: 'PRINT', state: selectedResource.actions.print },
                ].map((act, idx) => {
                  const badgeInfo = formatBadgeState(act.state)
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDrawerAction({
                        actionName: act.name,
                        state: act.state,
                        resourceName: selectedResource.resource,
                        scope: selectedResource.scope,
                        explanation: `The ${roleList.find(r => r.id === selectedRole)?.label} role possesses '${badgeInfo.text}' authority when executing ${act.name} over ${selectedResource.resource}.`
                      })}
                      className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-indigo-300 dark:hover:border-indigo-700 cursor-pointer transition-all space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                          {act.name}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-400">
                          {badgeInfo.symbol}
                        </span>
                      </div>
                      <div>
                        <Badge variant={badgeInfo.variant} size="sm">
                          {badgeInfo.text}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* View Details Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDrawerAction({
                  actionName: 'ALL ACTIONS',
                  state: selectedResource.actions.read,
                  resourceName: selectedResource.resource,
                  scope: selectedResource.scope,
                  explanation: `Resource governed by ${selectedResource.managedBy}. Scope boundary: ${selectedResource.scope}.`
                })}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View Full Architectural Rationale →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: MATRIX VIEW (Detailed Multi-Column Catalog)                       */}
      {/* ========================================================================= */}
      {viewMode === 'matrix' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white"
              >
                {roleList.map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-5">Resource</th>
                    <th className="py-3 px-3">Scope</th>
                    <th className="py-3 px-2 text-center">Create</th>
                    <th className="py-3 px-2 text-center">Read</th>
                    <th className="py-3 px-2 text-center">Update</th>
                    <th className="py-3 px-2 text-center">Delete</th>
                    <th className="py-3 px-2 text-center">Approve</th>
                    <th className="py-3 px-2 text-center">Export</th>
                    <th className="py-3 px-2 text-center">Import</th>
                    <th className="py-3 px-2 text-center">Print</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredCatalog.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="font-bold text-slate-900 dark:text-white">{r.resource}</div>
                        <div className="text-[11px] text-slate-400">{r.category}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <Badge variant={r.scope === 'GLOBAL' ? 'global' : r.scope === 'ORGANIZATION / TENANT' ? 'tenant' : 'domain'} size="sm">
                          {r.scope}
                        </Badge>
                      </td>
                      {['create', 'read', 'update', 'delete', 'approve', 'export', 'import', 'print'].map((actionKey) => {
                        const state = (r.actions as any)[actionKey] as PermissionState
                        const badgeInfo = formatBadgeState(state)
                        return (
                          <td key={actionKey} className="py-3.5 px-2 text-center">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                              badgeInfo.variant === 'success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' :
                              badgeInfo.variant === 'global' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300' :
                              badgeInfo.variant === 'tenant' ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300' :
                              badgeInfo.variant === 'domain' ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' :
                              badgeInfo.variant === 'purple' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300' :
                              'bg-slate-100 text-slate-400 dark:bg-slate-800'
                            }`}>
                              {badgeInfo.symbol}
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Permission Detail Drawer */}
      {selectedDrawerAction && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedDrawerAction(null)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-indigo-600 dark:text-indigo-400">
                    Action Authorization Detail
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedDrawerAction.actionName} → {selectedDrawerAction.resourceName}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDrawerAction(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* WHO / WHAT / ACTION / WHERE / STATUS / WHY */}
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-500">WHO (Role):</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {roleList.find(r => r.id === selectedRole)?.label}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-500">WHAT (Resource):</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {selectedDrawerAction.resourceName}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-500">ACTION:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {selectedDrawerAction.actionName}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-500">WHERE (Data Scope):</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedDrawerAction.scope}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-slate-500">STATUS:</span>
                  <Badge variant={formatBadgeState(selectedDrawerAction.state).variant} size="sm">
                    {formatBadgeState(selectedDrawerAction.state).text}
                  </Badge>
                </div>
              </div>

              {/* WHY (Educational Explanation) */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  WHY (Educational Explanation):
                </h4>
                <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedDrawerAction.explanation}
                </div>
              </div>

              {/* Core Governance Principle */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="font-bold text-indigo-600 dark:text-indigo-400 text-[11px] uppercase tracking-wider">
                  Governance Principle
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  RBAC determines what action can be taken; Data Scope determines which enterprise tenant or department records that action applies to.
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
