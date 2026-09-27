import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { CIDRNetworkTable } from '@/components/ui/CIDRNetworkTable'
import { useToast } from '@/context/ToastContext'
import { mockTenants } from '@/mock'
import { 
  Building2, 
  Database, 
  ShieldCheck, 
  HardDrive, 
  Palette, 
  Clock, 
  ChevronLeft, 
  Download, 
  RefreshCw, 
  Sliders,
  CheckCircle2,
  Lock,
  Key,
  AlertTriangle,
  Loader2,
  Shield,
  Save,
  HelpCircle,
  XCircle
} from 'lucide-react'

export type KeyProviderType = 'AWS KMS' | 'Azure Key Vault' | 'HashiCorp Vault'
export type KeyValidationState = 'Validated' | 'Validation Required' | 'Validation Failed'

export const TenantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<'config' | 'database' | 'branding' | 'backup'>('config')

  const tenant = mockTenants.find(t => t.id === id) || mockTenants[0]

  // UI-005: Customer-Managed Key (BYOK) State
  const [keyProvider, setKeyProvider] = useState<KeyProviderType>('AWS KMS')
  const [keyArn, setKeyArn] = useState<string>('arn:aws:kms:us-east-1:123456789012:key/mock-demo-key-uuid-001')
  const [keyStatus, setKeyStatus] = useState<'Configured' | 'Unconfigured'>('Configured')
  const [validationState, setValidationState] = useState<KeyValidationState>('Validated')
  const [isValidating, setIsValidating] = useState<boolean>(false)

  // Rotate Key Modal State
  const [isRotateModalOpen, setIsRotateModalOpen] = useState<boolean>(false)
  const [newKeyProvider, setNewKeyProvider] = useState<KeyProviderType>('AWS KMS')
  const [newKeyArn, setNewKeyArn] = useState<string>('')
  const [isRotating, setIsRotating] = useState<boolean>(false)

  // Simulated Validate Key Handler
  const handleValidateKey = () => {
    setIsValidating(true)
    setTimeout(() => {
      setIsValidating(false)
      setValidationState('Validated')
      showToast(
        'Key validation successful',
        'success',
        `Simulated signature verification passed for ${keyProvider} key identifier.`
      )
    }, 600)
  }

  // Simulated Save BYOK Configuration Handler
  const handleSaveByok = () => {
    showToast(
      'BYOK configuration updated',
      'success',
      `Customer-managed encryption policy saved for ${tenant.name}.`
    )
  }

  // Open Rotate Modal
  const handleOpenRotateModal = () => {
    setNewKeyProvider(keyProvider)
    setNewKeyArn('')
    setIsRotateModalOpen(true)
  }

  // Simulated Key Rotation Handler
  const handleConfirmRotation = () => {
    if (!newKeyArn.trim()) return

    setIsRotating(true)
    setTimeout(() => {
      setIsRotating(false)
      setKeyArn(newKeyArn.trim())
      setKeyProvider(newKeyProvider)
      setValidationState('Validated')
      setKeyStatus('Configured')
      setIsRotateModalOpen(false)
      showToast(
        'Customer key rotated successfully',
        'success',
        `Simulated cryptographic re-wrap completed with new ${newKeyProvider} key.`
      )
    }, 700)
  }

  return (
    <div>
      <div className="mb-4">
        <Link to="/tenants" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-400 transition-colors font-medium">
          <ChevronLeft className="w-4 h-4" /> Back to Tenant Directory
        </Link>
      </div>

      <ContextPanel
        title={`Tenant Details: ${tenant.name} (${tenant.code})`}
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Inspect tenant database isolation status, cryptographic keys, storage consumption, white-label branding, and automated disaster recovery backups."
        accessLevel="ALL TENANTS (Full Global Authority)"
        educationalNotes="Organization Admins only view their own organization settings. Only the Super Administrator can configure tenant database partitioning, dedicated schemas, or global resource allocation."
        tags={['Tenant Isolation', 'Database Partitions', 'Backup Recovery']}
      />

      {/* Tenant Identity Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow">
            {tenant.code}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{tenant.name}</h2>
              <Badge variant="success">{tenant.status}</Badge>
              <Badge variant="global">{tenant.tier}</Badge>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              Domain: <span className="text-indigo-300">{tenant.domain}</span> • Region: {tenant.region} • Admin: {tenant.adminContact}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Triggered manual snapshot for ${tenant.code}`)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Take Snapshot
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6">
        {[
          { id: 'config', label: 'Tenant Configuration', icon: <Sliders className="w-4 h-4" /> },
          { id: 'database', label: 'Database & Isolation', icon: <Database className="w-4 h-4" /> },
          { id: 'branding', label: 'Tenant Branding', icon: <Palette className="w-4 h-4" /> },
          { id: 'backup', label: 'Backups & Recovery', icon: <HardDrive className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'config' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">General Tenant Configuration</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Tenant UUID</span>
                <span className="font-mono text-slate-200">{tenant.id}-4912-ab80-f001</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Provisioned Date</span>
                <span className="font-mono text-slate-200">{tenant.createdAt}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/80">
                <span className="text-slate-400">Active Provisioned Users</span>
                <span className="font-mono font-bold text-indigo-400">{tenant.usersCount} Accounts</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Storage Allocated</span>
                <span className="font-mono text-slate-200">{tenant.storageUsed}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Organization Scope & Governance</h3>
            <p className="text-slate-400 leading-relaxed">
              All organizational setup (Companies, Departments, Branches, Cost Centers) inside this tenant boundary is administered by the designated <strong>Organization Administrator</strong> ({tenant.adminContact}).
            </p>
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-emerald-300">
              Scope Status: Fully segregated from neighboring tenants.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'database' && (
        <div className="space-y-6 text-xs">
          {/* Section 1: Database Isolation Architecture Overview */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  Database Isolation Architecture
                </h3>
                <p className="text-slate-400 mt-0.5">Multi-tenant polyglot persistence guarantees</p>
              </div>
              <Badge variant="tenant">{tenant.databaseIsolation}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[11px] font-bold uppercase text-slate-400 mb-1">PostgreSQL Schema</div>
                <div className="font-mono text-white text-sm">schema_acme_prod</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Isolated Table Partitions
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[11px] font-bold uppercase text-slate-400 mb-1">MongoDB Tenant Key</div>
                <div className="font-mono text-white text-sm">t_acme_corp_db</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Logical Document Separation
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[11px] font-bold uppercase text-slate-400 mb-1">Encryption Key (BYOK)</div>
                <div className="font-mono text-white text-sm truncate" title={keyArn}>
                  {keyArn.length > 28 ? keyArn.substring(0, 28) + '...' : keyArn}
                </div>
                <div className="text-[11px] text-indigo-400 mt-1 flex items-center justify-between">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> {keyProvider}</span>
                  <span className={`text-[10px] font-mono font-bold ${
                    validationState === 'Validated' 
                      ? 'text-emerald-400' 
                      : validationState === 'Validation Required'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }`}>
                    {validationState}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 (UI-005): Customer-Managed Encryption Key (BYOK) Configuration Card */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" />
                    Customer-Managed Encryption Key
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-900/50">
                    UI-005 • BYOK
                  </span>
                </div>
                <p className="text-slate-400 mt-1 leading-relaxed">
                  Configure a dedicated Customer-Managed Key (BYOK) for envelope encryption of database schemas, object storage buckets, and automated snapshots.
                </p>
              </div>

              {/* Status and Validation Badges */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700">
                  <span className="text-slate-400 font-normal">Status:</span>
                  <span className="font-bold text-white">{keyStatus}</span>
                </span>

                {validationState === 'Validated' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Validated</span>
                  </span>
                )}
                {validationState === 'Validation Required' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-950/40 text-amber-400 border border-amber-800/80">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Validation Required</span>
                  </span>
                )}
                {validationState === 'Validation Failed' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/40 text-rose-400 border border-rose-800/80">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Validation Failed</span>
                  </span>
                )}
              </div>
            </div>

            {/* BYOK Configuration Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Key Provider Selector */}
              <div>
                <label className="block text-slate-300 font-bold mb-1.5">
                  Key Provider
                </label>
                <select
                  value={keyProvider}
                  onChange={(e) => {
                    const newProv = e.target.value as KeyProviderType
                    setKeyProvider(newProv)
                    setValidationState('Validation Required')
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-semibold text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  aria-label="Key Provider"
                >
                  <option value="AWS KMS">AWS KMS (Key Management Service)</option>
                  <option value="Azure Key Vault">Azure Key Vault (Managed HSM)</option>
                  <option value="HashiCorp Vault">HashiCorp Vault (Transit Engine)</option>
                </select>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supported cloud cryptographic key provider.
                </p>
              </div>

              {/* Key ARN / Identifier Input */}
              <div className="md:col-span-2">
                <label className="block text-slate-300 font-bold mb-1.5">
                  Key ARN / Identifier
                </label>
                <input
                  type="text"
                  value={keyArn}
                  onChange={(e) => {
                    setKeyArn(e.target.value)
                    setValidationState('Validation Required')
                  }}
                  placeholder="e.g. arn:aws:kms:region:account:key/uuid"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  aria-label="Key ARN or Identifier"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Customer-managed master encryption key resource identifier for dedicated envelope encryption.
                </p>
              </div>
            </div>

            {/* Educational Simulation Callout */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-300">Prototype BYOK Simulation:</span>{' '}
                Validating or rotating customer-managed keys demonstrates the frontend enterprise flow. No external cloud KMS APIs are contacted, and no cryptographic keys are transmitted or persisted.
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleValidateKey}
                  disabled={isValidating}
                  className="px-3.5 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  aria-label="Validate key signature"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Validating Key...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Validate Key</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleOpenRotateModal}
                  className="px-3.5 py-2 rounded-xl border border-indigo-800/80 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/60 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  aria-label="Rotate customer key"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Rotate Key</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveByok}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Configuration</span>
              </button>
            </div>
          </div>

          {/* Section 3 (UI-006): CIDR Network Policy & IP Allowlist Management Table */}
          <CIDRNetworkTable tenantName={tenant.name} />
        </div>
      )}

      {activeTab === 'branding' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 text-xs max-w-2xl">
          <h3 className="text-sm font-bold text-white">Tenant Brand Customization</h3>
          <p className="text-slate-400">
            Configure white-label logo and corporate portal styling for {tenant.name}.
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Custom Portal Subdomain</label>
              <input
                type="text"
                defaultValue={tenant.domain}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Corporate Brand Hex</label>
              <input
                type="text"
                defaultValue="#0284c7"
                className="w-36 bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
              />
            </div>
          </div>
          <button
            onClick={() => alert('Saved tenant branding override')}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
          >
            Save Tenant Branding
          </button>
        </div>
      )}

      {activeTab === 'backup' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-indigo-400" />
              Automated Snapshots & Point-in-Time Recovery
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Retention: 30 Days Daily</span>
          </div>

          <div className="space-y-2">
            {[
              { id: 'SNP-9011', time: 'Today, 03:00 AM UTC', size: '14.2 GB', type: 'Full DB + Object Store', status: 'Completed' },
              { id: 'SNP-9010', time: 'Yesterday, 03:00 AM UTC', size: '14.1 GB', type: 'Full DB + Object Store', status: 'Completed' },
              { id: 'SNP-9009', time: 'Sep 9, 2026, 03:00 AM UTC', size: '13.9 GB', type: 'Full DB + Object Store', status: 'Completed' },
            ].map((snp) => (
              <div key={snp.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white font-mono">{snp.id} • {snp.time}</div>
                  <div className="text-[11px] text-slate-400">Size: {snp.size} • {snp.type}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">{snp.status}</Badge>
                  <button
                    onClick={() => alert(`Downloading manifest for ${snp.id}`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UI-005: Key Rotation Modal */}
      <Modal
        isOpen={isRotateModalOpen}
        onClose={() => !isRotating && setIsRotateModalOpen(false)}
        title="Rotate Customer-Managed Encryption Key"
        subtitle={`Configure replacement master key for ${tenant.name}`}
        size="md"
      >
        <div className="space-y-4 text-xs">
          {/* Current Key Status Card */}
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <div className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
              Active Key Configuration
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Provider:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{keyProvider}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Current Key Identifier:</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 text-[11px] truncate max-w-[280px]" title={keyArn}>
                {keyArn}
              </span>
            </div>
          </div>

          {/* New Key Provider Selector */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
              New Key Provider
            </label>
            <select
              value={newKeyProvider}
              onChange={(e) => setNewKeyProvider(e.target.value as KeyProviderType)}
              disabled={isRotating}
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-semibold text-xs focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
            >
              <option value="AWS KMS">AWS KMS (Key Management Service)</option>
              <option value="Azure Key Vault">Azure Key Vault (Managed HSM)</option>
              <option value="HashiCorp Vault">HashiCorp Vault (Transit Engine)</option>
            </select>
          </div>

          {/* New Key ARN Input */}
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
              New Key ARN / Identifier
            </label>
            <input
              type="text"
              value={newKeyArn}
              onChange={(e) => setNewKeyArn(e.target.value)}
              placeholder="e.g. arn:aws:kms:us-east-1:123456789012:key/new-key-uuid-002"
              disabled={isRotating}
              className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
              aria-label="New Key ARN or Identifier"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Provide the valid cryptographic key resource identifier from your cloud provider.
            </p>
          </div>

          {/* Warning Notice */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-2.5 text-[11px] text-amber-800 dark:text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Prototype Key Rotation Notice:</span>{' '}
              Prototype only — no cloud key rotation will be performed. Envelope keys and tenant data volumes will simulate re-encryption.
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsRotateModalOpen(false)}
              disabled={isRotating}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmRotation}
              disabled={isRotating || !newKeyArn.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRotating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Rotating Key...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Rotate Key</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
