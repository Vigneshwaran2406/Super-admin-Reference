import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Sparkles, 
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
  CheckCircle2, 
  ShieldCheck, 
  Globe 
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  
  const [orgName, setOrgName] = useState('')
  const [subdomain, setSubdomain] = useState('')
  const [adminName, setAdminName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedDomains, setSelectedDomains] = useState({
    hrms: true,
    crm: true,
    finance: true,
    procurement: true,
    warehouse: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleDomain = (key: keyof typeof selectedDomains) => {
    setSelectedDomains(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert(`[Simulation]: Enterprise Tenant '${orgName}' (${subdomain}.onecloud.io) successfully registered. Redirecting to Login.`)
      navigate('/login')
    }, 600)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans">
      {/* Top Header */}
      <header className="h-16 px-6 border-b border-slate-200/80 bg-white flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-slate-900">One Enterprise</span>
            <span className="text-[10px] uppercase font-mono text-indigo-600 font-bold ml-1.5">Tenant Onboarding</span>
          </div>
        </Link>

        <Link
          to="/"
          className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Home
        </Link>
      </header>

      {/* Main Registration Form */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="tenant" size="sm">ORGANIZATION ONBOARDING</Badge>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Register Your Enterprise Organization
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Provision a new dedicated enterprise tenant workspace with isolated data boundaries and connected business domains.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Section 1: Organization Boundary */}
            <div className="space-y-4">
              <h2 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-600" />
                1. Organization Identity & Workspace URL
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Organization Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => {
                      setOrgName(e.target.value)
                      if (!subdomain) {
                        setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))
                      }
                    }}
                    placeholder="e.g. Apex Global Industrial"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Dedicated Workspace Subdomain
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      required
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                      placeholder="apex"
                      className="w-full px-3 py-2.5 rounded-l-xl border border-r-0 border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                    />
                    <span className="px-3 py-2.5 bg-slate-100 border border-slate-300 rounded-r-xl text-slate-500 font-mono text-xs">
                      .onecloud.io
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Primary Administrator */}
            <div className="space-y-4">
              <h2 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                2. Initial Organization Administrator Account
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Admin Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="e.g. Marcus Bell"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@company.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Master Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 12 characters"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
                />
              </div>
            </div>

            {/* Section 3: Business Domains Selection */}
            <div className="space-y-4">
              <h2 className="text-sm font-extrabold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-600" />
                3. Business Domains to Activate
              </h2>

              <p className="text-xs text-slate-500">
                Select the operational business modules your enterprise will manage under this organization.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { key: 'hrms' as const, label: 'HRMS (People Ops)', desc: 'Employees, Attendance, Payroll', icon: Users },
                  { key: 'crm' as const, label: 'CRM (Sales)', desc: 'Leads, Opportunities, Quotes', icon: Briefcase },
                  { key: 'finance' as const, label: 'Finance & Accounting', desc: 'GL, Payables, Receivables', icon: DollarSign },
                  { key: 'procurement' as const, label: 'Procurement (Sourcing)', desc: 'Suppliers, Purchase Orders', icon: ShoppingCart },
                  { key: 'warehouse' as const, label: 'Warehouse & Inventory', desc: 'Stock Bins, Cycle Counts', icon: Boxes },
                ].map((d) => (
                  <label
                    key={d.key}
                    onClick={() => toggleDomain(d.key)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      selectedDomains[d.key]
                        ? 'border-indigo-500 bg-indigo-50/50 shadow-2xs'
                        : 'border-slate-200 bg-slate-50 opacity-60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDomains[d.key]}
                      onChange={() => {}}
                      className="w-4 h-4 mt-0.5 accent-indigo-600"
                    />
                    <div>
                      <div className="font-extrabold text-xs text-slate-900">{d.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{d.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Already registered?{' '}
                <Link to="/login" className="font-bold text-indigo-600 hover:underline">
                  Sign In to Console
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Provisioning...' : 'Provision Enterprise Tenant'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        One Enterprise Cloud Platform • Multi-Tenant Enterprise Architecture
      </footer>
    </div>
  )
}
