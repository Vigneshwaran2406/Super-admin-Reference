import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Search, Eye, Edit3, Check, X } from 'lucide-react'

interface PermissionResource {
  id: string
  module: string
  domain: string
  actions: {
    create: string
    read: string
    update: string
    delete: string
    approve: string
    export: string
    import: string
    print: string
  }
}

export const PermissionManagement: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [selectedDomain, setSelectedDomain] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const [resources, setResources] = useState<PermissionResource[]>([
    {
      id: 'res-1',
      module: 'Tenant Provisioning',
      domain: 'Platform Core',
      actions: {
        create: 'G GLOBAL ONLY',
        read: 'G GLOBAL ONLY',
        update: 'G GLOBAL ONLY',
        delete: 'G GLOBAL ONLY',
        approve: 'G GLOBAL ONLY',
        export: 'G GLOBAL ONLY',
        import: '— NOT AVAILABLE',
        print: '— NOT AVAILABLE',
      }
    },
    {
      id: 'res-2',
      module: 'Company & Business Units',
      domain: 'Organization Setup',
      actions: {
        create: 'T TENANT SCOPED',
        read: '✓ ALLOWED',
        update: 'T TENANT SCOPED',
        delete: '— NOT AVAILABLE',
        approve: 'T TENANT SCOPED',
        export: '✓ ALLOWED',
        import: '— NOT AVAILABLE',
        print: '✓ ALLOWED',
      }
    },
    {
      id: 'res-3',
      module: 'User Accounts Directory',
      domain: 'Identity & Access',
      actions: {
        create: '✓ ALLOWED',
        read: '✓ ALLOWED',
        update: '✓ ALLOWED',
        delete: '◐ RBAC / SCOPE DEPENDENT',
        approve: '✓ ALLOWED',
        export: '✓ ALLOWED',
        import: '✓ ALLOWED',
        print: '✓ ALLOWED',
      }
    },
    {
      id: 'res-4',
      module: 'Employee Profiles & Leaves',
      domain: 'HRMS Domain',
      actions: {
        create: 'D DOMAIN SCOPED',
        read: '✓ ALLOWED',
        update: 'D DOMAIN SCOPED',
        delete: '— NOT AVAILABLE',
        approve: 'D DOMAIN SCOPED',
        export: 'D DOMAIN SCOPED',
        import: 'D DOMAIN SCOPED',
        print: '✓ ALLOWED',
      }
    },
    {
      id: 'res-5',
      module: 'Sales Quotes & Opportunities',
      domain: 'CRM Domain',
      actions: {
        create: 'D DOMAIN SCOPED',
        read: '✓ ALLOWED',
        update: 'D DOMAIN SCOPED',
        delete: '— NOT AVAILABLE',
        approve: 'D DOMAIN SCOPED',
        export: '✓ ALLOWED',
        import: '— NOT AVAILABLE',
        print: '✓ ALLOWED',
      }
    },
    {
      id: 'res-6',
      module: 'Invoices & General Ledger',
      domain: 'Finance Domain',
      actions: {
        create: 'D DOMAIN SCOPED',
        read: '✓ ALLOWED',
        update: 'D DOMAIN SCOPED',
        delete: '— NOT AVAILABLE',
        approve: 'D DOMAIN SCOPED',
        export: '✓ ALLOWED',
        import: '— NOT AVAILABLE',
        print: '✓ ALLOWED',
      }
    },
  ])

  // Modals
  const [viewingResource, setViewingResource] = useState<PermissionResource | null>(null)
  const [editingResource, setEditingResource] = useState<PermissionResource | null>(null)

  const renderBadge = (state: string) => {
    if (state.includes('ALLOWED')) {
      return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">✓ ALLOWED</span>
    }
    if (state.includes('NOT AVAILABLE')) {
      return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 dark:text-slate-500">—</span>
    }
    if (state.includes('GLOBAL')) {
      return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">G GLOBAL</span>
    }
    if (state.includes('TENANT')) {
      return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">T TENANT</span>
    }
    if (state.includes('DOMAIN')) {
      return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">D DOMAIN</span>
    }
    return <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">◐ RBAC</span>
  }

  const filtered = resources.filter(r => {
    const matchesSearch = r.module.toLowerCase().includes(searchQuery.toLowerCase()) || r.domain.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDomain = selectedDomain === 'All' || r.domain === selectedDomain
    return matchesSearch && matchesDomain
  })

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Permission & CRUD Capability Governance"
        managedBy="SUPER ADMINISTRATOR (Platform Definition) • ORGANIZATION ADMINISTRATOR (Tenant Delegations)"
        scope="ORGANIZATION / TENANT"
        purpose="Granular reference matrix correlating enterprise resources with action boundaries (CREATE, READ, UPDATE, DELETE, APPROVE, EXPORT, IMPORT, PRINT)."
        accessLevel="AUTHORITY POLICY MATRIX"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources by module or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white shrink-0 cursor-pointer"
          >
            <option value="All">All Domains</option>
            <option value="Platform Core">Platform Core</option>
            <option value="Organization Setup">Organization Setup</option>
            <option value="Identity & Access">Identity & Access</option>
            <option value="HRMS Domain">HRMS Domain</option>
            <option value="CRM Domain">CRM Domain</option>
            <option value="Finance Domain">Finance Domain</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          REFERENCE CRUD MATRIX • UI/UX SIMULATION
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                <th className="py-3 px-5">Resource Module</th>
                <th className="py-3 px-3 text-center">CREATE</th>
                <th className="py-3 px-3 text-center">READ</th>
                <th className="py-3 px-3 text-center">UPDATE</th>
                <th className="py-3 px-3 text-center">DELETE</th>
                <th className="py-3 px-3 text-center">APPROVE</th>
                <th className="py-3 px-3 text-center">EXPORT</th>
                <th className="py-3 px-3 text-center">IMPORT</th>
                <th className="py-3 px-3 text-center">PRINT</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="font-bold text-slate-900 dark:text-white">{res.module}</div>
                    <div className="text-[11px] text-slate-400">{res.domain}</div>
                  </td>
                  <td className="py-3 px-3 text-center">{renderBadge(res.actions.create)}</td>
                  <td className="py-3 px-3 text-center">{renderBadge(res.actions.read)}</td>
                  <td className="py-3 px-3 text-center">{renderBadge(res.actions.update)}</td>
                  <td className="py-3 px-3 text-center">{renderBadge(res.actions.delete)}</td>
                  <td className="py-3 px-3 text-center">{renderBadge(res.actions.approve)}</td>
                  <td className="py-3 px-3 text-center">{renderBadge(res.actions.export)}</td>
                  <td className="py-3 px-3 text-center">{renderBadge(res.actions.import)}</td>
                  <td className="py-3 px-3 text-center">{renderBadge(res.actions.print)}</td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewingResource(res)}
                        className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-bold transition-colors text-xs"
                      >
                        View
                      </button>
                      <button
                        onClick={() => setEditingResource(res)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-colors text-xs flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Resource Permissions Modal */}
      {editingResource && (
        <Modal isOpen={Boolean(editingResource)} onClose={() => setEditingResource(null)} title={`Edit Permissions: ${editingResource.module}`}>
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 dark:text-slate-400">
              Configure action permissions for <span className="font-bold text-slate-900 dark:text-white">{editingResource.module}</span>:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['CREATE', 'READ', 'UPDATE', 'DELETE', 'APPROVE', 'EXPORT', 'IMPORT', 'PRINT'].map((action) => (
                <div key={action} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{action}</span>
                  <select className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 text-[11px] font-semibold bg-white dark:bg-slate-900">
                    <option>ALLOWED</option>
                    <option>RBAC / SCOPE</option>
                    <option>NOT AVAILABLE</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setEditingResource(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setEditingResource(null)
                  showToast(`Permissions updated for ${editingResource.module}`, 'success', 'Granular action capabilities saved.')
                }}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Save Action Permissions
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Resource Modal */}
      {viewingResource && (
        <Modal isOpen={Boolean(viewingResource)} onClose={() => setViewingResource(null)} title={`Resource Governance: ${viewingResource.module}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Domain Group:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingResource.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mutation Boundary:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">ORGANIZATION / TENANT ENCLOSURE</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingResource(null)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
