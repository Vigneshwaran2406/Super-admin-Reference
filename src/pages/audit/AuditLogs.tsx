import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { mockAuditEntries } from '@/mock'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Search, Download, Eye, Lock, ShieldCheck } from 'lucide-react'

export const AuditLogs: React.FC = () => {
  const { perspective, perspectiveLabel, perspectiveScope, selectedTenant } = usePerspective()
  const { showToast } = useToast()

  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState<string>('all')
  const [viewingEntry, setViewingEntry] = useState<any | null>(null)

  const getPerspectiveLogs = () => {
    switch (perspective) {
      case 'super-admin':
        return mockAuditEntries
      case 'org-admin':
        return mockAuditEntries.filter(
          (a) => a.role !== 'Super Administrator' || a.target.toLowerCase().includes('acme')
        )
      case 'hr-manager':
        return mockAuditEntries.filter((a) => a.role === 'HR Manager' || a.action.includes('PAYROLL'))
      case 'sales-manager':
        return mockAuditEntries.filter((a) => a.role === 'Sales Manager' || a.action.includes('QUOTE'))
      default:
        return mockAuditEntries.filter((a) => a.role !== 'Super Administrator')
    }
  }

  const perspectiveLogs = getPerspectiveLogs()

  const filtered = perspectiveLogs.filter((a) => {
    const matchesSearch =
      a.action.toLowerCase().includes(search.toLowerCase()) ||
      a.actor.toLowerCase().includes(search.toLowerCase()) ||
      a.target.toLowerCase().includes(search.toLowerCase())

    if (actionFilter === 'all') return matchesSearch
    return matchesSearch && a.action.toUpperCase().includes(actionFilter.toUpperCase())
  })

  const handleExport = () => {
    showToast('Audit log export dispatched', 'info', 'Encrypted tamper-evident audit CSV generated.')
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Immutable Platform & Tenant Audit Ledger"
        managedBy={perspective === 'super-admin' ? "SUPER ADMINISTRATOR" : "ORGANIZATION ADMINISTRATOR"}
        scope={perspective === 'super-admin' ? "GLOBAL" : "ORGANIZATION / TENANT"}
        purpose="Tamper-evident append-only audit trail recording operational actions, role assignments, and security events."
        accessLevel={perspective === 'super-admin' ? "ALL TENANTS AUDIT" : `TENANT BOUNDED (${selectedTenant})`}
      />

      {/* One Compact Action Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search action, actor, or target..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white shrink-0 cursor-pointer"
          >
            <option value="all">All Actions</option>
            <option value="CREATE">Create</option>
            <option value="UPDATE">Update</option>
            <option value="DELETE">Delete</option>
            <option value="LOGIN">Login</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Lock className="w-3 h-3 text-slate-400" /> IMMUTABLE AUDIT TRAIL
          </span>
          <button
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Logs
          </button>
        </div>
      </div>

      {/* Clean Spacious Audit Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                <th className="py-3 px-5">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono text-slate-500 text-[11px]">
                    {entry.timestamp}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    {entry.action}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                    {entry.actor}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={entry.role.includes('Super') ? 'global' : entry.role.includes('Org') ? 'tenant' : 'domain'} size="sm">
                      {entry.role}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300 text-[11px]">
                    {entry.target}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => setViewingEntry(entry)}
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

      {/* View Details Modal */}
      {viewingEntry && (
        <Modal isOpen={Boolean(viewingEntry)} onClose={() => setViewingEntry(null)} title={`Audit Record: ${viewingEntry.id}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Operation Action:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{viewingEntry.action}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Executing Actor:</span>
                <span className="font-bold">{viewingEntry.actor} ({viewingEntry.role})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Entity:</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{viewingEntry.target}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Execution Timestamp:</span>
                <span className="font-mono">{viewingEntry.timestamp}</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500">
              <span className="font-bold">Immutability Note:</span> Audit events are cryptographically hashed and cannot be altered or deleted.
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingEntry(null)}
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
