import React from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Sliders, Settings, Globe, DollarSign, Clock, Mail, Smartphone, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const SystemConfigDashboard: React.FC = () => {
  return (
    <div>
      <ContextPanel
        title="System Configuration Dashboard"
        managedBy="SUPER ADMINISTRATOR (Global) • SYSTEM ADMINISTRATOR (Specialized RBAC Role)"
        scope="GLOBAL"
        purpose="Provides central operational control over platform-wide infrastructure parameters, internationalization, multi-currency engines, and notification communication relays."
        accessLevel="ALL TENANTS (Super Admin) • Delegated System Admin RBAC"
        educationalNotes="System Administrator is a specialized administrative RBAC role rather than a top-level user class. Configurations defined here establish platform-wide defaults inherited across all tenants."
        tags={['System Center', 'Specialized RBAC', 'Global Parameters']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Default Platform Locale" value="en-US (UTC)" icon={<Globe className="w-4 h-4" />} description="Fallback localization profile" />
        <StatCard title="Base Operating Currency" value="USD ($)" icon={<DollarSign className="w-4 h-4" />} description="Master ledger standard" />
        <StatCard title="Email Delivery Relay" value="Generic SMTP Relay" icon={<Mail className="w-4 h-4" />} description="99.8% delivery success rate" />
        <StatCard title="SMS OTP Gateway" value="Generic SMS Relay" icon={<Smartphone className="w-4 h-4" />} description="Global carrier routing" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'General Settings', to: '/system/general', desc: 'Platform naming, support emails, and system banner notices.', icon: <Settings className="w-4 h-4 text-sky-400" /> },
          { title: 'Localization & Languages', to: '/system/localization', desc: 'Supported language translations, RTL layout, and date formats.', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
          { title: 'Currency & Exchange Rates', to: '/system/currency', desc: 'Master currency, multi-currency conversion rates, and format rules.', icon: <DollarSign className="w-4 h-4 text-indigo-400" /> },
          { title: 'Time Zone & Daylight Savings', to: '/system/timezone', desc: 'UTC storage normalization and regional display time offsets.', icon: <Clock className="w-4 h-4 text-amber-400" /> },
          { title: 'Email Configuration', to: '/system/email', desc: 'Generic SMTP / Email Relay configuration and DKIM/SPF status.', icon: <Mail className="w-4 h-4 text-purple-400" /> },
          { title: 'SMS Configuration', to: '/system/sms', desc: 'Generic SMS Gateway credentials and OTP message templates.', icon: <Smartphone className="w-4 h-4 text-rose-400" /> },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">{item.icon}</div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
              </div>
              <h4 className="font-bold text-white text-sm group-hover:text-sky-300">{item.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-sky-400">
              Manage Parameter →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
