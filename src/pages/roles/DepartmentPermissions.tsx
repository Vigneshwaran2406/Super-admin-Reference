import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Plus, Edit3, Trash2, Eye, CheckCircle2, ChevronDown, ChevronRight, Lock } from 'lucide-react'

interface BoundaryRule {
  id: string
  role: string
  department: string
  permission: string
  status: 'Allowed' | 'Restricted' | 'RBAC / Scope Dependent'
  result: string
}

export const DepartmentPermissions: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [rules, setRules] = useState<BoundaryRule[]>([
    {
      id: 'b-1',
      role: 'HR Manager',
      department: 'Human Resources',
      permission: 'Read / Update / Approve',
      status: 'Allowed',
      result: 'Full operational workforce authority within HR',
    },
    {
      id: 'b-2',
      role: 'Sales Manager',
      department: 'Commercial Sales',
      permission: 'Create / Update / Export',
      status: 'Allowed',
      result: 'Full deal pipeline authority within Sales',
    },
    {
      id: 'b-3',
      role: 'HR Manager',
      department: 'Finance & Accounting',
      permission: 'Read / Update',
      status: 'Restricted',
      result: 'Blocked: cross-department boundary violation',
    },
    {
      id: 'b-4',
      role: 'Procurement Manager',
      department: 'Supply Chain & Requisitions',
      permission: 'Create / Approve POs',
      status: 'Allowed',
      result: 'Full purchasing and vendor catalog authority',
    },
  ])

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<BoundaryRule | null>(null)
  const [viewingRule, setViewingRule] = useState<BoundaryRule | null>(null)

  // Add form
  const [newRole, setNewRole] = useState('HR Manager')
  const [newDept, setNewDept] = useState('Human Resources')
  const [newPerm, setNewPerm] = useState('Read / Update / Approve')

  // Edit form
  const [editRole, setEditRole] = useState('')
  const [editDept, setEditDept] = useState('')
  const [editPerm, setEditPerm] = useState('')

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

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: BoundaryRule = {
      id: `b-${Date.now()}`,
      role: newRole,
      department: newDept,
      permission: newPerm,
      status: 'Allowed',
      result: `Authorized operational boundary for ${newRole} in ${newDept}`,
    }
    setRules([...rules, newEntry])
    setIsAddModalOpen(false)
    showToast(`Boundary rule added for ${newRole}`, 'success', 'Role + Department access boundary configured.')
  }

  const handleOpenEdit = (r: BoundaryRule) => {
    setEditingRule(r)
    setEditRole(r.role)
    setEditDept(r.department)
    setEditPerm(r.permission)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingRule) return
    setRules(prev => prev.map(item => item.id === editingRule.id ? { ...item, role: editRole, department: editDept, permission: editPerm } : item))
    setEditingRule(null)
    showToast('Boundary rule updated', 'info', 'Access boundary permissions saved.')
  }

  const handleRemove = (r: BoundaryRule) => {
    setConfirmModal({
      isOpen: true,
      title: `Remove Boundary for ${r.role} in ${r.department}?`,
      message: `Are you sure you want to remove this department access boundary? Access rights will revert to default organizational RBAC restrictions.`,
      actionType: 'delete',
      confirmLabel: 'Confirm Remove',
      onConfirm: () => {
        setRules(prev => prev.filter(item => item.id !== r.id))
        showToast('Boundary rule removed', 'warning', 'Department permission policy removed.')
      }
    })
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Department Boundary Governance"
        managedBy="ORGANIZATION ADMINISTRATOR"
        scope="ORGANIZATION / TENANT"
        purpose="Visual governance demonstrating how department boundaries strictly constrain functional roles."
        accessLevel="TENANT ACCESS BOUNDARY ENGINE"
      />

      {/* Visual Governance Equation Banner */}
      <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/60 dark:bg-indigo-950/30 p-5 shadow-xs">
        <div className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider mb-2">
          The Access Boundary Equation:
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-bold text-slate-900 dark:text-white">
          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-xs">
            ROLE
          </span>
          <span className="text-indigo-500 text-sm font-black">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-xs">
            DEPARTMENT
          </span>
          <span className="text-indigo-500 text-sm font-black">+</span>
          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 shadow-xs">
            PERMISSION
          </span>
          <span className="text-indigo-500 text-sm font-black">=</span>
          <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white shadow-xs">
            ACCESS BOUNDARY
          </span>
        </div>
      </div>

      {/* Rules Table with Reference Controls */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Department Access Boundaries</h3>
            <p className="text-[11px] text-slate-400">Configured role-to-department permission bindings</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Permission
          </button>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Role Authority</th>
                <th className="py-3 px-4">Department Unit</th>
                <th className="py-3 px-4">Granted Permissions</th>
                <th className="py-3 px-4 text-center">Boundary Result</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rules.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                    {r.role}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                    {r.department}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {r.permission}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {r.status === 'Allowed' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> ALLOWED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                        <Lock className="w-3.5 h-3.5 text-rose-500" /> RESTRICTED
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewingRule(r)}
                        className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold transition-colors text-xs"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleOpenEdit(r)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-bold transition-colors text-xs flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleRemove(r)}
                        className="px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 font-bold transition-colors text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Permission Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Department Permission Boundary">
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Role</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="HR Manager">HR Manager</option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Finance Manager">Finance Manager</option>
              <option value="Procurement Manager">Procurement Manager</option>
              <option value="Warehouse Manager">Warehouse Manager</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department Unit</label>
            <select
              value={newDept}
              onChange={(e) => setNewDept(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Human Resources">Human Resources</option>
              <option value="Commercial Sales">Commercial Sales</option>
              <option value="Finance & Accounting">Finance & Accounting</option>
              <option value="Supply Chain & Requisitions">Supply Chain & Requisitions</option>
              <option value="Logistics & Warehousing">Logistics & Warehousing</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Granted Permissions</label>
            <input
              type="text"
              required
              value={newPerm}
              onChange={(e) => setNewPerm(e.target.value)}
              placeholder="e.g. Read / Update / Approve"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Bind Boundary
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editingRule && (
        <Modal isOpen={Boolean(editingRule)} onClose={() => setEditingRule(null)} title={`Edit Boundary: ${editingRule.role} in ${editingRule.department}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Permissions</label>
              <input
                type="text"
                required
                value={editPerm}
                onChange={(e) => setEditPerm(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingRule(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Boundary
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Modal */}
      {viewingRule && (
        <Modal isOpen={Boolean(viewingRule)} onClose={() => setViewingRule(null)} title={`Access Boundary: ${viewingRule.role}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Department Unit:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingRule.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Permissions:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{viewingRule.permission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Evaluation Result:</span>
                <span className="font-mono">{viewingRule.result}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingRule(null)}
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
