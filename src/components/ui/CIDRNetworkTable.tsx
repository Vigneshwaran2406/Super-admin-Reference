import React, { useState } from 'react'
import { Modal } from './Modal'
import { useToast } from '@/context/ToastContext'
import {
  Network,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Shield,
  AlertCircle,
  Globe
} from 'lucide-react'

export interface CIDRRule {
  id: string
  cidr: string
  description: string
  enabled: boolean
  createdAt?: string
}

export const DEFAULT_CIDR_RULES: CIDRRule[] = [
  {
    id: 'CIDR-001',
    cidr: '10.0.0.0/24',
    description: 'Corporate Office HQ Network',
    enabled: true,
    createdAt: '2026-01-15',
  },
  {
    id: 'CIDR-002',
    cidr: '192.168.1.0/24',
    description: 'Internal VPN Gateway Subnet',
    enabled: true,
    createdAt: '2026-02-10',
  },
  {
    id: 'CIDR-003',
    cidr: '172.16.0.0/16',
    description: 'Regional Branch Office Pool',
    enabled: false,
    createdAt: '2026-03-01',
  },
]

/**
 * Validates whether a string is a syntactically correct IPv4 CIDR block.
 * Supports prefixes /0 to /32 and valid octets 0-255.
 */
export const isValidIPv4CIDR = (cidr: string): boolean => {
  if (!cidr || typeof cidr !== 'string') return false
  const trimmed = cidr.trim()
  const parts = trimmed.split('/')
  if (parts.length !== 2) return false

  const [ipPart, prefixPart] = parts

  // Validate prefix is an integer between 0 and 32
  if (!/^\d+$/.test(prefixPart)) return false
  const prefix = parseInt(prefixPart, 10)
  if (prefix < 0 || prefix > 32) return false

  // Validate IP has exactly 4 octets
  const octets = ipPart.split('.')
  if (octets.length !== 4) return false

  for (const octet of octets) {
    if (!/^\d+$/.test(octet)) return false
    const num = parseInt(octet, 10)
    if (num < 0 || num > 255) return false
    // Reject numbers with leading zeros (e.g. "01") unless it is strictly "0"
    if (octet.length > 1 && octet.startsWith('0')) return false
  }

  return true
}

export interface CIDRNetworkTableProps {
  tenantName?: string
  initialRules?: CIDRRule[]
}

/**
 * UI-006 Reusable Component: CIDRNetworkTable
 * Provides an interactive CIDR Network Allowlist management table with Add, Edit,
 * Delete, validation, and enforcement toggle capabilities.
 */
export const CIDRNetworkTable: React.FC<CIDRNetworkTableProps> = ({
  tenantName = 'Tenant',
  initialRules = DEFAULT_CIDR_RULES,
}) => {
  const { showToast } = useToast()
  const [rules, setRules] = useState<CIDRRule[]>(initialRules)

  // Add / Edit Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null)
  const [formCidr, setFormCidr] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formEnabled, setFormEnabled] = useState(true)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [ruleToDelete, setRuleToDelete] = useState<CIDRRule | null>(null)

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingRuleId(null)
    setFormCidr('')
    setFormDescription('')
    setFormEnabled(true)
    setValidationError(null)
    setIsFormModalOpen(true)
  }

  // Open Edit Modal
  const handleOpenEditModal = (rule: CIDRRule) => {
    setEditingRuleId(rule.id)
    setFormCidr(rule.cidr)
    setFormDescription(rule.description)
    setFormEnabled(rule.enabled)
    setValidationError(null)
    setIsFormModalOpen(true)
  }

  // Submit Add or Edit Form
  const handleSaveRule = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedCidr = formCidr.trim()
    const trimmedDesc = formDescription.trim()

    if (!trimmedCidr) {
      setValidationError('Please enter a CIDR notation range.')
      return
    }

    if (!isValidIPv4CIDR(trimmedCidr)) {
      setValidationError(
        'Invalid IPv4 CIDR notation. Must be in format xxx.xxx.xxx.xxx/prefix (e.g. 10.0.0.0/24, 192.168.1.0/24, 10.10.10.10/32) with prefix between 0 and 32.'
      )
      return
    }

    if (editingRuleId) {
      // Update existing
      setRules((prev) =>
        prev.map((r) =>
          r.id === editingRuleId
            ? {
                ...r,
                cidr: trimmedCidr,
                description: trimmedDesc || 'Tenant Network Range',
                enabled: formEnabled,
              }
            : r
        )
      )
      showToast(
        'Network range updated',
        'success',
        `CIDR rule ${trimmedCidr} was updated successfully.`
      )
    } else {
      // Add new
      const newRule: CIDRRule = {
        id: `CIDR-${String(Date.now()).slice(-4)}`,
        cidr: trimmedCidr,
        description: trimmedDesc || 'Tenant Network Range',
        enabled: formEnabled,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setRules((prev) => [...prev, newRule])
      showToast(
        'Network range added',
        'success',
        `CIDR rule ${trimmedCidr} added to allowlist.`
      )
    }

    setIsFormModalOpen(false)
  }

  // Toggle Enforcement
  const handleToggleEnforcement = (id: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextState = !r.enabled
          showToast(
            `Rule ${r.cidr} ${nextState ? 'enforced' : 'disabled'}`,
            'info',
            `Policy enforcement state simulated locally.`
          )
          return { ...r, enabled: nextState }
        }
        return r
      })
    )
  }

  // Open Delete Confirmation Modal
  const handleOpenDeleteModal = (rule: CIDRRule) => {
    setRuleToDelete(rule)
    setIsDeleteModalOpen(true)
  }

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!ruleToDelete) return
    const deletedCidr = ruleToDelete.cidr
    setRules((prev) => prev.filter((r) => r.id !== ruleToDelete.id))
    setIsDeleteModalOpen(false)
    setRuleToDelete(null)
    showToast(
      'Network range removed',
      'success',
      `CIDR rule ${deletedCidr} was removed from allowlist.`
    )
  }

  const activeCount = rules.filter((r) => r.enabled).length

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs space-y-5 text-xs">
      {/* Header with Title and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              CIDR Network Policy
            </h3>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-900/50">
              UI-006 • Allowlist
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Configure allowed IPv4 CIDR network ranges for secure tenant perimeter isolation and API ingress access for {tenantName}.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden md:inline">
            {activeCount} of {rules.length} Enforced
          </span>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
            aria-label="Add network range"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Network Range</span>
          </button>
        </div>
      </div>

      {/* CIDR Allowlist Table / Empty State */}
      {rules.length === 0 ? (
        <div className="py-10 px-4 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              No network ranges configured
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 max-w-md mx-auto leading-relaxed">
              No ingress IP restrictions are currently applied. Add a CIDR block to enforce perimeter network filtering for this tenant partition.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add First Network Range</span>
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-3 px-4">CIDR Range</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status / Enforcement</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {rules.map((rule) => (
                  <tr
                    key={rule.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    {/* CIDR Range */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                          {rule.cidr}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                          {rule.id}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      <div>{rule.description}</div>
                      {rule.createdAt && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          Created {rule.createdAt}
                        </span>
                      )}
                    </td>

                    {/* Status / Enforcement Toggle */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {/* Accessible Switch Toggle */}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={rule.enabled}
                          onClick={() => handleToggleEnforcement(rule.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                            rule.enabled
                              ? 'bg-emerald-600 dark:bg-emerald-500'
                              : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                          aria-label={`Toggle enforcement for ${rule.cidr}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              rule.enabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>

                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                            rule.enabled
                              ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60'
                              : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {rule.enabled ? (
                            <>
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              <span>Enforced</span>
                            </>
                          ) : (
                            <span>Disabled</span>
                          )}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(rule)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit CIDR Range"
                          aria-label={`Edit ${rule.cidr}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(rule)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete CIDR Range"
                          aria-label={`Delete ${rule.cidr}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Educational Prototype Notice */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 dark:text-slate-300">
            Prototype Network Policy Simulation:
          </span>{' '}
          Configuring or toggling allowed CIDR ranges demonstrates tenant perimeter security controls. No real cloud VPC route tables, security groups, or firewalls are modified.
        </div>
      </div>

      {/* Add / Edit Rule Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingRuleId ? 'Edit Network Range' : 'Add Network Range'}
        subtitle={`Configure IPv4 CIDR allowlist policy for ${tenantName}`}
        size="md"
      >
        <form onSubmit={handleSaveRule} className="space-y-4 text-xs">
          {validationError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
              CIDR Range (IPv4)
            </label>
            <input
              type="text"
              value={formCidr}
              onChange={(e) => {
                setFormCidr(e.target.value)
                setValidationError(null)
              }}
              placeholder="e.g. 10.20.0.0/16"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              aria-label="CIDR Range"
              autoFocus
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Allowed IPv4 address block in CIDR notation (prefix /0 to /32).
            </p>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
              Description
            </label>
            <input
              type="text"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="e.g. Chennai Office Network"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              aria-label="Description"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Descriptive label explaining the location or network segment.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <input
              type="checkbox"
              id="cidr-enabled-check"
              checked={formEnabled}
              onChange={(e) => setFormEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700"
            />
            <label
              htmlFor="cidr-enabled-check"
              className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              Enforce policy immediately upon creation
            </label>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              {editingRuleId ? 'Save Changes' : 'Add Network Range'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Remove Network Range"
        subtitle="Confirm removal of CIDR allowlist entry"
        size="sm"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Are you sure you want to remove the network range{' '}
                <strong className="font-mono text-slate-900 dark:text-white">
                  {ruleToDelete?.cidr}
                </strong>{' '}
                ({ruleToDelete?.description})?
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1">
                Traffic originating from this IP range will no longer be explicitly allowed through the simulated perimeter filter.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Remove Range
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
