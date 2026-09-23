import React, { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Layers, 
  TableProperties, 
  Network, 
  Globe, 
  Settings, 
  Sliders, 
  Palette, 
  KeyRound, 
  ToggleRight, 
  Building2, 
  Users, 
  UserCog, 
  Shield, 
  Lock, 
  FileText, 
  Activity, 
  Mail, 
  Smartphone, 
  Clock, 
  DollarSign, 
  MapPin, 
  Boxes, 
  ChevronDown, 
  ChevronRight, 
  Fingerprint, 
  FolderTree, 
  FileSpreadsheet, 
  Sparkles,
  Search,
  Briefcase,
  ShoppingCart,
  TrendingUp,
  CreditCard,
  Truck,
  Calendar,
  ArrowRightLeft,
  UserCheck,
  X,
  AlertCircle,
  Bell
} from 'lucide-react'
import { Badge } from '../ui/Badge'
import { usePerspective } from '@/context/PerspectiveContext'
import { UNIVERSAL_EDUCATIONAL_NAV, NavGroupConfig, NavItemConfig } from '@/config/perspectiveConfig'

export const Sidebar: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('')
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})
  const { activeProfile } = usePerspective()

  const toggleGroup = (groupLabel: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupLabel]: !prev[groupLabel]
    }))
  }

  // Icon resolver
  const renderIcon = (name: string) => {
    const iconProps = { className: 'w-4 h-4 shrink-0' }
    switch (name) {
      case 'Network': return <Network {...iconProps} />
      case 'TableProperties': return <TableProperties {...iconProps} />
      case 'Layers': return <Layers {...iconProps} />
      case 'LayoutDashboard': return <LayoutDashboard {...iconProps} />
      case 'Globe': return <Globe {...iconProps} />
      case 'Settings': return <Settings {...iconProps} />
      case 'Palette': return <Palette {...iconProps} />
      case 'KeyRound': return <KeyRound {...iconProps} />
      case 'ToggleRight': return <ToggleRight {...iconProps} />
      case 'Building2': return <Building2 {...iconProps} />
      case 'Users': return <Users {...iconProps} />
      case 'UserCog': return <UserCog {...iconProps} />
      case 'Shield': return <Shield {...iconProps} />
      case 'Lock': return <Lock {...iconProps} />
      case 'Fingerprint': return <Fingerprint {...iconProps} />
      case 'Activity': return <Activity {...iconProps} />
      case 'Sliders': return <Sliders {...iconProps} />
      case 'Mail': return <Mail {...iconProps} />
      case 'Smartphone': return <Smartphone {...iconProps} />
      case 'Bell': return <Bell {...iconProps} />
      case 'Clock': return <Clock {...iconProps} />
      case 'FileText': return <FileText {...iconProps} />
      case 'FileSpreadsheet': return <FileSpreadsheet {...iconProps} />
      case 'FolderTree': return <FolderTree {...iconProps} />
      case 'DollarSign': return <DollarSign {...iconProps} />
      case 'MapPin': return <MapPin {...iconProps} />
      case 'Boxes': return <Boxes {...iconProps} />
      case 'Briefcase': return <Briefcase {...iconProps} />
      case 'ShoppingCart': return <ShoppingCart {...iconProps} />
      case 'TrendingUp': return <TrendingUp {...iconProps} />
      case 'CreditCard': return <CreditCard {...iconProps} />
      case 'Truck': return <Truck {...iconProps} />
      case 'Calendar': return <Calendar {...iconProps} />
      case 'ArrowRightLeft': return <ArrowRightLeft {...iconProps} />
      case 'UserCheck': return <UserCheck {...iconProps} />
      default: return <Activity {...iconProps} />
    }
  }

  const filteredEduItems = UNIVERSAL_EDUCATIONAL_NAV.items.filter((item: NavItemConfig) =>
    item.label.toLowerCase().includes(filterQuery.toLowerCase())
  )

  const filteredRoleGroups = activeProfile.sidebarGroups
    .map((group: NavGroupConfig) => ({
      ...group,
      items: group.items.filter((item: NavItemConfig) => 
        item.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
        group.label.toLowerCase().includes(filterQuery.toLowerCase())
      )
    }))
    .filter((group: NavGroupConfig) => group.items.length > 0)

  return (
    <aside className="w-72 border-r border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0 select-none transition-colors duration-200">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
              One Enterprise
            </div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
              UI/UX Reference Console
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search Filter */}
      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search menu..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl pl-9 pr-7 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {filterQuery && (
            <button 
              onClick={() => setFilterQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 text-xs">
        {/* CONCEPT A: UNIVERSAL EDUCATIONAL ARCHITECTURE */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-2.5 py-1 text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
              Educational Architecture
            </span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-mono font-bold">
              Universal
            </span>
          </div>

          <div className="space-y-0.5">
            {filteredEduItems.map((item: NavItemConfig) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all font-medium group
                  ${isActive
                    ? 'bg-indigo-50/90 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {renderIcon(item.iconName)}
                  <span className="truncate">{item.label}</span>
                </div>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 shrink-0" />
              </NavLink>
            ))}
          </div>
        </div>

        {/* VISUAL DIVIDER */}
        <div className="relative my-3 pt-1">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-between items-center">
            <span className="bg-white dark:bg-slate-900 pr-2 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
              {activeProfile.simulationSectionTitle}
            </span>
            <Badge variant={activeProfile.badgeVariant} size="sm">
              {activeProfile.scope}
            </Badge>
          </div>
        </div>

        {/* CONCEPT B: ROLE-BASED OPERATIONAL SIMULATION */}
        <div className="space-y-4">
          {filteredRoleGroups.map((group: NavGroupConfig, gIdx: number) => {
            const isCollapsed = collapsedGroups[group.label] || false
            return (
              <div key={gIdx} className="space-y-1">
                <div 
                  onClick={() => toggleGroup(group.label)}
                  className="flex items-center justify-between px-2.5 py-1 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer rounded-lg transition-colors group"
                >
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {group.label}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`} />
                </div>

                {!isCollapsed && (
                  <div className="space-y-0.5">
                    {group.items.map((item: NavItemConfig) => (
                      <NavLink
                        key={`${group.label}-${item.label}-${item.to}`}
                        to={item.to}
                        end={item.to === '/console'}
                        className={({ isActive }) => `
                          flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all font-medium group
                          ${isActive
                            ? 'bg-indigo-50/90 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 font-bold shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {renderIcon(item.iconName)}
                          <span className="truncate">{item.label}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 shrink-0" />
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* Educational Restricted Items */}
          {activeProfile.restrictedSection && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between px-2.5 py-1">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400">
                  {activeProfile.restrictedSection.title}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                  Global Only
                </span>
              </div>

              <div className="space-y-0.5">
                {activeProfile.restrictedSection.items.map((item: NavItemConfig) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {renderIcon(item.iconName)}
                      <span className="truncate">{item.label}</span>
                    </div>
                    <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Role Context Footer */}
      <div className="p-3 border-t border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
          {activeProfile.roleName}
        </span>
        <Badge variant={activeProfile.badgeVariant} size="sm">
          {activeProfile.scope}
        </Badge>
      </div>
    </aside>
  )
}
