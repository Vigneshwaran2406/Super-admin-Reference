import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

// Public Pages
import { LandingPage } from '@/pages/public/LandingPage'
import { LoginPage } from '@/pages/public/LoginPage'
import { RegisterPage } from '@/pages/public/RegisterPage'

// Educational & Reference
import { AdministrationHierarchyMap } from '@/pages/educational/AdministrationHierarchyMap'
import { AdminAccessMatrix } from '@/pages/educational/AdminAccessMatrix'
import { OrganizationDomainView } from '@/pages/educational/OrganizationDomainView'

// Platform & Governance
import { SuperAdminDashboard } from '@/pages/platform/SuperAdminDashboard'
import { GlobalDashboard } from '@/pages/platform/GlobalDashboard'
import { PlatformConfiguration } from '@/pages/platform/PlatformConfiguration'
import { GlobalSettings } from '@/pages/platform/GlobalSettings'
import { PlatformBranding } from '@/pages/platform/PlatformBranding'
import { LicenseManagement } from '@/pages/platform/LicenseManagement'
import { FeatureManagement } from '@/pages/platform/FeatureManagement'

// Tenants
import { TenantManagement } from '@/pages/tenants/TenantManagement'
import { TenantDetails } from '@/pages/tenants/TenantDetails'

// Organization
import { OrganizationManagement } from '@/pages/organization/OrganizationManagement'
import { CompanySetup } from '@/pages/organization/CompanySetup'
import { BusinessUnits } from '@/pages/organization/BusinessUnits'
import { Departments } from '@/pages/organization/Departments'
import { Branches } from '@/pages/organization/Branches'
import { CostCenters } from '@/pages/organization/CostCenters'
import { Locations } from '@/pages/organization/Locations'

// Users
import { UserManagement } from '@/pages/users/UserManagement'
import { UserDetails } from '@/pages/users/UserDetails'

// Roles & Permissions
import { RoleManagement } from '@/pages/roles/RoleManagement'
import { PermissionManagement } from '@/pages/roles/PermissionManagement'
import { DataPermissions } from '@/pages/roles/DataPermissions'
import { DepartmentPermissions } from '@/pages/roles/DepartmentPermissions'

// Security
import { SecurityDashboard } from '@/pages/security/SecurityDashboard'
import { LoginHistory } from '@/pages/security/LoginHistory'
import { SSOConfiguration } from '@/pages/security/SSOConfiguration'
import { OAuthConfiguration } from '@/pages/security/OAuthConfiguration'
import { MFAConfiguration } from '@/pages/security/MFAConfiguration'
import { PasswordPolicy } from '@/pages/security/PasswordPolicy'
import { AccountLockout } from '@/pages/security/AccountLockout'
import { SecurityAlerts } from '@/pages/security/SecurityAlerts'
import { DeviceManagement } from '@/pages/security/DeviceManagement'
import { SessionManagement } from '@/pages/security/SessionManagement'

// System
import { SystemConfigDashboard } from '@/pages/system/SystemConfigDashboard'
import { GeneralSettings } from '@/pages/system/GeneralSettings'
import { Localization } from '@/pages/system/Localization'
import { Currency } from '@/pages/system/Currency'
import { TimeZone } from '@/pages/system/TimeZone'
import { EmailConfiguration } from '@/pages/system/EmailConfiguration'
import { SMSConfiguration } from '@/pages/system/SMSConfiguration'
import { NotificationManagement } from '@/pages/system/NotificationManagement'

// Audit
import { AuditDashboard } from '@/pages/audit/AuditDashboard'
import { AuditLogs } from '@/pages/audit/AuditLogs'
import { ActivityLogs } from '@/pages/audit/ActivityLogs'
import { SecurityLogs } from '@/pages/audit/SecurityLogs'
import { ComplianceReports } from '@/pages/audit/ComplianceReports'

// Monitoring
import { MonitoringDashboard } from '@/pages/monitoring/MonitoringDashboard'

export const router = createBrowserRouter([
  // 1. Public Landing Page (Zero Admin Sidebar)
  {
    path: '/',
    element: <LandingPage />,
  },

  // 2. Public Login Screen (Separate Credentials Form + Reference Role Simulation)
  {
    path: '/login',
    element: <LoginPage />,
  },

  // 3. Public Organization Onboarding Screen
  {
    path: '/register',
    element: <RegisterPage />,
  },

  // 4. Authenticated Console / Reference Workspace
  {
    element: <AppLayout />,
    children: [
      { path: 'console', element: <SuperAdminDashboard /> },
      
      // Educational maps & matrices (Universal Architecture)
      { path: 'admin/hierarchy-map', element: <AdministrationHierarchyMap /> },
      { path: 'admin/access-matrix', element: <AdminAccessMatrix /> },
      { path: 'admin/domain-view', element: <OrganizationDomainView /> },

      // Platform & Global
      { path: 'platform/global-dashboard', element: <GlobalDashboard /> },
      { path: 'platform/configuration', element: <PlatformConfiguration /> },
      { path: 'platform/settings', element: <GlobalSettings /> },
      { path: 'platform/branding', element: <PlatformBranding /> },
      { path: 'platform/licenses', element: <LicenseManagement /> },
      { path: 'platform/features', element: <FeatureManagement /> },

      // Tenants
      { path: 'tenants', element: <TenantManagement /> },
      { path: 'tenants/:id', element: <TenantDetails /> },

      // Organization Setup
      { path: 'organization', element: <OrganizationManagement /> },
      { path: 'organization/company-setup', element: <CompanySetup /> },
      { path: 'organization/business-units', element: <BusinessUnits /> },
      { path: 'organization/departments', element: <Departments /> },
      { path: 'organization/branches', element: <Branches /> },
      { path: 'organization/cost-centers', element: <CostCenters /> },
      { path: 'organization/locations', element: <Locations /> },

      // Users
      { path: 'users', element: <UserManagement /> },
      { path: 'users/:id', element: <UserDetails /> },

      // Roles & Permissions
      { path: 'roles', element: <RoleManagement /> },
      { path: 'roles/list', element: <RoleManagement /> },
      { path: 'roles/data-permissions', element: <DataPermissions /> },
      { path: 'roles/department-permissions', element: <DepartmentPermissions /> },
      { path: 'permissions', element: <PermissionManagement /> },
      { path: 'permissions/data', element: <DataPermissions /> },
      { path: 'permissions/departments', element: <DepartmentPermissions /> },

      // Authentication & Security
      { path: 'security', element: <SecurityDashboard /> },
      { path: 'security/login-history', element: <LoginHistory /> },
      { path: 'security/sso', element: <SSOConfiguration /> },
      { path: 'security/oauth', element: <OAuthConfiguration /> },
      { path: 'security/mfa', element: <MFAConfiguration /> },
      { path: 'security/password-policy', element: <PasswordPolicy /> },
      { path: 'security/account-lockout', element: <AccountLockout /> },
      { path: 'security/alerts', element: <SecurityAlerts /> },
      { path: 'security/devices', element: <DeviceManagement /> },
      { path: 'security/sessions', element: <SessionManagement /> },

      // System Configuration
      { path: 'system/config', element: <SystemConfigDashboard /> },
      { path: 'system/general', element: <GeneralSettings /> },
      { path: 'system/localization', element: <Localization /> },
      { path: 'system/currency', element: <Currency /> },
      { path: 'system/timezone', element: <TimeZone /> },
      { path: 'system/email', element: <EmailConfiguration /> },
      { path: 'system/sms', element: <SMSConfiguration /> },
      { path: 'system/notifications', element: <NotificationManagement /> },

      // Audit & Compliance
      { path: 'audit', element: <AuditDashboard /> },
      { path: 'audit/logs', element: <AuditLogs /> },
      { path: 'audit/activity', element: <ActivityLogs /> },
      { path: 'audit/security', element: <SecurityLogs /> },
      { path: 'audit/compliance', element: <ComplianceReports /> },

      // Monitoring
      { path: 'monitoring', element: <MonitoringDashboard /> },

      // Catch-all inside console redirects to console dashboard
      { path: '*', element: <Navigate to="/console" replace /> },
    ],
  },
])
