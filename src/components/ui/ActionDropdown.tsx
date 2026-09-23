import React, { useState, useRef, useEffect } from 'react'
import { MoreVertical } from 'lucide-react'

export interface ActionDropdownItem {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'danger' | 'warning' | 'primary'
  tooltip?: string
  disabled?: boolean
}

export interface ActionDropdownProps {
  items: ActionDropdownItem[]
  align?: 'left' | 'right'
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
        title="Actions"
        aria-label="Actions menu"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-1 w-44 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-1 z-30 animate-in fade-in-50 zoom-in-95 duration-150`}
        >
          {items.map((item, idx) => (
            <button
              key={idx}
              type="button"
              disabled={item.disabled}
              title={item.tooltip}
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                if (!item.disabled) item.onClick()
              }}
              className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 transition-colors ${
                item.disabled
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : item.variant === 'danger'
                  ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium'
                  : item.variant === 'warning'
                  ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 font-medium'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 font-medium'
              }`}
            >
              {item.icon && <span className="w-3.5 h-3.5 shrink-0">{item.icon}</span>}
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
