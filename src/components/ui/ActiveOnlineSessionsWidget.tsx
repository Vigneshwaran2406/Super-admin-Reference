import React from 'react'
import { Radio } from 'lucide-react'
import { StatCard } from './StatCard'

export interface ActiveOnlineSessionsWidgetProps {
  count: number
  label?: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
  isLive?: boolean
}

/**
 * UI-002: Active Online User Sessions Indicator Widget
 * Displays a real-time online concurrent sessions metric with a live visual pulse indicator.
 * Reuses the standard platform StatCard component with motion-safe ping animation.
 */
export const ActiveOnlineSessionsWidget: React.FC<ActiveOnlineSessionsWidgetProps> = ({
  count,
  label = 'Active Online Sessions',
  change = '+5.8% concurrent',
  trend = 'up',
  description = 'Live authenticated user sessions across all provisioned tenants',
  isLive = true,
}) => {
  return (
    <StatCard
      title={label}
      value={count.toLocaleString()}
      change={change}
      trend={trend}
      icon={<Radio className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
      description={description}
      isLive={isLive}
      liveBadgeText="LIVE"
    />
  )
}
