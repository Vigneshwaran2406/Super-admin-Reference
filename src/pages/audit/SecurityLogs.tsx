import React from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react'

export const SecurityLogs: React.FC = () => {
  const securityEvents = [
    { id: 'SEC-701', time: '12:50:11', event: 'PRIVILEGE_ESCALATION_ATTEMPT_DENIED', actor: 'c.mendoza@acme.com', target: 'SuperAdminRole', severity: 'High', status: 'Blocked' },
    { id: 'SEC-702', time: '11:42:09', event: 'ACCOUNT_LOCKED_FAILED_MFA', actor: 'contractor_temp@acme.com', target: 'MFA Gate', severity: 'Medium', status: 'Locked' },
    { id: 'SEC-703', time: '10:15:33', event: 'RLS_BOUNDARY_VIOLATION_BLOCKED', actor: 'm.bell@acme.com', target: 'Tenant B Database Shard', severity: 'High', status: 'Prevented' },
    { id: 'SEC-704', time: '09:02:18', event: 'PASSWORD_ROTATION_SUCCESS', actor: 'j.miller@acme.com', target: 'User Account', severity: 'Low', status: 'Audited' },
  ]

  return (
    <div>
      <ContextPanel
        title="Security Violation & Policy Logs"
        managedBy="SECURITY ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Tracks privilege escalation attempts, cross-tenant isolation blocks, failed MFA challenges, and credential breaches."
        accessLevel="ALL TENANTS (Full Security Log Access)"
        educationalNotes="Security logs record defensive enforcement events. If an Org Admin or domain user attempts to query data from another tenant, the RLS filter denies the query and creates an immediate entry here."
        tags={['Security Audit', 'RLS Violations', 'Threat Defenses']}
      />

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-5">Event ID & Time</th>
              <th className="py-3.5 px-5">Security Event</th>
              <th className="py-3.5 px-5">Actor</th>
              <th className="py-3.5 px-5">Target Resource</th>
              <th className="py-3.5 px-5">Severity</th>
              <th className="py-3.5 px-5">Action Taken</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {securityEvents.map((s) => (
              <tr key={s.id} className="hover:bg-slate-900/50">
                <td className="py-3.5 px-5">
                  <div className="font-bold text-white">{s.id}</div>
                  <div className="text-[10px] text-slate-400">{s.time}</div>
                </td>
                <td className="py-3.5 px-5 text-rose-400 font-semibold font-sans">{s.event}</td>
                <td className="py-3.5 px-5 font-sans text-slate-200">{s.actor}</td>
                <td className="py-3.5 px-5 text-slate-300">{s.target}</td>
                <td className="py-3.5 px-5 font-sans">
                  <Badge variant={s.severity === 'High' ? 'danger' : s.severity === 'Medium' ? 'warning' : 'info'}>
                    {s.severity}
                  </Badge>
                </td>
                <td className="py-3.5 px-5 font-sans">
                  <Badge variant="success">{s.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
