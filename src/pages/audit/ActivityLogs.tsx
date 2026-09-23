import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { usePerspective } from '@/context/PerspectiveContext'
import { Activity, Search, Filter, Info, CheckCircle2 } from 'lucide-react'

interface ActivityItem {
  id: string
  time: string
  user: string
  tenant: string
  domain: string
  event: string
  detail: string
}

const allActivities: ActivityItem[] = [
  { id: 'ACT-401', time: '12:44:19', user: 'j.miller@acme.com', tenant: 'Acme Enterprise', domain: 'HRMS', event: 'EXPORT_EMPLOYEE_ATTENDANCE_XLSX', detail: 'Exported 38 attendance records for Austin branch' },
  { id: 'ACT-402', time: '12:35:08', user: 'c.mendoza@acme.com', tenant: 'Acme Enterprise', domain: 'CRM', event: 'OPPORTUNITY_STAGE_UPDATED', detail: 'Moved Apex Deal from Proposal to Contract Review' },
  { id: 'ACT-403', time: '12:20:41', user: 'p.wong@acme.com', tenant: 'Acme Enterprise', domain: 'Finance', event: 'GL_RECONCILIATION_RUN', detail: 'Reconciled Account 1010 Operating Cash' },
  { id: 'ACT-404', time: '11:58:30', user: 'b.keller@acme.com', tenant: 'Acme Enterprise', domain: 'Warehouse', event: 'INVENTORY_CYCLE_COUNT_POSTED', detail: 'Posted Bin DC1-Row-A inventory verification' },
  { id: 'ACT-405', time: '11:40:12', user: 's.sharma@acme.com', tenant: 'Acme Enterprise', domain: 'Procurement', event: 'PURCHASE_ORDER_ISSUED', detail: 'Dispatched PO-90812 to Fastener Supplies Inc.' },
  { id: 'ACT-406', time: '11:22:15', user: 'j.miller@acme.com', tenant: 'Acme Enterprise', domain: 'HRMS', event: 'LEAVE_REQUEST_APPROVED', detail: 'Approved 3 days PTO for Sarah Connor' },
  { id: 'ACT-407', time: '10:55:00', user: 'c.mendoza@acme.com', tenant: 'Acme Enterprise', domain: 'CRM', event: 'LEAD_QUALIFIED_INTO_DEAL', detail: 'Converted Enterprise Cloud lead #189 to active deal' },
  { id: 'ACT-408', time: '10:14:22', user: 'p.wong@acme.com', tenant: 'Acme Enterprise', domain: 'Finance', event: 'PAYABLE_INVOICE_AUTHORIZED', detail: 'Authorized Invoice #INV-88301 for $14,250' },
  { id: 'ACT-409', time: '09:45:10', user: 'ops@globallogistics.com', tenant: 'Global Logistics Hub', domain: 'Warehouse', event: 'STOCK_TRANSFER_COMPLETED', detail: 'Transferred 250 units to Warehouse B (Chicago)' },
  { id: 'ACT-410', time: '09:15:30', user: 'alex.wright@onecloud.io', tenant: 'Global Platform', domain: 'Platform Control', event: 'EDGE_GATEWAY_CONFIG_UPDATED', detail: 'Synchronized TLS 1.3 cipher suite across all nodes' },
]

export const ActivityLogs: React.FC = () => {
  const { perspective, perspectiveLabel, perspectiveScope, selectedTenant, activeProfile } = usePerspective()
  const [search, setSearch] = useState('')

  const getFilteredActivities = () => {
    switch (perspective) {
      case 'super-admin':
        return allActivities

      case 'org-admin':
        return allActivities.filter((a) => a.tenant === selectedTenant || a.tenant === 'Acme Enterprise')

      case 'hr-manager':
        return allActivities.filter((a) => a.domain === 'HRMS')

      case 'sales-manager':
        return allActivities.filter((a) => a.domain === 'CRM')

      case 'finance-manager':
        return allActivities.filter((a) => a.domain === 'Finance')

      case 'procurement-manager':
        return allActivities.filter((a) => a.domain === 'Procurement')

      case 'warehouse-manager':
        return allActivities.filter((a) => a.domain === 'Warehouse')

      default:
        return allActivities
    }
  }

  const roleActivities = getFilteredActivities()

  const filtered = roleActivities.filter(
    (a) =>
      a.user.toLowerCase().includes(search.toLowerCase()) ||
      a.domain.toLowerCase().includes(search.toLowerCase()) ||
      a.event.toLowerCase().includes(search.toLowerCase()) ||
      a.detail.toLowerCase().includes(search.toLowerCase())
  )

  const getContextInfo = () => {
    switch (perspective) {
      case 'super-admin':
        return {
          title: 'Global Operational Activity Stream',
          managedBy: 'SUPER ADMINISTRATOR',
          scope: 'GLOBAL' as const,
          accessLevel: 'CROSS-TENANT OVERSIGHT (All Tenants)',
          purpose: 'Real-time telemetry of operational business events, document transactions, and domain operations across all enterprise tenants.',
          whyItExists: 'Super Admin monitors platform-wide activity volume, anomaly detection, and operational health across all organizations.',
        }
      case 'org-admin':
        return {
          title: `Tenant Operational Activity · ${selectedTenant}`,
          managedBy: 'ORGANIZATION ADMINISTRATOR',
          scope: 'ORGANIZATION / TENANT' as const,
          accessLevel: `TENANT OPERATIONAL SCOPE (${selectedTenant})`,
          purpose: `Comprehensive activity tracking across all business domains (HRMS, CRM, Finance, Procurement, Warehouse) within ${selectedTenant}.`,
          whyItExists: 'Organization Admin ensures cross-departmental alignment and policy compliance within the organization.',
        }
      default:
        return {
          title: `${activeProfile.shortLabel} Activity Stream · ${selectedTenant}`,
          managedBy: perspectiveLabel,
          scope: perspectiveScope,
          accessLevel: `DOMAIN OPERATIONAL (${selectedTenant})`,
          purpose: `Operational record modifications, status progressions, and workflow transactions within the ${activeProfile.shortLabel} domain.`,
          whyItExists: `Domain managers operate day-to-day functional workflows and audit activity within their domain scope.`,
        }
    }
  }

  const ctx = getContextInfo()

  return (
    <div className="space-y-8 pb-12">
      <ContextPanel
        title={ctx.title}
        managedBy={ctx.managedBy}
        scope={ctx.scope}
        purpose={ctx.purpose}
        accessLevel={ctx.accessLevel}
        whyItExists={ctx.whyItExists}
        tags={[ctx.scope, 'Activity Logs', 'Operational Telemetry']}
      />

      {/* Perspective Educational Banner */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex items-start gap-4">
        <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-slate-900 dark:text-white">
            Operational Telemetry Filter: {perspectiveLabel} ({perspectiveScope})
          </div>
          <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {perspective === 'super-admin'
              ? 'Displaying cross-tenant operational activity across all business domains and platform services.'
              : perspective === 'org-admin'
              ? `Displaying all domain activities within ${selectedTenant}. Organization Administrator oversees overall tenant operations.`
              : `Displaying ${activeProfile.shortLabel} domain activities only. You are simulating ${perspectiveLabel} operational authority.`}
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search activity event, user, or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={activeProfile.badgeVariant} size="sm">
            {filtered.length} Events Visible
          </Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline">
            Scope: {perspectiveScope}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5">Timestamp</th>
                <th className="py-3.5 px-5">User Account</th>
                <th className="py-3.5 px-5">Business Domain</th>
                <th className="py-3.5 px-5">Event Identifier</th>
                <th className="py-3.5 px-5">Operational Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 font-sans">
                    No operational activities match this domain filter.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-5 text-slate-500 dark:text-slate-400">{a.time}</td>
                    <td className="py-3.5 px-5 font-sans font-medium text-slate-900 dark:text-white">{a.user}</td>
                    <td className="py-3.5 px-5 font-sans">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/50 dark:border-indigo-800/50 text-[11px]">
                        {a.domain}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-indigo-600 dark:text-indigo-400 font-semibold">{a.event}</td>
                    <td className="py-3.5 px-5 font-sans text-slate-600 dark:text-slate-300">{a.detail}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
