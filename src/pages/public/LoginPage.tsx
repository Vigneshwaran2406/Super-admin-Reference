import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Sparkles, 
  Crown, 
  Building2, 
  Users, 
  Briefcase, 
  DollarSign, 
  ShoppingCart, 
  Boxes, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Mail, 
  Building,
  Info,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { usePerspective } from '@/context/PerspectiveContext'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { setPerspective, perspective } = usePerspective()

  const [tenantCode, setTenantCode] = useState('ACME')
  const [email, setEmail] = useState('alex.wright@onecloud.io')
  const [password, setPassword] = useState('••••••••••••')
  const [rememberMe, setRememberMe] = useState(true)

  const handleNormalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Directs into authenticated console
    navigate('/console')
  }

  const handleRoleSimulation = (
    roleId: 'super-admin' | 'org-admin' | 'hr-manager' | 'sales-manager' | 'finance-manager' | 'procurement-manager' | 'warehouse-manager',
    simEmail: string,
    simTenant: string
  ) => {
    setPerspective(roleId)
    setEmail(simEmail)
    setTenantCode(simTenant)
    navigate('/console')
  }

  const simulationProfiles = [
    {
      id: 'super-admin' as const,
      roleName: 'Super Administrator',
      scope: 'GLOBAL',
      badge: 'global' as const,
      tenant: 'GLOBAL',
      email: 'alex.wright@onecloud.io',
      desc: 'Simulate full cloud infrastructure and multi-tenant authority.',
      icon: Crown,
    },
    {
      id: 'org-admin' as const,
      roleName: 'Organization Administrator',
      scope: 'ORGANIZATION / TENANT',
      badge: 'tenant' as const,
      tenant: 'ACME',
      email: 'm.bell@acme.com',
      desc: 'Simulate organization management within Acme Enterprise.',
      icon: Building2,
    },
    {
      id: 'hr-manager' as const,
      roleName: 'HR Manager',
      scope: 'DOMAIN OPERATIONAL',
      badge: 'domain' as const,
      tenant: 'ACME',
      email: 'j.miller@acme.com',
      desc: 'Simulate HRMS headcount, attendance, and payroll operations.',
      icon: Users,
    },
    {
      id: 'sales-manager' as const,
      roleName: 'Sales Manager',
      scope: 'DOMAIN OPERATIONAL',
      badge: 'domain' as const,
      tenant: 'ACME',
      email: 'c.mendoza@acme.com',
      desc: 'Simulate CRM pipelines, leads, quotes, and deals.',
      icon: Briefcase,
    },
    {
      id: 'finance-manager' as const,
      roleName: 'Finance Manager',
      scope: 'DOMAIN OPERATIONAL',
      badge: 'domain' as const,
      tenant: 'ACME',
      email: 'p.wong@acme.com',
      desc: 'Simulate Finance general ledger, payables, and receivables.',
      icon: DollarSign,
    },
    {
      id: 'procurement-manager' as const,
      roleName: 'Procurement Manager',
      scope: 'DOMAIN OPERATIONAL',
      badge: 'domain' as const,
      tenant: 'ACME',
      email: 's.sharma@acme.com',
      desc: 'Simulate supplier catalogs, PO requisitions, and RFQs.',
      icon: ShoppingCart,
    },
    {
      id: 'warehouse-manager' as const,
      roleName: 'Warehouse Manager',
      scope: 'DOMAIN OPERATIONAL',
      badge: 'domain' as const,
      tenant: 'ACME',
      email: 'b.keller@acme.com',
      desc: 'Simulate physical inventory bins, stock moves, and dispatch.',
      icon: Boxes,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans">
      {/* Top Simple Header */}
      <header className="h-16 px-6 border-b border-slate-200/80 bg-white flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-slate-900">One Enterprise</span>
            <span className="text-[10px] uppercase font-mono text-indigo-600 font-bold ml-1.5">Console Access</span>
          </div>
        </Link>

        <Link
          to="/"
          className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Sign In to One Enterprise
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Access your organization's connected enterprise workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Standard Enterprise Credentials Form */}
          <div className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-base font-extrabold text-slate-900">Enterprise Credentials</h2>
              <p className="text-xs text-slate-500 mt-0.5">Enter your corporate credentials to sign in.</p>
            </div>

            <form onSubmit={handleNormalSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tenant Organization Identifier
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={tenantCode}
                    onChange={(e) => setTenantCode(e.target.value.toUpperCase())}
                    placeholder="e.g. ACME"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Corporate Work Email
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-slate-700">Password</label>
                  <span className="text-[11px] text-indigo-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded accent-indigo-600"
                  />
                  <span className="text-slate-600 text-[11px]">Remember this device</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Sign In to Console <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Need a new enterprise tenant?{' '}
              <Link to="/register" className="font-bold text-indigo-600 hover:underline">
                Register Organization
              </Link>
            </div>
          </div>

          {/* Right Column: REFERENCE ROLE SIMULATION (Clearly labelled as UI/UX simulation) */}
          <div className="lg:col-span-6 rounded-3xl border-2 border-indigo-200 bg-indigo-50/40 p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="neutral" size="sm">UI/UX SIMULATION</Badge>
                <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
                  Reference Role Simulation
                </span>
              </div>
              <h2 className="text-base font-extrabold text-slate-900 pt-1">
                Preview by Responsibility Scope
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Preview the workspace from a different responsibility perspective. Click any role below to simulate immediate console entry under that authority lens.
              </p>
            </div>

            {/* List of 7 Simulation Roles */}
            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {simulationProfiles.map((p) => {
                const IconComponent = p.icon
                return (
                  <button
                    key={p.id}
                    onClick={() => handleRoleSimulation(p.id, p.email, p.tenant)}
                    className="w-full p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-xs text-left transition-all group flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 flex items-center justify-center text-slate-600 shrink-0 mt-0.5 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {p.roleName}
                          </span>
                          <Badge variant={p.badge} size="sm">
                            {p.scope}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                          {p.desc}
                        </p>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-white/80 border border-indigo-100 text-[11px] text-slate-600 leading-relaxed flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                <strong>Educational Simulation Note:</strong> In production, authentications are verified against tenant SAML 2.0 / OIDC identity providers with strict cryptographic token issuance.
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        One Enterprise Cloud Platform • Standalone Reference Architecture
      </footer>
    </div>
  )
}
