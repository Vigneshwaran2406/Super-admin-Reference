import React, { useState } from 'react'
import { Modal } from './Modal'
import { FileText, FileSpreadsheet, Download, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export type ExportFormatType = 'pdf' | 'csv' | 'excel'

export interface ExportFormatOption {
  id: ExportFormatType
  title: string
  extension: string
  purpose: string
  badge: string
}

export const EXPORT_FORMAT_OPTIONS: ExportFormatOption[] = [
  {
    id: 'pdf',
    title: 'PDF Executive Summary',
    extension: '.pdf',
    purpose: 'Executive-level dashboard summary.',
    badge: 'PDF',
  },
  {
    id: 'csv',
    title: 'CSV Metrics Dump',
    extension: '.csv',
    purpose: 'Raw dashboard metric data.',
    badge: 'CSV',
  },
  {
    id: 'excel',
    title: 'Excel Operational Report',
    extension: '.xlsx',
    purpose: 'Detailed operational dashboard report.',
    badge: 'XLSX',
  },
]

export interface ExportReportModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: (format: ExportFormatType, formatTitle: string) => void
  isExporting?: boolean
  reportTitle?: string
}

/**
 * UI-003: Unified Export Dashboard Report Action Dialog
 * Reusable modal dialog for format selection (PDF, CSV, Excel) with simulated download trigger.
 * Reuses the standard platform Modal component. Pure frontend prototype simulation with zero backend API calls.
 */
export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  isExporting = false,
  reportTitle = 'Platform Administration Dashboard',
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormatType>('pdf')

  const handleConfirm = () => {
    const selectedOption = EXPORT_FORMAT_OPTIONS.find((opt) => opt.id === selectedFormat)
    const title = selectedOption ? selectedOption.title : 'Dashboard Report'
    onExport(selectedFormat, title)
  }

  const getFormatIcon = (format: ExportFormatType) => {
    switch (format) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />
      case 'csv':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={isExporting ? () => {} : onClose}
      title="Export Dashboard Report"
      subtitle={`Configure format for ${reportTitle}`}
      size="md"
    >
      <div className="space-y-5 text-xs">
        {/* Format Selection Group */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            Select Export Format
          </label>
          <div
            className="space-y-2.5"
            role="radiogroup"
            aria-label="Dashboard export format options"
          >
            {EXPORT_FORMAT_OPTIONS.map((option) => {
              const isSelected = selectedFormat === option.id
              return (
                <div
                  key={option.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isExporting ? -1 : 0}
                  onClick={() => !isExporting && setSelectedFormat(option.id)}
                  onKeyDown={(e) => {
                    if (!isExporting && (e.key === ' ' || e.key === 'Enter')) {
                      e.preventDefault()
                      setSelectedFormat(option.id)
                    }
                  }}
                  className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 ${
                    isSelected
                      ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30 ring-1 ring-indigo-600/20 dark:ring-indigo-500/30 shadow-xs'
                      : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                  } ${isExporting ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {/* Icon Container */}
                  <div
                    className={`p-2 rounded-xl shrink-0 border transition-colors ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    {getFormatIcon(option.id)}
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {option.title}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        {option.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {option.purpose}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  <div className="shrink-0 mt-1">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 dark:border-indigo-500 dark:bg-indigo-500 text-white'
                          : 'border-slate-300 dark:border-slate-600 bg-transparent'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Educational Simulation Banner */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          <AlertCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-200">Prototype Export Simulation:</span>{' '}
            Generates a simulated report artifact locally in the client browser. No backend server export jobs or API endpoints are invoked.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 motion-safe:animate-spin" />
                <span>Preparing Export...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}
