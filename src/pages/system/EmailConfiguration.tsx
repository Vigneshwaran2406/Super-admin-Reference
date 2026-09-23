import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Mail, Send, CheckCircle2, Save } from 'lucide-react'

export const EmailConfiguration: React.FC = () => {
  const [smtpHost, setSmtpHost] = useState('smtp.relay.internal.onecloud.io')
  const [smtpPort, setSmtpPort] = useState('587')
  const [fromAddress, setFromAddress] = useState('noreply@onecloud.io')
  const [tlsEnabled, setTlsEnabled] = useState(true)
  const [testSent, setTestSent] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleTest = () => {
    setTestSent(true)
    setTimeout(() => setTestSent(false), 3000)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="Email Notification Relay Configuration"
        managedBy="SYSTEM ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Governs the generic SMTP outbound email relay, sender identities, DKIM/SPF cryptographic signatures, and email delivery templates."
        accessLevel="Platform-Wide Email Relay • Monitored"
        educationalNotes="Third-party mail providers and relays are modeled generically using standard SMTP protocols to keep the reference architecture agnostic."
        tags={['Email Relay', 'SMTP Standard', 'Generic Provider']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>Email relay parameters updated.</span>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      {testSent && (
        <div className="mb-6 p-4 rounded-xl bg-sky-500/15 border border-sky-500/30 text-xs text-sky-300 flex items-center justify-between">
          <span>Diagnostic test email dispatched to platform administrator mailbox.</span>
          <Badge variant="info">Delivered</Badge>
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-2xl space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">SMTP Server Hostname (Generic Ref)</label>
            <input type="text" value={smtpHost} onChange={(e) => setSmtpHost(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono" />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">SMTP Port</label>
            <input type="text" value={smtpPort} onChange={(e) => setSmtpPort(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono" />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Default System Sender Address</label>
          <input type="email" value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono" />
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="font-bold text-white text-sm">Enforce STARTTLS Transport Encryption</div>
            <div className="text-slate-400 mt-0.5">Requires encrypted socket connection to outbound email gateway.</div>
          </div>
          <input type="checkbox" checked={tlsEnabled} onChange={(e) => setTlsEnabled(e.target.checked)} className="w-5 h-5 accent-sky-600 rounded cursor-pointer" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <button onClick={handleTest} type="button" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" /> Send Test Email
          </button>
          <button onClick={handleSave} type="button" className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </div>
    </div>
  )
}
