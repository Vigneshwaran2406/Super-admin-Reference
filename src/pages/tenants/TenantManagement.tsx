import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { RestrictedScopeNotice } from '@/components/ui/RestrictedScopeNotice'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { mockTenants } from '@/mock'
import { Tenant } from '@/types'
import { 
  Database, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Eye, 
  Settings, 
  Palette, 
  HardDrive, 
  Power, 
  Trash2 
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const TenantManagement: React.FC = () => {
  const navigate = useNavigate()
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [tenants, setTenants] = useState<Tenant[]>(mockTenants)
  const [searchQuery, setSearchQuery] = useState('')
  const [tierFilter, setTierFilter] = useState('All')
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null)
  const [brandingTenant, setBrandingTenant] = useState<Tenant | null>(null)
  
  // Confirmation Dialog
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'delete' | 'deactivate' | 'suspend' | 'generic'
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
  const [newTenantName, setNewTenantName] = useState('')
  const [newTenantCode, setNewTenantCode] = useState('')
  const [newTier, setNewTier] = useState<'Enterprise' | 'Professional' | 'Starter'>('Enterprise')
  const [newAdminEmail, setNewAdminEmail] = useState('')

  // Edit/Configure state
  const [editTier, setEditTier] = useState<'Enterprise' | 'Professional' | 'Starter'>('Enterprise')
  const [editAdminEmail, setEditAdminEmail] = useState('')

  // Branding state
  const [customSubdomain, setCustomSubdomain] = useState('')
  const [primaryBrandColor, setPrimaryBrandColor] = useState('#4f46e5')

  if (perspective !== 'super-admin') {
    return (
      <div className="space-y-6 pb-16">
        <RestrictedScopeNotice
          screenTitle="Cross-Tenant Multi-Tenant Operations"
          customExplanation="Multi-tenant lifecycle provisioning, database cluster allocation, tenant suspension, and cross-organization tenancy management are exclusive authorities of the Super Administrator. Organization Administrators manage organization units and users strictly within their assigned tenant boundary."
        />
      </div>
    )
  }

  const lifecycleSteps = [
    { step: '01', title: 'CREATE', detail: 'Initialize tenant container and define organization code' },
    { step: '02', title: 'CONFIGURE', detail: 'Assign subdomain prefix and seat quota bounds' },
    { step: '03', title: 'BRAND', detail: 'Inject enterprise theme tokens and custom SVG logo' },
    { step: '04', title: 'PROVISION', detail: 'Deploy dedicated VPC, database schemas, and IAM policies' },
    { step: '05', title: 'ISOLATE', detail: 'Enforce data-level isolation and cryptographic key separation' },
    { step: '06', title: 'BACKUP', detail: 'Configure automated cross-region snapshot schedule' },
    { step: '07', title: 'MANAGE STATUS', detail: 'Maintain active, suspended, or decommissioned lifecycle status' },
  ]

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: Tenant = {
      id: `TEN-00${tenants.length + 1}`,
      name: newTenantName,
      code: newTenantCode.toUpperCase(),
      domain: `${newTenantCode.toLowerCase()}.onecloud.io`,
      tier: newTier,
      status: 'Active',
      databaseIsolation: 'Dedicated DB',
      storageUsed: '12 GB / 1,000 GB',
      usersCount: 1,
      adminContact: newAdminEmail,
      region: 'us-east-1 (N. Virginia)',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setTenants([newEntry, ...tenants])
    setIsCreateModalOpen(false)
    setNewTenantName('')
    setNewTenantCode('')
    setNewAdminEmail('')
    showToast(`Tenant ${newTenantName} provisioned`, 'success', 'Tenant container initialized with dedicated database cluster.')
  }

  const handleOpenConfigure = (tenant: Tenant) => {
    setEditingTenant(tenant)
    setEditTier(tenant.tier)
    setEditAdminEmail(tenant.adminContact)
  }

  const handleSaveConfigure = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTenant) return
    setTenants(prev => prev.map(t => t.id === editingTenant.id ? { ...t, tier: editTier, adminContact: editAdminEmail } : t))
    setEditingTenant(null)
    showToast(`Tenant ${editingTenant.name} updated`, 'info', 'Subscription tier and administrator contact parameters saved.')
  }

  const handleOpenBranding = (tenant: Tenant) => {
    setBrandingTenant(tenant)
    setCustomSubdomain(tenant.domain.split('.')[0])
  }

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault()
    if (!brandingTenant) return
    setTenants(prev => prev.map(t => t.id === brandingTenant.id ? { ...t, domain: `${customSubdomain}.onecloud.io` } : t))
    setBrandingTenant(null)
    showToast(`Branding updated for ${brandingTenant.name}`, 'success', 'Custom white-label tokens and subdomain DNS updated.')
  }

  const handleTriggerBackup = (tenant: Tenant) => {
    setConfirmModal({
      isOpen: true,
      title: `Trigger Snapshot Backup for ${tenant.name}?`,
      message: `Initiate an instantaneous cross-region encrypted database snapshot for tenant cluster ${tenant.code}?`,
      actionType: 'generic',
      confirmLabel: 'Start Snapshot',
      onConfirm: () => {
        showToast('Backup snapshot initiated', 'info', `Encrypted snapshot for ${tenant.name} dispatched to secondary vault.`)
      }
    })
  }

  const handleToggleStatus = (tenant: Tenant) => {
    const isSuspended = tenant.status === 'Suspended'
    setConfirmModal({
      isOpen: true,
      title: isSuspended ? `Reactivate Tenant ${tenant.name}?` : `Suspend Tenant ${tenant.name}?`,
      message: isSuspended
        ? `Reactivate tenant access for ${tenant.name}? All authenticated users will regain access immediately.`
        : `Suspending ${tenant.name} will immediately disconnect all tenant users and freeze API ingress traffic.`,
      actionType: isSuspended ? 'generic' : 'suspend',
      confirmLabel: isSuspended ? 'Confirm Reactivation' : 'Confirm Suspension',
      onConfirm: () => {
        setTenants(prev => prev.map(t => t.id === tenant.id ? { ...t, status: isSuspended ? 'Active' : 'Suspended' } : t))
        showToast(
          isSuspended ? `Tenant ${tenant.name} reactivated` : `Tenant ${tenant.name} suspended`,
          isSuspended ? 'success' : 'warning',
          `Lifecycle status changed to ${isSuspended ? 'Active' : 'Suspended'}.`
        )
      }
    })
  }

  const handleDecommission = (tenant: Tenant) => {
    setConfirmModal({
      isOpen: true,
      title: `Decommission Tenant ${tenant.name}?`,
      message: `Decommissioning will mark ${tenant.name} as inactive, archive schema backups, and de-allocate compute capacity.`,
      actionType: 'delete',
      confirmLabel: 'Confirm Decommission',
      onConfirm: () => {
        setTenants(prev => prev.map(t => t.id === tenant.id ? { ...t, status: 'Suspended' as const } : t))
        showToast(`Tenant ${tenant.name} decommissioned`, 'error', 'Tenant container transitioned to decommissioned state.')
      }
    })
  }

  const filteredTenants = tenants.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.domain.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTier = tierFilter === 'All' || t.tier === tierFilter
    return matchesSearch && matchesTier
  })

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Tenant Lifecycle & Multi-Tenancy Management"
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Authoritative control plane for enterprise tenant onboarding, dedicated database cluster allocation, and cryptographic tenant separation."
        accessLevel="ALL TENANTS (Global Control Plane)"
      />

      {/* Compact Horizontal Stepper */}
      <div className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2 text-xs">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Tenant Lifecycle Progression:
          </span>
          {selectedStep !== null && (
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">
              Step {lifecycleSteps[selectedStep].step}: {lifecycleSteps[selectedStep].detail}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
          {lifecycleSteps.map((node, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStep(selectedStep === idx ? null : idx)}
              className={`p-2 rounded-xl border text-center transition-all ${
                selectedStep === idx
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-400 text-indigo-700 dark:text-indigo-300'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300'
              }`}
            >
              <span className="text-[9px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                STEP {node.step}
              </span>
              <span className="font-extrabold text-[11px] text-slate-900 dark:text-white block truncate">
                {node.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search organizations by name, code, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white shrink-0 cursor-pointer"
          >
            <option value="All">All Tiers</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Professional">Professional</option>
            <option value="Starter">Starter</option>
          </select>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Provision New Tenant
        </button>
      </div>

      {/* Clean Tenants Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Organization Tenant</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Database Isolation</th>
                <th className="py-3 px-4">Active Seats</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTenants.map((tenant) => {
                const isActive = tenant.status === 'Active'
                const isSuspended = tenant.status === 'Suspended'
                return (
                  <tr key={tenant.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{tenant.name}</div>
                        <div className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] mt-0.5">{tenant.domain}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      <Badge variant="global" size="sm">{tenant.tier}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                      {tenant.databaseIsolation}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono">
                      {tenant.usersCount} Assigned
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> ACTIVE
                        </span>
                      ) : isSuspended ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> SUSPENDED
                        </span>
                      ) : tenant.status === 'Provisioning' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-500">
                          <Clock className="w-3.5 h-3.5 text-sky-500" /> PROVISIONING
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
                          onClick={() => navigate(`/tenants/details?id=${tenant.id}`)}
                          className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-bold transition-colors text-xs"
                        >
                          View
                        </button>
                        <ActionDropdown
                          items={[
                            {
                              label: 'View Details',
                              icon: <Eye className="w-3.5 h-3.5" />,
                              onClick: () => navigate(`/tenants/details?id=${tenant.id}`),
                            },
                            {
                              label: 'Edit / Configure',
                              icon: <Settings className="w-3.5 h-3.5" />,
                              onClick: () => handleOpenConfigure(tenant),
                            },
                            {
                              label: 'Branding Tokens',
                              icon: <Palette className="w-3.5 h-3.5" />,
                              onClick: () => handleOpenBranding(tenant),
                            },
                            {
                              label: 'Trigger Backup',
                              icon: <HardDrive className="w-3.5 h-3.5" />,
                              onClick: () => handleTriggerBackup(tenant),
                            },
                            {
                              label: isSuspended ? 'Activate Tenant' : 'Suspend Tenant',
                              icon: <Power className="w-3.5 h-3.5" />,
                              variant: isSuspended ? 'primary' : 'warning',
                              onClick: () => handleToggleStatus(tenant),
                            },
                            {
                              label: 'Decommission',
                              icon: <Trash2 className="w-3.5 h-3.5" />,
                              variant: 'danger',
                              onClick: () => handleDecommission(tenant),
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

      {/* Provision Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Provision New Enterprise Tenant">
        <form onSubmit={handleCreateTenant} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Organization Name</label>
            <input
              type="text"
              required
              value={newTenantName}
              onChange={(e) => setNewTenantName(e.target.value)}
              placeholder="e.g. Apex Global Industrial"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tenant Code</label>
              <input
                type="text"
                required
                value={newTenantCode}
                onChange={(e) => setNewTenantCode(e.target.value)}
                placeholder="e.g. APEX"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subscription Tier</label>
              <select
                value={newTier}
                onChange={(e) => setNewTier(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Enterprise">Enterprise Platinum</option>
                <option value="Professional">Professional Growth</option>
                <option value="Starter">Starter Pilot</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Contact Email</label>
            <input
              type="email"
              required
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="admin@tenantdomain.com"
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
              Provision Tenant
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit / Configure Modal */}
      {editingTenant && (
        <Modal isOpen={Boolean(editingTenant)} onClose={() => setEditingTenant(null)} title={`Configure Tenant: ${editingTenant.name}`}>
          <form onSubmit={handleSaveConfigure} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subscription Tier</label>
              <select
                value={editTier}
                onChange={(e) => setEditTier(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Enterprise">Enterprise Platinum</option>
                <option value="Professional">Professional Growth</option>
                <option value="Starter">Starter Pilot</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Contact Email</label>
              <input
                type="email"
                required
                value={editAdminEmail}
                onChange={(e) => setEditAdminEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingTenant(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Configuration
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Branding Modal */}
      {brandingTenant && (
        <Modal isOpen={Boolean(brandingTenant)} onClose={() => setBrandingTenant(null)} title={`Branding: ${brandingTenant.name}`}>
          <form onSubmit={handleSaveBranding} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dedicated Subdomain Prefix</label>
              <div className="flex items-center">
                <input
                  type="text"
                  required
                  value={customSubdomain}
                  onChange={(e) => setCustomSubdomain(e.target.value)}
                  className="w-full px-3 py-2 rounded-l-xl border border-r-0 border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
                />
                <span className="px-3 py-2 rounded-r-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-xs">
                  .onecloud.io
                </span>
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Primary Brand Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryBrandColor}
                  onChange={(e) => setPrimaryBrandColor(e.target.value)}
                  className="w-10 h-8 rounded border border-slate-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryBrandColor}
                  onChange={(e) => setPrimaryBrandColor(e.target.value)}
                  className="w-32 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setBrandingTenant(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Update Branding
              </button>
            </div>
          </form>
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
