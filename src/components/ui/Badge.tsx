import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'global' | 'tenant' | 'domain' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'rbac' | 'indigo' | 'purple' | 'outline' | 'default'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', size = 'sm', className = '' }) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs font-semibold' : 'px-3 py-1 text-xs font-bold'

  const variantClasses = {
    global: 'bg-indigo-50 text-indigo-700 border border-indigo-200/90 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30 tracking-wider',
    tenant: 'bg-emerald-50 text-emerald-700 border border-emerald-200/90 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30 tracking-wider',
    domain: 'bg-amber-50 text-amber-800 border border-amber-200/90 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30 tracking-wider',
    rbac: 'bg-purple-50 text-purple-700 border border-purple-200/90 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30 tracking-wide',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200/90 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/30',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/90 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/90 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/90 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/90 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30',
    info: 'bg-sky-50 text-sky-700 border border-sky-200/90 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/30',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/90 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    outline: 'bg-transparent text-slate-700 border border-slate-300 dark:text-slate-300 dark:border-slate-700',
    default: 'bg-slate-100 text-slate-700 border border-slate-200/90 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  }[variant]

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full uppercase tracking-wider font-mono transition-colors ${sizeClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  )
}
