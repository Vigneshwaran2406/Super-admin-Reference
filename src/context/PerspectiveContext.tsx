import React, { createContext, useContext, useState, useEffect } from 'react'
import { ActivePerspective, AdministrativeScope } from '@/types'
import { ROLE_PROFILES, RoleProfile } from '@/config/perspectiveConfig'

interface PerspectiveContextType {
  perspective: ActivePerspective
  setPerspective: (p: ActivePerspective) => void
  previousPerspective: ActivePerspective | null
  showTransitionNotice: boolean
  dismissTransition: () => void
  activeProfile: RoleProfile
  selectedTenant: string
  setSelectedTenant: (t: string) => void
  isDark: boolean
  toggleTheme: () => void
  perspectiveLabel: string
  perspectiveScope: AdministrativeScope
  perspectiveSubtitle: string
  canAccessGlobal: boolean
  canAccessOrg: boolean
}

const PerspectiveContext = createContext<PerspectiveContextType | undefined>(undefined)

export const PerspectiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [perspective, setPerspectiveState] = useState<ActivePerspective>('super-admin')
  const [previousPerspective, setPreviousPerspective] = useState<ActivePerspective | null>(null)
  const [showTransitionNotice, setShowTransitionNotice] = useState<boolean>(false)
  const [selectedTenant, setSelectedTenant] = useState<string>('Acme Technologies Inc.')
  const [isDark, setIsDark] = useState<boolean>(false) // LIGHT MODE IS DEFAULT

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  const setPerspective = (newPerspective: ActivePerspective) => {
    if (newPerspective !== perspective) {
      setPreviousPerspective(perspective)
      setShowTransitionNotice(true)
      setPerspectiveState(newPerspective)
    }
  }

  const dismissTransition = () => {
    setShowTransitionNotice(false)
  }

  const activeProfile: RoleProfile = ROLE_PROFILES[perspective] || ROLE_PROFILES['super-admin']

  const perspectiveLabel = activeProfile.roleName
  const perspectiveScope = activeProfile.scope
  const perspectiveSubtitle = activeProfile.scopeTitle
  const canAccessGlobal = perspective === 'super-admin'
  const canAccessOrg = perspective === 'super-admin' || perspective === 'org-admin'

  return (
    <PerspectiveContext.Provider
      value={{
        perspective,
        setPerspective,
        previousPerspective,
        showTransitionNotice,
        dismissTransition,
        activeProfile,
        selectedTenant,
        setSelectedTenant,
        isDark,
        toggleTheme,
        perspectiveLabel,
        perspectiveScope,
        perspectiveSubtitle,
        canAccessGlobal,
        canAccessOrg,
      }}
    >
      {children}
    </PerspectiveContext.Provider>
  )
}

export const usePerspective = () => {
  const ctx = useContext(PerspectiveContext)
  if (!ctx) throw new Error('usePerspective must be used within PerspectiveProvider')
  return ctx
}
