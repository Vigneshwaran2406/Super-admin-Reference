import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Shield, Plus, Eye, Edit3, Trash2, CheckCircle2, ChevronRight, Layers } from 'lucide-react'

interface ScopeRuleItem {
  id: string
  role: string
  resource: string
  boundary: string
  predicate: string
}

export const DataPermissions: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [selectedTier, setSelectedTier] = useState<number>(0)

  const [scopeRules, setScopeRules] = useState<ScopeRuleItem[]>([
    {
      id: 'sr-1',
      role: 'Sales Manager',
      resource: 'CRM Opportunities',
      boundary: 'Assigned Sales Territory',
      predicate: 'WHERE territory_id IN (:user_territories)',
    },
    {
      id: 'sr-2',
      role: 'HR Manager',
      resource: 'Workforce Personnel',
      boundary: 'HR Department & Direct Reports',
      predicate: 'WHERE department_id = :user_dept_id',
    },
    {
      id: 'sr-3',
      role: 'Warehouse Manager',
      resource: 'Inventory Depots',
      boundary: 'Assigned Fulfillment Facility',
      predicate: 'WHERE facility_id = :user_facility_id',
    },
    {
      id: 'sr-4',
      role: 'Finance Manager',
      resource: 'General Ledger Invoices',
      boundary: 'Assigned Legal Entity Accounts',
      predicate: 'WHERE company_id = :user_tenant_company_id',
    },
  ])

  // Modals
  const [isAddScopeOpen, setIsAddScopeOpen] = useState(false)
  const [editingScope, setEditingScope] = useState<ScopeRuleItem | null>(null)
  const [viewingScope, setViewingScope] = useState<ScopeRuleItem | null>(null)

  // Add scope form
  const [newRole, setNewRole] = useState('Sales Manager')
  const [newResource, setNewResource] = useState('CRM Deals')
  const [newBoundary, setNewBoundary] = useState('Assigned Region')

  // Edit scope form
  const [editRole, setEditRole] = useState('')
  const [editResource, setEditResource] = useState('')
  const [editBoundary, setEditBoundary] = useState('')

  // Confirmation modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'delete' | 'generic'
    confirmLabel: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    actionType: 'generic',
    confirmLabel: '',
    onConfirm: () => {},
  })

  const tiers = [
    {
      tier: 'GLOBAL',
      name: 'Global Platform',
      holder: 'Super Administrator',
      boundary: 'Cross-tenant, all customer databases, all cloud regions',
      recordsVisible: 'All enterprise organizations, all multi-tenant databases, all licensing records',
      purpose: 'Infrastructure health, disaster recovery snapshots, and cross-tenant billing governance.',
      examplePolicy: 'DATA_ISOLATION_BYPASS (Platform Root)',
    },
    {
      tier: 'ORGANIZATION',
      name: 'Organization / Tenant',
      holder: 'Organization Administrator',
      boundary: 'Strict tenant boundary (WHERE tenant_id = :active_tenant_id)',
      recordsVisible: 'All users, departments, and operations strictly within own company tenant',
      purpose: 'Ensures one customer organization cannot inspect or query another customer organization.',
      examplePolicy: 'TENANT_ISOLATION_SCHEMA_RULE',
    },
    {
      tier: 'DEPARTMENT',
      name: 'Department Scope',
      holder: 'Department Heads & Line Managers',
      boundary: 'Specific department units (WHERE department_id = :dept_id)',
      recordsVisible: 'Operational records belonging to HR, Sales, Finance, or Engineering department',
      purpose: 'Restricts payroll records to HR and commercial deals to Sales department staff.',
      examplePolicy: 'DEPARTMENT_BOUNDARY_FILTER',
    },
    {
      tier: 'DOMAIN',
      name: 'Functional Domain',
      holder: 'Domain Operational Managers',
      boundary: 'Domain boundaries (WHERE module IN (:domain_modules))',
      recordsVisible: 'Specialized domain records (e.g. CRM Pipeline, HR Records, ERP Orders)',
      purpose: 'Restricts functional management without exposing unrelated business operations.',
      examplePolicy: 'DOMAIN_MODULE_GATEWAY_FILTER',
    },
    {
      tier: 'ASSIGNED',
      name: 'Assigned Records',
      holder: 'Individual Staff & Direct Reports',
      boundary: 'Personally owned or assigned records (WHERE assigned_user_id = :user_id)',
      recordsVisible: 'Personal profile, assigned CRM opportunities, own payslips, and submitted expenses',
      purpose: 'Ensures standard employees only inspect records assigned directly to them.',
      examplePolicy: 'DATA_ISOLATION_ASSIGNED_RECORD_FILTER',
    },
  ]

  const activeTier = tiers[selectedTier]

  const handleAddScope = (e: React.FormEvent) => {
    e.preventDefault()
    const newRule: ScopeRuleItem = {
      id: `sr-${Date.now()}`,
      role: newRole,
      resource: newResource,
      boundary: newBoundary,
      predicate: 'WHERE record_scope = :assigned_boundary',
    }
    setScopeRules([...scopeRules, newRule])
    setIsAddScopeOpen(false)
    showToast(`Scope rule added for ${newRole}`, 'success', 'Reference data scoping rule registered.')
  }

  const handleOpenEdit = (rule: ScopeRuleItem) => {
    setEditingScope(rule)
    setEditRole(rule.role)
    setEditResource(rule.resource)
    setEditBoundary(rule.boundary)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingScope) return
    setScopeRules(prev => prev.map(r => r.id === editingScope.id ? { ...r, role: editRole, resource: editResource, boundary: editBoundary } : r))
    setEditingScope(null)
    showToast('Scope rule updated', 'info', 'Record boundary filter parameters saved.')
  }

  const handleRemoveScope = (rule: ScopeRuleItem) => {
    setConfirmModal({
      isOpen: true,
      title: `Remove Scope Rule for ${rule.role}?`,
      message: `Are you sure you want to remove the data boundary rule filtering ${rule.resource}?`,
      actionType: 'delete',
      confirmLabel: 'Confirm Remove',
      onConfirm: () => {
        setScopeRules(prev => prev.filter(r => r.id !== rule.id))
        showToast('Scope rule removed', 'warning', 'Data scope boundary filter removed.')
      }
    })
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Reference Data-Scope Model"
        managedBy="ORGANIZATION & SUPER ADMINISTRATORS"
        scope="GLOBAL"
        purpose="Visual hierarchy illustrating how data isolation boundaries restrict which records a role can access."
        accessLevel="HIERARCHICAL DATA BOUNDARIES"
      />

      {/* Simple Horizontal Progression Stepper */}
      <div className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2">
        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider px-1">
          Click any Tier to Inspect Scoping Rules:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {tiers.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTier(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedTier === idx
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-400 text-indigo-700 dark:text-indigo-300'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300'
              }`}
            >
              <div className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                TIER 0{idx + 1}
              </div>
              <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                {t.tier}
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">
                {t.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Tier Inspection Strip */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold">
              Selected Isolation Tier
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {activeTier.tier} — {activeTier.name}
            </h3>
          </div>
          <Badge variant="indigo" size="sm">{activeTier.holder}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Data Boundary</span>
            <p className="text-slate-800 dark:text-slate-200 font-medium leading-snug">{activeTier.boundary}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Records Visible</span>
            <p className="text-slate-800 dark:text-slate-200 font-medium leading-snug">{activeTier.recordsVisible}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Policy Implementation</span>
            <div className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-[11px] truncate">
              {activeTier.examplePolicy}
            </div>
          </div>
        </div>
      </div>

      {/* Configured Data Scoping Rules Table with Reference Controls */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Reference Scope Rules</h3>
            <p className="text-[11px] text-slate-400">Explicit record filtering boundaries by role</p>
          </div>
          <button
            onClick={() => setIsAddScopeOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Scope
          </button>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Role Authority</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Configured Boundary</th>
                <th className="py-3 px-4">SQL Predicate Rule</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {scopeRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                    {rule.role}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    {rule.resource}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium">
                      {rule.boundary}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    {rule.predicate}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewingScope(rule)}
                        className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold transition-colors text-xs"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleOpenEdit(rule)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-bold transition-colors text-xs flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit Scope
                      </button>
                      <button
                        onClick={() => handleRemoveScope(rule)}
                        className="px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 font-bold transition-colors text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove Scope
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Scope Modal */}
      <Modal isOpen={isAddScopeOpen} onClose={() => setIsAddScopeOpen(false)} title="Add Data Scope Boundary">
        <form onSubmit={handleAddScope} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Sales Manager">Sales Manager</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Warehouse Manager">Warehouse Manager</option>
              <option value="Finance Manager">Finance Manager</option>
              <option value="Procurement Manager">Procurement Manager</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Resource</label>
            <input
              type="text"
              required
              value={newResource}
              onChange={(e) => setNewResource(e.target.value)}
              placeholder="e.g. Commercial Quotes"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Boundary Filter</label>
            <input
              type="text"
              required
              value={newBoundary}
              onChange={(e) => setNewBoundary(e.target.value)}
              placeholder="e.g. Assigned Geographic Region"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddScopeOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Save Scope Rule
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Scope Modal */}
      {editingScope && (
        <Modal isOpen={Boolean(editingScope)} onClose={() => setEditingScope(null)} title={`Edit Scope: ${editingScope.role}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Role</label>
              <input
                type="text"
                disabled
                value={editRole}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 text-xs opacity-75"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Resource</label>
              <input
                type="text"
                required
                value={editResource}
                onChange={(e) => setEditResource(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Boundary Filter</label>
              <input
                type="text"
                required
                value={editBoundary}
                onChange={(e) => setEditBoundary(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingScope(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Scope Modal */}
      {viewingScope && (
        <Modal isOpen={Boolean(viewingScope)} onClose={() => setViewingScope(null)} title={`Scope Details: ${viewingScope.role}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Resource:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingScope.resource}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Isolation Boundary:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{viewingScope.boundary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SQL Filter Clause:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{viewingScope.predicate}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingScope(null)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal */}
      <ActionConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        actionType={confirmModal.actionType}
        confirmLabel={confirmModal.confirmLabel}
      />
    </div>
  )
}
