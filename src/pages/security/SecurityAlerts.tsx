import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { mockSecurityAlertsList } from '@/mock'
import { ShieldAlert, CheckCircle2, AlertTriangle, Search, Eye, Check, SearchCode } from 'lucide-react'

export const SecurityAlerts: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [alerts, setAlerts] = useState(mockSecurityAlertsList)
  const [searchQuery, setSearchQuery] = useState('')

  // Modals
  const [viewingAlert, setViewingAlert] = useState<any | null>(null)
  const [investigatingAlert, setInvestigatingAlert] = useState<any | null>(null)

  const handleAcknowledge = (id: string, title: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Acknowledged' } : a))
    showToast(`Alert acknowledged: ${title}`, 'info', 'Security incident acknowledged by administrator.')
  }

  const handleResolve = (id: string, title: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved' } : a))
    showToast(`Alert resolved: ${title}`, 'success', 'Security incident remediated and closed.')
  }

  const filtered = alerts.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.severity.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Security Alerts & Threat Telemetry"
        managedBy="SUPER ADMINISTRATOR (Platform SIEM) • ORGANIZATION ADMINISTRATOR (Tenant Incidents)"
        scope="GLOBAL"
        purpose="Live anomaly detection, credential stuffing telemetry, and operational threat mitigation."
        accessLevel="SECURITY CONTROL PLANE"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search security alerts by title, severity, or tenant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="text-xs font-mono text-slate-500">
          Open Incidents: <span className="font-bold text-rose-600">{alerts.filter(a => a.status !== 'Resolved').length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                <th className="py-3 px-5">Incident Description</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">User / Account</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((a) => {
                const isResolved = a.status === 'Resolved'
                return (
                  <tr key={a.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{a.title}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">{a.action}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        a.severity === 'Critical' ? 'bg-rose-50 text-rose-700' :
                        a.severity === 'High' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {a.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                      {a.user}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {a.timestamp}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {isResolved ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" /> RESOLVED
                        </span>
                      ) : a.status === 'Acknowledged' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600">
                          ACKNOWLEDGED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                          <AlertTriangle className="w-3.5 h-3.5" /> OPEN
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingAlert(a)}
                          className="px-2 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold transition-colors text-xs"
                        >
                          View
                        </button>
                        {!isResolved && a.status !== 'Acknowledged' && (
                          <button
                            onClick={() => handleAcknowledge(a.id, a.title)}
                            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-bold transition-colors text-xs"
                          >
                            Acknowledge
                          </button>
                        )}
                        <button
                          onClick={() => setInvestigatingAlert(a)}
                          className="px-2 py-1 rounded-lg border border-indigo-200 dark:border-indigo-900/40 text-indigo-600 hover:bg-indigo-50 font-bold transition-colors text-xs flex items-center gap-1"
                        >
                          <SearchCode className="w-3 h-3" /> Investigate
                        </button>
                        {!isResolved && (
                          <button
                            onClick={() => handleResolve(a.id, a.title)}
                            className="px-2 py-1 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold transition-colors text-xs flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Resolve
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

      {/* View Alert Modal */}
      {viewingAlert && (
        <Modal isOpen={Boolean(viewingAlert)} onClose={() => setViewingAlert(null)} title={`Incident: ${viewingAlert.title}`}>
          <div className="space-y-4 text-xs">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {viewingAlert.action}
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Severity Level:</span>
                <span className="font-bold text-rose-600">{viewingAlert.severity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Affected Scope:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingAlert.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Incident Timestamp:</span>
                <span className="font-mono">{viewingAlert.timestamp}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingAlert(null)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Investigate Modal */}
      {investigatingAlert && (
        <Modal isOpen={Boolean(investigatingAlert)} onClose={() => setInvestigatingAlert(null)} title={`Investigate Incident: ${investigatingAlert.title}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] space-y-1">
              <div>[SIEM TELEMETRY TRACE] Alert ID: {investigatingAlert.id}</div>
              <div>Source IP: 198.51.100.201 (Geolocated: Unknown Proxy)</div>
              <div>Failed Sign-in attempts: 18 attempts in 30 seconds</div>
              <div>Automated IP throttling initiated: RATE_LIMIT_RULE_429</div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setInvestigatingAlert(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleResolve(investigatingAlert.id, investigatingAlert.title)
                  setInvestigatingAlert(null)
                }}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold"
              >
                Resolve Incident
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
