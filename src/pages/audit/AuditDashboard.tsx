import React from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { FileText, Activity, ShieldAlert, FileSpreadsheet, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const AuditDashboard: React.FC = () => {
  return (
    <div>
      <ContextPanel
        title="Audit & Compliance Governance Dashboard"
        managedBy="SUPER ADMINISTRATOR (Global) • ORGANIZATION ADMINISTRATOR (Tenant Scoped)"
        scope="GLOBAL"
        purpose="Provides tamper-evident record keeping, operational user activity logging, security violation traces, and automated regulatory compliance reports."
        accessLevel="ALL TENANTS (Full Audit Oversight) • Scoped by Permission"
        educationalNotes="Audit logs record every state-changing API call. Super Administrators observe platform-wide events, while Organization Administrators only review events occurring within their assigned tenant boundary."
        tags={['Audit Trail', 'Compliance', 'Tamper-Evident']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Tamper-Evident Audit Records" value="1.48M Records" icon={<FileText className="w-4 h-4" />} description="Immutable WORM storage" />
        <StatCard title="Logged Activities Today" value="84,210 Events" change="+4.2% activity" trend="up" icon={<Activity className="w-4 h-4" />} description="Synchronous Kafka pipeline" />
        <StatCard title="Security Log Violations" value="14 Events" change="Zero critical breaches" trend="neutral" icon={<ShieldAlert className="w-4 h-4" />} description="Failed auth & RLS checks" />
        <StatCard title="Compliance Readiness" value="SOC 2 Type II" change="Audit ready" trend="up" icon={<FileSpreadsheet className="w-4 h-4" />} description="ISO 27001 & GDPR aligned" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Audit Logs', to: '/audit/logs', desc: 'Tamper-evident system audit trail with before/after state diffs.', icon: <FileText className="w-4 h-4 text-amber-400" /> },
          { title: 'Activity Logs', to: '/audit/activity', desc: 'Day-to-day user interactions, document exports, and navigations.', icon: <Activity className="w-4 h-4 text-sky-400" /> },
          { title: 'Security Logs', to: '/audit/security', desc: 'Privilege escalation, account lockouts, and authentication failures.', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
          { title: 'Compliance Reports', to: '/audit/compliance', desc: 'Pre-formatted exportable compliance readiness packages.', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">{item.icon}</div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
              </div>
              <h4 className="font-bold text-white text-xs group-hover:text-amber-300">{item.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
