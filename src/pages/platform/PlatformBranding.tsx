import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { RestrictedScopeNotice } from '@/components/ui/RestrictedScopeNotice'
import { usePerspective } from '@/context/PerspectiveContext'
import { Palette, Upload, Check, Eye } from 'lucide-react'

export const PlatformBranding: React.FC = () => {
  const { perspective } = usePerspective()
  const [primaryColor, setPrimaryColor] = useState('#6366f1')
  const [accentColor, setAccentColor] = useState('#10b981')
  const [allowWhiteLabel, setAllowWhiteLabel] = useState(true)
  const [saved, setSaved] = useState(false)

  if (perspective !== 'super-admin') {
    return (
      <div className="space-y-6 pb-12">
        <RestrictedScopeNotice
          screenTitle="Platform Branding & White-Labeling"
          customExplanation="Platform master branding, root domain assets, global color tokens, and tenant white-label authorizations are managed solely by Super Administrator. Scoped organization administrators configure their tenant branding under their assigned tenant settings if entitled."
        />
      </div>
    )
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8 pb-12">
      <ContextPanel
        title="Platform Branding"
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Manages global default branding assets, master logo, favicon, color themes, and white-labeling authorization for enterprise tenants."
        accessLevel="ALL TENANTS (Full Global Authority)"
        whyItExists="Establishes the default brand identity for the cloud platform while maintaining policy controls over tenant custom branding."
        tags={['Global Branding', 'White-Labeling', 'Theme Engine']}
      />

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between shadow-xs">
          <span>Platform master branding defaults saved successfully.</span>
          <Badge variant="success" size="sm">Updated</Badge>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Palette className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Default Platform Color Tokens
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">Primary Brand Hue</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-xs text-slate-600 dark:text-slate-300 font-bold">{primaryColor}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <label className="font-bold text-slate-800 dark:text-slate-200 block">Accent Accent Hue</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                />
                <span className="font-mono text-xs text-slate-600 dark:text-slate-300 font-bold">{accentColor}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Allow Tenant Custom White-Labeling</div>
              <div className="text-slate-600 dark:text-slate-400 mt-0.5">Enterprise tier tenants can override logos and CSS variables.</div>
            </div>
            <input
              type="checkbox"
              checked={allowWhiteLabel}
              onChange={(e) => setAllowWhiteLabel(e.target.checked)}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Update Global Branding
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Live Preview (Simulation)
          </h3>

          <div className="p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
              OE
            </div>
            <div>
              <div className="font-extrabold text-slate-900 dark:text-white text-base">One Enterprise Cloud</div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">app.onecloud.io</div>
            </div>
            <div className="pt-2 flex justify-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-xs" style={{ backgroundColor: primaryColor }}>
                Primary Button
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-xs" style={{ backgroundColor: accentColor }}>
                Accent Tag
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
