import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Sliders, Save, CheckCircle } from 'lucide-react'

export const GlobalSettings: React.FC = () => {
  const [platformName, setPlatformName] = useState('One Enterprise Cloud Platform')
  const [sessionTimeout, setSessionTimeout] = useState('30')
  const [defaultMaxUpload, setDefaultMaxUpload] = useState('50')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="Global Settings"
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Defines system-wide platform defaults, baseline user session timeouts, global file upload limits, and default security policies."
        accessLevel="ALL TENANTS (Full Global Authority)"
        educationalNotes="These settings act as the platform defaults. Tenants inherit these values unless an Organization Administrator has permission to override specific tenant-level policies."
        tags={['System Parameters', 'Global Defaults', 'Inheritance']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between animate-fade-in">
          <span>Global platform settings updated successfully.</span>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Platform Instance Name</label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Global Idle Session Timeout (Minutes)</label>
              <input
                type="number"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Default Max Attachment Size (MB)</label>
              <input
                type="number"
                value={defaultMaxUpload}
                onChange={(e) => setDefaultMaxUpload(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Global Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
