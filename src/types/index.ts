export type AdministrativeScope = 'GLOBAL' | 'ORGANIZATION / TENANT' | 'DOMAIN OPERATIONAL'

export type UserClass = 'SUPER ADMINISTRATOR' | 'ORGANIZATION ADMINISTRATOR'

export type OperationalRole = 
  | 'HR MANAGER'
  | 'SALES MANAGER'
  | 'FINANCE MANAGER'
  | 'PROCUREMENT MANAGER'
  | 'WAREHOUSE MANAGER'
  | 'DEPARTMENT MANAGER'

export type SpecializedRBACRole = 
  | 'SECURITY ADMINISTRATOR'
  | 'SYSTEM ADMINISTRATOR'
  | 'DEPARTMENT ADMINISTRATOR'

export type ActivePerspective = 
  | 'super-admin'
  | 'org-admin'
  | 'hr-manager'
  | 'sales-manager'
  | 'finance-manager'
  | 'procurement-manager'
  | 'warehouse-manager'

export interface ScreenContextInfo {
  title: string
  managedBy: string
  scope: AdministrativeScope
  purpose: string
  accessLevel: string
  hierarchyPosition?: string
  whyItExists?: string
  educationalNotes?: string
  tags?: string[]
}

export interface Tenant {
  id: string
  name: string
  code: string
  domain: string
  tier: 'Enterprise' | 'Professional' | 'Starter'
  status: 'Active' | 'Suspended' | 'Provisioning'
  databaseIsolation: 'Dedicated DB' | 'Shared Schema' | 'Isolated Schema'
  storageUsed: string
  usersCount: number
  region: string
  createdAt: string
  adminContact: string
}

export interface OrganizationUnit {
  id: string
  name: string
  tenantId: string
  tenantName: string
  type: 'Company' | 'Business Unit' | 'Department' | 'Branch' | 'Cost Center' | 'Location'
  code: string
  head: string
  headcount?: number
  status: 'Active' | 'Inactive'
  parentUnit?: string
}

export interface UserRecord {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
  scope: AdministrativeScope
  tenantName: string
  tenantId?: string
  userClass?: UserClass | 'DOMAIN USER'
  assignedRoles?: string[]
  status: 'Active' | 'Suspended' | 'Invited' | 'Inactive'
  mfaEnabled: boolean
  lastLogin: string
  department?: string
}

export interface RoleDefinition {
  id: string
  name: string
  category: 'Platform User Class' | 'Specialized Administrative Role' | 'Domain Operational Roles' | 'Custom Tenant Role'
  scope: AdministrativeScope
  managedBy: string
  description: string
  permissionsCount: number
  isSystem: boolean
}

export interface SystemMetric {
  name: string
  value: string | number
  status: 'optimal' | 'warning' | 'critical' | 'healthy'
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
}

export interface SecurityAlert {
  id: string
  title: string
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  timestamp: string
  tenant: string
  user: string
  action: string
  resolved: boolean
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  actor: string
  actorRole: string
  tenantName: string
  scope: AdministrativeScope
  action: string
  targetResource: string
  ipAddress: string
  status: 'Success' | 'Denied' | 'Failed'
}
