import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Laptop, Smartphone, Search, CheckCircle2, ShieldAlert, ShieldCheck, Eye, Power } from 'lucide-react'

interface DeviceItem {
  id: string
  user: string
  deviceName: string
  os: string
  lastSeen: string
  status: 'Trusted' | 'Unregistered' | 'Revoked'
}

export const DeviceManagement: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [searchQuery, setSearchQuery] = useState('')

  const [devices, setDevices] = useState<DeviceItem[]>([
    { id: 'dev-1', user: 'alex.wright@onecloud.io', deviceName: 'MacBook Pro 16 (Corp-IT-001)', os: 'macOS Sonoma', lastSeen: '10m ago', status: 'Trusted' },
    { id: 'dev-2', user: 'm.bell@acme.com', deviceName: 'Dell XPS 15 (ACME-LT-94)', os: 'Windows 11 Pro', lastSeen: '1h ago', status: 'Trusted' },
    { id: 'dev-3', user: 's.chen@apex.io', deviceName: 'iPhone 15 Pro (Personal BYOD)', os: 'iOS 18', lastSeen: '3h ago', status: 'Unregistered' },
    { id: 'dev-4', user: 'd.ross@logix.com', deviceName: 'ThinkPad T14 (LOGIX-441)', os: 'Ubuntu 24.04 LTS', lastSeen: 'Yesterday', status: 'Trusted' },
  ])

  // Modals
  const [viewingDevice, setViewingDevice] = useState<DeviceItem | null>(null)

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

  const handleTrust = (dev: DeviceItem) => {
    setDevices(prev => prev.map(d => d.id === dev.id ? { ...d, status: 'Trusted' } : d))
    showToast(`Device ${dev.deviceName} trusted`, 'success', 'Enrolled into managed device directory.')
  }

  const handleRevoke = (dev: DeviceItem) => {
    setConfirmModal({
      isOpen: true,
      title: `Revoke Device Trust: ${dev.deviceName}?`,
      message: `Are you sure you want to revoke trust for ${dev.deviceName} (${dev.user})? Mutual TLS certificates will be invalidated.`,
      actionType: 'revoke',
      confirmLabel: 'Confirm Revoke Trust',
      onConfirm: () => {
        setDevices(prev => prev.map(d => d.id === dev.id ? { ...d, status: 'Revoked' } : d))
        showToast('Device trust revoked', 'warning', `Device ${dev.id} disconnected.`)
      }
    })
  }

  const filtered = devices.filter(d => 
    d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.os.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Managed Endpoint Device Directory"
        managedBy="SUPER ADMINISTRATOR • ORGANIZATION ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Governs corporate endpoint trust, mutual TLS certificate bindings, and remote device revocation."
        accessLevel="SECURITY CONTROL PLANE"
      />

      {/* Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search devices by user, machine name, or OS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="text-xs font-mono text-slate-500">
          Enrolled Devices: <span className="font-bold text-slate-900 dark:text-white">{devices.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                <th className="py-3 px-5">Machine / Endpoint</th>
                <th className="py-3 px-4">Operating System</th>
                <th className="py-3 px-4">Registered User</th>
                <th className="py-3 px-4">Last Telemetry</th>
                <th className="py-3 px-4 text-center">Trust Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{d.deviceName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-medium">
                    {d.os}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                    {d.user}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    {d.lastSeen}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {d.status === 'Trusted' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> TRUSTED
                      </span>
                    ) : d.status === 'Revoked' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                        <ShieldAlert className="w-3.5 h-3.5" /> REVOKED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-500">
                        UNREGISTERED
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setViewingDevice(d)}
                        className="px-2.5 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 font-bold transition-colors text-xs"
                      >
                        View
                      </button>
                      {d.status !== 'Trusted' && (
                        <button
                          onClick={() => handleTrust(d)}
                          className="px-2.5 py-1 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-bold transition-colors text-xs flex items-center gap-1"
                        >
                          <ShieldCheck className="w-3 h-3" /> Trust
                        </button>
                      )}
                      {d.status === 'Trusted' && (
                        <button
                          onClick={() => handleRevoke(d)}
                          className="px-2.5 py-1 rounded-lg border border-rose-200 dark:border-rose-900/40 text-rose-600 hover:bg-rose-50 font-bold transition-colors text-xs flex items-center gap-1"
                        >
                          <Power className="w-3 h-3" /> Revoke
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

      {/* View Modal */}
      {viewingDevice && (
        <Modal isOpen={Boolean(viewingDevice)} onClose={() => setViewingDevice(null)} title={`Device: ${viewingDevice.deviceName}`}>
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Hardware Model:</span>
                <span className="font-bold text-slate-900 dark:text-white">{viewingDevice.deviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">User Identity:</span>
                <span className="font-mono text-slate-900 dark:text-white">{viewingDevice.user}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Operating System:</span>
                <span className="font-medium">{viewingDevice.os}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trust State:</span>
                <span className="font-bold text-emerald-600">{viewingDevice.status}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setViewingDevice(null)}
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
