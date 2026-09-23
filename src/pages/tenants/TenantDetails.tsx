import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
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
  Lock
} from 'lucide-react'

export const TenantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<'config' | 'database' | 'branding' | 'backup'>('config')

  const tenant = mockTenants.find(t => t.id === id) || mockTenants[0]

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
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 text-xs">
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
              <div className="text-[11px] font-bold uppercase text-slate-400 mb-1">Encryption Key (KMS)</div>
              <div className="font-mono text-white text-sm">kms-arn-us-east-1:acme</div>
              <div className="text-[11px] text-indigo-400 mt-1 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Dedicated Customer Key
              </div>
            </div>
          </div>
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
    </div>
  )
}
