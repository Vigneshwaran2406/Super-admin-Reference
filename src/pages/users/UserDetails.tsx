import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { mockUsers } from '@/mock'
import { UserRecord } from '@/types'
import { 
  Users, 
  ShieldCheck, 
  Clock, 
  Key, 
  Lock, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle,
  Smartphone, 
  ShieldAlert, 
  RefreshCw,
  Edit3,
  UserCheck,
  UserX,
  Activity,
  Mail,
  Building2,
  FolderTree
} from 'lucide-react'

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { showToast } = useToast()
  const { perspective } = usePerspective()

  const initialUser = mockUsers.find(u => u.id === id) || mockUsers[0]
  const [user, setUser] = useState<UserRecord>(initialUser)
  const [activeTab, setActiveTab] = useState<'overview' | 'permissions' | 'sessions' | 'activity'>('overview')

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editName, setEditName] = useState(user.name)
  const [editEmail, setEditEmail] = useState(user.email)
  const [editRole, setEditRole] = useState(user.role)

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'deactivate' | 'generic'
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

  const isActive = user.status === 'Active'

  const handleToggleStatus = () => {
    const isActivating = !isActive
    setConfirmModal({
      isOpen: true,
      title: isActivating ? `Activate ${user.name}?` : `Deactivate ${user.name}?`,
      message: isActivating 
        ? `Are you sure you want to reactivate ${user.name}? They will regain access to their assigned operational domains.`
        : `Are you sure you want to deactivate ${user.name}? All active sessions will be terminated.`,
      actionType: isActivating ? 'generic' : 'deactivate',
      confirmLabel: isActivating ? 'Confirm Activate' : 'Confirm Deactivate',
      onConfirm: () => {
        setUser(prev => ({ ...prev, status: isActivating ? 'Active' : 'Inactive' }))
        showToast(
          isActivating ? `User ${user.name} activated` : `User ${user.name} deactivated`,
          isActivating ? 'success' : 'warning',
          `Account status updated to ${isActivating ? 'Active' : 'Inactive'}.`
        )
      }
    })
  }

  const handleResetCredentials = () => {
    setConfirmModal({
      isOpen: true,
      title: `Reset Credentials for ${user.name}?`,
      message: `A temporary password reset link and MFA verification token will be dispatched to ${user.email}.`,
      actionType: 'generic',
      confirmLabel: 'Dispatch Reset Link',
      onConfirm: () => {
        showToast('Credentials reset dispatched', 'info', `Password reset token sent to ${user.email}.`)
      }
    })
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(prev => ({ ...prev, name: editName, email: editEmail, role: editRole }))
    setIsEditModalOpen(false)
    showToast(`User ${editName} updated`, 'success', 'Profile metadata and role assignment saved.')
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="mb-2">
        <Link to="/users" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
          <ChevronLeft className="w-4 h-4" /> Back to User Directory
        </Link>
      </div>

      <ContextPanel
        title={`User Profile & Security Governance: ${user.name}`}
        managedBy="SUPER ADMINISTRATOR (Global) • ORGANIZATION ADMINISTRATOR (Tenant Scoped)"
        scope={user.scope}
        purpose="Inspect user identity profile, active role assignments, delegated RBAC permissions, and multi-factor session state."
        accessLevel="ROLE-AWARE IDENTITY DIRECTORY"
      />

      {/* Clean Spacious Profile Header with Compact Action Bar */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
            {user.avatar}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${
                isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {isActive ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3 text-slate-400" />}
                {user.status.toUpperCase()}
              </span>
              <Badge variant={user.scope === 'GLOBAL' ? 'global' : user.scope.includes('ORGANIZATION') ? 'tenant' : 'domain'} size="sm">
                {user.role}
              </Badge>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /> {user.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Building2 className="w-3 h-3 text-slate-400" /> {user.tenantName}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><FolderTree className="w-3 h-3 text-slate-400" /> Human Resources</span>
            </div>
          </div>
        </div>

        {/* Compact Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setEditName(user.name)
              setEditEmail(user.email)
              setEditRole(user.role)
              setIsEditModalOpen(true)
            }}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={handleToggleStatus}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isActive
                ? 'border-amber-200 dark:border-amber-900/40 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                : 'border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
            }`}
          >
            {isActive ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
            {isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={handleResetCredentials}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Credentials
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === 'activity'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> View Activity
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition-colors ${
            activeTab === 'overview'
              ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Overview & Roles
        </button>
        <button
          onClick={() => setActiveTab('permissions')}
          className={`pb-3 transition-colors ${
            activeTab === 'permissions'
              ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Effective Permissions (RBAC)
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`pb-3 transition-colors ${
            activeTab === 'sessions'
              ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Active Sessions & MFA
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-3 transition-colors ${
            activeTab === 'activity'
              ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Audit Activity Trail
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Identity & Directory Bounds</h3>
            <div className="space-y-2 text-slate-600 dark:text-slate-400 divide-y divide-slate-100 dark:divide-slate-800">
              <div className="flex justify-between py-1.5">
                <span>User ID:</span>
                <span className="font-mono text-slate-900 dark:text-white">{user.id}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Tenant Domain:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{user.tenantName}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Primary Role:</span>
                <span className="font-bold text-slate-900 dark:text-white">{user.role}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Administrative Scope:</span>
                <span className="font-mono">{user.scope}</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Security Posture</h3>
            <div className="space-y-2 text-slate-600 dark:text-slate-400 divide-y divide-slate-100 dark:divide-slate-800">
              <div className="flex justify-between py-1.5">
                <span>MFA Enforcement:</span>
                <span className="font-bold text-emerald-600">Hardware Key / Authenticator (Active)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Password Last Changed:</span>
                <span className="font-mono text-slate-900 dark:text-white">18 days ago</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Account Status:</span>
                <span className="font-bold text-slate-900 dark:text-white">{user.status}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Last Session IP:</span>
                <span className="font-mono text-slate-900 dark:text-white">192.0.2.45 (Verified)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'permissions' && (
        <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Effective Capabilities</h3>
            <span className="text-slate-400 font-mono text-[11px]">ROLE: {user.role.toUpperCase()}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {['CREATE', 'READ', 'UPDATE', 'DELETE', 'APPROVE', 'EXPORT', 'IMPORT', 'PRINT'].map((action) => (
              <div key={action} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">{action}</span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {action === 'DELETE' ? '◐ RBAC' : '✓ ALLOWED'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Active Browser Sessions</h3>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Chrome on macOS (Current Session)</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">IP: 192.0.2.45 • Started 2h ago</div>
            </div>
            <button
              onClick={() => showToast('Session revoked', 'warning', 'Session terminated (UI/UX simulation).')}
              className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/40 text-rose-600 font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-xs"
            >
              Revoke Session
            </button>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Recent Activity Log</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            <div className="py-2.5 flex justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">User Sign-in with Hardware Key</span>
                <div className="text-[11px] text-slate-400">Authenticated through SSO Okta identity pipeline</div>
              </div>
              <span className="font-mono text-slate-400 text-[11px]">25m ago</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">Profile Updated</span>
                <div className="text-[11px] text-slate-400">Contact telephone number amended</div>
              </div>
              <span className="font-mono text-slate-400 text-[11px]">2 days ago</span>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User Profile">
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
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
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
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Save Profile
            </button>
          </div>
        </form>
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
