import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { mockDepartments } from '@/mock'
import { FolderTree, Plus, Search, CheckCircle2, XCircle, Users, UserCheck, Eye, Edit3, Trash2, UserX } from 'lucide-react'

export const Departments: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [departments, setDepartments] = useState(mockDepartments)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingDept, setEditingDept] = useState<any | null>(null)
  const [viewingDept, setViewingDept] = useState<any | null>(null)

  // Add form
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [head, setHead] = useState('')

  // Edit form
  const [editName, setEditName] = useState('')
  const [editCode, setEditCode] = useState('')
  const [editHead, setEditHead] = useState('')

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'delete' | 'deactivate' | 'generic'
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
    const newDept = {
      id: `DEP-0${departments.length + 1}`,
      name,
      code: code.toUpperCase(),
      tenantId: 'TEN-001',
      tenantName: 'Acme Technologies Inc.',
      type: 'Department' as const,
      head: head || 'Unassigned',
      headcount: 0,
      status: 'Active' as const,
    }
    setDepartments([...departments, newDept])
    setIsAddModalOpen(false)
    setName('')
    setCode('')
    setHead('')
    showToast(`Department ${name} added`, 'success', 'Functional department registered in tenant boundary.')
  }

  const handleOpenEdit = (dept: any) => {
    setEditingDept(dept)
    setEditName(dept.name)
    setEditCode(dept.code)
    setEditHead(dept.head)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingDept) return
    setDepartments(prev => prev.map(d => d.id === editingDept.id ? { ...d, name: editName, code: editCode.toUpperCase(), head: editHead } : d))
    setEditingDept(null)
    showToast(`Department ${editName} updated`, 'info', 'Department metadata saved.')
  }

  const handleToggleStatus = (dept: any) => {
    const isActivating = dept.status === 'Inactive'
    setConfirmModal({
      isOpen: true,
      title: isActivating ? `Activate ${dept.name}?` : `Deactivate ${dept.name}?`,
      message: isActivating
        ? `Are you sure you want to reactivate ${dept.name}? Staff assignments will be re-enabled.`
        : `Are you sure you want to deactivate ${dept.name}? Active workflows will be suspended.`,
      actionType: isActivating ? 'generic' : 'deactivate',
      confirmLabel: isActivating ? 'Confirm Activate' : 'Confirm Deactivate',
      onConfirm: () => {
        setDepartments(prev => prev.map(d => d.id === dept.id ? { ...d, status: isActivating ? 'Active' : 'Inactive' } : d))
        showToast(
          isActivating ? `Department ${dept.name} activated` : `Department ${dept.name} deactivated`,
          isActivating ? 'success' : 'warning',
          `Status changed to ${isActivating ? 'Active' : 'Inactive'}.`
        )
      }
    })
  }

  const handleDelete = (dept: any) => {
    setConfirmModal({
      isOpen: true,
      title: `Delete Department ${dept.name}?`,
      message: `Are you sure you want to delete ${dept.name}? This will remove department references and cannot be undone.`,
      actionType: 'delete',
      confirmLabel: 'Confirm Delete',
      onConfirm: () => {
        setDepartments(prev => prev.filter(d => d.id !== dept.id))
        showToast(`Department ${dept.name} deleted`, 'error', 'Department record removed.')
      }
    })
  }

  const filtered = departments.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Department Management"
        managedBy="ORGANIZATION ADMINISTRATOR"
        scope="ORGANIZATION / TENANT"
        purpose="Defines functional corporate departments, department managers, operational headcount, and organizational hierarchy."
        accessLevel="Tenant-Scoped (Assigned Organization Only)"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search departments by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white shrink-0 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Department
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Department</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Department Head</th>
                <th className="py-3 px-4">Headcount</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((dept) => {
                const isActive = dept.status === 'Active'
                return (
                  <tr key={dept.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FolderTree className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{dept.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {dept.code}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                      {dept.head}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono">
                      {dept.headcount} Staff
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                          <XCircle className="w-3.5 h-3.5 text-slate-400" /> INACTIVE
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingDept(dept)}
                          className="px-2 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-bold transition-colors text-xs"
                        >
                          View
                        </button>
                        <ActionDropdown
                          items={[
                            {
                              label: 'View Details',
                              icon: <Eye className="w-3.5 h-3.5" />,
                              onClick: () => setViewingDept(dept),
                            },
                            {
                              label: 'Edit Department',
                              icon: <Edit3 className="w-3.5 h-3.5" />,
                              onClick: () => handleOpenEdit(dept),
                            },
                            {
                              label: isActive ? 'Deactivate' : 'Activate',
                              icon: isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />,
                              variant: isActive ? 'warning' : 'primary',
                              onClick: () => handleToggleStatus(dept),
                            },
                            {
                              label: 'Delete Department',
                              icon: <Trash2 className="w-3.5 h-3.5" />,
                              variant: 'danger',
                              onClick: () => handleDelete(dept),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Department">
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Talent Acquisition"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. TA"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department Head</label>
            <input
              type="text"
              value={head}
              onChange={(e) => setHead(e.target.value)}
              placeholder="e.g. Jordan Miller"
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
              Create Department
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editingDept && (
        <Modal isOpen={Boolean(editingDept)} onClose={() => setEditingDept(null)} title={`Edit Department: ${editingDept.name}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department Name</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Code</label>
              <input
                type="text"
                required
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Head</label>
              <input
                type="text"
                value={editHead}
                onChange={(e) => setEditHead(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingDept(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Department
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Details Modal */}
      {viewingDept && (
        <Modal isOpen={Boolean(viewingDept)} onClose={() => setViewingDept(null)} title={`Department: ${viewingDept.name}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Department Code:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{viewingDept.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department Head:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingDept.head}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Headcount:</span>
                <span className="font-mono">{viewingDept.headcount} active employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Operational Scope:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">ORGANIZATION / TENANT</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingDept(null)}
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
