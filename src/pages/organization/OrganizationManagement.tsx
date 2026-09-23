import React from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { mockOrganizations, mockDepartments, mockBranches, mockCostCenters } from '@/mock'
import { Building2, Boxes, FolderTree, MapPin, DollarSign, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const OrganizationManagement: React.FC = () => {
  return (
    <div>
      <ContextPanel
        title="Organization Management Overview"
        managedBy="ORGANIZATION ADMINISTRATOR (Primary) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="ORGANIZATION / TENANT"
        purpose="Provides the structural governance framework for configuring enterprise companies, business units, departments, regional branches, and cost centers."
        accessLevel="Tenant-Scoped (Organization Admin) • Full Platform Oversight (Super Admin)"
        educationalNotes="Organization setup belongs to the Organization Administrator for the assigned tenant. Super Admin possesses global oversight but does not manage day-to-day organizational hierarchy."
        tags={['Organization Structure', 'Company Setup', 'Tenant Scope']}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Companies / Entities" value="3 Registered" icon={<Building2 className="w-4 h-4" />} description="Acme Enterprise + Subs" />
        <StatCard title="Active Departments" value="6 Departments" icon={<FolderTree className="w-4 h-4" />} description="HR, Sales, Fin, Proc, WH, Eng" />
        <StatCard title="Regional Branches" value="3 Operating Offices" icon={<MapPin className="w-4 h-4" />} description="Austin, London, Singapore" />
        <StatCard title="Budget Cost Centers" value="4 Active Codes" icon={<DollarSign className="w-4 h-4" />} description="R&D, Sales, HR, Supply" />
      </div>

      {/* Quick Access to Org Setup Screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'Company Setup', to: '/organization/company-setup', desc: 'Legal entity profiles, tax identifiers, and headquarters registration.', icon: <Building2 className="w-5 h-5 text-emerald-400" /> },
          { title: 'Business Units', to: '/organization/business-units', desc: 'Divisional breakdown, P&L reporting units, and operational divisions.', icon: <Boxes className="w-5 h-5 text-indigo-400" /> },
          { title: 'Departments', to: '/organization/departments', desc: 'Organizational department tree, department managers, and headcount.', icon: <FolderTree className="w-5 h-5 text-amber-400" /> },
          { title: 'Branches', to: '/organization/branches', desc: 'Regional branch offices, facilities, and branch manager assignments.', icon: <MapPin className="w-5 h-5 text-rose-400" /> },
          { title: 'Cost Centers', to: '/organization/cost-centers', desc: 'Financial cost center codes, budget allocations, and expense approvals.', icon: <DollarSign className="w-5 h-5 text-sky-400" /> },
          { title: 'Locations', to: '/organization/locations', desc: 'Physical sites, warehouses, data centers, and geographic coordinates.', icon: <MapPin className="w-5 h-5 text-purple-400" /> },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              Configure Structure →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
