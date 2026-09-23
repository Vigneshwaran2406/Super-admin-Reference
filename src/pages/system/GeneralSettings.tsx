import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Settings, Save } from 'lucide-react'

export const GeneralSettings: React.FC = () => {
  const [supportEmail, setSupportEmail] = useState('cloud-support@oneenterprise.io')
  const [systemAlertBanner, setSystemAlertBanner] = useState('Welcome to One Enterprise Cloud Platform Reference Architecture.')
  const [bannerActive, setBannerActive] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="General System Settings"
        managedBy="SYSTEM ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Configures global enterprise support contact emails, platform system broadcast banners, and default operating metadata."
        accessLevel="ALL TENANTS (Full Global Authority)"
        educationalNotes="System settings defined here apply to the platform instance. Broadcast banners appear at the top of every tenant console when enabled."
        tags={['General Settings', 'System Broadcast', 'Global Support']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>General settings successfully updated across all tenant consoles.</span>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Master Support Desk Email</label>
            <input type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Platform-Wide Global Broadcast Banner</label>
            <textarea value={systemAlertBanner} onChange={(e) => setSystemAlertBanner(e.target.value)} rows={3} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white text-sm">Display Global Banner to All Tenants</div>
              <div className="text-slate-400 mt-0.5">Broadcasts informational notice across user dashboards.</div>
            </div>
            <input type="checkbox" checked={bannerActive} onChange={(e) => setBannerActive(e.target.checked)} className="w-5 h-5 accent-sky-600 rounded cursor-pointer" />
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
