import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Key, Plus, Shield, RefreshCw } from 'lucide-react'

export const OAuthConfiguration: React.FC = () => {
  const [clients, setClients] = useState([
    { id: 'client_onecloud_web', name: 'One Enterprise Web App', clientId: 'cli_web_98412_ref', scopes: ['openid', 'profile', 'email', 'tenant_read'], type: 'Confidential', status: 'Active' },
    { id: 'client_onecloud_mobile', name: 'One Enterprise Mobile App', clientId: 'cli_mob_55102_ref', scopes: ['openid', 'offline_access', 'push_notif'], type: 'Public (PKCE)', status: 'Active' },
    { id: 'client_bi_service', name: 'Reporting & Analytics Service Client', clientId: 'cli_srv_11094_ref', scopes: ['read:analytics', 'export:reports'], type: 'Service Account', status: 'Active' },
  ])

  return (
    <div>
      <ContextPanel
        title="OAuth 2.0 & OIDC Client Configuration"
        managedBy="SECURITY ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Governs OAuth 2.0 authorization server clients, client credentials, PKCE flows, and scoped access tokens across platform services."
        accessLevel="Platform API Gateway & Microservices Scope"
        educationalNotes="OAuth clients authenticate applications (web apps, mobile apps, service-to-service microservices) to the Spring Security authorization server."
        tags={['OAuth 2.0', 'OIDC Clients', 'Token Scopes']}
      />

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-5">Client Application</th>
              <th className="py-3.5 px-5">Client ID (Generic Ref)</th>
              <th className="py-3.5 px-5">Client Type</th>
              <th className="py-3.5 px-5">Authorized Scopes</th>
              <th className="py-3.5 px-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-slate-900/50">
                <td className="py-3.5 px-5 font-sans font-bold text-white">{c.name}</td>
                <td className="py-3.5 px-5 text-indigo-400">{c.clientId}</td>
                <td className="py-3.5 px-5 text-slate-300">{c.type}</td>
                <td className="py-3.5 px-5 text-slate-400 font-sans">
                  <div className="flex flex-wrap gap-1">
                    {c.scopes.map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">{s}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-5 font-sans"><Badge variant="success">{c.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
