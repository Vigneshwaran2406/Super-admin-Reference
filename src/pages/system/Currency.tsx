import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { DollarSign, Save } from 'lucide-react'

export const Currency: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD ($)')
  const [saved, setSaved] = useState(false)

  const rates = [
    { code: 'EUR', symbol: '€', rate: '0.92', name: 'Euro' },
    { code: 'GBP', symbol: '£', rate: '0.78', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', rate: '148.50', name: 'Japanese Yen' },
    { code: 'INR', symbol: '₹', rate: '83.95', name: 'Indian Rupee' },
  ]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <ContextPanel
        title="Currency & Multi-Currency Engine"
        managedBy="SYSTEM ADMINISTRATOR (Specialized RBAC Role) • SUPER ADMINISTRATOR (Global Oversight)"
        scope="GLOBAL"
        purpose="Governs the master financial currency standard, exchange rate feeds, and multi-currency conversions across invoicing and procurement."
        accessLevel="Platform-Wide Master Currency • Finance Synced"
        educationalNotes="The base currency serves as the master consolidation unit for platform billing and multi-tenant reporting. Individual tenants can configure operational currencies under their Finance domain."
        tags={['Multi-Currency', 'Exchange Rates', 'Financial Master']}
      />

      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>Base currency updated.</span>
          <Badge variant="success">Saved</Badge>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Master Currency Standard</h3>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Platform Base Currency</label>
            <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white">
              <option>USD ($) - US Dollar</option>
              <option>EUR (€) - Euro</option>
              <option>GBP (£) - British Pound</option>
            </select>
          </div>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold flex items-center gap-1.5">
            <Save className="w-4 h-4" /> Update Base Currency
          </button>
        </div>

        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-3">Live Mock Exchange Rates (vs USD)</h3>
          <div className="space-y-2">
            {rates.map(r => (
              <div key={r.code} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between font-mono">
                <div>
                  <span className="font-bold text-white">{r.code} ({r.symbol})</span>
                  <span className="text-slate-400 font-sans text-[11px] ml-2">{r.name}</span>
                </div>
                <div className="text-emerald-400 font-bold">1 USD = {r.rate} {r.code}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
