import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Clock, Users, XCircle, Search, Eye, Power } from 'lucide-react'

interface SessionItem {
  id: string
  user: string
  tenant: string
  ip: string
  duration: string
  client: string
  status: 'Active' | 'Revoked'
}

export const SessionManagement: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')

  const [sessions, setSessions] = useState<SessionItem[]>([
    { id: 'sess_99182', user: 'alex.wright@onecloud.io', tenant: 'Platform Global', ip: '198.51.100.24', duration: '2h 15m', client: 'Chrome 128 / macOS', status: 'Active' },
    { id: 'sess_41029', user: 'm.bell@acme.com', tenant: 'Acme Technologies Inc.', ip: '203.0.113.88', duration: '45m', client: 'Firefox 130 / Windows', status: 'Active' },
    { id: 'sess_77210', user: 's.chen@apex.io', tenant: 'Apex Financial Services', ip: '198.51.100.104', duration: '14m', client: 'Safari 18 / iOS', status: 'Active' },
    { id: 'sess_33091', user: 'd.ross@logix.com', tenant: 'Global Logistics Corp', ip: '203.0.113.12', duration: '5h 02m', client: 'Edge 128 / Windows', status: 'Active' },
  ])

  // Modals
  const [viewingSession, setViewingSession] = useState<SessionItem | null>(null)

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'revoke' | 'generic'
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

  const handleRevoke = (session: SessionItem) => {
    setConfirmModal({
      isOpen: true,
      title: `Revoke Session for ${session.user}?`,
      message: `Are you sure you want to terminate this active browser session from ${session.ip}? The user will be logged out immediately.`,
      actionType: 'revoke',
      confirmLabel: 'Confirm Revocation',
      onConfirm: () => {
        setSessions(prev => prev.map(s => s.id === session.id ? { ...s, status: 'Revoked' } : s))
        showToast('Session revoked', 'warning', `Session ${session.id} terminated.`)
      }
    })
  }

  const filtered = sessions.filter(s => 
    s.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.ip.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Live Session Management & Telemetry"
        managedBy="SUPER ADMINISTRATOR (Platform Global) • ORGANIZATION ADMINISTRATOR (Tenant Sessions)"
        scope="GLOBAL"
        purpose="Live inspection and immediate revocation of authenticated user browser sessions and API access tokens."
        accessLevel="SECURITY CONTROL PLANE"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search active sessions by user, tenant, or IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="text-xs font-mono text-slate-500">
          Active Sessions: <span className="font-bold text-slate-900 dark:text-white">{sessions.filter(s => s.status === 'Active').length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                <th className="py-3 px-5">Authenticated User</th>
                <th className="py-3 px-4">Organization Tenant</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Client Agent</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((s) => {
                const isActive = s.status === 'Active'
                return (
                  <tr key={s.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                      {s.user}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {s.tenant}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {s.ip}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {s.client}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {s.duration}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isActive ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500">
                          REVOKED
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingSession(s)}
                          className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold transition-colors text-xs"
                        >
                          View
                        </button>
                        {isActive && (
                          <button
                            onClick={() => handleRevoke(s)}
                            className="px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 font-bold transition-colors text-xs flex items-center gap-1"
                          >
                            <Power className="w-3 h-3" /> Revoke Session
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Session Modal */}
      {viewingSession && (
        <Modal isOpen={Boolean(viewingSession)} onClose={() => setViewingSession(null)} title={`Session Details: ${viewingSession.id}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">User Email:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingSession.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tenant:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingSession.tenant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client Agent:</span>
                <span className="font-mono">{viewingSession.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ingress IP:</span>
                <span className="font-mono">{viewingSession.ip}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingSession(null)}
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
