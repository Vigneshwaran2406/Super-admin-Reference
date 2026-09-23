import React, { useState } from 'react'
import { ContextPanel } from '@/components/ui/ContextPanel'
import { Badge } from '@/components/ui/Badge'
import { ActionConfirmModal } from '@/components/ui/ActionConfirmModal'
import { usePerspective } from '@/context/PerspectiveContext'
import { useToast } from '@/context/ToastContext'
import { Building2, Save, CheckCircle2, XCircle, Edit3, Power } from 'lucide-react'

export const CompanySetup: React.FC = () => {
  const { perspective } = usePerspective()
  const { showToast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [legalName, setLegalName] = useState('Acme Enterprise Global, Inc.')
  const [taxId, setTaxId] = useState('US-EIN-94-1029381')
  const [hqAddress, setHqAddress] = useState('100 Innovation Way, Suite 400, Austin, TX 78701')
  const [currency, setCurrency] = useState('USD ($)')
  const [fiscalYear, setFiscalYear] = useState('January 1 - December 31')
  const [companyStatus, setCompanyStatus] = useState<'Active' | 'Inactive'>('Active')

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    actionType: 'deactivate' | 'generic'
    confirmLabel: string
    onConfirm: () => void
  }>({
    isOpen: false,
    title: '',
    message: '',
    actionType: 'generic',
    confirmLabel: '',
    onConfirm: () => {},
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    showToast('Company configuration saved', 'success', 'Legal entity registration and parameters updated.')
  }

  const handleToggleStatus = () => {
    const isActivating = companyStatus === 'Inactive'
    setConfirmModal({
      isOpen: true,
      title: isActivating ? 'Activate Legal Entity?' : 'Deactivate Legal Entity?',
      message: isActivating
        ? 'Reactivate operational processing for this legal entity?'
        : 'Deactivating this entity will suspend financial settlement and commercial transaction processing across its branches.',
      actionType: isActivating ? 'generic' : 'deactivate',
      confirmLabel: isActivating ? 'Confirm Activate' : 'Confirm Deactivate',
      onConfirm: () => {
        setCompanyStatus(isActivating ? 'Active' : 'Inactive')
        showToast(
          isActivating ? 'Entity activated' : 'Entity deactivated',
          isActivating ? 'success' : 'warning',
          `Company state changed to ${isActivating ? 'Active' : 'Inactive'}.`
        )
      }
    })
  }

  return (
    <div className="space-y-6 pb-16">
      <ContextPanel
        title="Company Setup"
        managedBy="ORGANIZATION ADMINISTRATOR"
        scope="ORGANIZATION / TENANT"
        purpose="Establish legal entity identity, registration details, tax identifiers, and official headquarters within the assigned tenant."
        accessLevel="Tenant-Scoped (Assigned Organization Only)"
      />

      {/* Header Toolbar */}
      <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{legalName}</span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                companyStatus === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
              }`}>
                {companyStatus === 'Active' ? <CheckCircle2 className="w-3 h-3 text-emerald-500" /> : <XCircle className="w-3 h-3 text-slate-400" />}
                {companyStatus.toUpperCase()}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono">Tax ID: {taxId}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" /> {isEditing ? 'Cancel Edit' : 'Edit Configuration'}
          </button>
          <button
            onClick={handleToggleStatus}
            className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              companyStatus === 'Active'
                ? 'border-amber-200 text-amber-700 hover:bg-amber-50'
                : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            <Power className="w-3.5 h-3.5" /> {companyStatus === 'Active' ? 'Deactivate Entity' : 'Activate Entity'}
          </button>
        </div>
      </div>

      {/* Configuration Form / Details */}
      <form onSubmit={handleSave} className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Legal Registered Name</label>
            <input
              type="text"
              disabled={!isEditing}
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs disabled:opacity-75 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Corporate Tax Identifier</label>
            <input
              type="text"
              disabled={!isEditing}
              value={taxId}
              onChange={(e) => setTaxId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs disabled:opacity-75 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Headquarters Address</label>
            <input
              type="text"
              disabled={!isEditing}
              value={hqAddress}
              onChange={(e) => setHqAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs disabled:opacity-75 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Default Base Currency</label>
            <input
              type="text"
              disabled={!isEditing}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs disabled:opacity-75 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Fiscal Year Cycle</label>
            <input
              type="text"
              disabled={!isEditing}
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-xs disabled:opacity-75 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        )}
      </form>

      {/* Confirmation Modal */}
      <ActionConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        actionType={confirmModal.actionType}
        confirmLabel={confirmModal.confirmLabel}
      />
    </div>
  )
}
