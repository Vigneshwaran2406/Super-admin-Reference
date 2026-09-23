import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { ActionDropdown } from '@/components/ui/ActionDropdown'
import { ActionBoundaryBar } from '@/components/ui/ActionBoundaryBar'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Radio, 
  Send, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Eye, 
  Search, 
  Plus, 
  Edit3, 
  Copy, 
  Power, 
  Settings, 
  Trash2, 
  X 
} from 'lucide-react'

export const NotificationManagement: React.FC = () => {
  const { perspective, perspectiveLabel, perspectiveScope, selectedTenant } = usePerspective()
  const { showToast } = useToast()

  const [activeTab, setActiveTab] = useState<
    'overview' | 'channels' | 'templates' | 'broadcasts' | 'reminders' | 'escalations' | 'preferences' | 'history'
  >('overview')

  const [searchHistory, setSearchHistory] = useState('')

  // Modals
  const [createModalType, setCreateModalType] = useState<string | null>(null)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [viewingItem, setViewingItem] = useState<any | null>(null)

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'delete' | 'deactivate' | 'disable' | 'generic'
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

  // Tab definitions
  const tabs = [
    { id: 'overview', label: '1. Overview' },
    { id: 'channels', label: '2. Channels' },
    { id: 'templates', label: '3. Templates' },
    { id: 'broadcasts', label: '4. Broadcasts' },
    { id: 'reminders', label: '5. Reminders' },
    { id: 'escalations', label: '6. Escalations' },
    { id: 'preferences', label: '7. Preferences' },
    { id: 'history', label: '8. History & Audit' },
  ] as const

  // Channels mock data
  const [channels, setChannels] = useState([
    { id: 'ch-1', name: 'Corporate Email Gateway (Enterprise Mail Hub)', type: 'Email', status: 'Operational', latency: '420ms', rateLimit: '10,000 / min', uptime: '99.98%', managedBy: 'Global Only', techRef: 'SMTP / Cloud Mail Engine', enabled: true },
    { id: 'ch-2', name: 'Telecom SMS Gateway (High-Priority SMS Hub)', type: 'SMS', status: 'Operational', latency: '1.2s', rateLimit: '1,200 / min', uptime: '99.95%', managedBy: 'Global Only', techRef: 'SMS Telephony Gateway', enabled: true },
    { id: 'ch-3', name: 'Mobile Push Gateway (Native Device Push Engine)', type: 'Push', status: 'Operational', latency: '180ms', rateLimit: '25,000 / min', uptime: '99.99%', managedBy: 'Global Only', techRef: 'Push Notification Broker', enabled: true },
    { id: 'ch-4', name: 'In-App Notification Hub (Real-Time Alert Stream)', type: 'In-App', status: 'Operational', latency: '24ms', rateLimit: '50,000 / min', uptime: '100%', managedBy: 'Tenant Scoped', techRef: 'Real-Time In-App Gateway', enabled: true },
  ])

  // Templates mock data
  const [templates, setTemplates] = useState([
    { code: 'TMPL-AUTH-WELCOME', name: 'User Account Provisioned & Welcome', channels: ['Email', 'In-App'], category: 'Identity', managedBy: 'Tenant Scoped', lastUpdated: '2026-08-14', status: 'Active' },
    { code: 'TMPL-SEC-MFA-RESET', name: 'Security MFA Challenge / Password Reset', channels: ['Email', 'SMS'], category: 'Security', managedBy: 'Global Only', lastUpdated: '2026-09-01', status: 'Active' },
    { code: 'TMPL-ROLE-GRANT', name: 'Administrative Role Elevation Notice', channels: ['Email', 'Push', 'In-App'], category: 'RBAC', managedBy: 'Tenant Scoped', lastUpdated: '2026-07-20', status: 'Active' },
    { code: 'TMPL-FIN-INVOICE-APPR', name: 'High-Value Invoice Approval Required', channels: ['In-App', 'Push', 'Email'], category: 'Finance', managedBy: 'Domain Scoped', lastUpdated: '2026-09-05', status: 'Active' },
    { code: 'TMPL-SYS-OUTAGE-ALERT', name: 'Critical Microservice SLA Outage Notice', channels: ['Email', 'SMS', 'Push', 'In-App'], category: 'Infrastructure', managedBy: 'Global Only', lastUpdated: '2026-08-28', status: 'Active' },
  ])

  // Broadcasts mock data
  const [broadcasts, setBroadcasts] = useState([
    { id: 'BC-2026-081', title: 'Platform Scheduled Maintenance Window (v3.4.0)', target: 'Global / All Tenants', priority: 'High', dispatchedAt: '2026-09-10 18:00', reach: '14,200 Users', status: 'Completed' },
    { id: 'BC-2026-082', title: 'Q3 Enterprise ISO 27001 Compliance Certification Audit', target: 'Acme Corp Tenant', priority: 'Medium', dispatchedAt: '2026-09-11 09:30', reach: '1,450 Users', status: 'Delivered' },
    { id: 'BC-2026-083', title: 'Fiscal Year-End Payroll Ledger Lock Notice', target: 'Finance & HR Managers', priority: 'Urgent', dispatchedAt: '2026-09-15 08:00', reach: '68 Users', status: 'Active' },
  ])

  // Reminders mock data
  const [reminders, setReminders] = useState([
    { id: 'REM-LIC-EXP', name: 'Enterprise Subscription License Expiry', cadence: '30d, 14d, 7d, 1d prior', targetRole: 'Organization Administrator', channels: ['Email', 'In-App'], autoEscalate: true, status: 'Active' },
    { id: 'REM-APPR-PEND', name: 'Procurement PO & Invoice Approvals Pending > 48h', cadence: 'Every 24 Hours', targetRole: 'Finance & Procurement Approver', channels: ['Push', 'In-App'], autoEscalate: true, status: 'Active' },
    { id: 'REM-PWD-ROT', name: 'Mandatory 90-Day Administrative Credential Rotation', cadence: '14d, 3d prior', targetRole: 'Super & Org Administrators', channels: ['Email'], autoEscalate: false, status: 'Active' },
  ])

  // Escalations mock data
  const [escalations, setEscalations] = useState([
    { id: 'ESC-POL-01', policyName: 'Unacknowledged P1 Infrastructure Outage', tier1: 'On-Call DevOps (5 min)', tier2: 'Platform Infrastructure Lead (15 min)', tier3: 'Super Administrator (30 min)', status: 'Active' },
    { id: 'ESC-POL-02', policyName: 'Critical Database Multi-Tenant Isolation Breach Attempt', tier1: 'Security Operations Center (Immediate)', tier2: 'Chief Information Security Officer (10 min)', tier3: 'Super Administrator (15 min)', status: 'Active' },
  ])

  // History mock data
  const historyLogs = [
    { id: 'NOTIF-98214', recipient: 'sarah.c@acme.corp', channel: 'Email', template: 'TMPL-FIN-INVOICE-APPR', time: '2026-09-15 10:12:05', status: 'Delivered', latency: '380ms' },
    { id: 'NOTIF-98213', recipient: '+1 (555) 019-2834', channel: 'SMS', template: 'TMPL-SEC-MFA-RESET', time: '2026-09-15 10:10:44', status: 'Delivered', latency: '1,120ms' },
    { id: 'NOTIF-98212', recipient: 'john.smith@acme.corp', channel: 'In-App', template: 'TMPL-ROLE-GRANT', time: '2026-09-15 10:08:12', status: 'Delivered', latency: '18ms' },
    { id: 'NOTIF-98211', recipient: 'devops-alerts@corp.net', channel: 'Push', template: 'TMPL-SYS-OUTAGE-ALERT', time: '2026-09-15 09:58:30', status: 'Delivered', latency: '142ms' },
  ]

  // Channel toggle
  const handleToggleChannel = (ch: any) => {
    setChannels(prev => prev.map(c => c.id === ch.id ? { ...c, enabled: !c.enabled } : c))
    showToast(`Channel ${ch.name} ${!ch.enabled ? 'enabled' : 'disabled'}`, !ch.enabled ? 'success' : 'warning')
  }

  // Template actions
  const handleDuplicateTemplate = (tmpl: any) => {
    const dup = { ...tmpl, code: `${tmpl.code}-COPY`, name: `${tmpl.name} (Copy)` }
    setTemplates([...templates, dup])
    showToast(`Template duplicated: ${dup.code}`, 'info')
  }

  const handleToggleTemplateStatus = (tmpl: any) => {
    const next = tmpl.status === 'Active' ? 'Inactive' : 'Active'
    setTemplates(prev => prev.map(t => t.code === tmpl.code ? { ...t, status: next } : t))
    showToast(`Template ${tmpl.code} ${next.toLowerCase()}`, next === 'Active' ? 'success' : 'warning')
  }

  // Broadcast actions
  const handleCancelBroadcast = (bc: any) => {
    setConfirmModal({
      isOpen: true,
      title: `Cancel Broadcast: ${bc.title}?`,
      message: `Are you sure you want to cancel dispatching this broadcast to ${bc.target}? Pending messages will be discarded.`,
      actionType: 'delete',
      confirmLabel: 'Confirm Cancel',
      onConfirm: () => {
        setBroadcasts(prev => prev.map(b => b.id === bc.id ? { ...b, status: 'Cancelled' } : b))
        showToast(`Broadcast cancelled: ${bc.id}`, 'warning')
      }
    })
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Notification & Broadcast Orchestration"
        managedBy={perspective === 'super-admin' ? "SUPER ADMINISTRATOR (Platform Broadcast & Gateway)" : "ORGANIZATION ADMINISTRATOR (Tenant Notification Preferences)"}
        scope={perspective === 'super-admin' ? "GLOBAL" : "ORGANIZATION / TENANT"}
        purpose="Centralized multi-channel notification engine, gateway connectivity, message templates, automated reminders, and delivery SLA auditing."
        accessLevel={perspective === 'super-admin' ? "ALL TENANTS (Full Dispatch & Gateway Authority)" : `TENANT BOUNDED (${selectedTenant})`}
      />

      {/* Navigation Tabs: ONLY ONE TAB VISIBLE AT A TIME */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-4 text-xs font-bold">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500">Active Gateways</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">4 Channels</div>
              <span className="text-[11px] text-emerald-600 font-medium">Email, SMS, Push, In-App</span>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500">Template Catalog</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{templates.length} Templates</div>
              <span className="text-[11px] text-indigo-600 font-medium">Localized RBAC merged</span>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500">Scheduled Broadcasts</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{broadcasts.length} Queued</div>
              <span className="text-[11px] text-amber-600 font-medium">1 Urgent active</span>
            </div>
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500">30-Day Delivery SLA</span>
              <div className="text-2xl font-bold text-emerald-600">99.98%</div>
              <span className="text-[11px] text-slate-400 font-mono">14,200 messages dispatched</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Channels */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {channels.map((ch) => (
              <div
                key={ch.id}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                        {ch.type === 'Email' && <Mail className="w-5 h-5" />}
                        {ch.type === 'SMS' && <MessageSquare className="w-5 h-5" />}
                        {ch.type === 'Push' && <Smartphone className="w-5 h-5" />}
                        {ch.type === 'In-App' && <Radio className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{ch.name}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">Channel: {ch.type}</span>
                      </div>
                    </div>
                    <Badge variant={ch.managedBy === 'Global Only' ? 'global' : 'tenant'} size="sm">
                      {ch.managedBy}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> {ch.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Latency</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white mt-0.5 block">{ch.latency}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Rate Limit</span>
                      <span className="font-mono font-medium text-slate-700 dark:text-slate-300 mt-0.5 block">{ch.rateLimit}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleChannel(ch)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors ${
                      ch.enabled
                        ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                        : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    {ch.enabled ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingItem(ch)
                      setCreateModalType('configure-channel')
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1 text-slate-700 dark:text-slate-300"
                  >
                    <Settings className="w-3.5 h-3.5" /> Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Templates */}
      {activeTab === 'templates' && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Enterprise Notification Templates</h3>
              <p className="text-xs text-slate-500">Reusable multi-channel templates with tenant token substitution</p>
            </div>
            <button
              onClick={() => setCreateModalType('create-template')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Create Template
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-5">Template Code & Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Channels</th>
                  <th className="py-3 px-4">Authority Scope</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {templates.map((tmpl) => (
                  <tr key={tmpl.code} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 dark:text-white">{tmpl.name}</div>
                      <div className="font-mono text-[11px] text-slate-400 mt-0.5">{tmpl.code}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono">{tmpl.category}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {tmpl.channels.map((c, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={tmpl.managedBy === 'Global Only' ? 'global' : tmpl.managedBy === 'Tenant Scoped' ? 'tenant' : 'domain'} size="sm">
                        {tmpl.managedBy}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tmpl.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {tmpl.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditingItem(tmpl)
                            setCreateModalType('edit-template')
                          }}
                          className="px-2 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold transition-colors text-xs"
                        >
                          Edit
                        </button>
                        <ActionDropdown
                          items={[
                            {
                              label: 'Edit Template',
                              icon: <Edit3 className="w-3.5 h-3.5" />,
                              onClick: () => {
                                setEditingItem(tmpl)
                                setCreateModalType('edit-template')
                              },
                            },
                            {
                              label: 'Duplicate',
                              icon: <Copy className="w-3.5 h-3.5" />,
                              onClick: () => handleDuplicateTemplate(tmpl),
                            },
                            {
                              label: tmpl.status === 'Active' ? 'Deactivate' : 'Activate',
                              icon: <Power className="w-3.5 h-3.5" />,
                              variant: tmpl.status === 'Active' ? 'warning' : 'primary',
                              onClick: () => handleToggleTemplateStatus(tmpl),
                            },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Broadcasts */}
      {activeTab === 'broadcasts' && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Emergency & Scheduled Broadcasts</h3>
              <p className="text-xs text-slate-500">Platform and tenant-wide notification broadcasts</p>
            </div>
            <button
              onClick={() => setCreateModalType('create-broadcast')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Create Broadcast
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-5">Broadcast Announcement</th>
                  <th className="py-3 px-4">Target Audience</th>
                  <th className="py-3 px-4">Dispatched At</th>
                  <th className="py-3 px-4">Estimated Reach</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {broadcasts.map((bc) => (
                  <tr key={bc.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                      {bc.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {bc.target}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">
                      {bc.dispatchedAt}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {bc.reach}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        bc.status === 'Active' ? 'bg-amber-50 text-amber-700' :
                        bc.status === 'Cancelled' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {bc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingItem(bc)}
                          className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold text-xs"
                        >
                          View
                        </button>
                        {bc.status === 'Active' && (
                          <button
                            onClick={() => handleCancelBroadcast(bc)}
                            className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold text-xs"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Reminders */}
      {activeTab === 'reminders' && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Scheduled Automated Reminders</h3>
              <p className="text-xs text-slate-500">Recurring lifecycle and operational expiration alerts</p>
            </div>
            <button
              onClick={() => setCreateModalType('create-reminder')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Create Reminder
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-5">Reminder Policy</th>
                  <th className="py-3 px-4">Cadence</th>
                  <th className="py-3 px-4">Target Role</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {reminders.map((rem) => (
                  <tr key={rem.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                      {rem.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono">{rem.cadence}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{rem.targetRole}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        {rem.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingItem(rem)
                            setCreateModalType('edit-reminder')
                          }}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            const next = rem.status === 'Active' ? 'Inactive' : 'Active'
                            setReminders(prev => prev.map(r => r.id === rem.id ? { ...r, status: next } : r))
                            showToast(`Reminder ${rem.name} ${next.toLowerCase()}`)
                          }}
                          className="px-2.5 py-1 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 font-bold text-xs"
                        >
                          {rem.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 6: Escalations */}
      {activeTab === 'escalations' && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Incident & Approval Escalation Paths</h3>
              <p className="text-xs text-slate-500">Multi-tier escalation rules for delayed actions or outages</p>
            </div>
            <button
              onClick={() => setCreateModalType('create-escalation')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" /> Create Escalation
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-5">Policy Name</th>
                  <th className="py-3 px-4">Tier 1 Dispatch</th>
                  <th className="py-3 px-4">Tier 2 Escalation</th>
                  <th className="py-3 px-4">Tier 3 Executive</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {escalations.map((esc) => (
                  <tr key={esc.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">{esc.policyName}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{esc.tier1}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{esc.tier2}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{esc.tier3}</td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setEditingItem(esc)
                            setCreateModalType('edit-escalation')
                          }}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            const next = esc.status === 'Active' ? 'Inactive' : 'Active'
                            setEscalations(prev => prev.map(e => e.id === esc.id ? { ...e, status: next } : e))
                            showToast(`Escalation policy ${next.toLowerCase()}`)
                          }}
                          className="px-2.5 py-1 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 font-bold text-xs"
                        >
                          {esc.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 7: Preferences */}
      {activeTab === 'preferences' && (
        <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Tenant Notification Preferences</h3>
          <p className="text-slate-500">Configure default notification delivery rules for users in {selectedTenant}:</p>
          <div className="space-y-3 pt-2">
            {['Daily digest emails for non-critical alerts', 'Instant Push notifications for approval requests', 'Allow users to customize personal notification channels'].map((pref, i) => (
              <label key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-indigo-600" />
                <span className="font-bold text-slate-900 dark:text-white">{pref}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => showToast('Preferences updated', 'success', 'Tenant notification preferences saved.')}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
          >
            Save Preferences
          </button>
        </div>
      )}

      {/* Tab 8: History */}
      {activeTab === 'history' && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search history by recipient, channel, or template..."
                value={searchHistory}
                onChange={(e) => setSearchHistory(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => showToast('History exported', 'info', 'Notification delivery log exported to CSV.')}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export Log
            </button>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-5">Timestamp</th>
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Channel</th>
                  <th className="py-3 px-4">Template Code</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {historyLogs.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[11px] text-slate-500">{h.time}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{h.recipient}</td>
                    <td className="py-3.5 px-4 font-medium">{h.channel}</td>
                    <td className="py-3.5 px-4 font-mono text-indigo-600">{h.template}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-500">{h.latency}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        {h.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => setViewingItem(h)}
                        className="px-2.5 py-1 rounded-lg text-indigo-600 font-bold hover:bg-indigo-50 text-xs"
                      >
                        View Log
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Generic Creation/Edit Modal */}
      {createModalType && (
        <Modal
          isOpen={Boolean(createModalType)}
          onClose={() => setCreateModalType(null)}
          title={
            createModalType === 'create-template' ? 'Create Notification Template' :
            createModalType === 'edit-template' ? `Edit Template: ${editingItem?.name}` :
            createModalType === 'create-broadcast' ? 'Dispatch Emergency Broadcast' :
            createModalType === 'create-reminder' ? 'Schedule Automated Reminder' :
            createModalType === 'configure-channel' ? `Configure ${editingItem?.name}` : 'Notification Action'
          }
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Title / Identification</label>
              <input
                type="text"
                defaultValue={editingItem?.name || ''}
                placeholder="Enter title or configuration parameter..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Message Copy / Parameters</label>
              <textarea
                rows={3}
                defaultValue="Notification payload template with dynamic tokens: {{user_name}}, {{event_time}}."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCreateModalType(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCreateModalType(null)
                  showToast('Reference action completed', 'success', 'Parameters saved to notification orchestrator.')
                }}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Item Modal */}
      {viewingItem && (
        <Modal isOpen={Boolean(viewingItem)} onClose={() => setViewingItem(null)} title="Notification Inspection">
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Subject / Event:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingItem.title || viewingItem.template || viewingItem.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target / Recipient:</span>
                <span className="font-mono">{viewingItem.target || viewingItem.recipient || 'Platform Users'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">{viewingItem.status}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingItem(null)}
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
