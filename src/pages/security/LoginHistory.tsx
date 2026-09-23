import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Clock, Search, Download, ShieldCheck, ShieldAlert, Eye, Lock } from 'lucide-react'

interface LoginEventItem {
  id: string
  timestamp: string
  user: string
  role: string
  ip: string
  location: string
  authType: string
  status: 'Success' | 'Failed' | 'MFA Step-Up Triggered'
}

export const LoginHistory: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [viewingEvent, setViewingEvent] = useState<LoginEventItem | null>(null)

  const logins: LoginEventItem[] = [
    { id: 'LOG-881', timestamp: '2026-09-15 10:48:10', user: 'alex.wright@onecloud.io', role: 'Super Administrator', ip: '198.51.100.24', location: 'Austin, US', authType: 'Hardware FIDO2 + Password', status: 'Success' },
    { id: 'LOG-880', timestamp: '2026-09-15 10:14:02', user: 'm.bell@acme.com', role: 'Organization Administrator', ip: '203.0.113.88', location: 'Austin, US', authType: 'SSO Identity Provider', status: 'Success' },
    { id: 'LOG-879', timestamp: '2026-09-15 09:50:22', user: 'c.mendoza@acme.com', role: 'Sales Manager', ip: '185.220.101.5', location: 'Frankfurt, DE', authType: 'Password + SMS OTP', status: 'MFA Step-Up Triggered' },
    { id: 'LOG-878', timestamp: '2026-09-15 09:12:15', user: 'unknown@external.net', role: 'Unauthenticated Attacker', ip: '45.33.32.156', location: 'Unknown', authType: 'Brute Force Attempt', status: 'Failed' },
  ]

  const handleExport = () => {
    showToast('Login history exported', 'info', 'CSV archive downloaded for compliance verification.')
  }

  const filtered = logins.filter(l => {
    const matchesSearch = 
      l.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.ip.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Authentication & Login Telemetry"
        managedBy="ORGANIZATION ADMINISTRATOR • SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Immutable audit log recording identity authentications, ingress IP locations, and cryptographic credentials."
        accessLevel="IMMUTABLE SECURITY LEDGER (READ-ONLY)"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by user, IP address, or role..."
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
            <option value="All">All Authentication States</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="MFA Step-Up Triggered">MFA Step-Up</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Lock className="w-3 h-3 text-slate-400" /> IMMUTABLE
          </span>
          <button
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors text-slate-700 dark:text-slate-300"
          >
            <Download className="w-3.5 h-3.5" /> Export Logs
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-4">User & Role</th>
                <th className="py-3 px-4">Ingress IP & Location</th>
                <th className="py-3 px-4">Auth Method</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono text-[11px] text-slate-500">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{log.user}</div>
                    <div className="text-[11px] text-slate-400">{log.role}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-slate-800 dark:text-slate-200">{log.ip}</div>
                    <div className="text-[11px] text-slate-400">{log.location}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                    {log.authType}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {log.status === 'Success' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <ShieldCheck className="w-3.5 h-3.5" /> SUCCESS
                      </span>
                    ) : log.status === 'Failed' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                        <ShieldAlert className="w-3.5 h-3.5" /> FAILED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500">
                        MFA STEP-UP
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => setViewingEvent(log)}
                      className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold transition-colors text-xs flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3 h-3" /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewingEvent && (
        <Modal isOpen={Boolean(viewingEvent)} onClose={() => setViewingEvent(null)} title={`Authentication Event: ${viewingEvent.id}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">User Identity:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingEvent.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Role:</span>
                <span className="font-semibold">{viewingEvent.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source IP & Location:</span>
                <span className="font-mono">{viewingEvent.ip} ({viewingEvent.location})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Credentials Used:</span>
                <span className="font-medium">{viewingEvent.authType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Result:</span>
                <span className="font-bold text-emerald-600">{viewingEvent.status}</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500">
              <span className="font-bold">Ledger Note:</span> Login history is an immutable security record and cannot be altered or deleted.
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingEvent(null)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
