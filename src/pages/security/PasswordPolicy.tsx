import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Lock, Save } from 'lucide-react'

export const PasswordPolicy: React.FC = () => {
  const [minLength, setMinLength] = useState(12)
  const [expiryDays, setExpiryDays] = useState(90)
  const [preventReuse, setPreventReuse] = useState(5)
  const [requireSymbols, setRequireSymbols] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="Password Policy Governance"
        managedBy="SECURITY ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Establishes password length requirements, entropy complexity rules, expiration cycles, and password reuse prevention thresholds."
        accessLevel="Platform-Wide Policy Baseline"
        educationalNotes="The platform password policy defines the cryptographic strength required for credentials. Enterprise tenants inherit this policy baseline by default."
        tags={['Password Policy', 'Entropy', 'Credential Hygiene']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>Password policy parameters updated across all platform authenticators.</span>
          <Badge variant="success">Updated</Badge>
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Minimum Password Length (Characters)</label>
            <input type="number" value={minLength} onChange={(e) => setMinLength(Number(e.target.value))} min={8} max={32} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password Expiration Interval (Days, 0 = Never)</label>
            <input type="number" value={expiryDays} onChange={(e) => setExpiryDays(Number(e.target.value))} min={0} max={365} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">History Prevention (Disallow Last N Passwords)</label>
            <input type="number" value={preventReuse} onChange={(e) => setPreventReuse(Number(e.target.value))} min={1} max={24} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Require Mixed Character Classes</div>
              <div className="text-slate-400 mt-0.5">Requires uppercase, lowercase, numbers, and special symbols (!@#$%^&*).</div>
            </div>
            <input type="checkbox" checked={requireSymbols} onChange={(e) => setRequireSymbols(e.target.checked)} className="w-5 h-5 accent-rose-600 rounded cursor-pointer" />
          </div>
          <div className="pt-2 flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Password Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
