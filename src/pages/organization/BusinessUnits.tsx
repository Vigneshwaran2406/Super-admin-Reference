import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { mockBusinessUnits } from '@/mock'
import { Boxes, Plus, Users } from 'lucide-react'

export const BusinessUnits: React.FC = () => {
  const [units, setUnits] = useState(mockBusinessUnits)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [head, setHead] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    setUnits([
      ...units,
      {
        id: `BU-0${units.length + 1}`,
        name,
        code: code.toUpperCase(),
        tenantId: 'TEN-001',
        tenantName: 'Acme Technologies Inc.',
        type: 'Business Unit',
        head,
        headcount: 0,
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
        title="Business Units"
        managedBy="ORGANIZATION ADMINISTRATOR"
        scope="ORGANIZATION / TENANT"
        purpose="Defines corporate business divisions, operational operating segments, and P&L accountability structures."
        accessLevel="Tenant-Scoped (Assigned Organization Only)"
        educationalNotes="Business Units represent corporate divisions within a single company. They facilitate segmented reporting and localized workflow approvals."
        tags={['Business Units', 'Divisions', 'Tenant Scope']}
      />

      <div className="glass-panel rounded-2xl p-4 mb-6 border border-slate-800 flex justify-between items-center">
        <span className="text-xs text-slate-400 font-mono">Active Divisions: {units.length}</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Business Unit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {units.map(bu => (
          <div key={bu.id} className="glass-panel rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <Badge variant="tenant">{bu.code}</Badge>
              <Badge variant="success">{bu.status}</Badge>
            </div>
            <h3 className="text-sm font-bold text-white mt-3">{bu.name}</h3>
            <div className="text-xs text-slate-400 mt-1">Division Head: {bu.head}</div>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-indigo-400" /> Headcount: {bu.headcount}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Business Unit">
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Division Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Division Leader</label>
            <input
              type="text"
              required
              value={head}
              onChange={(e) => setHead(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 rounded bg-slate-800 text-slate-300">Cancel</button>
            <button type="submit" className="px-4 py-1.5 rounded bg-emerald-600 text-white font-semibold">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
