import React from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { mockTenants } from '@/mock'
import { Globe, Server, Activity, ShieldCheck, Database, HardDrive, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const GlobalDashboard: React.FC = () => {
  return (
    <div>
      <ContextPanel
        title="Global Multi-Tenant Platform Dashboard"
        managedBy="SUPER ADMINISTRATOR"
        scope="GLOBAL"
        purpose="Provides macro-level cross-tenant analytics, cloud region latency distribution, global database cluster status, and aggregate platform telemetry."
        accessLevel="ALL TENANTS (Full Global Authority)"
        educationalNotes="The Global Dashboard consolidates capacity planning across all enterprise organizations. Unlike individual tenant dashboards, this view aggregates multitenant infrastructure metrics."
        tags={['Multi-Tenant Global', 'Infrastructure Telemetry', 'Cloud Regions']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Cloud Regions" value="4 Global Regions" icon={<Globe className="w-4 h-4" />} description="us-east-1, us-west-2, eu-central-1, ap-south-1" />
        <StatCard title="Multi-Tenant DB Pools" value="12 Active Shards" icon={<Database className="w-4 h-4" />} change="Optimal saturation" trend="neutral" description="Dedicated + Isolated Schemas" />
        <StatCard title="Total Platform Throughput" value="14,200 req/sec" icon={<Activity className="w-4 h-4" />} change="+12% peak load" trend="up" description="Across all tenant APIs" />
        <StatCard title="Global SLA Compliance" value="99.991%" icon={<ShieldCheck className="w-4 h-4" />} change="Target: 99.95%" trend="up" description="SLA met across all tiers" />
      </div>

      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Server className="w-4 h-4 text-indigo-400" />
          Regional Workload & Tenant Allocation
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-3 px-4">Tenant Name</th>
                <th className="py-3 px-4">Primary Region</th>
                <th className="py-3 px-4">Isolation Mode</th>
                <th className="py-3 px-4">Users</th>
                <th className="py-3 px-4">Storage Quota</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockTenants.map(t => (
                <tr key={t.id} className="hover:bg-slate-900/50">
                  <td className="py-3.5 px-4 font-semibold text-white">{t.name}</td>
                  <td className="py-3.5 px-4 text-slate-300 font-mono">{t.region}</td>
                  <td className="py-3.5 px-4"><Badge variant="tenant">{t.databaseIsolation}</Badge></td>
                  <td className="py-3.5 px-4 font-mono">{t.usersCount}</td>
                  <td className="py-3.5 px-4 text-slate-400">{t.storageUsed}</td>
                  <td className="py-3.5 px-4"><Badge variant="success">{t.status}</Badge></td>
                  <td className="py-3.5 px-4 text-right">
                    <Link to={`/tenants/${t.id}`} className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1">
                      Details <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
