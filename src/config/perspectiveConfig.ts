import React from 'react'
import { ActivePerspective, AdministrativeScope } from '@/types'

export interface NavItemConfig {
  label: string
  to: string
  iconName: string
  scopeNote?: string
  isRestricted?: boolean
  restrictedTag?: string
  restrictedReason?: string
}

export interface NavGroupConfig {
  label: string
  scopeTag?: 'GLOBAL' | 'ORGANIZATION / TENANT' | 'DOMAIN OPERATIONAL'
  items: NavItemConfig[]
}

export interface RoleDashboardData {
  title: string
  managedBy: string
  scope: AdministrativeScope
  accessLevel: string
  hierarchyPosition: string
  purpose: string
  whyItExists: string
  tags: string[]
  kpis: {
    title: string
    value: string
    change: string
    trend: 'up' | 'down' | 'neutral'
    iconName: string
    description: string
  }[]
  primaryChart1: {
    title: string
    subtitle: string
    badgeText: string
    data: { label: string; value: number; max: number; color: string }[]
  }
  primaryChart2: {
    title: string
    subtitle: string
    badgeText: string
    data: { label: string; used: number; total: number; percent: number; color: string }[]
  }
  secondaryVisualization: {
    title: string
    subtitle: string
    services: { name: string; latency: string; status: string; uptime: string }[]
  }
  activity: { id: string; title: string; time: string; badge: string; type: string }[]
  actions: { label: string; to: string; description: string }[]
}


export interface AdministrationScopeInfo {
  myRole: string
  myScope: string
  myResponsibilities: string[]
  myActionBoundary: string
  outsideResponsibility: string
  dataScopeExplanation: string
  rbacExplanation: string
  governanceEquation: {
    action: string
    dataBoundary: string
    result: string
  }
}

export interface RoleCrudCapability {
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'EXPORT' | 'IMPORT' | 'PRINT'
  state: '✓ ALLOWED' | '— NOT AVAILABLE' | '◐ RBAC / SCOPE DEPENDENT' | 'G GLOBAL ONLY' | 'T TENANT SCOPED' | 'D DOMAIN SCOPED'
  description: string
}

export interface RoleProfile {
  id: ActivePerspective
  roleName: string
  shortLabel: string
  scope: AdministrativeScope
  scopeTitle: string
  badgeVariant: 'global' | 'tenant' | 'domain'
  simulationSectionTitle: string
  educationalNotice: string
  transitionRationale: string
  sidebarGroups: NavGroupConfig[]
  restrictedSection?: {
    title: string
    explanation: string
    items: NavItemConfig[]
  }
  dashboard: RoleDashboardData
  administrationScope: AdministrationScopeInfo
  crudCapabilities: RoleCrudCapability[]
  dataBoundarySummary: string
  effectivePermissionContext: string
}

// Universal Educational Architecture (Always available at the top)
export const UNIVERSAL_EDUCATIONAL_NAV: NavGroupConfig = {
  label: 'Educational Architecture',
  scopeTag: 'GLOBAL',
  items: [
    { label: 'Responsibility Map', to: '/admin/hierarchy-map', iconName: 'Network' },
    { label: 'Admin Access Matrix', to: '/admin/access-matrix', iconName: 'TableProperties' },
    { label: 'Organization Domain View', to: '/admin/domain-view', iconName: 'FolderTree' },
  ],
}

// Authoritative role profiles mapping for all 7 perspectives
export const ROLE_PROFILES: Record<ActivePerspective, RoleProfile> = {
  'super-admin': {
    id: 'super-admin',
    roleName: 'Super Administrator',
    shortLabel: 'Super Admin',
    scope: 'GLOBAL',
    scopeTitle: 'Global Platform Control · Cross-Tenant Authority',
    badgeVariant: 'global',
    simulationSectionTitle: 'ROLE-BASED SIMULATION',
    educationalNotice: 'Super Administrator holds root authority over cloud infrastructure, all tenant partitions, global licensing, and platform-wide security.',
    transitionRationale: 'Switched to Super Administrator (GLOBAL). The interface now demonstrates full cross-tenant platform governance, cloud infrastructure controls, and global security policies.',
    sidebarGroups: [
      {
        label: 'Global Platform Control',
        scopeTag: 'GLOBAL',
        items: [
          { label: 'Super Admin Dashboard', to: '/console', iconName: 'LayoutDashboard' },
          { label: 'Super Admin Management', to: '/platform/super-admin', iconName: 'Shield' },
          { label: 'Global Dashboard', to: '/platform/global-dashboard', iconName: 'Globe' },
          { label: 'Platform Configuration', to: '/platform/configuration', iconName: 'Sliders' },
          { label: 'Global Settings', to: '/platform/settings', iconName: 'Settings' },
          { label: 'Platform Branding', to: '/platform/branding', iconName: 'Palette' },
          { label: 'License Management', to: '/platform/licenses', iconName: 'KeyRound' },
          { label: 'Feature Management', to: '/platform/features', iconName: 'ToggleRight' },
        ],
      },
      {
        label: 'Tenant Operations',
        scopeTag: 'GLOBAL',
        items: [
          { label: 'Tenant Management', to: '/tenants', iconName: 'Building2' },
          { label: 'Tenant Details (Acme Corp)', to: '/tenants/TEN-001', iconName: 'Layers' },
        ],
      },
      {
        label: 'Organization Oversight',
        scopeTag: 'GLOBAL',
        items: [
          { label: 'Organization Management', to: '/organization', iconName: 'Building2' },
          { label: 'Company Setup', to: '/organization/company-setup', iconName: 'Briefcase' },
          { label: 'Business Units', to: '/organization/business-units', iconName: 'Boxes' },
          { label: 'Departments', to: '/organization/departments', iconName: 'FolderTree' },
          { label: 'Branches', to: '/organization/branches', iconName: 'MapPin' },
          { label: 'Cost Centers', to: '/organization/cost-centers', iconName: 'DollarSign' },
          { label: 'Locations', to: '/organization/locations', iconName: 'MapPin' },
        ],
      },
      {
        label: 'User & Access Governance',
        scopeTag: 'GLOBAL',
        items: [
          { label: 'User Management', to: '/users', iconName: 'Users' },
          { label: 'User Details', to: '/users/USR-001', iconName: 'UserCog' },
          { label: 'Role Management', to: '/roles', iconName: 'Shield' },
          { label: 'Permission Management', to: '/permissions', iconName: 'Lock' },
          { label: 'Data Permissions', to: '/permissions/data', iconName: 'FileSpreadsheet' },
          { label: 'Department Permissions', to: '/permissions/departments', iconName: 'Network' },
        ],
      },
      {
        label: 'Security',
        scopeTag: 'GLOBAL',
        items: [
          { label: 'Security Dashboard', to: '/security', iconName: 'Shield' },
          { label: 'Login History', to: '/security/login-history', iconName: 'Fingerprint' },
          { label: 'SSO Federation', to: '/security/sso', iconName: 'Lock' },
          { label: 'OAuth Clients', to: '/security/oauth', iconName: 'KeyRound' },
          { label: 'MFA Policy', to: '/security/mfa', iconName: 'Shield' },
          { label: 'Password Policy', to: '/security/password-policy', iconName: 'FileText' },
          { label: 'Account Lockout', to: '/security/account-lockout', iconName: 'Lock' },
          { label: 'Security Alerts', to: '/security/alerts', iconName: 'Activity' },
          { label: 'Device Management', to: '/security/devices', iconName: 'Smartphone' },
          { label: 'Session Management', to: '/security/sessions', iconName: 'Users' },
        ],
      },
      {
        label: 'System Configuration',
        scopeTag: 'GLOBAL',
        items: [
          { label: 'System Configuration', to: '/system/config', iconName: 'Settings' },
          { label: 'General Settings', to: '/system/general', iconName: 'Sliders' },
          { label: 'Localization', to: '/system/localization', iconName: 'Globe' },
          { label: 'Currency', to: '/system/currency', iconName: 'DollarSign' },
          { label: 'Time Zone', to: '/system/timezone', iconName: 'Clock' },
          { label: 'Email Configuration', to: '/system/email', iconName: 'Mail' },
          { label: 'SMS Configuration', to: '/system/sms', iconName: 'Smartphone' },
          { label: 'Notification Management', to: '/system/notifications', iconName: 'Bell' },
        ],
      },
      {
        label: 'Audit & Monitoring',
        scopeTag: 'GLOBAL',
        items: [
          { label: 'Audit Dashboard', to: '/audit', iconName: 'Activity' },
          { label: 'Audit Logs', to: '/audit/logs', iconName: 'FileText' },
          { label: 'Activity Logs', to: '/audit/activity', iconName: 'Activity' },
          { label: 'Security Logs', to: '/audit/security', iconName: 'Shield' },
          { label: 'Compliance Reports', to: '/audit/compliance', iconName: 'FileSpreadsheet' },
          { label: 'Monitoring Dashboard', to: '/monitoring', iconName: 'Activity' },
        ],
      },
    ],
    dashboard: {
      title: 'Super Admin Global Platform Control Hub',
      managedBy: 'SUPER ADMINISTRATOR',
      scope: 'GLOBAL',
      accessLevel: 'ALL TENANTS (Full Global Authority)',
      hierarchyPosition: 'Platform Tier → Super Administrator (Global Authority)',
      purpose: 'Central executive oversight and real-time operational governance across all enterprise tenants, cloud infrastructure, and security posture.',
      whyItExists: 'Operates across all provisioned organizations and cloud clusters to maintain uptime, enforce global licensing quotas, and track cross-tenant infrastructure resilience.',
      tags: ['Global Platform', 'Multi-Tenant', 'Observability', 'Executive Control'],
      kpis: [
        {
          title: 'Total Platform Users',
          value: '14,820',
          change: '+8.4% this month',
          trend: 'up',
          iconName: 'Users',
          description: 'Active accounts across 5 provisioned tenants',
        },
        {
          title: 'Provisioned Tenants',
          value: '5 / 5 Active',
          change: '100% operational',
          trend: 'neutral',
          iconName: 'Building2',
          description: '100% SLA met · 0 quarantined tenants',
        },
        {
          title: 'License Quota Allocation',
          value: '84.0% Allocated',
          change: '420 / 500 Enterprise Seats',
          trend: 'up',
          iconName: 'Key',
          description: '80 available seats in platform pool',
        },
        {
          title: 'Global Platform Health',
          value: '99.98% Uptime',
          change: 'All 8 services online',
          trend: 'up',
          iconName: 'Server',
          description: 'Avg cluster latency 24ms across regions',
        },
      ],
      primaryChart1: {
        title: 'Active Identities by Enterprise Tenant',
        subtitle: 'Comparison of provisioned active identities across isolated enterprise tenants.',
        badgeText: 'Comparison',
        data: [
          { label: 'Acme Technologies', value: 6420, max: 7000, color: 'bg-indigo-600 dark:bg-indigo-500' },
          { label: 'Globex Corporation', value: 3850, max: 7000, color: 'bg-purple-600 dark:bg-purple-500' },
          { label: 'Wayne Industries', value: 2400, max: 7000, color: 'bg-sky-600 dark:bg-sky-500' },
          { label: 'Cyberdyne Systems', value: 1350, max: 7000, color: 'bg-emerald-600 dark:bg-emerald-500' },
          { label: 'Stark Industries', value: 800, max: 7000, color: 'bg-amber-600 dark:bg-amber-500' },
        ],
      },
      primaryChart2: {
        title: 'Global License Quota Consumption by Tier',
        subtitle: 'Seat entitlement distribution across multi-tenant commercial contract tiers.',
        badgeText: 'Utilization',
        data: [
          { label: 'Enterprise Tier Tier-A (Dedicated)', used: 280, total: 300, percent: 93.3, color: 'bg-indigo-600' },
          { label: 'Business Growth Tier (Shared Cloud)', used: 110, total: 150, percent: 73.3, color: 'bg-purple-600' },
          { label: 'Starter Sandbox Tier (Trial)', used: 30, total: 50, percent: 60.0, color: 'bg-emerald-600' },
        ],
      },
      secondaryVisualization: {
        title: 'Cross-Tenant Cloud Microservices Status',
        subtitle: 'Core API gateway routing, multi-region database replicas, and event bus latency.',
        services: [
          { name: 'API Gateway Router', latency: '22 ms', status: 'Healthy', uptime: '99.99%' },
          { name: 'Identity Broker (SSO/OAuth)', latency: '16 ms', status: 'Healthy', uptime: '100.0%' },
          { name: 'Polyglot DB Read Pool', latency: '8 ms', status: 'Optimal', uptime: '99.98%' },
          { name: 'Event Bus (Kafka Stream)', latency: '3 ms', status: 'Optimal', uptime: '100.0%' },
        ],
      },
      activity: [
        { id: '1', title: 'Acme Technologies: Role privilege updated', time: '12m ago', badge: 'Audit', type: 'audit' },
        { id: '2', title: 'Global SSO IdP Certificate rotated successfully', time: '45m ago', badge: 'Security', type: 'security' },
        { id: '3', title: 'Wayne Industries: +50 enterprise seats provisioned', time: '2h ago', badge: 'Licenses', type: 'license' },
        { id: '4', title: 'API rate limit burst handled on Cyberdyne endpoint', time: '4h ago', badge: 'Cluster', type: 'info' },
      ],
      actions: [
        { label: 'Provision New Tenant', to: '/tenants', description: 'Initialize isolated tenant schema and root admin credentials.' },
        { label: 'Manage License Pool', to: '/platform/licenses', description: 'Adjust cross-tenant seat quotas and subscription plans.' },
        { label: 'Global Audit Trail', to: '/audit/logs', description: 'Review immutable platform-wide administrative event records.' },
        { label: 'Platform Security Hub', to: '/security', description: 'Inspect SSO brokers, MFA enforcement, and active sessions.' },
      ],
    },
    dataBoundarySummary: "Global Platform (All 18 Tenants & Cloud Infrastructure)",
    effectivePermissionContext: "Platform Administrator Root Token (Global Platform Authority)",
    administrationScope: {
      "myRole": "Super Administrator",
      "myScope": "GLOBAL",
      "myResponsibilities": [
            "Global Platform Infrastructure & Gateway Cluster",
            "Tenant Provisioning, Quota Allocation & Isolation Lifecycles",
            "Global System Configuration & Multi-Tenant Registry",
            "Enterprise License Pool & Seat Entitlement Management",
            "Platform-Wide Security Standards & Audit Log Verification"
      ],
      "myActionBoundary": "Global / Platform-wide Cross-Tenant",
      "outsideResponsibility": "Direct day-to-day operational execution in specific tenant business domains (handled by Domain Managers)",
      "dataScopeExplanation": "Unrestricted platform-wide access across all tenant schemas and infrastructure nodes.",
      "rbacExplanation": "Full authorization for platform configuration, tenant onboarding, and system-wide security controls.",
      "governanceEquation": {
            "action": "PROVISION TENANT / CONFIGURE CLUSTER",
            "dataBoundary": "Global Multi-Tenant Platform",
            "result": "Global Platform Execution"
      }
},
    crudCapabilities: [
      {
            "action": "CREATE",
            "state": "✓ ALLOWED",
            "description": "Can provision new tenants, licenses, and global configurations."
      },
      {
            "action": "READ",
            "state": "✓ ALLOWED",
            "description": "Can read all platform metrics, directories, and cross-tenant logs."
      },
      {
            "action": "UPDATE",
            "state": "✓ ALLOWED",
            "description": "Can update global settings, feature definitions, and tenant quotas."
      },
      {
            "action": "DELETE",
            "state": "✓ ALLOWED",
            "description": "Can delete/deprovision resources across the platform pool."
      },
      {
            "action": "APPROVE",
            "state": "✓ ALLOWED",
            "description": "Can approve platform-level tier changes and tenant requests."
      },
      {
            "action": "EXPORT",
            "state": "G GLOBAL ONLY",
            "description": "Global platform-wide export of system ledgers and usage metrics."
      },
      {
            "action": "IMPORT",
            "state": "✓ ALLOWED",
            "description": "Can import global license keys, schemas, and system configurations."
      },
      {
            "action": "PRINT",
            "state": "✓ ALLOWED",
            "description": "Standard printable platform summaries and reports."
      }
],
  },

  'org-admin': {
    id: 'org-admin',
    roleName: 'Organization Administrator',
    shortLabel: 'Org Admin',
    scope: 'ORGANIZATION / TENANT',
    scopeTitle: 'Tenant Scoped · Acme Technologies Inc. Governance',
    badgeVariant: 'tenant',
    simulationSectionTitle: 'ROLE-BASED SIMULATION',
    educationalNotice: 'Organization Administrator manages organization structure and organization-level administration. Domain managers operate the day-to-day business domains.',
    transitionRationale: 'Switched to Organization Administrator (ORGANIZATION / TENANT). Global platform controls are no longer shown. The navigation now represents organization-level administration.',
    sidebarGroups: [
      {
        label: 'Organization Administration',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'Organization Overview', to: '/organization', iconName: 'Building2' },
          { label: 'Company Setup', to: '/organization/company-setup', iconName: 'Briefcase' },
          { label: 'Business Units', to: '/organization/business-units', iconName: 'Boxes' },
          { label: 'Departments', to: '/organization/departments', iconName: 'FolderTree' },
          { label: 'Branches', to: '/organization/branches', iconName: 'MapPin' },
          { label: 'Cost Centers', to: '/organization/cost-centers', iconName: 'DollarSign' },
          { label: 'Locations', to: '/organization/locations', iconName: 'MapPin' },
        ],
      },
      {
        label: 'User Administration',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'User Management', to: '/users', iconName: 'Users' },
          { label: 'User Details', to: '/users/USR-001', iconName: 'UserCog' },
          { label: 'Role Management', to: '/roles', iconName: 'Shield' },
          { label: 'Department Permissions', to: '/permissions/departments', iconName: 'Network' },
        ],
      },
      {
        label: 'Security & Access',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'Login History', to: '/security/login-history', iconName: 'Fingerprint' },
          { label: 'Session Management', to: '/security/sessions', iconName: 'Users' },
          { label: 'Security Alerts', to: '/security/alerts', iconName: 'Activity' },
        ],
      },
      {
        label: 'Audit',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'Activity Logs', to: '/audit/activity', iconName: 'Activity' },
          { label: 'Audit Logs', to: '/audit/logs', iconName: 'FileText' },
          { label: 'Compliance Reports', to: '/audit/compliance', iconName: 'FileSpreadsheet' },
        ],
      },
      {
        label: 'Business Domain Reference',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'HRMS (People Ops)', to: '/admin/domain-view?domain=hrms', iconName: 'Users', scopeNote: 'Domain Ref' },
          { label: 'CRM (Commercial Sales)', to: '/admin/domain-view?domain=crm', iconName: 'Briefcase', scopeNote: 'Domain Ref' },
          { label: 'Finance & Accounting', to: '/admin/domain-view?domain=finance', iconName: 'DollarSign', scopeNote: 'Domain Ref' },
          { label: 'Procurement (Sourcing)', to: '/admin/domain-view?domain=erp', iconName: 'ShoppingCart', scopeNote: 'Domain Ref' },
          { label: 'Warehouse & Inventory', to: '/admin/domain-view?domain=warehouse', iconName: 'Boxes', scopeNote: 'Domain Ref' },
        ],
      },
    ],
    restrictedSection: {
      title: 'Global Platform Controls (Restricted)',
      explanation: 'These controls are reserved for Super Administrator and cannot be modified by Organization Administrator.',
      items: [
        { label: 'Global Platform Settings', to: '/platform/settings', iconName: 'Settings', isRestricted: true, restrictedTag: 'GLOBAL ONLY' },
        { label: 'Platform Branding', to: '/platform/branding', iconName: 'Palette', isRestricted: true, restrictedTag: 'GLOBAL ONLY' },
        { label: 'Global Feature Flags', to: '/platform/features', iconName: 'ToggleRight', isRestricted: true, restrictedTag: 'GLOBAL ONLY' },
        { label: 'Multi-Tenant Provisioning', to: '/tenants', iconName: 'Building2', isRestricted: true, restrictedTag: 'GLOBAL ONLY' },
      ],
    },
    dashboard: {
      title: 'Organization Administrator Dashboard · Acme Technologies Inc.',
      managedBy: 'ORGANIZATION ADMINISTRATOR',
      scope: 'ORGANIZATION / TENANT',
      accessLevel: 'TENANT BOUNDED (Acme Technologies Inc.)',
      hierarchyPosition: 'Tenant Tier → Organization Administrator (Acme Technologies)',
      purpose: 'Manages internal identity provisioning, organizational structures, branches, and compliance policies strictly bounded to Acme Technologies Inc.',
      whyItExists: 'Enforces governance and operational boundary control within this specific enterprise tenant without visibility into sibling tenants or underlying cloud nodes.',
      tags: ['Tenant Scope', 'Organization Governance', 'Internal RBAC', 'Department Structure'],
      kpis: [
        {
          title: 'Organization Users',
          value: '1,240 Active',
          change: '+3.2% this quarter',
          trend: 'up',
          iconName: 'Users',
          description: 'Internal personnel registered in Acme Technologies',
        },
        {
          title: 'Internal Departments',
          value: '14 Units',
          change: 'Across 4 business divisions',
          trend: 'neutral',
          iconName: 'FolderTree',
          description: 'Engineering, Sales, Operations, HR, Finance',
        },
        {
          title: 'Regional Branches',
          value: '8 Active Hubs',
          change: 'Global office facilities',
          trend: 'neutral',
          iconName: 'MapPin',
          description: 'New York HQ, London, Singapore, Berlin',
        },
        {
          title: 'Assigned Tenant Seats',
          value: '1,240 / 1,500',
          change: '82.6% quota used',
          trend: 'up',
          iconName: 'Key',
          description: '260 seats available for new hires',
        },
      ],
      primaryChart1: {
        title: 'Department Headcount Breakdown',
        subtitle: 'Internal workforce distribution across recognized business units.',
        badgeText: 'Comparison',
        data: [
          { label: 'Engineering & Tech', value: 420, max: 500, color: 'bg-indigo-600 dark:bg-indigo-500' },
          { label: 'Sales & Business Dev', value: 280, max: 500, color: 'bg-purple-600 dark:bg-purple-500' },
          { label: 'Operations & Logistics', value: 210, max: 500, color: 'bg-sky-600 dark:bg-sky-500' },
          { label: 'Finance & Accounting', value: 140, max: 500, color: 'bg-emerald-600 dark:bg-emerald-500' },
          { label: 'Customer Support', value: 100, max: 500, color: 'bg-amber-600 dark:bg-amber-500' },
          { label: 'Human Resources', value: 90, max: 500, color: 'bg-pink-600 dark:bg-pink-500' },
        ],
      },
      primaryChart2: {
        title: 'Regional Branch Personnel Distribution',
        subtitle: 'Active user presence mapped to physical corporate facilities.',
        badgeText: 'Utilization',
        data: [
          { label: 'New York Global HQ', used: 450, total: 500, percent: 90.0, color: 'bg-indigo-600' },
          { label: 'London European Office', used: 320, total: 400, percent: 80.0, color: 'bg-purple-600' },
          { label: 'San Francisco Tech Hub', used: 210, total: 250, percent: 84.0, color: 'bg-sky-600' },
          { label: 'Singapore APAC Center', used: 160, total: 200, percent: 80.0, color: 'bg-emerald-600' },
          { label: 'Berlin Operations Hub', used: 100, total: 150, percent: 66.7, color: 'bg-amber-600' },
        ],
      },
      secondaryVisualization: {
        title: 'Organization Identity & Access Compliance',
        subtitle: 'Security hygiene, MFA adoption, and permission auditing inside this tenant.',
        services: [
          { name: 'MFA Policy Enforcement', latency: '94.2%', status: 'Compliant', uptime: 'Enforced' },
          { name: 'Password Complexity Standard', latency: '99.1%', status: 'Compliant', uptime: 'Active' },
          { name: 'Active SSO Sessions', latency: '812 Users', status: 'Normal', uptime: 'Verified' },
          { name: 'Unassigned Role Audits', latency: '0 Flags', status: 'Clean', uptime: 'Audited' },
        ],
      },
      activity: [
        { id: '1', title: '12 new engineers provisioned into Engineering department', time: '24m ago', badge: 'Provisioning', type: 'user' },
        { id: '2', title: 'MFA mandatory requirement applied to Singapore branch', time: '1h ago', badge: 'Security', type: 'security' },
        { id: '3', title: 'New Department created: AI Research Group under Tech division', time: '3h ago', badge: 'Structure', type: 'org' },
        { id: '4', title: 'Quarterly RBAC entitlement review completed for Managers', time: '1d ago', badge: 'Compliance', type: 'audit' },
      ],
      actions: [
        { label: 'Invite Organization User', to: '/users', description: 'Provision a new internal employee with department assignment.' },
        { label: 'Configure Departments', to: '/organization/departments', description: 'Manage division hierarchy, cost centers, and branch links.' },
        { label: 'RBAC Roles Matrix', to: '/roles', description: 'Define permission sets, functional boundaries, and delegation.' },
        { label: 'View Access Matrix', to: '/admin/access-matrix', description: 'Verify operational boundaries between Org Admin and Domains.' },
      ],
    },
    dataBoundarySummary: "Tenant Bounded: Acme Technologies Inc. (tenant_id: acme-tech)",
    effectivePermissionContext: "Tenant Administrator Context (tenant_id: acme-tech)",
    administrationScope: {
      "myRole": "Organization Administrator",
      "myScope": "ORGANIZATION / TENANT",
      "myResponsibilities": [
            "Organization Setup, Business Units & Regional Branches",
            "User Directory Provisioning & Identity Account Grants",
            "Department Structure, Division Linking & Cost Center Oversight",
            "Tenant Feature Enablement (within global definitions)",
            "Organization-Scoped Audit Trails & Compliance Verification"
      ],
      "myActionBoundary": "Assigned Organization (Acme Technologies Inc.)",
      "outsideResponsibility": "Global cloud infrastructure, cross-tenant provisioning, and platform-wide network configurations",
      "dataScopeExplanation": "Data-level isolation binds all queries to Acme Technologies Inc. (tenant_id). No access to sibling tenants.",
      "rbacExplanation": "Authorizes administrative user creation, department restructuring, and tenant-scoped role assignments.",
      "governanceEquation": {
            "action": "INVITE USER / CREATE DEPARTMENT",
            "dataBoundary": "Acme Technologies Inc. Scope",
            "result": "Tenant-Bounded Administrative Execution"
      }
},
    crudCapabilities: [
      {
            "action": "CREATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can create users, departments, and roles inside Acme Technologies."
      },
      {
            "action": "READ",
            "state": "✓ ALLOWED",
            "description": "Can view all records within Acme Technologies organization."
      },
      {
            "action": "UPDATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can modify department hierarchies, users, and tenant settings."
      },
      {
            "action": "DELETE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can remove internal records; cannot deprovision tenant itself."
      },
      {
            "action": "APPROVE",
            "state": "✓ ALLOWED",
            "description": "Can approve internal role elevations and department changes."
      },
      {
            "action": "EXPORT",
            "state": "T TENANT SCOPED",
            "description": "Exports restricted strictly to Acme Technologies data."
      },
      {
            "action": "IMPORT",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can import organization user lists and department mappings."
      },
      {
            "action": "PRINT",
            "state": "✓ ALLOWED",
            "description": "Can print organization rosters and hierarchy charts."
      }
],
  },

  'hr-manager': {
    id: 'hr-manager',
    roleName: 'HR Manager',
    shortLabel: 'HR Manager',
    scope: 'DOMAIN OPERATIONAL',
    scopeTitle: 'DOMAIN OPERATIONAL — HRMS · Workforce Operations',
    badgeVariant: 'domain',
    simulationSectionTitle: 'DOMAIN OPERATIONAL SIMULATION',
    educationalNotice: 'HR Manager operates HRMS business processes. This role does not administer the enterprise platform.',
    transitionRationale: 'Switched to HR Manager (DOMAIN OPERATIONAL — HRMS). Organization administration is no longer the primary responsibility. The interface now represents HRMS operational ownership.',
    sidebarGroups: [
      {
        label: 'HRMS',
        scopeTag: 'DOMAIN OPERATIONAL',
        items: [
          { label: 'HR Dashboard', to: '/console', iconName: 'LayoutDashboard' },
          { label: 'Employees', to: '/users', iconName: 'Users' },
          { label: 'Recruitment / Hiring', to: '/users/USR-001', iconName: 'Briefcase' },
          { label: 'Leave', to: '/organization/departments', iconName: 'Calendar' },
          { label: 'Payroll Reference', to: '/organization/cost-centers', iconName: 'DollarSign' },
          { label: 'HR Activity', to: '/audit/activity', iconName: 'Activity' },
        ],
      },
      {
        label: 'Organization Context',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'Organization Overview', to: '/organization', iconName: 'Building2', scopeNote: 'Reference' },
        ],
      },
    ],
    dashboard: {
      title: 'HR Manager Operational Dashboard · Acme Technologies',
      managedBy: 'HR MANAGER (Domain Operational Role)',
      scope: 'DOMAIN OPERATIONAL',
      accessLevel: 'HRMS & WORKFORCE DATA (Acme Technologies)',
      hierarchyPosition: 'Domain Tier → HR Manager (Human Resources & People Ops)',
      purpose: 'Operational management of workforce planning, employee lifecycles, attendance records, and hiring pipelines.',
      whyItExists: 'Focuses on employee lifecycle and talent operations within the organization without granting access to IT infrastructure or financial ledgers.',
      tags: ['HRMS Domain', 'Workforce Ops', 'Talent Lifecycle', 'Domain Specific'],
      kpis: [
        {
          title: 'Total Workforce',
          value: '1,240 Employees',
          change: '98.2% full-time active',
          trend: 'up',
          iconName: 'Users',
          description: 'Active personnel in organization directory',
        },
        {
          title: 'Open Requisitions',
          value: '38 Positions',
          change: '14 in final loop',
          trend: 'neutral',
          iconName: 'Briefcase',
          description: 'Active recruitment pipelines across units',
        },
        {
          title: 'New Hires (QTD)',
          value: '24 Onboarded',
          change: '96% on-time onboarding',
          trend: 'up',
          iconName: 'CheckCircle2',
          description: 'Completed compliance and setup checklist',
        },
        {
          title: 'Annual Retention Rate',
          value: '94.6% Retention',
          change: '+1.8% vs industry benchmark',
          trend: 'up',
          iconName: 'TrendingUp',
          description: 'Measured over trailing 12 months',
        },
      ],
      primaryChart1: {
        title: 'Quarterly Headcount Growth Velocity',
        subtitle: 'Net workforce additions over consecutive fiscal quarters.',
        badgeText: 'Comparison',
        data: [
          { label: 'Fiscal Q1', value: 1120, max: 1300, color: 'bg-indigo-600 dark:bg-indigo-500' },
          { label: 'Fiscal Q2', value: 1165, max: 1300, color: 'bg-purple-600 dark:bg-purple-500' },
          { label: 'Fiscal Q3', value: 1210, max: 1300, color: 'bg-sky-600 dark:bg-sky-500' },
          { label: 'Fiscal Q4 (Current)', value: 1240, max: 1300, color: 'bg-emerald-600 dark:bg-emerald-500' },
        ],
      },
      primaryChart2: {
        title: 'Recruitment Candidate Pipeline by Unit',
        subtitle: 'Active candidates currently advancing through interview loops.',
        badgeText: 'Utilization',
        data: [
          { label: 'Engineering & Product', used: 18, total: 20, percent: 90.0, color: 'bg-indigo-600' },
          { label: 'Sales & Revenue Ops', used: 10, total: 12, percent: 83.3, color: 'bg-purple-600' },
          { label: 'Customer Operations', used: 5, total: 6, percent: 83.3, color: 'bg-emerald-600' },
          { label: 'Finance & Legal', used: 3, total: 4, percent: 75.0, color: 'bg-amber-600' },
          { label: 'People & Workplace', used: 2, total: 2, percent: 100.0, color: 'bg-sky-600' },
        ],
      },
      secondaryVisualization: {
        title: 'Workforce Experience & Seniority Distribution',
        subtitle: 'Talent composition across corporate levels within the organization.',
        services: [
          { name: 'Mid-Level Professionals', latency: '46.0%', status: 'Core', uptime: '570 Staff' },
          { name: 'Associate & Entry Specialists', latency: '28.0%', status: 'Growth', uptime: '347 Staff' },
          { name: 'Senior & Staff Architects', latency: '18.0%', status: 'Leadership', uptime: '223 Staff' },
          { name: 'Executive & Department Heads', latency: '8.0%', status: 'Executive', uptime: '100 Staff' },
        ],
      },
      activity: [
        { id: '1', title: 'Offer letter signed: Principal Cloud Architect for Tech division', time: '35m ago', badge: 'Recruitment', type: 'hiring' },
        { id: '2', title: 'Annual benefits open-enrollment packet distributed to all branches', time: '2h ago', badge: 'Benefits', type: 'hr' },
        { id: '3', title: 'Mid-Year performance appraisal reviews reached 92% completion', time: '5h ago', badge: 'Appraisal', type: 'review' },
        { id: '4', title: '6 new customer support team members completed Day-30 check-in', time: '1d ago', badge: 'Onboarding', type: 'onboarding' },
      ],
      actions: [
        { label: 'View Employees', to: '/users', description: 'Review active workforce roster, job codes, and departments.' },
        { label: 'Review Hiring Pipeline', to: '/users/USR-001', description: 'Check open interview loops and candidate offers.' },
        { label: 'Review Leave Balances', to: '/organization/departments', description: 'Inspect approved PTO and departmental staffing coverages.' },
        { label: 'Review HR Activity', to: '/audit/activity', description: 'Inspect real-time people operations log stream.' },
      ],
    },
    dataBoundarySummary: "Domain Bounded: HRMS & People Operations (Acme Technologies)",
    effectivePermissionContext: "HR Manager Domain Context (domain: hrms, tenant: acme-tech)",
    administrationScope: {
      "myRole": "HR Manager",
      "myScope": "DOMAIN OPERATIONAL — HRMS",
      "myResponsibilities": [
            "Employee Directory, Profiles & Department Assignments",
            "Recruitment Loops, Candidate Pipelines & Hiring Requisitions",
            "Leave & Attendance Policy Tracking and Status Transitions",
            "Departmental HR Workflow Approvals & Onboarding Checklists",
            "Workforce Planning, Growth Velocity & Retention Tracking"
      ],
      "myActionBoundary": "HRMS / Assigned Organization Scope",
      "outsideResponsibility": "Financial ledgers, sales opportunities, system configuration, edge gateways, or cross-tenant databases",
      "dataScopeExplanation": "Confined to HRMS workforce data, candidate pipelines, and leave records within Acme Technologies.",
      "rbacExplanation": "Authorizes employee status transitions, candidate loop advancement, and leave approvals.",
      "governanceEquation": {
            "action": "UPDATE EMPLOYEE RECORD",
            "dataBoundary": "HRMS Domain / Acme Technologies",
            "result": "Domain Operational HR Execution"
      }
},
    crudCapabilities: [
      {
            "action": "CREATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can create employee candidate profiles and leave requests."
      },
      {
            "action": "READ",
            "state": "✓ ALLOWED",
            "description": "Can view workforce directory and recruitment pipelines."
      },
      {
            "action": "UPDATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can update employee profiles and candidate interview stages."
      },
      {
            "action": "DELETE",
            "state": "— NOT AVAILABLE",
            "description": "Employee records cannot be deleted; status changed to Inactive."
      },
      {
            "action": "APPROVE",
            "state": "✓ ALLOWED",
            "description": "Can approve employee leave and hiring requisitions."
      },
      {
            "action": "EXPORT",
            "state": "D DOMAIN SCOPED",
            "description": "Can export workforce rosters and recruitment summaries."
      },
      {
            "action": "IMPORT",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can import candidate resumes and attendance files."
      },
      {
            "action": "PRINT",
            "state": "✓ ALLOWED",
            "description": "Can print employee badges and department rosters."
      }
],
  },

  'sales-manager': {
    id: 'sales-manager',
    roleName: 'Sales Manager',
    shortLabel: 'Sales Manager',
    scope: 'DOMAIN OPERATIONAL',
    scopeTitle: 'DOMAIN OPERATIONAL — CRM · Commercial & Pipeline Operations',
    badgeVariant: 'domain',
    simulationSectionTitle: 'DOMAIN OPERATIONAL SIMULATION',
    educationalNotice: 'Sales Manager operates CRM deals, lead funnels, and revenue pipelines. This role does not administer the enterprise platform or other business domains.',
    transitionRationale: 'Switched to Sales Manager (DOMAIN OPERATIONAL — CRM). The interface now represents CRM commercial pipelines, quota tracking, and sales activity.',
    sidebarGroups: [
      {
        label: 'CRM',
        scopeTag: 'DOMAIN OPERATIONAL',
        items: [
          { label: 'Sales Dashboard', to: '/console', iconName: 'LayoutDashboard' },
          { label: 'Leads', to: '/users', iconName: 'UserCheck' },
          { label: 'Opportunities', to: '/organization/business-units', iconName: 'Boxes' },
          { label: 'Pipeline', to: '/organization/branches', iconName: 'TrendingUp' },
          { label: 'Deals', to: '/organization/cost-centers', iconName: 'DollarSign' },
          { label: 'Sales Activity', to: '/audit/activity', iconName: 'Activity' },
        ],
      },
      {
        label: 'Organization Context',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'Organization Overview', to: '/organization', iconName: 'Building2', scopeNote: 'Reference' },
        ],
      },
    ],
    dashboard: {
      title: 'Sales Manager Operational Dashboard · Acme Technologies',
      managedBy: 'SALES MANAGER (Domain Operational Role)',
      scope: 'DOMAIN OPERATIONAL',
      accessLevel: 'CRM & PIPELINE DATA (Acme Technologies)',
      hierarchyPosition: 'Domain Tier → Sales Manager (Commercial & Revenue Ops)',
      purpose: 'Operational management of sales deal pipelines, revenue forecasts, sales rep quotas, and customer conversion metrics.',
      whyItExists: 'Manages customer relationships and commercial deals without exposing HR personnel records or infrastructure configurations.',
      tags: ['CRM Domain', 'Revenue Ops', 'Pipeline Management', 'Domain Specific'],
      kpis: [
        {
          title: 'Active Pipeline Value',
          value: '$6.42M Pipeline',
          change: '142 active opportunities',
          trend: 'up',
          iconName: 'DollarSign',
          description: 'Weighted forecast value across deal stages',
        },
        {
          title: 'Closed Won (QTD)',
          value: '$2.18M Won',
          change: '104% of quarterly quota',
          trend: 'up',
          iconName: 'CheckCircle2',
          description: 'Exceeded quarterly revenue target',
        },
        {
          title: 'Lead Conversion Rate',
          value: '29.4% Win Rate',
          change: '+2.3% improvement',
          trend: 'up',
          iconName: 'TrendingUp',
          description: 'Qualified lead to contracted customer',
        },
        {
          title: 'Average Deal Value',
          value: '$45.2K Average',
          change: '38 days avg sales cycle',
          trend: 'neutral',
          iconName: 'Clock',
          description: 'Contract value across enterprise tier',
        },
      ],
      primaryChart1: {
        title: 'Sales Pipeline Value by Deal Stage',
        subtitle: 'Capital volume flowing through active enterprise sales pipeline stages.',
        badgeText: 'Funnel',
        data: [
          { label: '1. Lead Ingestion', value: 1800, max: 2000, color: 'bg-indigo-600 dark:bg-indigo-500' },
          { label: '2. Solution Discovery', value: 1600, max: 2000, color: 'bg-purple-600 dark:bg-purple-500' },
          { label: '3. Technical Demo & PoC', value: 1400, max: 2000, color: 'bg-sky-600 dark:bg-sky-500' },
          { label: '4. Executive Proposal', value: 1100, max: 2000, color: 'bg-emerald-600 dark:bg-emerald-500' },
          { label: '5. Contract Closing', value: 520, max: 2000, color: 'bg-amber-600 dark:bg-amber-500' },
        ],
      },
      primaryChart2: {
        title: 'Regional Revenue Quota Attainment',
        subtitle: 'Target performance progress across sales territories.',
        badgeText: 'Quota',
        data: [
          { label: 'North America Enterprise', used: 1120, total: 1000, percent: 112.0, color: 'bg-emerald-600' },
          { label: 'EMEA Corporate Accounts', used: 980, total: 1000, percent: 98.0, color: 'bg-indigo-600' },
          { label: 'APAC Regional Expansion', used: 520, total: 500, percent: 104.0, color: 'bg-purple-600' },
          { label: 'Strategic Global Accounts', used: 340, total: 400, percent: 85.0, color: 'bg-amber-600' },
        ],
      },
      secondaryVisualization: {
        title: 'Top Inbound Deal Channels',
        subtitle: 'Source attribution metrics for current quarter opportunities.',
        services: [
          { name: 'Direct Enterprise SDR Outbound', latency: '42.0%', status: 'Primary', uptime: '$2.70M' },
          { name: 'Organic Cloud Marketplace Leads', latency: '26.0%', status: 'Inbound', uptime: '$1.67M' },
          { name: 'Partner & Reseller Ecosystem', latency: '21.0%', status: 'Partner', uptime: '$1.35M' },
          { name: 'Webinars & Executive Events', latency: '11.0%', status: 'Marketing', uptime: '$0.70M' },
        ],
      },
      activity: [
        { id: '1', title: 'Closed Won: $180k 3-year contract with Global Logistics Inc', time: '40m ago', badge: 'Won Deal', type: 'sales' },
        { id: '2', title: 'Proposal delivered: $340k enterprise transformation for FinTech Core', time: '2h ago', badge: 'Proposal', type: 'crm' },
        { id: '3', title: '14 new marketing-qualified inbound leads assigned to territory reps', time: '4h ago', badge: 'Routing', type: 'lead' },
        { id: '4', title: 'Quarterly sales commission ledger generated for executive approval', time: '1d ago', badge: 'Commissions', type: 'finance' },
      ],
      actions: [
        { label: 'Review Pipeline', to: '/organization/branches', description: 'Inspect stage conversions and quarterly weighted revenue forecast.' },
        { label: 'View Leads', to: '/users', description: 'Review marketing qualified leads ready for account rep outreach.' },
        { label: 'Review Opportunities', to: '/organization/business-units', description: 'Examine active high-value enterprise deal terms.' },
        { label: 'Sales Activity Stream', to: '/audit/activity', description: 'Monitor live sales rep activity, calls, and proposals.' },
      ],
    },
    dataBoundarySummary: "Domain Bounded: CRM & Revenue Operations (Acme Technologies)",
    effectivePermissionContext: "Sales Manager Domain Context (domain: crm, tenant: acme-tech)",
    administrationScope: {
      "myRole": "Sales Manager",
      "myScope": "DOMAIN OPERATIONAL — CRM",
      "myResponsibilities": [
            "Customer Accounts, Leads & Contact Directories",
            "Sales Opportunities, Deals & Pipeline Forecasting",
            "Revenue Velocity, Win Rate & Territory Target Tracking",
            "Sales Representative Assignments & Quota Management",
            "Customer Relationship Touchpoints & Meeting Schedules"
      ],
      "myActionBoundary": "CRM / Assigned Organization & Territory Scope",
      "outsideResponsibility": "Employee payroll, IT infrastructure, procurement contracts, or other tenant accounts",
      "dataScopeExplanation": "Confined to CRM accounts, leads, and pipeline records within assigned organization territories.",
      "rbacExplanation": "Authorizes deal stage progression, customer account edits, and quote issuance.",
      "governanceEquation": {
            "action": "UPDATE OPPORTUNITY STAGE",
            "dataBoundary": "Assigned Regional Territory Scope",
            "result": "Territory-Bounded Sales Execution"
      }
},
    crudCapabilities: [
      {
            "action": "CREATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can create leads, accounts, and deal opportunities."
      },
      {
            "action": "READ",
            "state": "✓ ALLOWED",
            "description": "Can view sales pipeline and account history in assigned territory."
      },
      {
            "action": "UPDATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can update deal stages, quote amounts, and contact details."
      },
      {
            "action": "DELETE",
            "state": "— NOT AVAILABLE",
            "description": "Deals are marked Lost/Archived rather than permanently deleted."
      },
      {
            "action": "APPROVE",
            "state": "✓ ALLOWED",
            "description": "Can approve customer discount requests and proposal quotes."
      },
      {
            "action": "EXPORT",
            "state": "D DOMAIN SCOPED",
            "description": "Can export CRM pipeline forecasts and lead lists."
      },
      {
            "action": "IMPORT",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can import bulk sales leads from approved campaigns."
      },
      {
            "action": "PRINT",
            "state": "✓ ALLOWED",
            "description": "Can print sales orders and customer invoices."
      }
],
  },

  'finance-manager': {
    id: 'finance-manager',
    roleName: 'Finance Manager',
    shortLabel: 'Finance Manager',
    scope: 'DOMAIN OPERATIONAL',
    scopeTitle: 'DOMAIN OPERATIONAL — FINANCE · Fiscal Governance & Ledger',
    badgeVariant: 'domain',
    simulationSectionTitle: 'DOMAIN OPERATIONAL SIMULATION',
    educationalNotice: 'Finance Manager operates company accounts, ledgers, and billing compliance. This role does not manage IT systems or operational recruitment.',
    transitionRationale: 'Switched to Finance Manager (DOMAIN OPERATIONAL — FINANCE). The interface now represents fiscal ledger control, invoicing, accounts payable/receivable, and cash flow governance.',
    sidebarGroups: [
      {
        label: 'Finance',
        scopeTag: 'DOMAIN OPERATIONAL',
        items: [
          { label: 'Finance Dashboard', to: '/console', iconName: 'LayoutDashboard' },
          { label: 'Receivables', to: '/organization/cost-centers', iconName: 'TrendingUp' },
          { label: 'Payables', to: '/organization/departments', iconName: 'CreditCard' },
          { label: 'Transactions / Ledger Reference', to: '/audit/logs', iconName: 'FileText' },
          { label: 'Cost Centers', to: '/organization/cost-centers', iconName: 'DollarSign' },
          { label: 'Finance Activity', to: '/audit/activity', iconName: 'Activity' },
        ],
      },
      {
        label: 'Organization Context',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'Organization Overview', to: '/organization', iconName: 'Building2', scopeNote: 'Reference' },
        ],
      },
    ],
    dashboard: {
      title: 'Finance Manager Operational Dashboard · Acme Technologies',
      managedBy: 'FINANCE MANAGER (Domain Operational Role)',
      scope: 'DOMAIN OPERATIONAL',
      accessLevel: 'FINANCIAL LEDGERS & BILLING (Acme Technologies)',
      hierarchyPosition: 'Domain Tier → Finance Manager (Treasury & General Ledger)',
      purpose: 'Governs enterprise ledgers, monthly customer invoicing, cost center budgets, accounts payable, and fiscal compliance.',
      whyItExists: 'Governs monetary transactions, balance books, and financial compliance without IT or domain operational interference.',
      tags: ['Finance Domain', 'General Ledger', 'Invoicing & AR/AP', 'Domain Specific'],
      kpis: [
        {
          title: 'Total Invoiced (MTD)',
          value: '$1.84M Invoiced',
          change: '186 invoices processed',
          trend: 'up',
          iconName: 'DollarSign',
          description: 'Customer receivables dispatched this month',
        },
        {
          title: 'Accounts Receivable',
          value: '$342K Pending',
          change: '94% within 30-day terms',
          trend: 'neutral',
          iconName: 'Clock',
          description: 'Healthy collection turnaround window',
        },
        {
          title: 'Operating Expenses (Opex)',
          value: '$912K Opex',
          change: '6.4% under planned budget',
          trend: 'up',
          iconName: 'CheckCircle2',
          description: 'Maintained disciplined departmental burn',
        },
        {
          title: 'Quick Liquidity Ratio',
          value: '1.48x Ratio',
          change: 'High solvency rating',
          trend: 'up',
          iconName: 'TrendingUp',
          description: 'Cash & receivables vs current liabilities',
        },
      ],
      primaryChart1: {
        title: 'Monthly Operating Expense by Cost Center',
        subtitle: 'Departmental operational expenditures against fiscal budget allocations.',
        badgeText: 'Comparison',
        data: [
          { label: 'Engineering & Cloud R&D', value: 380, max: 450, color: 'bg-indigo-600 dark:bg-indigo-500' },
          { label: 'Sales & Global Marketing', value: 260, max: 450, color: 'bg-purple-600 dark:bg-purple-500' },
          { label: 'General & Administrative', value: 150, max: 450, color: 'bg-sky-600 dark:bg-sky-500' },
          { label: 'Facilities & Workplace', value: 122, max: 450, color: 'bg-emerald-600 dark:bg-emerald-500' },
        ],
      },
      primaryChart2: {
        title: 'Accounts Receivable Aging Buckets',
        subtitle: 'Outstanding invoice payments classified by aging duration.',
        badgeText: 'Aging',
        data: [
          { label: 'Current (0–30 Days Outstanding)', used: 280, total: 342, percent: 81.9, color: 'bg-emerald-600' },
          { label: 'Past Due (31–60 Days)', used: 48, total: 342, percent: 14.0, color: 'bg-amber-600' },
          { label: 'Delinquent (60+ Days Warning)', used: 14, total: 342, percent: 4.1, color: 'bg-rose-600' },
        ],
      },
      secondaryVisualization: {
        title: 'Fiscal Ledger Health & Reconciliations',
        subtitle: 'Status of financial closing and automated bank feed reconciliations.',
        services: [
          { name: 'Corporate Banking Feed Sync', latency: 'Real-Time', status: 'Reconciled', uptime: '100.0%' },
          { name: 'Accounts Payable Approval Flow', latency: '1.2 Days', status: 'Optimal', uptime: 'Current' },
          { name: 'Quarterly VAT/Tax Accrual', latency: 'On Track', status: 'Verified', uptime: 'Current' },
          { name: 'Chart of Accounts Integrity', latency: '0 Errors', status: 'Balanced', uptime: 'Verified' },
        ],
      },
      activity: [
        { id: '1', title: 'Batch billing cycle executed: 142 enterprise invoices issued', time: '1h ago', badge: 'Billing', type: 'finance' },
        { id: '2', title: 'Vendor payment approved: Data center colocation lease ($42,000)', time: '3h ago', badge: 'Accounts Payable', type: 'po' },
        { id: '3', title: 'Automated bank wire feed reconciled 34 incoming client transfers', time: '6h ago', badge: 'Treasury', type: 'bank' },
        { id: '4', title: 'External auditor access granted for annual SOC 2 fiscal inspection', time: '1d ago', badge: 'Audit', type: 'compliance' },
      ],
      actions: [
        { label: 'Review Receivables', to: '/organization/cost-centers', description: 'Monitor pending customer payments and 30-day collection cycles.' },
        { label: 'Review Payables', to: '/organization/departments', description: 'Approve vendor invoices and three-way matched requisitions.' },
        { label: 'Review Approvals', to: '/audit/logs', description: 'Audit high-value capital expenditure signatures.' },
        { label: 'Finance Activity Stream', to: '/audit/activity', description: 'Inspect real-time general ledger transactions.' },
      ],
    },
    dataBoundarySummary: "Domain Bounded: Finance & Accounting (Acme Technologies)",
    effectivePermissionContext: "Finance Manager Domain Context (domain: finance, tenant: acme-tech)",
    administrationScope: {
      "myRole": "Finance Manager",
      "myScope": "DOMAIN OPERATIONAL — FINANCE",
      "myResponsibilities": [
            "Accounts Receivable, Invoicing & Billing Workflows",
            "Accounts Payable, Vendor Disbursements & Expense Settlement",
            "General Ledger Journals & Fiscal Period Close Oversight",
            "Cost Center Allocations & Departmental Budget Variance",
            "Financial Audit Compliance & Quarterly Tax Reporting"
      ],
      "myActionBoundary": "Finance / Assigned Organization Cost Center Scope",
      "outsideResponsibility": "Employee recruitment, CRM sales pipelines, cloud server topology, or other tenant ledgers",
      "dataScopeExplanation": "Confined to general ledger transactions, invoices, and payment vouchers within Acme Technologies.",
      "rbacExplanation": "Authorizes payment journal postings, high-value invoice approvals, and financial ledger exports.",
      "governanceEquation": {
            "action": "APPROVE INVOICE / POST JOURNAL",
            "dataBoundary": "Finance Cost Center Scope",
            "result": "Cost-Center-Bounded Fiscal Execution"
      }
},
    crudCapabilities: [
      {
            "action": "CREATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can create billing invoices, debit/credit notes, and journal entries."
      },
      {
            "action": "READ",
            "state": "✓ ALLOWED",
            "description": "Can view general ledger balances and financial transaction journals."
      },
      {
            "action": "UPDATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can modify draft invoices before final posting."
      },
      {
            "action": "DELETE",
            "state": "— NOT AVAILABLE",
            "description": "Ledger records are immutable; corrections require adjusting entries."
      },
      {
            "action": "APPROVE",
            "state": "✓ ALLOWED",
            "description": "Can approve invoice settlements and cost center transfers."
      },
      {
            "action": "EXPORT",
            "state": "D DOMAIN SCOPED",
            "description": "Can export trial balances, income statements, and tax files."
      },
      {
            "action": "IMPORT",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can import bank reconciliation statement feeds."
      },
      {
            "action": "PRINT",
            "state": "✓ ALLOWED",
            "description": "Can print formal audit vouchers and customer invoices."
      }
],
  },

  'procurement-manager': {
    id: 'procurement-manager',
    roleName: 'Procurement Manager',
    shortLabel: 'Procurement Manager',
    scope: 'DOMAIN OPERATIONAL',
    scopeTitle: 'DOMAIN OPERATIONAL — PROCUREMENT · Sourcing & Vendor Operations',
    badgeVariant: 'domain',
    simulationSectionTitle: 'DOMAIN OPERATIONAL SIMULATION',
    educationalNotice: 'Procurement Manager manages supplier catalogs, vendor contracts, and purchase orders. This role does not manage customer CRM or tenant IT boundaries.',
    transitionRationale: 'Switched to Procurement Manager (DOMAIN OPERATIONAL — PROCUREMENT). The interface now represents vendor sourcing, purchase order lifecycles, and spend categories.',
    sidebarGroups: [
      {
        label: 'Procurement',
        scopeTag: 'DOMAIN OPERATIONAL',
        items: [
          { label: 'Procurement Dashboard', to: '/console', iconName: 'LayoutDashboard' },
          { label: 'Purchase Requests', to: '/organization/cost-centers', iconName: 'FileText' },
          { label: 'Purchase Orders', to: '/organization/departments', iconName: 'ShoppingCart' },
          { label: 'Suppliers', to: '/organization/branches', iconName: 'Building2' },
          { label: 'Procurement Activity', to: '/audit/activity', iconName: 'Activity' },
        ],
      },
      {
        label: 'Organization Context',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'Organization Overview', to: '/organization', iconName: 'Building2', scopeNote: 'Reference' },
        ],
      },
    ],
    dashboard: {
      title: 'Procurement Manager Operational Dashboard · Acme Technologies',
      managedBy: 'PROCUREMENT MANAGER (Domain Operational Role)',
      scope: 'DOMAIN OPERATIONAL',
      accessLevel: 'SUPPLIERS & PURCHASING (Acme Technologies)',
      hierarchyPosition: 'Domain Tier → Procurement Manager (Supply Chain & Sourcing)',
      purpose: 'Manages supplier catalogs, RFQs, vendor compliance SLAs, purchase orders, and strategic procurement spend.',
      whyItExists: 'Controls procurement contracts and external supplier approvals without access to customer sales deals or internal personnel files.',
      tags: ['Procurement Domain', 'Supply Chain', 'Vendor Management', 'Domain Specific'],
      kpis: [
        {
          title: 'Active Approved Vendors',
          value: '86 Suppliers',
          change: '98% certified & compliant',
          trend: 'up',
          iconName: 'Building2',
          description: 'Certified suppliers in vendor catalog',
        },
        {
          title: 'Open Purchase Orders',
          value: '34 Active POs',
          change: '$620K total commitment',
          trend: 'neutral',
          iconName: 'ShoppingCart',
          description: 'Pending vendor fulfillment and delivery',
        },
        {
          title: 'Spend Under Management',
          value: '$3.48M Annual',
          change: '92% on contracted rates',
          trend: 'up',
          iconName: 'DollarSign',
          description: 'Negotiated enterprise volume discounts',
        },
        {
          title: 'Supplier On-Time Delivery',
          value: '95.2% SLA Met',
          change: '+1.4% improvement MoM',
          trend: 'up',
          iconName: 'CheckCircle2',
          description: 'Fulfillment accuracy across suppliers',
        },
      ],
      primaryChart1: {
        title: 'Procurement Spend by Commodity Category',
        subtitle: 'Expenditure distribution across commercial supplier classifications.',
        badgeText: 'Spend',
        data: [
          { label: 'Cloud Infrastructure & SaaS', value: 1400, max: 1600, color: 'bg-indigo-600 dark:bg-indigo-500' },
          { label: 'Professional Advisory & Legal', value: 920, max: 1600, color: 'bg-purple-600 dark:bg-purple-500' },
          { label: 'Hardware & Workstations', value: 680, max: 1600, color: 'bg-sky-600 dark:bg-sky-500' },
          { label: 'Workplace & Facilities Supplies', value: 480, max: 1600, color: 'bg-emerald-600 dark:bg-emerald-500' },
        ],
      },
      primaryChart2: {
        title: 'Purchase Order Approval Turnaround Time',
        subtitle: 'Requisition to purchase order dispatch processing speed.',
        badgeText: 'Speed',
        data: [
          { label: 'Standard Tier (<$10,000): 0.8 Days', used: 94, total: 100, percent: 94.0, color: 'bg-emerald-600' },
          { label: 'Executive Tier ($10k–$50k): 1.6 Days', used: 88, total: 100, percent: 88.0, color: 'bg-indigo-600' },
          { label: 'Board Tier (>$50,000): 3.2 Days', used: 80, total: 100, percent: 80.0, color: 'bg-purple-600' },
        ],
      },
      secondaryVisualization: {
        title: 'Vendor Risk & Security SLA Scorecard',
        subtitle: 'Compliance tracking across tier-1 critical operational suppliers.',
        services: [
          { name: 'Tier 1 Critical Cloud Providers', latency: '100%', status: 'Audited', uptime: 'ISO 27001' },
          { name: 'Tier 2 IT Hardware & Equipment', latency: '96.4%', status: 'Certified', uptime: 'SOC 2' },
          { name: 'Tier 3 Facilities & Logistics Vendors', latency: '92.0%', status: 'Compliant', uptime: 'Verified' },
          { name: 'Contract Renewal Horizon (60d)', latency: '4 Vendors', status: 'Pending', uptime: 'Review' },
        ],
      },
      activity: [
        { id: '1', title: 'PO #8841 approved: Annual cloud hosting commitment ($120,000)', time: '50m ago', badge: 'PO Approved', type: 'po' },
        { id: '2', title: 'Vendor onboarding: CyberSecurity Audit Partner certified', time: '2h ago', badge: 'Vendor', type: 'supplier' },
        { id: '3', title: 'RFP bidding closed: 3 qualified submissions received for hardware refresh', time: '5h ago', badge: 'Sourcing', type: 'rfp' },
        { id: '4', title: 'Supplier price renegotiation achieved 8% discount on office peripherals', time: '1d ago', badge: 'Savings', type: 'savings' },
      ],
      actions: [
        { label: 'Review Purchase Requests', to: '/organization/cost-centers', description: 'Review departmental requisitions awaiting PO assignment.' },
        { label: 'Review Purchase Orders', to: '/organization/departments', description: 'Track open purchase orders and delivery acknowledgments.' },
        { label: 'Review Suppliers', to: '/organization/branches', description: 'Inspect approved vendor list, compliance certs, and SLAs.' },
        { label: 'Procurement Activity', to: '/audit/activity', description: 'Review live requisition and PO dispatch logs.' },
      ],
    },
    dataBoundarySummary: "Domain Bounded: Procurement & Sourcing (Acme Technologies)",
    effectivePermissionContext: "Procurement Manager Domain Context (domain: procurement, tenant: acme-tech)",
    administrationScope: {
      "myRole": "Procurement Manager",
      "myScope": "DOMAIN OPERATIONAL — PROCUREMENT",
      "myResponsibilities": [
            "Vendor & Supplier Directory and Onboarding Due Diligence",
            "Purchase Requisitions & Inter-Department Approval Routing",
            "Purchase Orders (PO) Generation & Fulfillment Tracking",
            "Supplier Contracts, Service Level Agreements & Renewals",
            "Spend Analytics, Bulk Purchasing Discounts & Delivery Tracking"
      ],
      "myActionBoundary": "Procurement / Assigned Organization Supplier Scope",
      "outsideResponsibility": "Salary calculations, CRM opportunity quotas, tenant provisioning, or platform edge routes",
      "dataScopeExplanation": "Confined to supplier records, purchase requests, and purchase orders for Acme Technologies.",
      "rbacExplanation": "Authorizes PO creation, vendor onboarding verification, and purchase threshold approvals.",
      "governanceEquation": {
            "action": "ISSUE PURCHASE ORDER",
            "dataBoundary": "Procurement Supplier Scope",
            "result": "Supplier-Bounded Sourcing Execution"
      }
},
    crudCapabilities: [
      {
            "action": "CREATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can create supplier accounts and purchase order requisitions."
      },
      {
            "action": "READ",
            "state": "✓ ALLOWED",
            "description": "Can view supplier catalogs and purchase order status history."
      },
      {
            "action": "UPDATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can update supplier details and open order line items."
      },
      {
            "action": "DELETE",
            "state": "— NOT AVAILABLE",
            "description": "Issued purchase orders are cancelled rather than deleted."
      },
      {
            "action": "APPROVE",
            "state": "✓ ALLOWED",
            "description": "Can approve purchase orders up to designated financial threshold."
      },
      {
            "action": "EXPORT",
            "state": "D DOMAIN SCOPED",
            "description": "Can export procurement spend reports and supplier registries."
      },
      {
            "action": "IMPORT",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can import vendor item catalogs and price lists."
      },
      {
            "action": "PRINT",
            "state": "✓ ALLOWED",
            "description": "Can print official purchase orders and supplier contracts."
      }
],
  },

  'warehouse-manager': {
    id: 'warehouse-manager',
    roleName: 'Warehouse Manager',
    shortLabel: 'Warehouse Manager',
    scope: 'DOMAIN OPERATIONAL',
    scopeTitle: 'DOMAIN OPERATIONAL — WAREHOUSE · Inventory & Logistics Operations',
    badgeVariant: 'domain',
    simulationSectionTitle: 'DOMAIN OPERATIONAL SIMULATION',
    educationalNotice: 'Warehouse Manager manages physical inventories, bins, and carrier dispatches. This role does not manage IT infrastructure or commercial contracts.',
    transitionRationale: 'Switched to Warehouse Manager (DOMAIN OPERATIONAL — WAREHOUSE). The interface now represents warehouse stocking, pallet allocations, inventory turnover, and shipment freight.',
    sidebarGroups: [
      {
        label: 'Warehouse / Inventory',
        scopeTag: 'DOMAIN OPERATIONAL',
        items: [
          { label: 'Warehouse Dashboard', to: '/console', iconName: 'LayoutDashboard' },
          { label: 'Inventory', to: '/organization/locations', iconName: 'Boxes' },
          { label: 'Stock Movement', to: '/organization/departments', iconName: 'ArrowRightLeft' },
          { label: 'Storage / Capacity', to: '/organization/branches', iconName: 'HardDrive' },
          { label: 'Shipments', to: '/organization/cost-centers', iconName: 'Truck' },
          { label: 'Warehouse Activity', to: '/audit/activity', iconName: 'Activity' },
        ],
      },
      {
        label: 'Organization Context',
        scopeTag: 'ORGANIZATION / TENANT',
        items: [
          { label: 'Organization Overview', to: '/organization', iconName: 'Building2', scopeNote: 'Reference' },
        ],
      },
    ],
    dashboard: {
      title: 'Warehouse Manager Operational Dashboard · Acme Technologies',
      managedBy: 'WAREHOUSE MANAGER (Domain Operational Role)',
      scope: 'DOMAIN OPERATIONAL',
      accessLevel: 'INVENTORY & LOGISTICS (Acme Technologies)',
      hierarchyPosition: 'Domain Tier → Warehouse Manager (Physical Distribution & Stock)',
      purpose: 'Operational control of physical inventory stocks, warehouse bin allocation, dispatch logistics, and inventory turnover.',
      whyItExists: 'Manages physical distribution hubs and stock levels without exposure to platform configuration or sales CRM pipelines.',
      tags: ['Warehouse Domain', 'Supply Logistics', 'SKU Inventory', 'Domain Specific'],
      kpis: [
        {
          title: 'Total Managed SKUs',
          value: '4,850 SKUs',
          change: '99.4% in-stock rate',
          trend: 'up',
          iconName: 'Boxes',
          description: 'Active catalog items across 3 distribution hubs',
        },
        {
          title: 'Storage Capacity Used',
          value: '74.8% Utilized',
          change: '25.2% pallet rack buffer',
          trend: 'neutral',
          iconName: 'HardDrive',
          description: 'Pallet racking and shelving occupancy',
        },
        {
          title: 'Daily Dispatched Orders',
          value: '412 Shipments',
          change: '99.1% on-time dispatch',
          trend: 'up',
          iconName: 'CheckCircle2',
          description: 'Completed outbound orders today',
        },
        {
          title: 'Inventory Turnover Ratio',
          value: '6.4x Annual',
          change: 'Optimal operational band',
          trend: 'up',
          iconName: 'TrendingUp',
          description: 'Calculated annual inventory velocity',
        },
      ],
      primaryChart1: {
        title: 'Fulfillment Hub Storage Capacity Utilization',
        subtitle: 'Current physical occupancy levels across regional distribution warehouses.',
        badgeText: 'Capacity',
        data: [
          { label: 'Central Distribution Center (Chicago)', value: 82, max: 100, color: 'bg-indigo-600 dark:bg-indigo-500' },
          { label: 'East Coast Hub (New Jersey)', value: 71, max: 100, color: 'bg-purple-600 dark:bg-purple-500' },
          { label: 'West Coast Facility (Reno)', value: 68, max: 100, color: 'bg-sky-600 dark:bg-sky-500' },
        ],
      },
      primaryChart2: {
        title: 'Daily Shipment Dispatch Velocity (Current Week)',
        subtitle: 'Outbound freight and express parcel dispatches per operating day.',
        badgeText: 'Dispatches',
        data: [
          { label: 'Monday Outbound Wave: 380 Orders', used: 380, total: 450, percent: 84.4, color: 'bg-indigo-600' },
          { label: 'Tuesday Outbound Wave: 415 Orders', used: 415, total: 450, percent: 92.2, color: 'bg-purple-600' },
          { label: 'Wednesday Peak Wave: 440 Orders', used: 440, total: 450, percent: 97.8, color: 'bg-emerald-600' },
          { label: 'Thursday Outbound Wave: 390 Orders', used: 390, total: 450, percent: 86.7, color: 'bg-sky-600' },
          { label: 'Friday Express Wave: 412 Orders', used: 412, total: 450, percent: 91.6, color: 'bg-amber-600' },
        ],
      },
      secondaryVisualization: {
        title: 'Inventory Movement Classification',
        subtitle: 'Stock categorizations based on velocity and turnover rates.',
        services: [
          { name: 'Fast-Moving High Turnover SKUs', latency: '64.0%', status: 'Optimal', uptime: '3,104 SKUs' },
          { name: 'Steady Operational Stock', latency: '28.0%', status: 'Stable', uptime: '1,358 SKUs' },
          { name: 'Slow-Moving / Buffer Reserve', latency: '8.0%', status: 'Review', uptime: '388 SKUs' },
          { name: 'Out-of-Stock Reorder Triggers', latency: '6 Items', status: 'Warning', uptime: 'Triggered' },
        ],
      },
      activity: [
        { id: '1', title: 'Inbound container freight #482 received and dock verified', time: '20m ago', badge: 'Inbound', type: 'dock' },
        { id: '2', title: 'Automated low stock trigger: Server rack mounting rails (12 units remain)', time: '1h ago', badge: 'Alert', type: 'alert' },
        { id: '3', title: 'Annual physical cycle audit matched ERP digital ledger with 99.8% accuracy', time: '4h ago', badge: 'Audit', type: 'audit' },
        { id: '4', title: 'Inter-facility transfer completed: 240 units moved from Chicago to Reno', time: '1d ago', badge: 'Transfer', type: 'transfer' },
      ],
      actions: [
        { label: 'Review Inventory', to: '/organization/locations', description: 'Inspect stock levels, bin locations, and minimum reorder triggers.' },
        { label: 'Review Stock Movement', to: '/organization/departments', description: 'Track internal bin-to-bin and pick-to-pack transfers.' },
        { label: 'Review Storage Capacity', to: '/organization/branches', description: 'Monitor pallet racking occupancy across regional hubs.' },
        { label: 'Review Shipments', to: '/organization/cost-centers', description: 'Audit daily freight bill of ladings and courier dispatches.' },
      ],
    },
    dataBoundarySummary: "Domain Bounded: Warehouse & Inventory (Acme Technologies)",
    effectivePermissionContext: "Warehouse Manager Domain Context (domain: warehouse, tenant: acme-tech)",
    administrationScope: {
      "myRole": "Warehouse Manager",
      "myScope": "DOMAIN OPERATIONAL — WAREHOUSE",
      "myResponsibilities": [
            "Stock Inventory Levels, SKU Catalog & Reorder Points",
            "Inbound Goods Receipt, Inspection & Stock Movement",
            "Warehouse Storage Capacity, Bin Locations & Bay Allocations",
            "Outbound Logistics Dispatch & Freight Shipment Coordination",
            "Physical Stocktake Audits & Discrepancy Reconciliation"
      ],
      "myActionBoundary": "Warehouse & Inventory / Assigned Facilities Scope",
      "outsideResponsibility": "Customer sales contracts, payroll processing, cloud server topology, or other tenant warehouses",
      "dataScopeExplanation": "Confined to warehouse storage sites, inventory items, and stock movement records for Acme Technologies.",
      "rbacExplanation": "Authorizes stock level adjustments, transfer order dispatches, and warehouse location management.",
      "governanceEquation": {
            "action": "DISPATCH STOCK TRANSFER",
            "dataBoundary": "Assigned Facility & Bay Scope",
            "result": "Facility-Bounded Logistics Execution"
      }
},
    crudCapabilities: [
      {
            "action": "CREATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can create inventory items and stock transfer requests."
      },
      {
            "action": "READ",
            "state": "✓ ALLOWED",
            "description": "Can view inventory stock levels and warehouse bay occupancy."
      },
      {
            "action": "UPDATE",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can update stock counts, bin allocations, and shipment status."
      },
      {
            "action": "DELETE",
            "state": "— NOT AVAILABLE",
            "description": "Inventory items with history are archived rather than deleted."
      },
      {
            "action": "APPROVE",
            "state": "✓ ALLOWED",
            "description": "Can approve stock transfer dispatches and write-off audits."
      },
      {
            "action": "EXPORT",
            "state": "D DOMAIN SCOPED",
            "description": "Can export stock valuation lists and inventory audit manifests."
      },
      {
            "action": "IMPORT",
            "state": "◐ RBAC / SCOPE DEPENDENT",
            "description": "Can import barcode scan manifests and supplier shipment manifests."
      },
      {
            "action": "PRINT",
            "state": "✓ ALLOWED",
            "description": "Can print pallet labels, pick lists, and bills of lading."
      }
],
  },
}
