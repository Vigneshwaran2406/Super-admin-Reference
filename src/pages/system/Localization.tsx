import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Globe, Save, Check } from 'lucide-react'

export const Localization: React.FC = () => {
  const [defaultLang, setDefaultLang] = useState('en-US (English - United States)')
  const [allowRTL, setAllowRTL] = useState(true)
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="Localization & Language Configuration"
        managedBy="SYSTEM ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Defines supported international languages, default platform locale, date formatting patterns, and right-to-left (RTL) text direction support."
        accessLevel="Platform-Wide Localization Baseline"
        educationalNotes="Localization settings define internationalization dictionaries. Individual tenants can select their primary language from this globally approved catalog."
        tags={['Localization', 'Languages', 'i18n / l10n']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>Localization defaults updated successfully.</span>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 border border-slate-800 max-w-2xl space-y-4 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Platform Default Language</label>
          <select value={defaultLang} onChange={(e) => setDefaultLang(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
            <option>en-US (English - United States)</option>
            <option>en-GB (English - United Kingdom)</option>
            <option>de-DE (German - Germany)</option>
            <option>fr-FR (French - France)</option>
            <option>es-ES (Spanish - Spain)</option>
            <option>ja-JP (Japanese - Japan)</option>
            <option>ar-SA (Arabic - Saudi Arabia)</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Standard Date Display Format</label>
          <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white font-mono">
            <option>YYYY-MM-DD (ISO 8601 Standard - e.g. 2026-09-11)</option>
            <option>DD/MM/YYYY (UK/EU Standard - e.g. 11/09/2026)</option>
            <option>MM/DD/YYYY (US Standard - e.g. 09/11/2026)</option>
          </select>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="font-bold text-white text-sm">Enable Right-to-Left (RTL) Layout Engine</div>
            <div className="text-slate-400 mt-0.5">Enables bidirectional layout swapping for Arabic and Hebrew locales.</div>
          </div>
          <input type="checkbox" checked={allowRTL} onChange={(e) => setAllowRTL(e.target.checked)} className="w-5 h-5 accent-sky-600 rounded cursor-pointer" />
        </div>

        <div className="pt-2 flex justify-end">
          <button onClick={handleSave} className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-2">
            <Save className="w-4 h-4" /> Apply Localization
          </button>
        </div>
      </div>
    </div>
  )
}
