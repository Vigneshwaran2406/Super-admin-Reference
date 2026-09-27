import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface TelemetryGaugeProps {
  label: string
  value: number // percentage 0 - 100
  unit?: string // default: '%'
  statusLabel?: string
  status?: 'optimal' | 'warning' | 'critical' | 'healthy'
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
  details?: string
  subtext?: string
  icon?: React.ReactNode
  warningThreshold?: number // default: 60 (< 60% Green)
  criticalThreshold?: number // default: 80 (> 80% Red, 60-80% Amber)
}

export const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({
  label,
  value,
  unit = '%',
  statusLabel,
  status,
  change,
  trend = 'neutral',
  description,
  details,
  subtext,
  icon,
  warningThreshold = 60,
  criticalThreshold = 80,
}) => {
  // Threshold rule: Green < 60%, Amber 60-80%, Red > 80%
  const isCritical = value > criticalThreshold || status === 'critical'
  const isWarning = !isCritical && (value >= warningThreshold || status === 'warning')

  const statusColorClass = isCritical
    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60'
    : isWarning
    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
    : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60'

  const meterFillClass = isCritical
    ? 'bg-rose-500 dark:bg-rose-400'
    : isWarning
    ? 'bg-amber-500 dark:bg-amber-400'
    : 'bg-emerald-500 dark:bg-emerald-400'

  const effectiveStatusLabel = statusLabel || (isCritical ? 'High Load' : isWarning ? 'Elevated' : 'Optimal')
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
          {icon && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-100 dark:border-slate-700/60">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {value}
            </span>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {unit}
            </span>
          </div>
          <span className={"text-[11px] font-bold px-2.5 py-0.5 rounded-md border " + statusColorClass}>
            {effectiveStatusLabel}
          </span>
        </div>

        <div className="mt-3.5 space-y-1.5">
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={"h-full rounded-full transition-all duration-500 " + meterFillClass}
              style={{ width: clampedValue + "%" }}
              role="progressbar"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={label + " usage"}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {subtext && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {subtext}
          </p>
        )}
      </div>

      {(change || description || details) && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80 gap-1.5">
          {change && (
            <span className={"inline-flex items-center gap-1 font-semibold " + (
              trend === 'up'
                ? 'text-amber-600 dark:text-amber-400'
                : trend === 'down'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 dark:text-slate-400'
            )}>
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
          {description && (
            <span className="text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-full sm:max-w-[260px]" title={details || description}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
