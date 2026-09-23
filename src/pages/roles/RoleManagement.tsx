import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { 
  Shield, 
  Plus, 
  Lock, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Edit3, 
  Copy, 
  Power, 
  Sliders, 
  KeyRound, 
  Layers 
} from 'lucide-react'

interface RoleItemData {
  id: string
  name: string
  type: string
  scope: string
  authority: string
  description: string
  usersAssigned: number
  permissionsCount: number
  isCustom: boolean
  status: 'Active' | 'Inactive'
}

export const RoleManagement: React.FC = () => {
  const { perspective, perspectiveScope, perspectiveLabel, selectedTenant } = usePerspective()
  const { showToast } = useToast()

  const [roles, setRoles] = useState<RoleItemData[]>([
    {
      id: 'role-super-admin',
      name: 'Super Administrator',
      type: 'Root Cloud User Class',
      scope: 'GLOBAL',
      authority: 'Full Platform Root Control',
      description: 'Supreme cloud platform authority governing all enterprise tenants, cloud database clusters, and global licensing.',
      usersAssigned: 3,
      permissionsCount: 48,
      isCustom: false,
      status: 'Active',
    },
    {
      id: 'role-org-admin',
      name: 'Organization Administrator',
      type: 'Primary Tenant User Class',
      scope: 'ORGANIZATION / TENANT',
      authority: 'Assigned Tenant Boundary',
      description: 'Directs organization operations, user management, and department delegations within the assigned tenant enclosure.',
      usersAssigned: 12,
      permissionsCount: 36,
      isCustom: false,
      status: 'Active',
    },
    {
      id: 'role-hr-mgr',
      name: 'HR Manager',
      type: 'Domain Operational Role',
      scope: 'DOMAIN OPERATIONAL — HRMS',
      authority: 'Workforce & Personnel Ledger',
      description: 'Supervises employee profiles, compensation policies, and leave requests within the assigned organization.',
      usersAssigned: 18,
      permissionsCount: 22,
      isCustom: false,
      status: 'Active',
    },
    {
      id: 'role-sales-mgr',
      name: 'Sales Manager',
      type: 'Domain Operational Role',
      scope: 'DOMAIN OPERATIONAL — CRM',
      authority: 'Commercial Pipelines & Quotes',
      description: 'Oversees customer relationships, territory lead distribution, and contract pricing approvals.',
      usersAssigned: 24,
      permissionsCount: 19,
      isCustom: false,
      status: 'Active',
    },
    {
      id: 'role-fin-mgr',
      name: 'Finance Manager',
      type: 'Domain Operational Role',
      scope: 'DOMAIN OPERATIONAL — FINANCE',
      authority: 'General Ledger & Invoices',
      description: 'Directs accounts payable, cross-department cost center audits, and fiscal year settlements.',
      usersAssigned: 8,
      permissionsCount: 26,
      isCustom: false,
      status: 'Active',
    },
    {
      id: 'role-proc-mgr',
      name: 'Procurement Manager',
      type: 'Domain Operational Role',
      scope: 'DOMAIN OPERATIONAL — PROCUREMENT',
      authority: 'Supplier Orders & Catalogs',
      description: 'Requisitions vendor goods, administers supplier contracts, and validates goods received.',
      usersAssigned: 6,
      permissionsCount: 17,
      isCustom: false,
      status: 'Active',
    },
    {
      id: 'role-wh-mgr',
      name: 'Warehouse Manager',
      type: 'Domain Operational Role',
      scope: 'DOMAIN OPERATIONAL — WAREHOUSE',
      authority: 'Inventory Depots & Shipments',
      description: 'Oversees physical inventory stock levels, warehouse bins, and cross-facility stock transfers.',
      usersAssigned: 9,
      permissionsCount: 15,
      isCustom: false,
      status: 'Active',
    },
  ])

  const [selectedRoleId, setSelectedRoleId] = useState<string>('role-org-admin')
  const [activeTab, setActiveTab] = useState<'overview' | 'permissions' | 'scope' | 'assignments'>('overview')

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false)
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)

  // Create form
  const [newRoleName, setNewRoleName] = useState('')
  const [newRoleScope, setNewRoleScope] = useState('ORGANIZATION / TENANT')
  const [newRoleDesc, setNewRoleDesc] = useState('')

  // Edit form
  const [editRoleName, setEditRoleName] = useState('')
  const [editRoleDesc, setEditRoleDesc] = useState('')

  // Assign user form
  const [assigneeEmail, setAssigneeEmail] = useState('')

  // Confirmation modal
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

  const selectedRole = roles.find(r => r.id === selectedRoleId) || roles[0]

  const lifecycleStages = [
    { num: '1', title: 'CREATE ROLE', desc: 'Name & scope assignment' },
    { num: '2', title: 'DEFINE PERMISSIONS', desc: 'Granular CRUD action bindings' },
    { num: '3', title: 'DEFINE SCOPE', desc: 'Record boundaries (tenant/dept)' },
    { num: '4', title: 'ASSIGN', desc: 'Bind users or groups to role' },
    { num: '5', title: 'EFFECTIVE ACCESS', desc: 'RBAC + Scope evaluation' },
  ]

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: RoleItemData = {
      id: `role-custom-${Date.now()}`,
      name: newRoleName,
      type: 'Custom Delegated Role',
      scope: newRoleScope,
      authority: `${newRoleName} Authority`,
      description: newRoleDesc || 'Custom enterprise delegated administrative authority.',
      usersAssigned: 0,
      permissionsCount: 8,
      isCustom: true,
      status: 'Active',
    }
    setRoles([...roles, newEntry])
    setSelectedRoleId(newEntry.id)
    setIsCreateModalOpen(false)
    setNewRoleName('')
    setNewRoleDesc('')
    showToast(`Role ${newRoleName} created`, 'success', 'New delegated authority role registered.')
  }

  const handleDuplicate = (role: RoleItemData) => {
    const dup: RoleItemData = {
      ...role,
      id: `role-dup-${Date.now()}`,
      name: `${role.name} (Copy)`,
      isCustom: true,
      usersAssigned: 0,
    }
    setRoles([...roles, dup])
    setSelectedRoleId(dup.id)
    showToast(`Role duplicated: ${dup.name}`, 'info', 'Cloned existing permissions and scope boundaries.')
  }

  const handleOpenEdit = (role: RoleItemData) => {
    setSelectedRoleId(role.id)
    setEditRoleName(role.name)
    setEditRoleDesc(role.description)
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    setRoles(prev => prev.map(r => r.id === selectedRoleId ? { ...r, name: editRoleName, description: editRoleDesc } : r))
    setIsEditModalOpen(false)
    showToast(`Role updated: ${editRoleName}`, 'info', 'Role metadata updated.')
  }

  const handleToggleStatus = (role: RoleItemData) => {
    const isActivating = role.status === 'Inactive'
    setConfirmModal({
      isOpen: true,
      title: isActivating ? `Activate ${role.name}?` : `Deactivate ${role.name}?`,
      message: isActivating
        ? `Reactivate role ${role.name}? Assigned staff will regain effective permissions.`
        : `Deactivating ${role.name} will suspend all privileges for ${role.usersAssigned} assigned users.`,
      actionType: isActivating ? 'generic' : 'deactivate',
      confirmLabel: isActivating ? 'Confirm Activate' : 'Confirm Deactivate',
      onConfirm: () => {
        setRoles(prev => prev.map(r => r.id === role.id ? { ...r, status: isActivating ? 'Active' : 'Inactive' } : r))
        showToast(
          isActivating ? `Role ${role.name} activated` : `Role ${role.name} deactivated`,
          isActivating ? 'success' : 'warning',
          `Status changed to ${isActivating ? 'Active' : 'Inactive'}.`
        )
      }
    })
  }

  const handleAssignUser = (e: React.FormEvent) => {
    e.preventDefault()
    setRoles(prev => prev.map(r => r.id === selectedRoleId ? { ...r, usersAssigned: r.usersAssigned + 1 } : r))
    setIsAssignModalOpen(false)
    setAssigneeEmail('')
    showToast('User assigned to role', 'success', `Granted ${selectedRole.name} authority to user.`)
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Role Management & Governance"
        managedBy="SUPER ADMINISTRATOR (Platform) • ORGANIZATION ADMINISTRATOR (Tenant Roles)"
        scope="ORGANIZATION / TENANT"
        purpose="Authoritative role catalog establishing functional user classes, delegated access privileges, and RBAC policies."
        accessLevel="ROLE CONFIGURATION & ASSIGNMENT"
      />

      {/* Compact 5-Step Lifecycle Visual Strip */}
      <div className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-wrap items-center justify-between gap-2 text-xs">
        {lifecycleStages.map((stage, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-[10px]">
                {stage.num}
              </span>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-[11px] leading-tight">
                  {stage.title}
                </div>
                <div className="text-[10px] text-slate-400 font-normal">
                  {stage.desc}
                </div>
              </div>
            </div>
            {idx < lifecycleStages.length - 1 && (
              <span className="text-slate-300 dark:text-slate-700 font-bold hidden sm:inline">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Role Catalog with Toolbar */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">Active Roles</h2>
              <p className="text-[11px] text-slate-400">Available authority profiles</p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Create Role
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {roles.map((r) => {
              const isSelected = r.id === selectedRoleId
              const isActive = r.status === 'Active'
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRoleId(r.id)}
                  className={`p-3.5 flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {r.name}
                      </span>
                      {!isActive && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-500">
                          INACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{r.type}</div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="font-mono text-[10px] text-slate-400">{r.usersAssigned} users</span>
                    <ActionDropdown
                      items={[
                        {
                          label: 'View Details',
                          icon: <Eye className="w-3.5 h-3.5" />,
                          onClick: () => setSelectedRoleId(r.id),
                        },
                        {
                          label: 'Edit Role',
                          icon: <Edit3 className="w-3.5 h-3.5" />,
                          onClick: () => handleOpenEdit(r),
                        },
                        {
                          label: 'Duplicate Role',
                          icon: <Copy className="w-3.5 h-3.5" />,
                          onClick: () => handleDuplicate(r),
                        },
                        {
                          label: isActive ? 'Deactivate' : 'Activate',
                          icon: <Power className="w-3.5 h-3.5" />,
                          variant: isActive ? 'warning' : 'primary',
                          onClick: () => handleToggleStatus(r),
                        },
                      ]}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Selected Role Details with Compact Actions */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-5">
          {/* Header & Role Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedRole.name}</h3>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedRole.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {selectedRole.status.toUpperCase()}
                </span>
                <Badge variant={selectedRole.scope === 'GLOBAL' ? 'global' : 'tenant'} size="sm">
                  {selectedRole.scope}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">{selectedRole.description}</p>
            </div>

            {/* Role Details Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setIsPermissionsModalOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" /> Edit Permissions
              </button>
              <button
                onClick={() => setIsScopeModalOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-3.5 h-3.5" /> Edit Data Scope
              </button>
              <button
                onClick={() => setIsAssignModalOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Users className="w-3.5 h-3.5" /> Assign Users
              </button>
            </div>
          </div>

          {/* 4 Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`pb-2.5 transition-colors ${
                activeTab === 'permissions'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Permissions ({selectedRole.permissionsCount})
            </button>
            <button
              onClick={() => setActiveTab('scope')}
              className={`pb-2.5 transition-colors ${
                activeTab === 'scope'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Data Scope
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`pb-2.5 transition-colors ${
                activeTab === 'assignments'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Assigned Users ({selectedRole.usersAssigned})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Authority Type</span>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedRole.type}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Access Boundary</span>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedRole.authority}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-500">
                <span>Core CRUD permissions bound to this role:</span>
                <span className="font-mono text-[11px]">{selectedRole.permissionsCount} Action Rules</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['CREATE', 'READ', 'UPDATE', 'DELETE', 'APPROVE', 'EXPORT', 'IMPORT', 'PRINT'].map((act) => (
                  <div key={act} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex justify-between">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{act}</span>
                    <span className="text-[10px] font-mono font-bold text-indigo-600">✓ ALLOWED</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scope' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-indigo-600">Administrative Boundary Model</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Records are strictly filtered according to: <span className="font-mono font-bold">{selectedRole.scope}</span>.
                Mutations cannot cross into sibling tenant spaces or unassigned departments.
              </p>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Currently assigned directory members:</span>
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="text-indigo-600 font-bold hover:underline"
                >
                  + Add Member
                </button>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">{selectedRole.usersAssigned} Active Users</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Bound through bulk directory import and manual administrative directory assignments.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Role Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Role">
        <form onSubmit={handleCreateRole} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Role Name</label>
            <input
              type="text"
              required
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              placeholder="e.g. Compliance Officer"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Administrative Scope</label>
            <select
              value={newRoleScope}
              onChange={(e) => setNewRoleScope(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ORGANIZATION / TENANT">ORGANIZATION / TENANT</option>
              <option value="DOMAIN OPERATIONAL">DOMAIN OPERATIONAL</option>
              <option value="GLOBAL">GLOBAL (Platform Tier)</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={newRoleDesc}
              onChange={(e) => setNewRoleDesc(e.target.value)}
              placeholder="Describe authority boundary and responsibilities..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Create Role
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Role Modal */}
      {isEditModalOpen && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Edit Role: ${selectedRole.name}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Role Name</label>
              <input
                type="text"
                required
                value={editRoleName}
                onChange={(e) => setEditRoleName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={editRoleDesc}
                onChange={(e) => setEditRoleDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
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
                Save Role
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Permissions Modal */}
      <Modal isOpen={isPermissionsModalOpen} onClose={() => setIsPermissionsModalOpen(false)} title={`Configure Permissions: ${selectedRole.name}`}>
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-400">
            Toggle authorized actions for {selectedRole.name} across platform and domain resources:
          </p>
          <div className="space-y-2">
            {['CREATE', 'READ', 'UPDATE', 'DELETE', 'APPROVE', 'EXPORT'].map((action) => (
              <div key={action} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{action}</span>
                  <div className="text-[11px] text-slate-400">Authorized for {selectedRole.name}</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600 cursor-pointer" />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsPermissionsModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsPermissionsModalOpen(false)
                showToast(`Permissions updated for ${selectedRole.name}`, 'success', 'Action bindings saved.')
              }}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
            >
              Save Permission Matrix
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Data Scope Modal */}
      <Modal isOpen={isScopeModalOpen} onClose={() => setIsScopeModalOpen(false)} title={`Configure Data Scope: ${selectedRole.name}`}>
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-400">
            Establish record filtering bounds for {selectedRole.name}:
          </p>
          <div className="space-y-2">
            {['GLOBAL (All records across platform)', 'ORGANIZATION (Records within assigned tenant)', 'DEPARTMENT (Records within assigned department only)', 'ASSIGNED (Only records directly assigned to user)'].map((scopeOption, i) => (
              <label key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3 cursor-pointer">
                <input type="radio" name="scope_tier" defaultChecked={i === 1} className="w-4 h-4 text-indigo-600" />
                <span className="font-bold text-slate-900 dark:text-white">{scopeOption}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsScopeModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsScopeModalOpen(false)
                showToast(`Data scope updated for ${selectedRole.name}`, 'info', 'Record boundary filter saved.')
              }}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
            >
              Save Scope Filter
            </button>
          </div>
        </div>
      </Modal>

      {/* Assign Users Modal */}
      <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title={`Assign Users to ${selectedRole.name}`}>
        <form onSubmit={handleAssignUser} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">User Corporate Email</label>
            <input
              type="email"
              required
              value={assigneeEmail}
              onChange={(e) => setAssigneeEmail(e.target.value)}
              placeholder="e.g. employee@acme.corp"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAssignModalOpen(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              Confirm User Assignment
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
