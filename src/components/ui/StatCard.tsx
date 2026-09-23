import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export interface StatCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  description?: string
  status?: 'healthy' | 'warning' | 'critical'
  subtitle?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  description,
  subtitle,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </span>
          {icon && (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-100 dark:border-slate-700/60">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
            {value}
          </span>
        </div>

        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {(change || description) && (
        <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-100 dark:border-slate-800/80">
          {change && (
            <span className={`inline-flex items-center gap-1 font-semibold ${
              trend === 'up' 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : trend === 'down' 
                ? 'text-rose-600 dark:text-rose-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}>
              {trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
          {description && (
            <span className="text-slate-500 dark:text-slate-400 truncate max-w-[200px]" title={description}>
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
