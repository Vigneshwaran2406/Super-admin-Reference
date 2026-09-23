import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { mockCostCenters } from '@/mock'
import { DollarSign, Plus } from 'lucide-react'

export const CostCenters: React.FC = () => {
  const [centers, setCenters] = useState(mockCostCenters)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [head, setHead] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setCenters([
      ...centers,
      {
        id: `CC-0${centers.length + 1}`,
        name,
        code: code.toUpperCase(),
        tenantId: 'TEN-001',
        tenantName: 'Acme Technologies Inc.',
        type: 'Cost Center',
        head,
        status: 'Active',
      }
    ])
    setIsModalOpen(false)
    setName('')
    setCode('')
    setHead('')
  }

  return (
    <div>
      <ContextPanel
        title="Cost Center Management"
        managedBy="ORGANIZATION ADMINISTRATOR"
        scope="ORGANIZATION / TENANT"
        purpose="Establish corporate financial cost center codes, departmental budget accountability, and financial ledger linkage."
        accessLevel="Tenant-Scoped (Assigned Organization Only)"
        educationalNotes="Cost centers link organizational units to financial accounting ledgers. The Org Admin defines these codes so procurement and HR payroll line-items map to proper budget owners."
        tags={['Cost Centers', 'Budget Codes', 'Finance Linkage']}
      />

      <div className="glass-panel rounded-2xl p-4 mb-6 border border-slate-800 flex justify-between items-center">
        <span className="text-xs text-slate-400 font-mono">Active Cost Centers: {centers.length}</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Cost Center
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {centers.map(cc => (
          <div key={cc.id} className="glass-panel rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="tenant">{cc.code}</Badge>
                <span className="font-bold text-white text-xs">{cc.name}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Accountable Owner: {cc.head}</div>
            </div>
            <Badge variant="success">{cc.status}</Badge>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Cost Center Code">
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Cost Center Description</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Code (e.g. CC-5001)</label>
            <input type="text" required value={code} onChange={(e) => setCode(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono" />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Budget Approver / Owner</label>
            <input type="text" required value={head} onChange={(e) => setHead(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 rounded bg-slate-800 text-slate-300">Cancel</button>
            <button type="submit" className="px-4 py-1.5 rounded bg-emerald-600 text-white font-semibold">Save Code</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
