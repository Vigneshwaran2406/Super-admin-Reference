import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { RestrictedScopeNotice } from '@/components/ui/RestrictedScopeNotice'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Globe, Building2, Check, CheckCircle2, XCircle, Eye, Edit3, Power, Lock, Search } from 'lucide-react'

interface FeatureFlag {
  id: string
  name: string
  module: string
  globalDefined: boolean
  tenantAvailable: boolean
  adoptionCount: number
  totalTenants: number
  beta: boolean
  description: string
  governance: 'Global Only' | 'Tenant Scoped' | 'RBAC / Scope Dependent'
}

export const FeatureManagement: React.FC = () => {
  const { perspective, selectedTenant } = usePerspective()
  const { showToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [filterModule, setFilterModule] = useState<string>('all')

  const [features, setFeatures] = useState<FeatureFlag[]>([
    {
      id: 'feat-copilot',
      name: 'Enterprise AI Copilot Assistant',
      module: 'Core Platform',
      globalDefined: true,
      tenantAvailable: true,
      adoptionCount: 14,
      totalTenants: 18,
      beta: true,
      description: 'Conversational assistant across HRMS, CRM, and ERP documents with role-aware data boundary filtering.',
      governance: 'Global Only'
    },
    {
      id: 'feat-fido2',
      name: 'Hardware Security Key (FIDO2) MFA',
      module: 'Security & Auth',
      globalDefined: true,
      tenantAvailable: true,
      adoptionCount: 18,
      totalTenants: 18,
      beta: false,
      description: 'Enforces hardware security key and biometric tokens for administrative sign-in sessions.',
      governance: 'Global Only'
    },
    {
      id: 'feat-kafka-siem',
      name: 'Real-Time SIEM Audit Event Streaming',
      module: 'Infrastructure',
      globalDefined: true,
      tenantAvailable: false,
      adoptionCount: 6,
      totalTenants: 18,
      beta: false,
      description: 'Streams immutable platform audit events into enterprise security clusters in real-time.',
      governance: 'Global Only'
    },
    {
      id: 'feat-multi-fx',
      name: 'Real-Time FX Multi-Currency Conversion',
      module: 'Finance & ERP',
      globalDefined: true,
      tenantAvailable: true,
      adoptionCount: 11,
      totalTenants: 18,
      beta: false,
      description: 'Exchange rates for international cross-border procurement orders, VAT calculations, and ledger consolidation.',
      governance: 'Tenant Scoped'
    },
    {
      id: 'feat-custom-branding',
      name: 'White-Label Domain & Custom Logo',
      module: 'Tenant Experience',
      globalDefined: true,
      tenantAvailable: true,
      adoptionCount: 16,
      totalTenants: 18,
      beta: false,
      description: 'Enables custom tenant subdomains, enterprise SVG logos, and primary color theme overrides.',
      governance: 'Tenant Scoped'
    },
    {
      id: 'feat-sso-saml',
      name: 'Federated Identity & Enterprise SSO',
      module: 'Identity & Access',
      globalDefined: true,
      tenantAvailable: true,
      adoptionCount: 15,
      totalTenants: 18,
      beta: false,
      description: 'Allows enterprise tenants to bind corporate Active Directory / Okta identity providers directly.',
      governance: 'Tenant Scoped'
    },
  ])

  // Modals
  const [viewingFeature, setViewingFeature] = useState<FeatureFlag | null>(null)
  const [editingFeature, setEditingFeature] = useState<FeatureFlag | null>(null)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'disable' | 'deactivate' | 'generic'
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

  const isSuperAdmin = perspective === 'super-admin'
  const isOrgAdmin = perspective === 'org-admin'

  const handleOpenEdit = (feat: FeatureFlag) => {
    setEditingFeature(feat)
    setEditName(feat.name)
    setEditDesc(feat.description)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingFeature) return
    setFeatures(prev => prev.map(f => f.id === editingFeature.id ? { ...f, name: editName, description: editDesc } : f))
    setEditingFeature(null)
    showToast(`Feature definition updated: ${editName}`, 'info', 'Global capability metadata saved.')
  }

  const handleToggleGlobal = (feat: FeatureFlag) => {
    const isActivating = !feat.globalDefined
    setConfirmModal({
      isOpen: true,
      title: isActivating ? `Activate Global Feature: ${feat.name}?` : `Deactivate Global Feature: ${feat.name}?`,
      message: isActivating
        ? `Activate ${feat.name} globally across the cloud platform? Tenants will be able to enable it.`
        : `Deactivating ${feat.name} will immediately withdraw availability across all ${feat.adoptionCount} subscribed tenants.`,
      actionType: isActivating ? 'generic' : 'deactivate',
      confirmLabel: isActivating ? 'Confirm Global Activation' : 'Confirm Global Deactivation',
      onConfirm: () => {
        setFeatures(prev => prev.map(f => f.id === feat.id ? { ...f, globalDefined: isActivating, tenantAvailable: isActivating ? f.tenantAvailable : false } : f))
        showToast(
          isActivating ? `Global feature ${feat.name} activated` : `Global feature ${feat.name} deactivated`,
          isActivating ? 'success' : 'warning',
          `Platform availability updated.`
        )
      }
    })
  }

  const handleToggleTenant = (feat: FeatureFlag) => {
    const isEnabling = !feat.tenantAvailable
    setConfirmModal({
      isOpen: true,
      title: isEnabling ? `Enable Feature for ${selectedTenant}?` : `Disable Feature for ${selectedTenant}?`,
      message: isEnabling
        ? `Enable ${feat.name} for organization ${selectedTenant}?`
        : `Disable ${feat.name} for ${selectedTenant}? Users in your organization will lose access to this capability.`,
      actionType: isEnabling ? 'generic' : 'disable',
      confirmLabel: isEnabling ? 'Confirm Enable' : 'Confirm Disable',
      onConfirm: () => {
        setFeatures(prev => prev.map(f => f.id === feat.id ? { ...f, tenantAvailable: isEnabling } : f))
        showToast(
          isEnabling ? `Feature enabled for tenant` : `Feature disabled for tenant`,
          isEnabling ? 'success' : 'warning',
          `${feat.name} entitlement updated for ${selectedTenant}.`
        )
      }
    })
  }

  const filtered = features.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMod = filterModule === 'all' || f.module === filterModule
    return matchesSearch && matchesMod
  })

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Enterprise Feature Flags & Capabilities"
        managedBy="SUPER ADMINISTRATOR (Global Definition) • ORGANIZATION ADMINISTRATOR (Tenant Availability)"
        scope="GLOBAL"
        purpose="Defines platform feature availability, enterprise modules, and tenant-level capability entitlement gates."
        accessLevel="GLOBAL DEFINITION & TENANT ENTITLEMENT"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search features by name or module..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white shrink-0 cursor-pointer"
          >
            <option value="all">All Modules</option>
            <option value="Core Platform">Core Platform</option>
            <option value="Security & Auth">Security & Auth</option>
            <option value="Finance & ERP">Finance & ERP</option>
            <option value="Tenant Experience">Tenant Experience</option>
            <option value="Identity & Access">Identity & Access</option>
          </select>
        </div>

        <div className="text-xs font-mono text-slate-500">
          Viewing as: <span className="font-bold text-slate-900 dark:text-white">{isSuperAdmin ? 'Super Admin (Global Authority)' : 'Org Admin (Tenant Scoped)'}</span>
        </div>
      </div>

      {/* Two-Column Comparison Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Feature & Capability</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4 text-center">
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">GLOBAL DEFINITION</div>
                  <div className="text-[10px] font-normal text-slate-400 lowercase">Platform Tier (Super Admin)</div>
                </th>
                <th className="py-3 px-4 text-center">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400">TENANT AVAILABILITY</div>
                  <div className="text-[10px] font-normal text-slate-400 lowercase">Tenant Tier (Org Admin)</div>
                </th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((feat) => {
                return (
                  <tr key={feat.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{feat.name}</span>
                        {feat.beta && <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-amber-100 dark:bg-amber-950/50 text-amber-700 font-bold">BETA</span>}
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-1">{feat.description}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {feat.module}
                    </td>
                    {/* Global Definition Column */}
                    <td className="py-3.5 px-4 text-center">
                      {feat.globalDefined ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> ACTIVE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                          <XCircle className="w-3.5 h-3.5 text-slate-400" /> INACTIVE
                        </span>
                      )}
                    </td>
                    {/* Tenant Availability Column */}
                    <td className="py-3.5 px-4 text-center">
                      {feat.tenantAvailable ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <Check className="w-3.5 h-3.5 text-emerald-500" /> ENABLED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                          <XCircle className="w-3.5 h-3.5 text-slate-400" /> DISABLED
                        </span>
                      )}
                    </td>
                    {/* Actions Column */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingFeature(feat)}
                          className="px-2 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 font-bold transition-colors text-xs"
                        >
                          View
                        </button>
                        <ActionDropdown
                          items={[
                            {
                              label: 'View Details',
                              icon: <Eye className="w-3.5 h-3.5" />,
                              onClick: () => setViewingFeature(feat),
                            },
                            ...(isSuperAdmin ? [
                              {
                                label: 'Edit Definition',
                                icon: <Edit3 className="w-3.5 h-3.5" />,
                                onClick: () => handleOpenEdit(feat),
                              },
                              {
                                label: feat.globalDefined ? 'Deactivate Globally' : 'Activate Globally',
                                icon: <Power className="w-3.5 h-3.5" />,
                                variant: feat.globalDefined ? 'warning' as const : 'primary' as const,
                                onClick: () => handleToggleGlobal(feat),
                              }
                            ] : [
                              {
                                label: 'Edit Definition',
                                icon: <Lock className="w-3.5 h-3.5" />,
                                disabled: true,
                                tooltip: 'Global feature definitions are managed exclusively by Super Administrator.',
                                onClick: () => {},
                              }
                            ]),
                            {
                              label: feat.tenantAvailable ? 'Disable for Tenant' : 'Enable for Tenant',
                              icon: <Power className="w-3.5 h-3.5" />,
                              variant: feat.tenantAvailable ? 'warning' as const : 'primary' as const,
                              onClick: () => handleToggleTenant(feat),
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

      {/* Edit Definition Modal */}
      {editingFeature && (
        <Modal isOpen={Boolean(editingFeature)} onClose={() => setEditingFeature(null)} title={`Edit Global Feature: ${editingFeature.name}`}>
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Feature Name</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Architectural Description</label>
              <textarea
                rows={3}
                required
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingFeature(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Save Definition
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Details Modal */}
      {viewingFeature && (
        <Modal isOpen={Boolean(viewingFeature)} onClose={() => setViewingFeature(null)} title={`Feature: ${viewingFeature.name}`}>
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {viewingFeature.description}
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Module Category:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingFeature.module}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Global Definition Status:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{viewingFeature.globalDefined ? 'ACTIVE' : 'INACTIVE'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tenant Availability Status:</span>
                <span className="font-bold text-emerald-600">{viewingFeature.tenantAvailable ? 'ENABLED' : 'DISABLED'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Adoption across Tenants:</span>
                <span className="font-mono">{viewingFeature.adoptionCount} / {viewingFeature.totalTenants} Organizations</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingFeature(null)}
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
