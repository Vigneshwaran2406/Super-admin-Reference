import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { 
  Building2, 
  Users, 
  Briefcase, 
  Layers, 
  ChevronRight, 
  UserCheck, 
  CreditCard, 
  Truck, 
  Boxes, 
  Bot, 
  Workflow, 
  Bell, 
  BarChart3, 
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react'

export const OrganizationDomainView: React.FC = () => {
  const [searchParams] = useSearchParams()
  const domainParam = searchParams.get('domain')
  const [activeDomain, setActiveDomain] = useState<string>(domainParam || 'hrms')

  useEffect(() => {
    if (domainParam) {
      setActiveDomain(domainParam)
    }
  }, [domainParam])

  const domains = [
    {
      id: 'hrms',
      name: 'HRMS (Human Resources)',
      manager: 'HR Manager',
      scope: 'ORGANIZATION / HR DOMAIN',
      icon: <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      modules: ['Employee Directory & Profiles', 'Attendance & Biometrics Tracking', 'Leave Applications & Approvals', 'Payroll Batch Processing & Payslips', 'Performance Reviews & Appraisals'],
      description: 'Manages organization employee lifecycle and compensation. Operated by HR Managers, not by general IT or Org Admins without HR credentials.',
      whySeparated: 'Personnel records, disciplinary notes, and confidential salary compensations must not be exposed to IT system administrators or cross-functional managers.',
    },
    {
      id: 'crm',
      name: 'CRM (Customer Relations & Sales)',
      manager: 'Sales Manager',
      scope: 'ORGANIZATION / CRM DOMAIN',
      icon: <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      modules: ['Lead Ingestion & Qualification', 'Deal Pipelines & Opportunities', 'Customer Quotations & Approvals', 'Account Contacts & Activity Logs', 'Sales Commission Tracking'],
      description: 'Drives customer engagement and sales revenue. Operated directly by the Sales Manager and assigned account reps.',
      whySeparated: 'Customer prospect contracts, discount authority, and sensitive pricing matrices require commercial role authority without exposing internal payroll or server topologies.',
    },
    {
      id: 'erp',
      name: 'ERP (Procurement & Sourcing)',
      manager: 'Procurement Manager',
      scope: 'ORGANIZATION / ERP DOMAIN',
      icon: <Truck className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      modules: ['Vendor Catalogs & Onboarding', 'Purchase Requisitions & Purchase Orders', 'Vendor SLA Scorecards', 'Three-Way Invoice Matching', 'Contract Renegotiations'],
      description: 'Coordinates physical supply chain and procurement operations. Operated by specialized Procurement managers.',
      whySeparated: 'Vendor disbursements, procurement tenders, and purchase orders must adhere to separation of duties (SoD) policies to prevent fiscal fraud.',
    },
    {
      id: 'warehouse',
      name: 'ERP (Warehouse & Logistics)',
      manager: 'Warehouse Manager',
      scope: 'ORGANIZATION / WAREHOUSE DOMAIN',
      icon: <Boxes className="w-5 h-5 text-pink-600 dark:text-pink-400" />,
      modules: ['Multi-Warehouse Inventory Stocking', 'Bin Allocation & Pick/Pack Routing', 'Goods Receipts & Inspection Docks', 'Cycle Count Audits & Write-Offs', 'Freight Carrier Dispatch Slips'],
      description: 'Coordinates physical distribution centers, pallet rack bins, and dispatch logistics. Operated by Warehouse Managers.',
      whySeparated: 'Physical fulfillment personnel manage dock inventories without requiring access to company balance sheets or employee personnel files.',
    },
    {
      id: 'finance',
      name: 'Finance & Accounting',
      manager: 'Finance Manager',
      scope: 'ORGANIZATION / FINANCE DOMAIN',
      icon: <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      modules: ['General Ledger & Chart of Accounts', 'Accounts Payable & Vendor Disbursements', 'Accounts Receivable & Customer Billing', 'Bank Feed Reconciliation', 'Fiscal Year-End Closing & Tax Statements'],
      description: 'Maintains enterprise ledgers and fiscal audits. High-security domain requiring certified Finance Manager credentials.',
      whySeparated: 'Fiscal ledgers require strict compliance with SOX / GAAP / IFRS standards, requiring independent accounting authority separate from IT or sales operations.',
    },
    {
      id: 'platform-services',
      name: 'Shared Enterprise Services',
      manager: 'Delegated Specialists & Org Admin',
      scope: 'ORGANIZATION / SHARED SERVICES',
      icon: <Workflow className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      modules: ['Cross-Domain Workflow Automation', 'Executive Reporting & Business Intelligence', 'Enterprise Copilot & AI Platform', 'Multi-Channel Notifications (Email, SMS, Push)', 'Third-Party Integration Hub'],
      description: 'Horizontal capabilities embedded into all business modules to orchestrate multi-step cross-functional processes.',
      whySeparated: 'Shared workflows cross department boundaries to connect approvals between HR, Finance, and Procurement seamlessly.',
    },
  ]

  const current = domains.find(d => d.id === activeDomain) || domains[0]

  return (
    <div className="space-y-8 pb-12">
      <ContextPanel
        title="Organization Domain Relationship View"
        managedBy="ORGANIZATION GOVERNANCE & DOMAIN OPERATIONAL ROLES"
        scope="ORGANIZATION / TENANT"
        purpose="Visualizes how functional business domains (HRMS, CRM, ERP, Finance) operate within an Organization, demonstrating that Org Admin governs structure while Domain Managers operate day-to-day business functions."
        accessLevel="Tenant Scoped · Governed by RBAC Policies"
        educationalNotes="Crucial architectural concept: The Organization Administrator is NOT automatically the operational manager of every business domain. Domain operational roles operate their respective modules, governed by RBAC/scope-dependent policies."
        tags={['Domain Architecture', 'Org Structure', 'Operational Separation']}
      />

      {/* Main Breakdown Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Domain Selector Cards */}
        <div className="lg:col-span-5 space-y-3">
          {/* Tenant Context Pill */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs mb-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Assigned Tenant Boundary
                </div>
                <div className="text-base font-extrabold text-slate-900 dark:text-white">
                  Acme Technologies Inc.
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Structural Governance: Organization Administrator (Marcus Bell)
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 pt-1 flex items-center justify-between">
            <span>Operational Business Domains</span>
            <span className="text-[10px] font-mono font-normal">Click to Inspect</span>
          </div>

          {domains.map((dom) => {
            const isSelected = dom.id === activeDomain
            return (
              <div
                key={dom.id}
                onClick={() => setActiveDomain(dom.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected 
                    ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 shrink-0">
                    {dom.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {dom.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      {dom.manager}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
              </div>
            )
          })}
        </div>

        {/* Right: Detailed Domain Exploration */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                Domain Specification & Boundary
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                {current.name}
              </h3>
            </div>
            <Badge variant="domain" size="sm">
              {current.manager}
            </Badge>
          </div>

          <div className="space-y-5 text-xs">
            {/* Description Card */}
            <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800">
              <div className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                Domain Operational Purpose
              </div>
              <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Why Separated from Org Admin Banner */}
            <div className="p-4 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
              <div className="font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider text-[10px] flex items-center gap-1.5 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Why This Domain Is Separated From Org Admin
              </div>
              <p className="text-slate-700 dark:text-purple-200/90 leading-relaxed">
                {current.whySeparated}
              </p>
            </div>

            {/* Functional Modules List */}
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Standard Domain Modules Operated By {current.manager}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.modules.map((mod, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-2.5 text-slate-800 dark:text-slate-200 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Governance Relationship Box */}
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-700 dark:text-indigo-200">
              <div>
                <div className="font-bold text-indigo-950 dark:text-indigo-300">
                  Governance Hierarchy
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Super Admin (Platform) → Org Admin (Tenant Structure) → {current.manager} (Operations)
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                REFERENCE DATA • UI/UX SIMULATION
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
