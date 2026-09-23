import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Lock, Fingerprint, Smartphone, Key, Settings, CheckCircle2, XCircle } from 'lucide-react'

export const MFAConfiguration: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [methods, setMethods] = useState([
    {
      id: 'fido2',
      name: 'FIDO2 Hardware Security Keys',
      desc: 'Physical YubiKey and WebAuthn biometric security authenticators.',
      status: 'Active',
      enforcedRoles: 'Super Admin, Org Admin',
      icon: <Fingerprint className="w-5 h-5 text-indigo-600" />
    },
    {
      id: 'totp',
      name: 'Authenticator App (TOTP)',
      desc: 'RFC 6238 time-based one-time password applications (Google Authenticator, Microsoft Authenticator).',
      status: 'Active',
      enforcedRoles: 'All Operational Roles',
      icon: <Smartphone className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'sms',
      name: 'SMS OTP Backup Codes',
      desc: 'Telephonic fallback verification for legacy emergency recovery.',
      status: 'Inactive',
      enforcedRoles: 'Emergency Recovery Only',
      icon: <Key className="w-5 h-5 text-amber-600" />
    },
  ])

  // Configure modal
  const [configuringMethod, setConfiguringMethod] = useState<any | null>(null)
  const [selectedEnforcement, setSelectedEnforcement] = useState('All Staff')

  const handleToggle = (id: string) => {
    setMethods(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Active' ? 'Inactive' : 'Active'
        showToast(
          nextStatus === 'Active' ? `${m.name} enabled` : `${m.name} disabled`,
          nextStatus === 'Active' ? 'success' : 'warning',
          'MFA policy updated.'
        )
        return { ...m, status: nextStatus }
      }
      return m
    }))
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Multi-Factor Authentication (MFA) Configuration"
        managedBy="SUPER ADMINISTRATOR (Platform Enforcements) • ORGANIZATION ADMINISTRATOR (Tenant Policies)"
        scope="GLOBAL"
        purpose="Defines biometric hardware token enforcement, TOTP applications, and step-up authentication boundaries."
        accessLevel="SECURITY CONTROL PLANE"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {methods.map((method) => {
          const isActive = method.status === 'Active'
          return (
            <div
              key={method.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                    {method.icon}
                  </div>
                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ENABLED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      <XCircle className="w-3.5 h-3.5" /> DISABLED
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{method.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{method.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Enforcement Scope</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{method.enforcedRoles}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleToggle(method.id)}
                  className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold transition-colors ${
                    isActive
                      ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                      : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                  }`}
                >
                  {isActive ? 'Disable' : 'Enable'}
                </button>
                <button
                  onClick={() => setConfiguringMethod(method)}
                  className="py-1.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <Settings className="w-3.5 h-3.5" /> Configure
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Configure Modal */}
      {configuringMethod && (
        <Modal isOpen={Boolean(configuringMethod)} onClose={() => setConfiguringMethod(null)} title={`Configure ${configuringMethod.name}`}>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Enforcement Policy</label>
              <select
                value={selectedEnforcement}
                onChange={(e) => setSelectedEnforcement(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Privileged Administrators Only">Privileged Administrators Only (Super Admin & Org Admin)</option>
                <option value="All Operational Roles">All Operational Managers (HR, Sales, Finance, etc.)</option>
                <option value="Mandatory Enterprise Wide">Mandatory Platform-Wide (All Authenticated Accounts)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setConfiguringMethod(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConfiguringMethod(null)
                  showToast('Policy updated', 'success', 'MFA mandatory enforcement bounds saved.')
                }}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold"
              >
                Save Policy
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
