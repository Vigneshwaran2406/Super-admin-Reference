import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { mockLocations } from '@/mock'
import { MapPin, Plus, Search, CheckCircle2, XCircle, Eye, Edit3, Trash2, UserCheck, UserX } from 'lucide-react'

export const Locations: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [locations, setLocations] = useState(mockLocations)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingLoc, setEditingLoc] = useState<any | null>(null)
  const [viewingLoc, setViewingLoc] = useState<any | null>(null)

  // Add form
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [type, setType] = useState('Corporate Office')

  // Edit form
  const [editName, setEditName] = useState('')
  const [editCode, setEditCode] = useState('')
  const [editType, setEditType] = useState('')

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
    const newLoc = {
      id: `LOC-0${locations.length + 1}`,
      name,
      code: code.toUpperCase(),
      type,
      status: 'Active',
      address: 'Corporate Park Boulevard',
    }
    setLocations([...locations, newLoc as any])
    setIsAddModalOpen(false)
    setName('')
    setCode('')
    showToast(`Location ${name} added`, 'success', 'Physical facility registered.')
  }

  const handleOpenEdit = (loc: any) => {
    setEditingLoc(loc)
    setEditName(loc.name)
    setEditCode(loc.code)
    setEditType(loc.type || 'Corporate Office')
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingLoc) return
    setLocations(prev => prev.map(l => l.id === editingLoc.id ? { ...l, name: editName, code: editCode.toUpperCase(), type: 'Location' as const } : l))
    setEditingLoc(null)
    showToast(`Location ${editName} updated`, 'info', 'Location parameters saved.')
  }

  const handleToggleStatus = (loc: any) => {
    const isActivating = loc.status === 'Inactive'
    setConfirmModal({
      isOpen: true,
      title: isActivating ? `Activate ${loc.name}?` : `Deactivate ${loc.name}?`,
      message: isActivating
        ? `Are you sure you want to reactivate facility ${loc.name}?`
        : `Are you sure you want to decommission/deactivate ${loc.name}?`,
      actionType: isActivating ? 'generic' : 'deactivate',
      confirmLabel: isActivating ? 'Confirm Activate' : 'Confirm Deactivate',
      onConfirm: () => {
        setLocations(prev => prev.map(l => l.id === loc.id ? { ...l, status: isActivating ? 'Active' : 'Inactive' } : l))
        showToast(
          isActivating ? `Location ${loc.name} activated` : `Location ${loc.name} deactivated`,
          isActivating ? 'success' : 'warning',
          `Status changed to ${isActivating ? 'Active' : 'Inactive'}.`
        )
      }
    })
  }

  const handleDelete = (loc: any) => {
    setConfirmModal({
      isOpen: true,
      title: `Delete Location ${loc.name}?`,
      message: `Are you sure you want to remove ${loc.name}? This cannot be undone.`,
      actionType: 'delete',
      confirmLabel: 'Confirm Delete',
      onConfirm: () => {
        setLocations(prev => prev.filter(l => l.id !== loc.id))
        showToast(`Location ${loc.name} deleted`, 'error', 'Location removed.')
      }
    })
  }

  const filtered = locations.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Location & Site Management"
        managedBy="ORGANIZATION ADMINISTRATOR"
        scope="ORGANIZATION / TENANT"
        purpose="Defines physical enterprise operational buildings, warehouses, distribution facilities, and client campuses."
        accessLevel="Tenant-Scoped (Assigned Organization Only)"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search locations by name or code..."
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
          <Plus className="w-3.5 h-3.5" /> Add Location
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Location Name</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Facility Type</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((l: any) => {
                const isActive = l.status === 'Active'
                return (
                  <tr key={l.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                      <span>{l.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {l.code}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                      {l.type || 'Corporate Office'}
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
                          onClick={() => setViewingLoc(l)}
                          className="px-2 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-bold transition-colors text-xs"
                        >
                          View
                        </button>
                        <ActionDropdown
                          items={[
                            {
                              label: 'View Details',
                              icon: <Eye className="w-3.5 h-3.5" />,
                              onClick: () => setViewingLoc(l),
                            },
                            {
                              label: 'Edit Location',
                              icon: <Edit3 className="w-3.5 h-3.5" />,
                              onClick: () => handleOpenEdit(l),
                            },
                            {
                              label: isActive ? 'Deactivate' : 'Activate',
                              icon: isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />,
                              variant: isActive ? 'warning' : 'primary',
                              onClick: () => handleToggleStatus(l),
                            },
                            {
                              label: 'Delete Location',
                              icon: <Trash2 className="w-3.5 h-3.5" />,
                              variant: 'danger',
                              onClick: () => handleDelete(l),
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
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Facility Location">
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Facility Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. West Coast Logistics Hub"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. WCL-01"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Facility Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Corporate Office">Corporate Office</option>
              <option value="Warehouse / Fulfillment">Warehouse / Fulfillment</option>
              <option value="Data Center">Data Center Facility</option>
              <option value="Regional Sales Center">Regional Sales Center</option>
            </select>
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
              Create Location
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editingLoc && (
        <Modal isOpen={Boolean(editingLoc)} onClose={() => setEditingLoc(null)} title={`Edit Location: ${editingLoc.name}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Facility Name</label>
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
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Type</label>
              <select
                value={editType}
                onChange={(e) => setEditType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Corporate Office">Corporate Office</option>
                <option value="Warehouse / Fulfillment">Warehouse / Fulfillment</option>
                <option value="Data Center">Data Center Facility</option>
                <option value="Regional Sales Center">Regional Sales Center</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingLoc(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Location
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Modal */}
      {viewingLoc && (
        <Modal isOpen={Boolean(viewingLoc)} onClose={() => setViewingLoc(null)} title={`Location: ${viewingLoc.name}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Location Code:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{viewingLoc.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Facility Type:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingLoc.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Operating Status:</span>
                <span className="font-bold text-emerald-600">{viewingLoc.status}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingLoc(null)}
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
