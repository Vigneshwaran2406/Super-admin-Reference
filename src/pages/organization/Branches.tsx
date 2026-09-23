import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { mockBranches } from '@/mock'
import { MapPin, Plus, Search, CheckCircle2, XCircle, Eye, Edit3, Trash2, Check, UserCheck, UserX } from 'lucide-react'

export const Branches: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [branches, setBranches] = useState(mockBranches)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingBranch, setEditingBranch] = useState<any | null>(null)
  const [viewingBranch, setViewingBranch] = useState<any | null>(null)

  // Add form
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [city, setCity] = useState('')

  // Edit form
  const [editName, setEditName] = useState('')
  const [editCode, setEditCode] = useState('')
  const [editCity, setEditCity] = useState('')

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
    const newBranch = {
      id: `BRN-0${branches.length + 1}`,
      name,
      code: code.toUpperCase(),
      city: city || 'Headquarters',
      status: 'Active',
      headcount: 0,
    }
    setBranches([...branches, newBranch as any])
    setIsAddModalOpen(false)
    setName('')
    setCode('')
    setCity('')
    showToast(`Branch ${name} created`, 'success', 'Regional branch registered.')
  }

  const handleOpenEdit = (branch: any) => {
    setEditingBranch(branch)
    setEditName(branch.name)
    setEditCode(branch.code)
    setEditCity(branch.city || '')
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingBranch) return
    setBranches(prev => prev.map(b => b.id === editingBranch.id ? { ...b, name: editName, code: editCode.toUpperCase(), city: editCity } : b))
    setEditingBranch(null)
    showToast(`Branch ${editName} updated`, 'info', 'Branch details saved.')
  }

  const handleToggleStatus = (branch: any) => {
    const isActivating = branch.status === 'Inactive'
    setConfirmModal({
      isOpen: true,
      title: isActivating ? `Activate ${branch.name}?` : `Deactivate ${branch.name}?`,
      message: isActivating
        ? `Are you sure you want to reactivate ${branch.name}? Branch operations will resume.`
        : `Are you sure you want to deactivate ${branch.name}? Regional workflows will be put on hold.`,
      actionType: isActivating ? 'generic' : 'deactivate',
      confirmLabel: isActivating ? 'Confirm Activate' : 'Confirm Deactivate',
      onConfirm: () => {
        setBranches(prev => prev.map(b => b.id === branch.id ? { ...b, status: isActivating ? 'Active' : 'Inactive' } : b))
        showToast(
          isActivating ? `Branch ${branch.name} activated` : `Branch ${branch.name} deactivated`,
          isActivating ? 'success' : 'warning',
          `Status changed to ${isActivating ? 'Active' : 'Inactive'}.`
        )
      }
    })
  }

  const handleDelete = (branch: any) => {
    setConfirmModal({
      isOpen: true,
      title: `Delete Branch ${branch.name}?`,
      message: `Are you sure you want to permanently remove ${branch.name}? This cannot be undone.`,
      actionType: 'delete',
      confirmLabel: 'Confirm Delete',
      onConfirm: () => {
        setBranches(prev => prev.filter(b => b.id !== branch.id))
        showToast(`Branch ${branch.name} deleted`, 'error', 'Branch record removed.')
      }
    })
  }

  const filtered = branches.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Branch Management"
        managedBy="ORGANIZATION ADMINISTRATOR"
        scope="ORGANIZATION / TENANT"
        purpose="Defines corporate branch offices, regional cost centers, and operational facilities across geographic sites."
        accessLevel="Tenant-Scoped (Assigned Organization Only)"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search branches by name or code..."
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
          <Plus className="w-3.5 h-3.5" /> Add Branch
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Branch Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Location / City</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((b: any) => {
                const isActive = b.status === 'Active'
                return (
                  <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{b.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {b.code}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                      {b.city || 'Regional Center'}
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
                          onClick={() => setViewingBranch(b)}
                          className="px-2 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-bold transition-colors text-xs"
                        >
                          View
                        </button>
                        <ActionDropdown
                          items={[
                            {
                              label: 'View Details',
                              icon: <Eye className="w-3.5 h-3.5" />,
                              onClick: () => setViewingBranch(b),
                            },
                            {
                              label: 'Edit Branch',
                              icon: <Edit3 className="w-3.5 h-3.5" />,
                              onClick: () => handleOpenEdit(b),
                            },
                            {
                              label: isActive ? 'Deactivate' : 'Activate',
                              icon: isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />,
                              variant: isActive ? 'warning' : 'primary',
                              onClick: () => handleToggleStatus(b),
                            },
                            {
                              label: 'Delete Branch',
                              icon: <Trash2 className="w-3.5 h-3.5" />,
                              variant: 'danger',
                              onClick: () => handleDelete(b),
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Branch">
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Branch Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. North America Headquarters"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Branch Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. NA-HQ"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">City / Region</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Chicago, IL"
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
              Create Branch
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editingBranch && (
        <Modal isOpen={Boolean(editingBranch)} onClose={() => setEditingBranch(null)} title={`Edit Branch: ${editingBranch.name}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Branch Name</label>
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
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">City</label>
              <input
                type="text"
                value={editCity}
                onChange={(e) => setEditCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingBranch(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Branch
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Modal */}
      {viewingBranch && (
        <Modal isOpen={Boolean(viewingBranch)} onClose={() => setViewingBranch(null)} title={`Branch: ${viewingBranch.name}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Branch Identifier:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{viewingBranch.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingBranch.city || 'Regional Center'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">{viewingBranch.status}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingBranch(null)}
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
