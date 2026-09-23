import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Clock, Save } from 'lucide-react'

export const TimeZone: React.FC = () => {
  const [defaultTimezone, setDefaultTimezone] = useState('UTC (Coordinated Universal Time)')
  const [autoDST, setAutoDST] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="Time Zone & Clock Synchronization"
        managedBy="SYSTEM ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Governs UTC server timestamp normalization, daylight savings transitions, and platform-wide schedule synchronization."
        accessLevel="Platform-Wide Clock Normalization"
        educationalNotes="All database records and Kafka events persist timestamps in strict UTC. The selected timezone determines how system jobs and audit logs display by default."
        tags={['Time Zone', 'Clock Sync', 'UTC Normalization']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>Time zone synchronization preferences applied.</span>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-2xl space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Platform Default Time Zone</label>
          <select value={defaultTimezone} onChange={(e) => setDefaultTimezone(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
            <option>UTC (Coordinated Universal Time)</option>
            <option>America/New_York (Eastern Time)</option>
            <option>America/Chicago (Central Time)</option>
            <option>America/Los_Angeles (Pacific Time)</option>
            <option>Europe/London (GMT/BST)</option>
            <option>Europe/Frankfurt (CET)</option>
            <option>Asia/Kolkata (IST)</option>
            <option>Asia/Singapore (SGT)</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="font-bold text-white text-sm">Automatic Daylight Savings Time (DST) Adjustments</div>
            <div className="text-slate-400 mt-0.5">Automatically computes local offsets according to regional DST transitions.</div>
          </div>
          <input type="checkbox" checked={autoDST} onChange={(e) => setAutoDST(e.target.checked)} className="w-5 h-5 accent-sky-600 rounded cursor-pointer" />
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={handleSave} className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Time Zone
          </button>
        </div>
      </div>
    </div>
  )
}
