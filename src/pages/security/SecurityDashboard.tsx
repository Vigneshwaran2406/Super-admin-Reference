import React from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { mockSecurityAlertsList } from '@/mock'
import { Shield, ShieldAlert, Key, Fingerprint, Lock, Smartphone, Clock, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const SecurityDashboard: React.FC = () => {
  return (
    <div>
      <ContextPanel
        title="Authentication & Security Dashboard"
        managedBy="SUPER ADMINISTRATOR (Global) • SECURITY ADMINISTRATOR (Specialized RBAC Role)"
        scope="GLOBAL"
        purpose="Provides central operational oversight for platform-wide identity security, authentication policies, threat alerts, and device compliance."
        accessLevel="ALL TENANTS (Super Admin) • Delegated Security Policies"
        educationalNotes="Security Administrator is a specialized RBAC role rather than a top-level user class. Security policies can be enforced globally by Super Admin, or configured per tenant by delegated administrators."
        tags={['Security Center', 'Specialized RBAC', 'Identity Protection']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Platform Security Score" value="96 / 100" change="Optimal Posture" trend="up" icon={<Shield className="w-4 h-4" />} description="CIS benchmark aligned" />
        <StatCard title="Active Security Alerts" value="3 Under Review" change="0 Critical" trend="neutral" icon={<ShieldAlert className="w-4 h-4" />} description="Threat detection engine" />
        <StatCard title="MFA Enforcement Rate" value="98.4%" change="+2.1% this week" trend="up" icon={<Fingerprint className="w-4 h-4" />} description="Mandatory for admin classes" />
        <StatCard title="Concurrent User Sessions" value="1,420 Active" change="0 session hijacks" trend="neutral" icon={<Clock className="w-4 h-4" />} description="Spring Session Redis pool" />
      </div>

      {/* Security Hub Modules Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Login History', to: '/security/login-history', desc: 'Audit authentication attempts and IP geolocation.', icon: <Clock className="w-4 h-4 text-indigo-400" /> },
          { title: 'SSO Configuration', to: '/security/sso', desc: 'Generic Identity Provider (SAML 2.0 / OIDC mock reference).', icon: <Fingerprint className="w-4 h-4 text-emerald-400" /> },
          { title: 'OAuth Clients', to: '/security/oauth', desc: 'OAuth 2.0 client credentials and redirect URI management.', icon: <Key className="w-4 h-4 text-purple-400" /> },
          { title: 'MFA Policies', to: '/security/mfa', desc: 'Multi-factor authentication rules (TOTP, Hardware Key).', icon: <Lock className="w-4 h-4 text-sky-400" /> },
          { title: 'Password Policy', to: '/security/password-policy', desc: 'Complexity rules, expiration intervals, and history limits.', icon: <Lock className="w-4 h-4 text-amber-400" /> },
          { title: 'Account Lockout', to: '/security/account-lockout', desc: 'Brute-force lockout thresholds and unlock queue.', icon: <Shield className="w-4 h-4 text-rose-400" /> },
          { title: 'Security Alerts', to: '/security/alerts', desc: 'Real-time suspicious login anomalies and threat mitigations.', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
          { title: 'Device Management', to: '/security/devices', desc: 'Enrolled employee devices, certificates, and remote wipe.', icon: <Smartphone className="w-4 h-4 text-indigo-400" /> },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-rose-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">{item.icon}</div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-400" />
              </div>
              <h4 className="font-bold text-white text-xs group-hover:text-rose-300">{item.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Live Threat Detection Feed */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 text-xs">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          Real-Time Anomaly & Threat Detection
        </h3>
        <div className="space-y-3">
          {mockSecurityAlertsList.map(alt => (
            <div key={alt.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 font-bold text-white">
                  <span>{alt.title}</span>
                  <Badge variant={alt.severity === 'Medium' ? 'warning' : 'info'}>{alt.severity}</Badge>
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  User: <span className="text-slate-200 font-mono">{alt.user}</span> • Origin: {alt.location} ({alt.ip}) • {alt.timestamp}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono text-[11px]">{alt.action}</span>
                <Badge variant="neutral">{alt.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
