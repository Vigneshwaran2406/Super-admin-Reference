import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Smartphone, Send, Save, CheckCircle2 } from 'lucide-react'

export const SMSConfiguration: React.FC = () => {
  const [gatewayName, setGatewayName] = useState('Generic Enterprise SMS Gateway Relay')
  const [accountSid, setAccountSid] = useState('AC_mock_gateway_reference_88192')
  const [senderId, setSenderId] = useState('ONECLOUD')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="SMS Gateway & OTP Relay Configuration"
        managedBy="SYSTEM ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Manages generic outbound SMS gateway integrations for multi-factor authentication passcodes, urgent security alerts, and workflow notifications."
        accessLevel="Platform-Wide SMS Relay • Monitored"
        educationalNotes="SMS providers are identified using generic gateway labels with mock reference identifiers rather than hardcoded proprietary third-party integrations."
        tags={['SMS Gateway', 'Generic Carrier', 'OTP Relay']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>SMS gateway credentials updated.</span>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-2xl space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">SMS Gateway Type (Generic Standard)</label>
          <input type="text" value={gatewayName} onChange={(e) => setGatewayName(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Gateway Account Identifier (Mock Example)</label>
          <input type="text" value={accountSid} onChange={(e) => setAccountSid(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono" />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Default Alphanumeric Sender ID</label>
          <input type="text" value={senderId} onChange={(e) => setSenderId(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono" />
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={handleSave} className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Gateway Parameters
          </button>
        </div>
      </div>
    </div>
  )
}
