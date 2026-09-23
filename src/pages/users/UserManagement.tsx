import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { ActionBoundaryBar } from '@/components/ui/ActionBoundaryBar'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { mockUsers } from '@/mock'
import { UserRecord } from '@/types'
import { 
  Users, 
  Plus, 
  Search, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Edit3, 
  Trash2, 
  UserCheck, 
  UserX,
  FileSpreadsheet
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const UserManagement: React.FC = () => {
  const navigate = useNavigate()
  const { perspective, perspectiveLabel, perspectiveScope, selectedTenant } = usePerspective()
  const { showToast } = useToast()

  const [users, setUsers] = useState<UserRecord[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  // Modals & confirmation dialog states
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null)
  
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

  // Create form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('HR Manager')

  // Edit form state
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editRole, setEditRole] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    const newUser: UserRecord = {
      id: `usr_${Math.random().toString(36).substr(2, 6)}`,
      name,
      email,
      role,
      scope: 'ORGANIZATION / TENANT',
      tenantId: 'TEN-001',
      tenantName: selectedTenant,
      status: 'Active',
      lastLogin: 'Just now',
      mfaEnabled: true,
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
    }
    setUsers([newUser, ...users])
    setIsRegisterModalOpen(false)
    setName('')
    setEmail('')
    showToast(`User ${name} created`, 'success', 'New enterprise user account provisioned successfully.')
  }

  const handleOpenEdit = (user: UserRecord) => {
    setEditingUser(user)
    setEditName(user.name)
    setEditEmail(user.email)
    setEditRole(user.role)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, name: editName, email: editEmail, role: editRole } : u))
    setEditingUser(null)
    showToast(`User ${editName} updated`, 'info', 'Profile metadata and role assignment updated.')
  }

  const handleToggleStatus = (user: UserRecord) => {
    const isActivating = user.status === 'Inactive'
    setConfirmModal({
      isOpen: true,
      title: isActivating ? `Activate User ${user.name}?` : `Deactivate User ${user.name}?`,
      message: isActivating 
        ? `Are you sure you want to reactivate ${user.name}'s account? They will regain access to authorized resources.`
        : `Are you sure you want to deactivate ${user.name}? Their active sessions will be terminated.`,
      actionType: isActivating ? 'generic' : 'deactivate',
      confirmLabel: isActivating ? 'Confirm Activate' : 'Confirm Deactivate',
      onConfirm: () => {
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: isActivating ? 'Active' : 'Inactive' } : u))
        showToast(
          isActivating ? `User ${user.name} activated` : `User ${user.name} deactivated`,
          isActivating ? 'success' : 'warning',
          `Account status updated to ${isActivating ? 'Active' : 'Inactive'}.`
        )
      }
    })
  }

  const handleDelete = (user: UserRecord) => {
    setConfirmModal({
      isOpen: true,
      title: `Delete User ${user.name}?`,
      message: `Are you sure you want to permanently remove ${user.name} (${user.email})? This action cannot be undone.`,
      actionType: 'delete',
      confirmLabel: 'Confirm Delete',
      onConfirm: () => {
        setUsers(prev => prev.filter(u => u.id !== user.id))
        showToast(`User ${user.name} deleted`, 'error', 'User record removed from directory.')
      }
    })
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.tenantName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'All' || u.role.toLowerCase().includes(roleFilter.toLowerCase())
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Enterprise User Directory"
        managedBy="SUPER ADMINISTRATOR (Global) • ORGANIZATION ADMINISTRATOR (Tenant Scoped)"
        scope="ORGANIZATION / TENANT"
        purpose="Administrative identity console governing employee lifecycle, role assignments, and organizational tenancy."
        accessLevel="ROLE-AWARE IDENTITY DIRECTORY"
      />

      {/* Compact Action Reference Strip */}
      <ActionBoundaryBar
        resourceName="User Directory & Identity Governance"
        currentRole={perspectiveLabel}
        currentScope={perspectiveScope}
        dataBoundary={perspective === 'super-admin' ? "Global cross-tenant directory" : `Bounded to ${selectedTenant}`}
        explanation="Controls user provisioning, role assignments, directory credentials, and account activation/deactivation within assigned administrative boundaries."
        actions={[
          { label: 'Register User', action: 'CREATE', state: '✓ ALLOWED', description: 'Provision new accounts within tenant boundary' },
          { label: 'View Profile', action: 'READ', state: '✓ ALLOWED', description: 'Inspect identity credentials and audit metadata' },
          { label: 'Edit Profile', action: 'UPDATE', state: '✓ ALLOWED', description: 'Modify employee directory attributes and roles' },
          { label: 'Deactivate / Terminate', action: 'DELETE', state: '✓ ALLOWED', description: 'Deactivate user access and invalidate active sessions' },
          { label: 'CSV Bulk Import', action: 'IMPORT', state: '✓ ALLOWED', description: 'Batch ingest user records via CSV reference format' },
          { label: 'Directory Export', action: 'EXPORT', state: '✓ ALLOWED', description: 'Download compliance user directory ledger' },
        ]}
      />

      {/* Clean Toolbar: Search, Filters & CTAs */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or tenant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white shrink-0 cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Administrators</option>
            <option value="HR">HR Managers</option>
            <option value="Sales">Sales Managers</option>
            <option value="Finance">Finance</option>
            <option value="Engineer">Engineers</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBulkUploadModalOpen(true)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" /> Import
          </button>
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add User
          </button>
        </div>
      </div>

      {/* Clean Spacious Users Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Organization / Tenant</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => {
                const isActive = u.status === 'Active'
                return (
                  <tr key={u.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-xs shrink-0">
                          {u.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                          <div className="text-slate-400 font-mono text-[11px]">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {u.role}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                      {u.tenantName}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {u.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ACTIVE
                        </span>
                      ) : u.status === 'Inactive' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                          <XCircle className="w-3.5 h-3.5 text-slate-400" />
                          INACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          PENDING
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {u.lastLogin || '2 hours ago'}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => navigate(`/users/${u.id}`)}
                          className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-bold transition-colors text-xs"
                          title="View Profile & Details"
                        >
                          View
                        </button>
                        <ActionDropdown
                          items={[
                            {
                              label: 'View Details',
                              icon: <Eye className="w-3.5 h-3.5" />,
                              onClick: () => navigate(`/users/${u.id}`),
                            },
                            {
                              label: 'Edit User',
                              icon: <Edit3 className="w-3.5 h-3.5" />,
                              onClick: () => handleOpenEdit(u),
                            },
                            {
                              label: isActive ? 'Deactivate' : 'Activate',
                              icon: isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />,
                              variant: isActive ? 'warning' : 'primary',
                              onClick: () => handleToggleStatus(u),
                            },
                            {
                              label: 'Delete User',
                              icon: <Trash2 className="w-3.5 h-3.5" />,
                              variant: 'danger',
                              onClick: () => handleDelete(u),
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

      {/* Add User Modal */}
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} title="Add New User">
        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Miller"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Corporate Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jordan.m@acme.corp"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Initial Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="HR Manager">HR Manager (HRMS)</option>
              <option value="Sales Manager">Sales Manager (CRM)</option>
              <option value="Finance Manager">Finance Manager (Finance)</option>
              <option value="Procurement Manager">Procurement Manager (ERP)</option>
              <option value="Warehouse Manager">Warehouse Manager (ERP)</option>
              <option value="Organization Administrator">Organization Administrator</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Provision Account
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      {editingUser && (
        <Modal isOpen={Boolean(editingUser)} onClose={() => setEditingUser(null)} title={`Edit User: ${editingUser.name}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Corporate Email</label>
              <input
                type="email"
                required
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned Role</label>
              <select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="HR Manager">HR Manager</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Finance Manager">Finance Manager</option>
                <option value="Procurement Manager">Procurement Manager</option>
                <option value="Warehouse Manager">Warehouse Manager</option>
                <option value="Organization Administrator">Organization Administrator</option>
                <option value="Platform Administrator">Platform Administrator</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold"
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

      {/* CSV / BULK IMPORT REFERENCE Modal */}
      <Modal isOpen={isBulkUploadModalOpen} onClose={() => setIsBulkUploadModalOpen(false)} title="CSV / BULK IMPORT REFERENCE">
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Reference bulk import interface demonstrating CSV upload and identity directory synchronization within your assigned organization boundary.
          </p>
          <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center space-y-2 hover:border-indigo-400 transition-colors cursor-pointer">
            <FileSpreadsheet className="w-8 h-8 text-indigo-500 mx-auto" />
            <div className="font-bold text-slate-800 dark:text-slate-200">
              Drop user CSV or directory file here
            </div>
            <div className="text-[11px] text-slate-400">
              Supported columns: name, email, role, department, employee_id
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsBulkUploadModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsBulkUploadModalOpen(false)
                showToast('Import reference completed', 'success', '14 records validated and staged.')
              }}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
            >
              Run Test Import
            </button>
          </div>
        </div>
      </Modal>

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
