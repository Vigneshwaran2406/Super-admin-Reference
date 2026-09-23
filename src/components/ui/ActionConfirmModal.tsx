import React from 'react'
import { Modal } from './Modal'
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react'

export interface ActionConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  actionType?: 'delete' | 'deactivate' | 'suspend' | 'disable' | 'revoke' | 'unlock' | 'generic'
  confirmLabel?: string
  cancelLabel?: string
}

export const ActionConfirmModal: React.FC<ActionConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  actionType = 'generic',
  confirmLabel,
  cancelLabel = 'Cancel',
}) => {
  const isDestructive = actionType === 'delete' || actionType === 'suspend' || actionType === 'revoke'
  const isWarning = actionType === 'deactivate' || actionType === 'disable'

  const resolvedConfirmLabel = confirmLabel || (
    actionType === 'delete' ? 'Confirm Delete' :
    actionType === 'deactivate' ? 'Confirm Deactivate' :
    actionType === 'suspend' ? 'Confirm Suspend' :
    actionType === 'disable' ? 'Confirm Disable' :
    actionType === 'revoke' ? 'Confirm Revoke' :
    actionType === 'unlock' ? 'Confirm Unlock' : 'Confirm Action'
  )

  const buttonStyle = isDestructive
    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
    : isWarning
    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4 text-xs">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
          <div className="shrink-0 mt-0.5">
            {isDestructive && <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
            {isWarning && <AlertTriangle className="w-5 h-5 text-amber-500" />}
            {!isDestructive && !isWarning && <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-[11px] text-indigo-700 dark:text-indigo-300">
          <span className="font-bold">Educational Simulation:</span> This is a UI/UX reference action. No production database records are mutated.
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`px-4 py-1.5 rounded-xl font-bold transition-colors ${buttonStyle}`}
          >
            {resolvedConfirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
