import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { RestrictedScopeNotice } from '@/components/ui/RestrictedScopeNotice'
import { usePerspective } from '@/context/PerspectiveContext'
import { Settings, Save, ShieldCheck, RefreshCw, Layers } from 'lucide-react'

export const PlatformConfiguration: React.FC = () => {
  const { perspective } = usePerspective()
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [strictIsolation, setStrictIsolation] = useState(true)
  const [apiRateLimiting, setApiRateLimiting] = useState(true)
  const [savedAlert, setSavedAlert] = useState(false)

  if (perspective !== 'super-admin') {
    return (
      <div className="space-y-6 pb-12">
        <RestrictedScopeNotice
          screenTitle="Platform Configuration"
          customExplanation="Global runtime switches, multi-tenant database isolation enforcements, edge API rate limits, and platform maintenance modes are strictly governed by the Super Administrator at the cloud infrastructure level. Organization Administrators and Domain Managers do not possess global infrastructure authority."
        />
      </div>
    )
  }

  const handleSave = () => {
    setSavedAlert(true)
    setTimeout(() => setSavedAlert(false), 3000)
  }

  return (
    <div className="space-y-8 pb-12">
      <ContextPanel
        title="Platform Configuration"
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Global runtime switches, enterprise tenancy isolation enforcement, edge API rate limits, and scheduled platform maintenance modes."
        accessLevel="ALL TENANTS (Full Global Authority)"
        whyItExists="Guarantees cloud-wide baseline parameters and infrastructure resilience across all provisioned enterprise tenants."
        tags={['Global Config', 'Infrastructure Controls', 'Platform Baseline']}
      />

      {savedAlert && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between animate-fade-in shadow-xs">
          <span>Configuration changes applied to Spring Cloud Gateway cluster successfully.</span>
          <Badge variant="success" size="sm">Saved</Badge>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Global Runtime Parameters
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Cluster: prod-us-east-1</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="pr-4">
                <div className="font-bold text-slate-900 dark:text-white text-sm">Strict Multi-Tenant Database Isolation</div>
                <div className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Enforces tenant schema separation and cryptographic key partitioning across all tenant databases.
                </div>
              </div>
              <input
                type="checkbox"
                checked={strictIsolation}
                onChange={(e) => setStrictIsolation(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="pr-4">
                <div className="font-bold text-slate-900 dark:text-white text-sm">API Gateway Rate Limiting</div>
                <div className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Global token bucket rate limiting (10,000 req/min per tenant token) to prevent noisy-neighbor degradation.
                </div>
              </div>
              <input
                type="checkbox"
                checked={apiRateLimiting}
                onChange={(e) => setApiRateLimiting(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="pr-4">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  Platform Maintenance Mode
                  {maintenanceMode && <Badge variant="danger" size="sm">Active</Badge>}
                </div>
                <div className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Allows only Super Admins to access platform while maintenance banner is displayed to all tenant users.
                </div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-5 h-5 accent-rose-600 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Global Configuration
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Architectural Guidance
          </h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Platform configuration parameters reside strictly in the global configuration store (Spring Cloud Config / Consul).
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="text-slate-900 dark:text-white font-semibold">Audited Governance:</div>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Every change here automatically emits a high-priority entry into the Super Admin Tamper-Evident Audit Log.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
