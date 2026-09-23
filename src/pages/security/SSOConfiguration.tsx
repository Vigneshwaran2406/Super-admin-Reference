import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Fingerprint, Save, CheckCircle, ExternalLink } from 'lucide-react'

export const SSOConfiguration: React.FC = () => {
  const [ssoEnabled, setSsoEnabled] = useState(true)
  const [protocol, setProtocol] = useState('SAML 2.0 (Generic Enterprise Federation)')
  const [idpEntityId, setIdpEntityId] = useState('https://idp.example.com/entity-id-ref')
  const [ssoUrl, setSsoUrl] = useState('https://idp.example.com/sso/saml2/reference-login')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="Single Sign-On (SSO) Configuration"
        managedBy="SECURITY ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Configures generic enterprise Single Sign-On federation (SAML 2.0 / OpenID Connect) for corporate user authentication."
        accessLevel="Tenant-Specific or Global Federation • Security Audited"
        educationalNotes="Identity Provider integrations (such as corporate SAML 2.0 or OIDC gateways) are presented here using generic standard terminology and mock reference endpoints."
        tags={['Single Sign-On', 'Generic SAML/OIDC', 'Federation Reference']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>Single Sign-On reference parameters updated.</span>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Enable Enterprise SSO Federation</div>
              <div className="text-slate-400 mt-0.5">Enforces corporate IdP login for enterprise tenant users.</div>
            </div>
            <input
              type="checkbox"
              checked={ssoEnabled}
              onChange={(e) => setSsoEnabled(e.target.checked)}
              className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Federation Protocol</label>
            <select
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
            >
              <option>SAML 2.0 (Generic Enterprise Federation)</option>
              <option>OpenID Connect (OIDC Generic Standard)</option>
              <option>WS-Federation (Legacy Reference)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Identity Provider (IdP) Entity ID (Mock Example)</label>
            <input
              type="text"
              value={idpEntityId}
              onChange={(e) => setIdpEntityId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Single Sign-On Service URL (Mock Example)</label>
            <input
              type="text"
              value={ssoUrl}
              onChange={(e) => setSsoUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-[11px]">
            <span className="text-slate-200 font-semibold">Note:</span> Third-party provider endpoints are displayed as generic reference values per system design guidelines.
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold flex items-center gap-2">
              <Save className="w-4 h-4" /> Save SSO Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
