import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { RestrictedScopeNotice } from '@/components/ui/RestrictedScopeNotice'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Key, Building2, CheckCircle2, XCircle, AlertTriangle, Eye, Edit3, UserPlus, RefreshCw, Power } from 'lucide-react'

interface LicenseTierItem {
  id: string
  tier: string
  tenantsAssigned: number
  seatQuota: string
  features: string[]
  activeKeys: string
  status: 'Active' | 'Suspended' | 'Expired'
}

export const LicenseManagement: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  const [licenseTiers, setLicenseTiers] = useState<LicenseTierItem[]>([
    {
      id: 'lic-tier-ent',
      tier: 'Enterprise Platinum',
      tenantsAssigned: 3,
      seatQuota: '5,000 Seats / Tenant',
      features: ['Dedicated DB Clusters', 'Cross-Region Replication', 'Unlimited Custom Roles', '24/7 Priority SLA', 'Enterprise Copilot AI'],
      activeKeys: 'LIC-ENT-2026-9901',
      status: 'Active',
    },
    {
      id: 'lic-tier-pro',
      tier: 'Professional Growth',
      tenantsAssigned: 1,
      seatQuota: '1,000 Seats',
      features: ['Isolated DB Schema', 'Standard RBAC', 'Business Hours Support', 'Reporting & BI'],
      activeKeys: 'LIC-PRO-2026-4402',
      status: 'Active',
    },
    {
      id: 'lic-tier-str',
      tier: 'Starter Pilot',
      tenantsAssigned: 1,
      seatQuota: '100 Seats',
      features: ['Shared Schema', 'Core HRMS & CRM', 'Community Support'],
      activeKeys: 'LIC-STR-2026-1105',
      status: 'Active',
    },
  ])

  // Modals
  const [viewingTier, setViewingTier] = useState<LicenseTierItem | null>(null)
  const [editingTier, setEditingTier] = useState<LicenseTierItem | null>(null)
  const [assigningTier, setAssigningTier] = useState<LicenseTierItem | null>(null)

  // Edit quota state
  const [editSeatQuota, setEditSeatQuota] = useState('')

  // Assign tenant state
  const [assignedTenantName, setAssignedTenantName] = useState('Acme Technologies Inc.')

  // Confirm Modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'suspend' | 'generic'
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

  if (perspective !== 'super-admin') {
    return (
      <div className="space-y-6 pb-16">
        <RestrictedScopeNotice
          screenTitle="License Management & Tier Quotas"
          customExplanation="Enterprise subscription tiers, seat quotas, licensing keys, and contract renewals across enterprise organizations are managed at the global platform level by Super Administrator. Scoped administrators review assigned user counts within their tenant."
        />
      </div>
    )
  }

  const lifecycleSteps = [
    { step: '01', title: 'CREATE', desc: 'Define tier quota & module keys' },
    { step: '02', title: 'ASSIGN', desc: 'Bind license to enterprise tenant' },
    { step: '03', title: 'ACTIVATE', desc: 'Cryptographic key validation' },
    { step: '04', title: 'MONITOR', desc: 'Track seat usage & burst quotas' },
    { step: '05', title: 'RENEW', desc: 'Contract extension & tier upgrade' },
    { step: '06', title: 'EXPIRE', desc: 'Grace period & decommission' },
  ]

  const handleOpenEditQuota = (item: LicenseTierItem) => {
    setEditingTier(item)
    setEditSeatQuota(item.seatQuota)
  }

  const handleSaveQuota = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTier) return
    setLicenseTiers(prev => prev.map(t => t.id === editingTier.id ? { ...t, seatQuota: editSeatQuota } : t))
    setEditingTier(null)
    showToast(`Quota updated for ${editingTier.tier}`, 'info', `Seat limit adjusted to ${editSeatQuota}.`)
  }

  const handleOpenAssign = (item: LicenseTierItem) => {
    setAssigningTier(item)
  }

  const handleSaveAssign = (e: React.FormEvent) => {
    e.preventDefault()
    if (!assigningTier) return
    setLicenseTiers(prev => prev.map(t => t.id === assigningTier.id ? { ...t, tenantsAssigned: t.tenantsAssigned + 1 } : t))
    setAssigningTier(null)
    showToast(`License bound to ${assignedTenantName}`, 'success', `Tier ${assigningTier.tier} cryptographic entitlement granted.`)
  }

  const handleActivateKey = (item: LicenseTierItem) => {
    showToast(`License Key Activated: ${item.activeKeys}`, 'success', 'Entitlement validation signed across all tenant gateways.')
  }

  const handleRenew = (item: LicenseTierItem) => {
    setConfirmModal({
      isOpen: true,
      title: `Renew License Contract: ${item.tier}?`,
      message: `Extend license validity for ${item.tier} for an additional 12-month annual enterprise billing cycle?`,
      actionType: 'generic',
      confirmLabel: 'Confirm 12-Month Renewal',
      onConfirm: () => {
        showToast(`License contract renewed: ${item.tier}`, 'success', 'Annual validity extended through 2027.')
      }
    })
  }

  const handleToggleSuspend = (item: LicenseTierItem) => {
    const isSuspended = item.status === 'Suspended'
    setConfirmModal({
      isOpen: true,
      title: isSuspended ? `Reactivate License: ${item.tier}?` : `Suspend License: ${item.tier}?`,
      message: isSuspended
        ? `Reactivate license entitlements for ${item.tier}?`
        : `Suspending this license tier will restrict over-quota tenant user logins across ${item.tenantsAssigned} assigned organizations.`,
      actionType: isSuspended ? 'generic' : 'suspend',
      confirmLabel: isSuspended ? 'Confirm Reactivation' : 'Confirm Suspension',
      onConfirm: () => {
        setLicenseTiers(prev => prev.map(t => t.id === item.id ? { ...t, status: isSuspended ? 'Active' : 'Suspended' } : t))
        showToast(
          isSuspended ? `License ${item.tier} reactivated` : `License ${item.tier} suspended`,
          isSuspended ? 'success' : 'warning',
          `Tier status changed to ${isSuspended ? 'Active' : 'Suspended'}.`
        )
      }
    })
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Platform License Management"
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Governs platform subscription tiers, license keys, multi-tenant seat allocations, and enterprise feature module entitlements."
        accessLevel="GLOBAL AUTHORITY"
      />

      {/* Compact Stepper */}
      <div className="p-3.5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2 text-xs">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            License Lifecycle Progression:
          </span>
          {selectedStep !== null && (
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-[11px]">
              Step {lifecycleSteps[selectedStep].step}: {lifecycleSteps[selectedStep].desc}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {lifecycleSteps.map((node, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStep(selectedStep === idx ? null : idx)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                selectedStep === idx
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-400 text-indigo-700 dark:text-indigo-300'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300'
              }`}
            >
              <span className="text-[9px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block">
                STEP {node.step}
              </span>
              <span className="font-extrabold text-xs text-slate-900 dark:text-white block">
                {node.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tier Cards with Primary [ Manage License ] and Secondary Actions Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {licenseTiers.map((tier) => {
          const isActive = tier.status === 'Active'
          const isSuspended = tier.status === 'Suspended'
          return (
            <div
              key={tier.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="global" size="sm">GLOBAL TIER</Badge>
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> SUSPENDED
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{tier.tier}</h3>
                  <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {tier.activeKeys}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Seat Quota:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{tier.seatQuota}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bound Tenants:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{tier.tenantsAssigned} Organizations</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block text-[11px]">Entitled Modules:</span>
                  <div className="flex flex-wrap gap-1">
                    {tier.features.map((feat, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-medium">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Toolbar with Primary CTA and Dropdown Menu */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setViewingTier(tier)}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors text-center"
                >
                  Manage License
                </button>
                <ActionDropdown
                  items={[
                    {
                      label: 'View Details',
                      icon: <Eye className="w-3.5 h-3.5" />,
                      onClick: () => setViewingTier(tier),
                    },
                    {
                      label: 'Edit Quota',
                      icon: <Edit3 className="w-3.5 h-3.5" />,
                      onClick: () => handleOpenEditQuota(tier),
                    },
                    {
                      label: 'Assign to Tenant',
                      icon: <UserPlus className="w-3.5 h-3.5" />,
                      onClick: () => handleOpenAssign(tier),
                    },
                    {
                      label: 'Activate Key',
                      icon: <Key className="w-3.5 h-3.5" />,
                      onClick: () => handleActivateKey(tier),
                    },
                    {
                      label: 'Renew Contract',
                      icon: <RefreshCw className="w-3.5 h-3.5" />,
                      onClick: () => handleRenew(tier),
                    },
                    {
                      label: isSuspended ? 'Reactivate Tier' : 'Suspend Tier',
                      icon: <Power className="w-3.5 h-3.5" />,
                      variant: isSuspended ? 'primary' : 'warning',
                      onClick: () => handleToggleSuspend(tier),
                    },
                  ]}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Quota Modal */}
      {editingTier && (
        <Modal isOpen={Boolean(editingTier)} onClose={() => setEditingTier(null)} title={`Edit Quota: ${editingTier.tier}`}>
          <form onSubmit={handleSaveQuota} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Configured Seat Allocation</label>
              <input
                type="text"
                required
                value={editSeatQuota}
                onChange={(e) => setEditSeatQuota(e.target.value)}
                placeholder="e.g. 10,000 Seats / Tenant"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingTier(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Quota
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Assign Tenant Modal */}
      {assigningTier && (
        <Modal isOpen={Boolean(assigningTier)} onClose={() => setAssigningTier(null)} title={`Assign ${assigningTier.tier} to Tenant`}>
          <form onSubmit={handleSaveAssign} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Target Tenant</label>
              <select
                value={assignedTenantName}
                onChange={(e) => setAssignedTenantName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Acme Technologies Inc.">Acme Technologies Inc. (TEN-001)</option>
                <option value="Global Logistics Corp">Global Logistics Corp (TEN-002)</option>
                <option value="Apex Financial Services">Apex Financial Services (TEN-003)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setAssigningTier(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Confirm Entitlement Binding
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Details Modal */}
      {viewingTier && (
        <Modal isOpen={Boolean(viewingTier)} onClose={() => setViewingTier(null)} title={`License Details: ${viewingTier.tier}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">License Key:</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{viewingTier.activeKeys}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Seat Capacity:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingTier.seatQuota}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Tenants:</span>
                <span className="font-mono">{viewingTier.tenantsAssigned} Organizations</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Entitlement Status:</span>
                <span className="font-bold text-emerald-600">{viewingTier.status}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingTier(null)}
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
