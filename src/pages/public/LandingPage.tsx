import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Shield, 
  Building2, 
  Users, 
  Briefcase, 
  DollarSign, 
  ShoppingCart, 
  Boxes, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  Crown, 
  Globe, 
  Lock, 
  Menu, 
  X, 
  Workflow, 
  Compass, 
  Eye, 
  Activity, 
  Check,
  Building,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { usePerspective } from '@/context/PerspectiveContext'

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePreviewRole, setActivePreviewRole] = useState<'super-admin' | 'org-admin' | 'hr-manager' | 'sales-manager' | 'finance-manager' | 'procurement-manager' | 'warehouse-manager'>('super-admin')
  const { setPerspective } = usePerspective()

  // 7 role previews for "Every Role Sees What Matters to Them"
  const rolePreviews = [
    {
      id: 'super-admin' as const,
      label: 'Super Administrator',
      scope: 'GLOBAL',
      badgeVariant: 'global' as const,
      tagline: 'Global platform authority & multi-tenant operations',
      description: 'Oversees cloud infrastructure, tenant provisioning, cross-organization security policies, and global system health.',
      kpis: [
        { label: 'Provisioned Tenants', val: '5 Active' },
        { label: 'Total Enterprise Users', val: '18,450' },
        { label: 'Cloud Uptime', val: '99.99%' },
      ],
      viewSummary: 'Cross-tenant oversight, WORM audit trails, global feature toggles, licensing quotas.',
    },
    {
      id: 'org-admin' as const,
      label: 'Organization Administrator',
      scope: 'ORGANIZATION / TENANT',
      badgeVariant: 'tenant' as const,
      tagline: 'Organization-level administration within assigned tenant',
      description: 'Manages company structure, branches, departments, user assignments, and tenant configuration for Acme Enterprise.',
      kpis: [
        { label: 'Tenant Headcount', val: '1,240 Users' },
        { label: 'Business Units', val: '3 Units' },
        { label: 'Active Departments', val: '6 Depts' },
      ],
      viewSummary: 'Organization boundary controls, department user bindings, tenant audit logs.',
    },
    {
      id: 'hr-manager' as const,
      label: 'HR Manager',
      scope: 'DOMAIN OPERATIONAL',
      badgeVariant: 'domain' as const,
      tagline: 'HRMS business-domain operational owner',
      description: 'Operates day-to-day HR workflows: employee directory, attendance tracking, leave requests, and payroll processing.',
      kpis: [
        { label: 'Department Workforce', val: '412 Staff' },
        { label: 'Leave Pending', val: '14 Requests' },
        { label: 'Payroll Status', val: 'Ready for Review' },
      ],
      viewSummary: 'HRMS operational console, employee lifecycle, compensation and benefits.',
    },
    {
      id: 'sales-manager' as const,
      label: 'Sales Manager',
      scope: 'DOMAIN OPERATIONAL',
      badgeVariant: 'domain' as const,
      tagline: 'CRM business-domain operational owner',
      description: 'Executes commercial operations: pipeline deals, lead ingestion, quotations, customer communications, and revenue quotas.',
      kpis: [
        { label: 'Active Pipeline', val: '$2.84M' },
        { label: 'Qualified Leads', val: '24 Deals' },
        { label: 'Win Rate', val: '68.4%' },
      ],
      viewSummary: 'CRM pipeline, customer account contracts, discount authorizations, quotes.',
    },
    {
      id: 'finance-manager' as const,
      label: 'Finance Manager',
      scope: 'DOMAIN OPERATIONAL',
      badgeVariant: 'domain' as const,
      tagline: 'Finance & Accounting operational owner',
      description: 'Governs fiscal transactions: accounts receivable/payable, GL reconciliation, cost center allocations, and invoice approvals.',
      kpis: [
        { label: 'Net Receivables', val: '$4.18M' },
        { label: 'Pending Payables', val: '$1.42M' },
        { label: 'GL Reconciliation', val: '99.4% Balanced' },
      ],
      viewSummary: 'General ledger, fiscal compliance, cost center disbursements, cash flow.',
    },
    {
      id: 'procurement-manager' as const,
      label: 'Procurement Manager',
      scope: 'DOMAIN OPERATIONAL',
      badgeVariant: 'domain' as const,
      tagline: 'Sourcing & Purchasing operational owner',
      description: 'Manages supplier catalogs, RFQs, purchase requisitions, PO disbursements, and vendor delivery SLA evaluations.',
      kpis: [
        { label: 'Active Requisitions', val: '14 Orders' },
        { label: 'Vetted Suppliers', val: '28 Vendors' },
        { label: 'SLA Fulfillment', val: '98.2%' },
      ],
      viewSummary: 'Purchase order workflows, vendor scorecards, goods receipt matching.',
    },
    {
      id: 'warehouse-manager' as const,
      label: 'Warehouse Manager',
      scope: 'DOMAIN OPERATIONAL',
      badgeVariant: 'domain' as const,
      tagline: 'Inventory & Logistics operational owner',
      description: 'Operates physical warehouse stock: bin storage capacities, inventory cycle counts, stock movements, and freight dispatch.',
      kpis: [
        { label: 'Stock Capacity', val: '4,820 SKUs' },
        { label: 'Bin Utilization', val: '91.2%' },
        { label: 'Pending Dispatch', val: '8 Shipments' },
      ],
      viewSummary: 'Bin allocations, SKU batch movements, storage capacity telemetry.',
    },
  ]

  const activeRoleData = rolePreviews.find(r => r.id === activePreviewRole) || rolePreviews[0]

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* ========================================================================= */}
      {/* 1. PUBLIC NAVIGATION HEADER                                               */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-slate-900 leading-tight">
                One Enterprise
              </div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-indigo-600 font-bold">
                Cloud Platform
              </div>
            </div>
          </Link>

          {/* Center Navigation Links (Public) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#platform" className="hover:text-indigo-600 transition-colors">Platform</a>
            <a href="#domains" className="hover:text-indigo-600 transition-colors">Business Domains</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#roles" className="hover:text-indigo-600 transition-colors">Roles & Access</a>
          </nav>

          {/* Right Action Buttons: Login & Register */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              Register Organization
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-6 py-5 space-y-4 shadow-lg animate-fade-in">
            <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-700">
              <a 
                href="#platform" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-indigo-600"
              >
                Platform
              </a>
              <a 
                href="#domains" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-indigo-600"
              >
                Business Domains
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-indigo-600"
              >
                How It Works
              </a>
              <a 
                href="#roles" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-indigo-600"
              >
                Roles & Access
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <Link
                to="/login"
                className="w-full text-center py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700"
              >
                Register Organization
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="pt-20 pb-28 px-6 bg-gradient-to-b from-slate-50/70 via-white to-white">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ONE ENTERPRISE CLOUD PLATFORM</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            One Platform. Every Enterprise Function. <span className="text-indigo-600">Connected.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Bring your organization's people, processes, operations and business domains together in one connected enterprise workspace.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              Sign In to Console <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold transition-all"
            >
              Register Organization
            </Link>
          </div>

          {/* Subtle Supporting Trust Line */}
          <div className="pt-3 text-xs text-slate-500 font-medium flex items-center justify-center gap-3">
            <span>Secure enterprise access</span>
            <span>•</span>
            <span>Organization-aware</span>
            <span>•</span>
            <span>Role-based experience</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PLATFORM ECOSYSTEM VISUAL                                              */}
      {/* Elegant architectural representation of connected enterprise functions    */}
      {/* ========================================================================= */}
      <section id="platform" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/30 p-8 sm:p-12 shadow-xs space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase font-bold tracking-wider text-indigo-600">
              Architectural Topology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              The Connected Enterprise Nervous System
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              A unified platform backbone connecting platform governance, organization boundaries, and operational business suites.
            </p>
          </div>

          {/* Central Platform Diagram Visual */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Top Tier: Global Authority Node */}
            <div className="p-5 rounded-2xl border-2 border-indigo-500/80 bg-white shadow-xs text-center max-w-md mx-auto relative">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mx-auto mb-2">
                <Crown className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
                Platform Administration
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">
                One Enterprise Platform Root
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Global governance • Multi-tenant isolation • Platform infrastructure
              </div>
            </div>

            {/* Connecting Vertical Trunk */}
            <div className="w-0.5 h-8 bg-indigo-200 mx-auto" />

            {/* Middle Tier: Organization / Tenant Node */}
            <div className="p-5 rounded-2xl border border-slate-300 bg-white shadow-xs text-center max-w-md mx-auto">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider">
                Organization Boundary
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-0.5">
                Enterprise Tenant Workspace
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Dedicated company units • Departments • Branches • User bindings
              </div>
            </div>

            {/* Connecting Vertical Trunk */}
            <div className="w-0.5 h-8 bg-indigo-200 mx-auto" />

            {/* Bottom Tier: Connected Business Domains Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'HRMS', sub: 'People Ops', icon: Users, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
                { name: 'CRM', sub: 'Commercial Sales', icon: Briefcase, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
                { name: 'Finance', sub: 'Accounting & GL', icon: DollarSign, color: 'text-purple-600 bg-purple-50 border-purple-100' },
                { name: 'Procurement', sub: 'Vendor Sourcing', icon: ShoppingCart, color: 'text-sky-600 bg-sky-50 border-sky-100' },
                { name: 'Warehouse', sub: 'Inventory & Stock', icon: Boxes, color: 'text-amber-600 bg-amber-50 border-amber-100' },
              ].map((domain, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-2xs hover:border-indigo-300 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg ${domain.color} border flex items-center justify-center mx-auto mb-2`}>
                    <domain.icon className="w-4 h-4" />
                  </div>
                  <div className="font-extrabold text-sm text-slate-900">{domain.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{domain.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BRIDGE SECTION: BUILT AROUND YOUR ENTERPRISE                           */}
      {/* ========================================================================= */}
      <section className="py-20 px-6 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase font-bold tracking-wider text-indigo-600">
              Organizational Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Built Around Your Enterprise
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Every layer of the platform is designed to align with how modern enterprises structure authority and operations.
            </p>
          </div>

          {/* Visual Progression Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Platform Administration',
                desc: 'Governs global cloud infrastructure, database partitioning, and enterprise licenses across all tenants.',
                role: 'Super Administrator',
              },
              {
                step: '02',
                title: 'Organizations / Tenants',
                desc: 'Cryptographically separated enterprise workspaces hosting companies, business units, and branches.',
                role: 'Tenant Isolation',
              },
              {
                step: '03',
                title: 'Organization Administration',
                desc: 'Manages departmental hierarchies, employee user bindings, and local policies within the tenant.',
                role: 'Organization Administrator',
              },
              {
                step: '04',
                title: 'Business Domains',
                desc: 'Dedicated functional suites (HRMS, CRM, Finance, Procurement, Warehouse) operating within the tenant.',
                role: 'Domain Enclosure',
              },
              {
                step: '05',
                title: 'Domain Operational Roles',
                desc: 'Specialized managers execute daily operations and workflows within their assigned functional scope.',
                role: 'Domain Managers',
              },
            ].map((node, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-600 mb-2">
                    STEP {node.step}
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-2">
                    {node.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono font-semibold text-slate-500">
                  {node.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ROLE & RESPONSIBILITY INTRODUCTION                                     */}
      {/* Clear 3-tier card model: Super Admin, Org Admin, Domain Managers           */}
      {/* ========================================================================= */}
      <section id="roles" className="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <Badge variant="neutral" size="sm">GOVERNANCE & RESPONSIBILITY</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            One Platform. Clear Responsibilities.
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            The platform explicitly separates global platform authority from organization-level administration and operational domain management.
          </p>
        </div>

        {/* 3 Large Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Super Administrator */}
          <div className="rounded-3xl border-2 border-indigo-200 bg-white p-8 shadow-xs flex flex-col justify-between hover:border-indigo-400 transition-colors">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="global" size="sm">GLOBAL</Badge>
                <Crown className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Super Administrator
                </h3>
                <div className="text-xs font-mono font-semibold text-indigo-600 mt-1">
                  Global Platform Authority
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Controls the enterprise platform across all provisioned organizations and cloud infrastructure.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                {[
                  'Cloud platform governance',
                  'Multi-tenant lifecycle provisioning',
                  'Global runtime configuration',
                  'Enterprise license quotas',
                  'Tamper-evident WORM audit ledger',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              Scope: All enterprise tenants globally
            </div>
          </div>

          {/* Card 2: Organization Administrator */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="tenant" size="sm">ORGANIZATION / TENANT</Badge>
                <Building2 className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Organization Administrator
                </h3>
                <div className="text-xs font-mono font-semibold text-slate-600 mt-1">
                  Organization-Level Administration
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Manages organizational structures, employee memberships, and administrative setup within the assigned tenant.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                {[
                  'Company and business unit setup',
                  'Department & branch configuration',
                  'Tenant user management & role bindings',
                  'Organization security references',
                  'Tenant activity & compliance reports',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              Scope: Assigned tenant boundary
            </div>
          </div>

          {/* Card 3: Domain Managers */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="domain" size="sm">DOMAIN OPERATIONAL</Badge>
                <Layers className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Domain Managers
                </h3>
                <div className="text-xs font-mono font-semibold text-emerald-600 mt-1">
                  Business-Domain Operations
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Execute day-to-day functional workflows within their respective operational business domains.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                {[
                  'HRMS: HR Manager (Workforce & Payroll)',
                  'CRM: Sales Manager (Pipeline & Deals)',
                  'Finance: Finance Manager (Ledger & GL)',
                  'Procurement: Procurement Manager (Vendors & POs)',
                  'Warehouse: Warehouse Manager (Inventory & Stock)',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
              Scope: Specific business domain workflows
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. BUSINESS DOMAINS SECTION                                               */}
      {/* "Everything Your Enterprise Runs. In One Platform."                       */}
      {/* ========================================================================= */}
      <section id="domains" className="py-24 px-6 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <Badge variant="neutral" size="sm">CONNECTED BUSINESS SUITES</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Everything Your Enterprise Runs. In One Platform.
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              All five core business operational suites connect directly into the central organization model, sharing common directory, audit, and security foundations.
            </p>
          </div>

          {/* 5 Spacious Domain Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. HRMS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xs hover:shadow-sm hover:border-indigo-300 transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">HRMS</h3>
                <div className="text-xs font-semibold text-indigo-600 font-mono">People & Workforce</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manages organizational headcount, employee profiles, attendance logs, leave balances, performance evaluations, and payroll processing batches.
              </p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Operational Role:</span>
                <span className="font-bold text-slate-800">HR Manager</span>
              </div>
            </div>

            {/* 2. CRM */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xs hover:shadow-sm hover:border-emerald-300 transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">CRM</h3>
                <div className="text-xs font-semibold text-emerald-600 font-mono">Customer & Sales Operations</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tracks sales pipeline opportunities, inbound lead qualification, customer quotations, contract renegotiations, and territory commission targets.
              </p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Operational Role:</span>
                <span className="font-bold text-slate-800">Sales Manager</span>
              </div>
            </div>

            {/* 3. Finance */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xs hover:shadow-sm hover:border-purple-300 transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Finance</h3>
                <div className="text-xs font-semibold text-purple-600 font-mono">Finance & Accounting</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enforces financial integrity: general ledger accounts, receivable/payable invoices, bank reconciliation, expense audits, and cost center budgets.
              </p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Operational Role:</span>
                <span className="font-bold text-slate-800">Finance Manager</span>
              </div>
            </div>

            {/* 4. Procurement */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xs hover:shadow-sm hover:border-sky-300 transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Procurement</h3>
                <div className="text-xs font-semibold text-sky-600 font-mono">Sourcing & Purchasing</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coordinates supply chain sourcing: vendor onboarding catalogs, purchase requisitions, RFQs, formal purchase orders, and supplier fulfillment SLAs.
              </p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Operational Role:</span>
                <span className="font-bold text-slate-800">Procurement Manager</span>
              </div>
            </div>

            {/* 5. Warehouse */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xs hover:shadow-sm hover:border-amber-300 transition-all space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
                <Boxes className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Warehouse</h3>
                <div className="text-xs font-semibold text-amber-600 font-mono">Inventory & Warehouse Operations</div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitors physical warehouse facilities: stock bin allocations, batch tracking, cycle count audits, pick/pack logistics, and inbound/outbound freight.
              </p>
              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                <span>Operational Role:</span>
                <span className="font-bold text-slate-800">Warehouse Manager</span>
              </div>
            </div>

            {/* Integration Card */}
            <div className="rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wide">
                  Single Platform Architecture
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                  Connected, Not Siloed
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Unlike disparate SaaS tools that require fragile point-to-point APIs, all domains run on a unified data layer inside the enterprise organization.
                </p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                Explore Console Workspace →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. HOW THE PLATFORM FITS TOGETHER                                         */}
      {/* Authoritative step-down relationship visualization                        */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-24 px-6 max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <Badge variant="neutral" size="sm">HIERARCHICAL STRUCTURE</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How the Platform Fits Together
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            A clear line of authority from the global cloud platform down to everyday domain business operations.
          </p>
        </div>

        {/* Vertical Stepped Stack Diagram */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {/* Level 1 */}
          <div className="p-6 rounded-2xl border-2 border-indigo-500 bg-indigo-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-indigo-600 uppercase">Tier 1 · Platform Root</div>
                <div className="text-base font-extrabold text-slate-900">One Enterprise Cloud Platform</div>
              </div>
            </div>
            <Badge variant="global" size="sm">ROOT SYSTEM</Badge>
          </div>

          <div className="flex justify-center text-slate-400">
            <div className="w-0.5 h-6 bg-slate-200" />
          </div>

          {/* Level 2 */}
          <div className="p-6 rounded-2xl border border-slate-300 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-slate-600 uppercase">Tier 2 · Global Authority</div>
                <div className="text-base font-extrabold text-slate-900">Super Administrator — Global</div>
                <div className="text-xs text-slate-500 mt-0.5">Global governance across all enterprise tenants</div>
              </div>
            </div>
            <Badge variant="global" size="sm">GLOBAL SCOPE</Badge>
          </div>

          <div className="flex justify-center text-slate-400">
            <div className="w-0.5 h-6 bg-slate-200" />
          </div>

          {/* Level 3 */}
          <div className="p-6 rounded-2xl border border-slate-300 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 border border-slate-200">
                3
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-slate-600 uppercase">Tier 3 · Organization Boundary</div>
                <div className="text-base font-extrabold text-slate-900">Organizations / Enterprise Tenants</div>
                <div className="text-xs text-slate-500 mt-0.5">Isolated company namespaces (e.g. Acme Enterprise)</div>
              </div>
            </div>
            <Badge variant="tenant" size="sm">TENANT SCOPE</Badge>
          </div>

          <div className="flex justify-center text-slate-400">
            <div className="w-0.5 h-6 bg-slate-200" />
          </div>

          {/* Level 4 */}
          <div className="p-6 rounded-2xl border border-slate-300 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 border border-slate-200">
                4
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-slate-600 uppercase">Tier 4 · Tenant Administration</div>
                <div className="text-base font-extrabold text-slate-900">Organization Administrator — Tenant</div>
                <div className="text-xs text-slate-500 mt-0.5">Manages organization units, departments, branches, and users</div>
              </div>
            </div>
            <Badge variant="tenant" size="sm">ORGANIZATION BOUNDED</Badge>
          </div>

          <div className="flex justify-center text-slate-400">
            <div className="w-0.5 h-6 bg-slate-200" />
          </div>

          {/* Level 5 */}
          <div className="p-6 rounded-2xl border border-slate-300 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center shrink-0 border border-slate-200">
                5
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-slate-600 uppercase">Tier 5 · Business Domains</div>
                <div className="text-base font-extrabold text-slate-900">HRMS • CRM • Finance • Procurement • Warehouse</div>
                <div className="text-xs text-slate-500 mt-0.5">Functional operational suites living under the organization</div>
              </div>
            </div>
            <Badge variant="domain" size="sm">BUSINESS DOMAINS</Badge>
          </div>

          <div className="flex justify-center text-slate-400">
            <div className="w-0.5 h-6 bg-slate-200" />
          </div>

          {/* Level 6 */}
          <div className="p-6 rounded-2xl border border-emerald-300 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                6
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-emerald-700 uppercase">Tier 6 · Operational Execution</div>
                <div className="text-base font-extrabold text-slate-900">Domain Operational Roles</div>
                <div className="text-xs text-slate-600 mt-0.5">HR Manager, Sales Manager, Finance Manager, Procurement, Warehouse</div>
              </div>
            </div>
            <Badge variant="domain" size="sm">DOMAIN OPERATIONAL</Badge>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ROLE-AWARE EXPERIENCE SECTION                                          */}
      {/* "Every Role Sees What Matters to Them." UI/UX Previews                    */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 bg-slate-50/60 border-y border-slate-100">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <Badge variant="neutral" size="sm">ROLE-AWARE ADAPTATION</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Every Role Sees What Matters to Them.
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
              The platform automatically adapts its navigation, metrics, telemetry, and actions to the user's authoritative scope.
            </p>
          </div>

          {/* Role Preview Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {rolePreviews.map((role) => (
              <button
                key={role.id}
                onClick={() => setActivePreviewRole(role.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activePreviewRole === role.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          {/* Active Role Preview Card Display */}
          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={activeRoleData.badgeVariant} size="sm">
                    {activeRoleData.scope}
                  </Badge>
                  <span className="text-xs text-slate-400 font-mono">Simulated Perspective</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  {activeRoleData.label} Workspace
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {activeRoleData.tagline}
                </p>
              </div>

              <Link
                to="/login"
                onClick={() => setPerspective(activeRoleData.id)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5"
              >
                Simulate {activeRoleData.label} →
              </Link>
            </div>

            {/* KPI Cards for the Role */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {activeRoleData.kpis.map((kpi, kIdx) => (
                <div key={kIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500 font-medium">{kpi.label}</div>
                  <div className="text-xl font-extrabold text-slate-900 mt-1">{kpi.val}</div>
                </div>
              ))}
            </div>

            {/* Telemetry Summary */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                Operational Boundary & Visible Surface:
              </div>
              <div className="text-slate-600 pl-6 leading-relaxed">
                {activeRoleData.viewSummary}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. PLATFORM VALUE SECTION                                                 */}
      {/* 4 Core Pillars                                                            */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <Badge variant="neutral" size="sm">ENTERPRISE ADVANTAGES</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Designed for Modern Enterprise Governance
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            A cohesive architecture that delivers transparency, operational autonomy, and strict isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">One Connected Platform</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Centralized enterprise experience eliminating fragmented logins and disparate software tools.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Organization-Aware</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organizations operate within strict boundaries with dedicated units, departments, and branches.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Role-Based Experience</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every user interacts only with the workflows, metrics, and permissions relevant to their duties.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Integrated Domains</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              HRMS, CRM, Finance, Procurement, and Warehouse communicate natively without brittle connectors.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FINAL CALL TO ACTION (CTA)                                            */}
      {/* ========================================================================= */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-indigo-50/40 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Bring Your Enterprise Together.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Access the One Enterprise Cloud Platform and experience your organization through a connected enterprise workspace.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              Sign In to Console <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold transition-all"
            >
              Register Organization
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. PUBLIC FOOTER                                                         */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 bg-white py-12 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              OE
            </div>
            <div>
              <div className="font-extrabold text-slate-900">One Enterprise Cloud Platform</div>
              <div className="text-[10px] text-slate-400 font-mono">Connected Enterprise Operating System</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium text-slate-600">
            <a href="#platform" className="hover:text-indigo-600">Platform</a>
            <a href="#domains" className="hover:text-indigo-600">Domains</a>
            <a href="#roles" className="hover:text-indigo-600">Roles</a>
            <Link to="/login" className="hover:text-indigo-600">Login</Link>
            <Link to="/register" className="hover:text-indigo-600">Register</Link>
          </div>

          <div className="text-slate-400 font-mono text-[11px]">
            © 2026 One Enterprise • Architecture Reference
          </div>
        </div>
      </footer>
    </div>
  )
}
