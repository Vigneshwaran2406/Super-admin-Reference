import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Shield, Lock, Unlock, AlertTriangle, CheckCircle2 } from 'lucide-react'

export const AccountLockout: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [maxAttempts, setMaxAttempts] = useState(5)
  const [lockoutMinutes, setLockoutMinutes] = useState(30)
  const [lockedAccounts, setLockedAccounts] = useState([
    { id: 'LCK-01', user: 'contractor_temp@acme.com', attempts: 5, lastAttempt: '45 mins ago', ip: '198.51.100.77', reason: 'Repeated invalid password' },
    { id: 'LCK-02', user: 'audit_bot@external.org', attempts: 7, lastAttempt: '2 hours ago', ip: '45.33.32.156', reason: 'Brute force pattern trigger' },
  ])

  // Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'unlock' | 'generic'
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

  const handleUnlock = (account: any) => {
    setConfirmModal({
      isOpen: true,
      title: `Unlock Account: ${account.user}?`,
      message: `Reset failed attempt counter and restore interactive sign-in capability for ${account.user}?`,
      actionType: 'unlock',
      confirmLabel: 'Confirm Unlock',
      onConfirm: () => {
        setLockedAccounts(prev => prev.filter(a => a.id !== account.id))
        showToast(`Account unlocked: ${account.user}`, 'success', 'Sign-in capability restored.')
      }
    })
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Account Lockout & Brute-Force Safeguards"
        managedBy="ORGANIZATION ADMINISTRATOR • SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Governs rate-limiting thresholds, automatic lockout duration, and administrative account restoration."
        accessLevel="SECURITY CONTROL PLANE"
      />

      {/* Locked Accounts Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Currently Locked Accounts</h3>
            <p className="text-[11px] text-slate-400">Accounts temporarily blocked due to threshold violations</p>
          </div>
          <span className="text-xs font-mono font-bold text-rose-600">
            {lockedAccounts.length} Blocked Identities
          </span>
        </div>

        {lockedAccounts.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 space-y-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
            <div className="font-bold text-slate-700 dark:text-slate-300">No locked accounts</div>
            <div>All directory identities are currently in good standing.</div>
          </div>
        ) : (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 font-bold uppercase tracking-wider text-slate-500 text-[11px]">
                  <th className="py-3 px-5">Locked Identity</th>
                  <th className="py-3 px-4">Failed Attempts</th>
                  <th className="py-3 px-4">Source IP</th>
                  <th className="py-3 px-4">Trigger Reason</th>
                  <th className="py-3 px-4">Locked Time</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {lockedAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 dark:text-white">
                      {account.user}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-rose-600 font-bold">
                      {account.attempts} failures
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {account.ip}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                      {account.reason}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {account.lastAttempt}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => handleUnlock(account)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors text-xs flex items-center gap-1.5 ml-auto shadow-xs"
                      >
                        <Unlock className="w-3.5 h-3.5" /> Unlock Account
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
