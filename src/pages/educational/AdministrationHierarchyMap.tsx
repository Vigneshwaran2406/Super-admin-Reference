import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { 
  Network, 
  Crown, 
  Building2, 
  Users, 
  Briefcase, 
  ChevronRight, 
  Info, 
  ShieldCheck, 
  Lock, 
  ArrowDown,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  FolderTree,
  DollarSign,
  ShoppingCart,
  Boxes
} from 'lucide-react'

export const AdministrationHierarchyMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>('super-admin')

  const nodeDetails: Record<string, {
    title: string
    category: string
    scope: 'GLOBAL' | 'ORGANIZATION / TENANT' | 'DOMAIN OPERATIONAL'
    authority: string
    description: string
    responsibilities: string[]
    nonResponsibilities: string[]
    exampleRole: string
  }> = {
    platform: {
      title: 'One Enterprise Cloud Platform',
      category: 'Cloud Enterprise Foundation',
      scope: 'GLOBAL',
      authority: 'Root Cloud Infrastructure',
      description: 'The overall SaaS enterprise cloud multi-tenant platform hosting all customer tenants, microservices, polyglot persistence, and security engines.',
      responsibilities: ['Shared infrastructure scaling', 'Multi-tenant routing and isolation', 'Cross-region resilience', 'Global security compliance (SOC 2, ISO 27001)'],
      nonResponsibilities: ['Direct company business records', 'Individual tenant payrolls or sales leads'],
      exampleRole: 'Infrastructure & Platform Engineering',
    },
    'super-admin': {
      title: 'Super Administrator',
      category: 'Top-Level Administrator User Class (1 of 2)',
      scope: 'GLOBAL',
      authority: 'Highest Privilege Level across All Tenants',
      description: 'Governs the entire platform globally. Provisions and isolates customer tenants, configures platform-wide security and licensing, and oversees all system observability.',
      responsibilities: ['Create & provision enterprise tenants', 'Configure global authentication (SSO, OAuth, MFA)', 'Manage platform licenses & feature flags', 'Platform-wide security governance and system audit logs'],
      nonResponsibilities: ['Operating day-to-day HRMS employee leaves', 'Approving sales deals in CRM', 'Managing warehouse stock dispatches'],
      exampleRole: 'Global Root Admin (alex.root@platform.io)',
    },
    tenants: {
      title: 'Enterprise Tenants (e.g., Acme Technologies, Global Logistics)',
      category: 'Multi-Tenant Isolation Boundary',
      scope: 'ORGANIZATION / TENANT',
      authority: 'Tenant Cryptographic & Logical Partition',
      description: 'Isolated enterprise boundary with dedicated/isolated databases, dedicated encryption keys, custom branding, and independent organizational structures.',
      responsibilities: ['Strict data segregation', 'Independent user directories', 'Custom domain & corporate branding', 'Dedicated backup & retention schedules'],
      nonResponsibilities: ['Modifying other tenants', 'Accessing platform infrastructure parameters'],
      exampleRole: 'Tenant Boundary Partition',
    },
    'org-admin': {
      title: 'Organization Administrator',
      category: 'Top-Level Administrator User Class (2 of 2)',
      scope: 'ORGANIZATION / TENANT',
      authority: 'Organization Setup & Governance within Assigned Tenant',
      description: 'Responsible for enterprise organizational structure, user provisioning, departments, branches, and workflow rules. NOT global platform access, and NOT functional manager of every business domain.',
      responsibilities: ['Setup companies, business units, and departments', 'Configure branches, locations, and cost centers', 'Invite & manage tenant users and role assignments', 'Establish company-wide workflow policies'],
      nonResponsibilities: ['Global tenant provisioning', 'Accessing other enterprise tenants', 'Direct operations of all domain modules without RBAC grant'],
      exampleRole: 'Marcus Bell (m.bell@acme.com)',
    },
    'domain-hrms': {
      title: 'HRMS & Payroll Domain',
      category: 'Business Domain Operational Module',
      scope: 'DOMAIN OPERATIONAL',
      authority: 'HR Manager & People Operations',
      description: 'Specialized enterprise domain managing human capital, attendance logs, leave balances, performance reviews, and monthly payroll batches.',
      responsibilities: ['Employee onboarding & recordkeeping', 'Leave application approvals', 'Attendance & biometric sync', 'Payroll generation & tax slips'],
      nonResponsibilities: ['Platform infrastructure management', 'Sales pipeline configuration', 'Cross-tenant user assignments'],
      exampleRole: 'Jessica Miller (HR Manager)',
    },
    'domain-crm': {
      title: 'CRM & Sales Domain',
      category: 'Business Domain Operational Module',
      scope: 'DOMAIN OPERATIONAL',
      authority: 'Sales Manager & Revenue Operations',
      description: 'Specialized enterprise domain managing customer leads, sales opportunities, pipeline stages, quotations, and account contacts.',
      responsibilities: ['Lead qualification & deal tracking', 'Sales quota & commission tracking', 'Customer quotations & contract approvals', 'Sales pipeline analytics'],
      nonResponsibilities: ['Tenant database isolation', 'Employee payroll processing', 'Warehouse stock counts'],
      exampleRole: 'Carlos Mendoza (Sales Manager)',
    },
    'domain-finance': {
      title: 'Finance & Accounting Domain',
      category: 'Business Domain Operational Module',
      scope: 'DOMAIN OPERATIONAL',
      authority: 'Finance Manager & Treasury',
      description: 'Specialized enterprise domain managing the general ledger, accounts payable/receivable, financial audits, bank reconciliations, and tax statements.',
      responsibilities: ['General ledger entries', 'Invoicing and payment processing', 'Fiscal year-end closing', 'Tax compliance & ledger reconciliation'],
      nonResponsibilities: ['Platform server health', 'Sales rep quota assignment', 'Employee performance reviews'],
      exampleRole: 'Patricia Wong (Finance Manager)',
    },
    'domain-procurement': {
      title: 'Procurement & Sourcing Domain',
      category: 'Business Domain Operational Module (ERP)',
      scope: 'DOMAIN OPERATIONAL',
      authority: 'Procurement Manager',
      description: 'Specialized ERP module managing vendor catalogs, purchase requests, RFQs, purchase orders, and supplier contract evaluation.',
      responsibilities: ['Vendor onboarding & scorecards', 'Purchase order approvals', 'Three-way matching with invoices', 'Contract renegotiations'],
      nonResponsibilities: ['Server cluster scaling', 'CRM deal stage transitions'],
      exampleRole: 'Naveen Rao (Procurement Manager)',
    },
    'domain-warehouse': {
      title: 'Warehouse & Inventory Domain',
      category: 'Business Domain Operational Module (ERP)',
      scope: 'DOMAIN OPERATIONAL',
      authority: 'Warehouse Manager',
      description: 'Specialized ERP module managing physical inventory stocks, warehouse bins, stock transfers, dispatch slips, and reorder levels.',
      responsibilities: ['Inventory counting & cycle audits', 'Bin allocation & pick/pack routing', 'Goods receipt & dispatch tracking', 'Damaged stock write-offs'],
      nonResponsibilities: ['Global platform license keys', 'Payroll disbursement'],
      exampleRole: 'Brian Keller (Warehouse Manager)',
    },
  }

  const active = nodeDetails[selectedNode] || nodeDetails['super-admin']

  return (
    <div className="space-y-8 pb-12">
      <ContextPanel
        title="Administration & Responsibility Map"
        managedBy="PLATFORM ARCHITECTURE REFERENCE"
        scope="GLOBAL"
        purpose="Defines the authoritative structural hierarchy from Platform Root down to operational business roles, clearly establishing who manages what."
        accessLevel="All Administrative Roles (Educational Reference Model)"
        educationalNotes="The UI/UX team must understand that the Super Admin is global; the Org Admin is restricted to the assigned tenant; and operational managers operate individual business modules. Org Admins do not automatically run all domain operations without specific RBAC permissions."
        tags={['Educational Architecture', 'Authoritative Model', 'Hierarchy Map']}
      />

      {/* Main Interactive Diagram Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Tree Diagram */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Authoritative Administration Hierarchy
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Click any node in the tree below to inspect governance, scope, and responsibilities.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/50 font-bold uppercase">
              Interactive Tree
            </span>
          </div>

          <div className="space-y-4 text-sm">
            {/* Level 0: Platform */}
            <div 
              onClick={() => setSelectedNode('platform')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedNode === 'platform' 
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-500 ring-2 ring-indigo-500/20' 
                  : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-sm">ONE ENTERPRISE CLOUD PLATFORM</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Global SaaS Infrastructure & Multi-Tenant Core</div>
                  </div>
                </div>
                <Badge variant="global" size="sm">GLOBAL</Badge>
              </div>
            </div>

            {/* Tree Branch Indicator */}
            <div className="flex justify-center -my-2">
              <ArrowDown className="w-4 h-4 text-indigo-500 animate-bounce" />
            </div>

            {/* Level 1: Super Administrator */}
            <div 
              onClick={() => setSelectedNode('super-admin')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedNode === 'super-admin' 
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-500 ring-2 ring-indigo-500/20' 
                  : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-xs">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-base">SUPER ADMINISTRATOR</div>
                    <div className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">Global Platform Control · Cross-Tenant Authority</div>
                  </div>
                </div>
                <Badge variant="global" size="sm">GLOBAL</Badge>
              </div>
            </div>

            {/* Tree Branch Indicator */}
            <div className="flex justify-center -my-2">
              <ArrowDown className="w-4 h-4 text-emerald-500" />
            </div>

            {/* Level 2: Tenants */}
            <div 
              onClick={() => setSelectedNode('tenants')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedNode === 'tenants' 
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/20' 
                  : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-sm">ENTERPRISE TENANTS</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Tenant A (Acme Corp) · Tenant B (Global Logistics)</div>
                  </div>
                </div>
                <Badge variant="tenant" size="sm">TENANT BOUNDARY</Badge>
              </div>
            </div>

            {/* Tree Branch Indicator */}
            <div className="flex justify-center -my-2">
              <ArrowDown className="w-4 h-4 text-emerald-500" />
            </div>

            {/* Level 3: Organization Administrator */}
            <div 
              onClick={() => setSelectedNode('org-admin')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedNode === 'org-admin' 
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/20' 
                  : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-base">ORGANIZATION ADMINISTRATOR</div>
                    <div className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">Organization Setup · User & Department Governance</div>
                  </div>
                </div>
                <Badge variant="tenant" size="sm">ORGANIZATION / TENANT</Badge>
              </div>
            </div>

            {/* Tree Branch to Operational Domains */}
            <div className="pt-2 pl-4 border-l-2 border-dashed border-slate-300 dark:border-slate-700 ml-6 space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2 mb-2">
                <Briefcase className="w-3.5 h-3.5" />
                Business Domains (Operational Ownership)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div 
                  onClick={() => setSelectedNode('domain-hrms')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                    selectedNode === 'domain-hrms' 
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20 font-bold' 
                      : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-bold">
                      <Users className="w-3.5 h-3.5 text-indigo-600" /> HRMS Domain
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300">HR MANAGER</span>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedNode('domain-crm')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                    selectedNode === 'domain-crm' 
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20 font-bold' 
                      : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-bold">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" /> CRM Domain
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300">SALES MANAGER</span>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedNode('domain-finance')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                    selectedNode === 'domain-finance' 
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20 font-bold' 
                      : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-bold">
                      <DollarSign className="w-3.5 h-3.5 text-amber-600" /> Finance Domain
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300">FINANCE MANAGER</span>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedNode('domain-procurement')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                    selectedNode === 'domain-procurement' 
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20 font-bold' 
                      : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-bold">
                      <ShoppingCart className="w-3.5 h-3.5 text-sky-600" /> Procurement (ERP)
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300">PROCUREMENT MGR</span>
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedNode('domain-warehouse')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all text-xs sm:col-span-2 ${
                    selectedNode === 'domain-warehouse' 
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20 font-bold' 
                      : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-bold">
                      <Boxes className="w-3.5 h-3.5 text-pink-600" /> Warehouse & Logistics (ERP)
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300">WAREHOUSE MANAGER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Node Detailed Responsibility Card */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs sticky top-24">
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                {active.category}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {active.title}
              </h3>
            </div>
            <Badge 
              variant={active.scope === 'GLOBAL' ? 'global' : active.scope === 'ORGANIZATION / TENANT' ? 'tenant' : 'domain'}
              size="sm"
            >
              {active.scope}
            </Badge>
          </div>

          <div className="space-y-4 text-xs">
            {/* Authority Pod */}
            <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800">
              <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">
                Authority Scope
              </div>
              <div className="font-bold text-slate-900 dark:text-white mt-1 text-sm">
                {active.authority}
              </div>
              <div className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {active.description}
              </div>
            </div>

            {/* Direct Responsibilities Pod */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <div className="font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Direct Responsibilities (What They Manage)
              </div>
              <ul className="space-y-1.5 text-slate-700 dark:text-emerald-200/90">
                {active.responsibilities.map((r, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Responsibilities Pod */}
            <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
              <div className="font-bold text-rose-800 dark:text-rose-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-2">
                <XCircle className="w-3.5 h-3.5" />
                Explicit Non-Responsibilities (Not In Scope)
              </div>
              <ul className="space-y-1.5 text-slate-700 dark:text-rose-200/90">
                {active.nonResponsibilities.map((nr, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 font-bold">•</span>
                    <span>{nr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example Persona */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
              <span className="text-slate-500 font-medium">Assigned Reference Persona:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{active.exampleRole}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
