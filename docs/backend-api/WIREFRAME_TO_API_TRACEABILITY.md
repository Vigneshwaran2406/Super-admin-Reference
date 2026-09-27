# Wireframe to Backend API Traceability Matrix

**Document Classification:** End-to-End Requirements Traceability Matrix (RTM)  
**Governing Wireframe Source:** `JAVA-SUITE-WIREFRAMES.md`  
**Governing API Requirements:** `BACKEND_API_REQUIREMENTS_FROM_WIREFRAMES.md`  
**Governing Backlog Status:** UI-001 through UI-006 **COMPLETED**  
**Target Reference Project:** `D:\super-admin-reference`  
**Generation Date:** September 25, 2026  

---

## 1. Traceability Methodology & Chain of Custody

This document establishes the bidirectional traceability chain connecting the official Java Suite Wireframes to the reference prototype UI and the corresponding backend engineering requirements:

```
Wireframe Story (JAVA-SUITE-WIREFRAMES.md)
  └── Wireframe Screen Specification
        └── User Interaction Flow / Action
              └── Backend Capability & Operation Type
                    └── Confirmed API Endpoint or Required Contract
                          └── Frontend Implementation (src/pages/..., src/components/...)
```

Every single identified backend capability is strictly mapped back to an authoritative wireframe story, ensuring complete verification, zero orphaned requirements, and zero speculative feature drift.

---

## 2. Complete 58-Story Traceability Matrix

| Story ID | Story Title | Wireframe Section & Lines | Reference UI Screen & Route | User Action / Trigger | Backend Capability ID & Name | Confirmed API or Contract Required | Traceability Verification |
|:---|:---|:---|:---|:---|:---|:---|:---:|
| **Story-1** | Platform Administration | Lines 16–118 | `SuperAdminDashboard.tsx` (`/console`) | View KPI Metric Cards | **REQ-001**: Global Platform Metrics Aggregator | `GET {{adminServiceUrl}}/api/v1/global-dashboard/metrics` | **VERIFIED** |
| **Story-1** | Platform Administration | Lines 16–118 | `SuperAdminDashboard.tsx`, `TelemetryGauge.tsx` (UI-001) | View CPU & Memory Resource Meters | **REQ-002**: Real-Time Hardware Resource Telemetry | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1** | Platform Administration | Lines 16–118 | `SuperAdminDashboard.tsx`, `ActiveOnlineSessionsWidget.tsx` (UI-002) | View Active Online User Sessions | **REQ-003**: Real-Time Active Session Telemetry | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1** | Platform Administration | Lines 16–118 | `SuperAdminDashboard.tsx`, `ExportReportModal.tsx` (UI-003) | Click "Export Report" button | **REQ-004**: Dashboard Operational Report Generation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1** | Platform Administration | Lines 16–118 | `SuperAdminDashboard.tsx` (`/console`) | View Platform Health Status | **REQ-005**: Platform Health Aggregator | `GET {{adminServiceUrl}}/api/v1/health` | **VERIFIED** |
| **Story-1** | Platform Administration | Lines 16–118 | `SuperAdminDashboard.tsx` (`/console`) | View Recent Activity List | **REQ-006**: Recent Platform Activities Query | `GET {{adminServiceUrl}}/api/v1/global-dashboard/recent-activities` | **VERIFIED** |
| **Story-1.1** | Super Admin Management | Lines 120–220 | `SuperAdminManagementHub.tsx` (`/platform/super-admin`, UI-004) | View Administrative Users Directory | **REQ-008**: Platform Admin Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1** | Super Admin Management | Lines 120–220 | `SuperAdminManagementHub.tsx` (`/platform/super-admin`, UI-004) | Filter Administrative Users by Role | **REQ-009**: Administrative Directory Search & Filter | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1** | Super Admin Management | Lines 120–220 | `SuperAdminManagementHub.tsx`, `ModuleHealthCard.tsx` (UI-004) | View Subsystem Configuration Health | **REQ-010**: Subsystem Health Status Query | `GET {{adminServiceUrl}}/api/v1/health/services` | **VERIFIED** |
| **Story 1.1.1** | Global Dashboard | Lines 222–282 | `GlobalDashboard.tsx` (`/platform/global-dashboard`) | View Global Platform Summary | **REQ-013**: Global Dashboard Summary Aggregator | `GET {{adminServiceUrl}}/api/v1/global-dashboard/summary` | **VERIFIED** |
| **Story 1.1.1** | Global Dashboard | Lines 222–282 | `GlobalDashboard.tsx` (`/platform/global-dashboard`) | View Timeseries Metrics & Distribution | **REQ-014**: Platform Metrics & Timeseries | `GET {{adminServiceUrl}}/api/v1/global-dashboard/metrics` | **VERIFIED** |
| **Story 1.1.1** | Global Dashboard | Lines 222–282 | `GlobalDashboard.tsx` (`/platform/global-dashboard`) | View Notification Feed | **REQ-015**: Global System Notifications Query | `GET {{adminServiceUrl}}/api/v1/global-dashboard/notifications` | **VERIFIED** |
| **Story 1.1.1** | Global Dashboard | Lines 222–282 | `GlobalDashboard.tsx` (`/platform/global-dashboard`) | View Service Health Overview | **REQ-016**: Platform Service Health Overview | `GET {{adminServiceUrl}}/api/v1/global-dashboard/status` | **VERIFIED** |
| **Story 1.1.2** | Platform Configuration | Lines 284–338 | `SystemConfigDashboard.tsx` (`/system/config`) | View Configurations List | **REQ-017**: Platform Configuration List Query | `GET {{adminServiceUrl}}/api/v1/platform-configurations` | **VERIFIED** |
| **Story 1.1.2** | Platform Configuration | Lines 284–338 | `SystemConfigDashboard.tsx` (`/system/config`) | View Settings by Category | **REQ-018**: Platform Settings Query | `GET {{baseUrl}}/api/v1/platform-settings` | **VERIFIED** |
| **Story 1.1.2** | Platform Configuration | Lines 284–338 | `SystemConfigDashboard.tsx` (`/system/config`) | Filter & Search Settings | **REQ-019**: Search / Filter Platform Settings | `GET {{baseUrl}}/api/v1/platform-settings?search=...&category=...` | **VERIFIED** |
| **Story 1.1.2** | Platform Configuration | Lines 284–338 | `SystemConfigDashboard.tsx` (`/system/config`) | Update Configuration Key | **REQ-020**: Update Platform Setting Mutation | `PUT {{baseUrl}}/api/v1/platform-settings/{{settingKey}}` | **VERIFIED** |
| **Story 1.1.2** | Platform Configuration | Lines 284–338 | `SystemConfigDashboard.tsx` (`/system/config`) | Reset Settings to Defaults | **REQ-021**: Reset Platform Settings Mutation | `POST {{baseUrl}}/api/v1/platform-settings/reset` | **VERIFIED** |
| **Story 1.1.3** | Global Settings | Lines 340–452 | `GeneralSettings.tsx` (`/system/general`) | View Global Platform Preferences | **REQ-022**: Global Settings Entity Query | `GET {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story 1.1.3** | Global Settings | Lines 340–452 | `GeneralSettings.tsx` (`/system/general`) | Save Global Platform Preferences | **REQ-023**: Save Global Preferences Mutation | `PUT {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story 1.1.3** | Global Settings | Lines 340–452 | `GeneralSettings.tsx` (`/system/general`) | View Settings Change History | **REQ-024**: Setting Revision History Query | `GET {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS/history` | **VERIFIED** |
| **Story 1.1.3** | Global Settings | Lines 340–452 | `GeneralSettings.tsx` (`/system/general`) | Toggle Maintenance Mode | **REQ-025**: Update Setting Status Mutation | `PATCH {{baseUrl}}/api/v1/platform-settings/MAINTENANCE_MODE/status` | **VERIFIED** |
| **Story-1.1.4** | Platform Branding | Lines 454–562 | `PlatformBranding.tsx` (`/platform/branding`) | View Platform Branding Settings | **REQ-026**: Platform Branding Query | `GET {{adminServiceUrl}}/api/v1/branding` | **VERIFIED** |
| **Story-1.1.4** | Platform Branding | Lines 454–562 | `PlatformBranding.tsx` (`/platform/branding`) | Save Brand Colors & Titles | **REQ-027**: Update Platform Branding Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.4** | Platform Branding | Lines 454–562 | `PlatformBranding.tsx` (`/platform/branding`) | Upload Logo Image File | **REQ-028**: Branding Image Asset Ingestion | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.4** | Platform Branding | Lines 454–562 | `PlatformBranding.tsx` (`/platform/branding`) | Upload Favicon File | **REQ-029**: Favicon Asset Ingestion | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.5** | License Management | Lines 564–666 | `LicenseManagement.tsx` (`/platform/licenses`) | View License Directory Table | **REQ-031**: Software License Directory Query | `GET {{adminServiceUrl}}/api/v1/licenses` | **VERIFIED** |
| **Story-1.1.5** | License Management | Lines 564–666 | `LicenseManagement.tsx` (`/platform/licenses`) | Filter Licenses by Tier/Status | **REQ-032**: License Search & Filter | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.5** | License Management | Lines 564–666 | `LicenseManagement.tsx` (`/platform/licenses`) | Create / Assign License | **REQ-033**: Provision License Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.5** | License Management | Lines 564–666 | `LicenseManagement.tsx` (`/platform/licenses`) | Renew Software License | **REQ-034**: License Renewal Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.5** | License Management | Lines 564–666 | `LicenseManagement.tsx` (`/platform/licenses`) | Suspend or Revoke License | **REQ-035**: License Revocation Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.6** | Feature Management | Lines 668–766 | `FeatureManagement.tsx` (`/platform/features`) | View Feature Flags Table | **REQ-037**: Feature Flags Directory Query | `GET {{adminServiceUrl}}/api/v1/features` | **VERIFIED** |
| **Story-1.1.6** | Feature Management | Lines 668–766 | `FeatureManagement.tsx` (`/platform/features`) | Toggle Global Feature Flag | **REQ-038**: Update Feature Flag Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.6** | Feature Management | Lines 668–766 | `FeatureManagement.tsx` (`/platform/features`) | Configure Rollout Rules | **REQ-039**: Feature Rollout Rule Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.1.6** | Feature Management | Lines 668–766 | `FeatureManagement.tsx` (`/platform/features`) | Override Feature for Tenant | **REQ-040**: Tenant Feature Override Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2** | Tenant Management | Lines 768–870 | `TenantManagement.tsx` (`/tenants`) | View Tenant Directory Table | **REQ-041**: Tenant Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2** | Tenant Management | Lines 768–870 | `TenantManagement.tsx` (`/tenants`) | Search & Filter Tenants | **REQ-042**: Search & Filter Tenants | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2** | Tenant Management | Lines 768–870 | `TenantManagement.tsx` (`/tenants`) | Paginate Tenant Table | **REQ-043**: Tenant Pagination Standard | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2** | Tenant Management | Lines 768–870 | `TenantDetails.tsx` (`/tenants/:id`) | View Single Tenant Overview | **REQ-044**: Tenant Detail Entity Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2** | Tenant Management | Lines 768–870 | `TenantManagement.tsx` (`/tenants`) | Suspend or Activate Tenant | **REQ-045**: Tenant Lifecycle Status Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2** | Tenant Management | Lines 768–870 | `TenantManagement.tsx` (`/tenants`) | Delete / Offboard Tenant | **REQ-046**: Tenant Offboard Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2** | Tenant Management | Lines 768–870 | `TenantManagement.tsx` (`/tenants`) | Export Tenants to CSV | **REQ-047**: Tenant Export Service | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.1** | Create Tenant | Lines 872–980 | `TenantManagement.tsx` (Add Tenant Modal) | Check Subdomain Availability | **REQ-048**: Domain Uniqueness Verification | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.1** | Create Tenant | Lines 872–980 | `TenantManagement.tsx` (Add Tenant Modal) | Submit Create Tenant Form | **REQ-049**: Provision Tenant Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.1** | Create Tenant | Lines 872–980 | `TenantManagement.tsx` (Add Tenant Modal) | Provision Initial Admin User | **REQ-050**: Initial Admin Account Ingestion | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.2** | Tenant Configuration | Lines 982–1084 | `TenantDetails.tsx` (`/tenants/:id`, Config) | View Tenant Configuration | **REQ-051**: Tenant Configuration Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.2** | Tenant Configuration | Lines 982–1084 | `TenantDetails.tsx` (`/tenants/:id`, Config) | Update Subscription Quotas | **REQ-052**: Update Tenant Quota Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.2** | Tenant Configuration | Lines 982–1084 | `TenantDetails.tsx` (`/tenants/:id`, Config) | Update Custom Domain Binding | **REQ-053**: Custom Domain Binding Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.2** | Tenant Configuration | Lines 982–1084 | `TenantDetails.tsx` (`/tenants/:id`, Config) | Configure Security Overrides | **REQ-054**: Tenant Security Policy Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.3** | Tenant Branding | Lines 1086–1190 | `TenantDetails.tsx` (`/tenants/:id`, Branding) | View Tenant Branding Tokens | **REQ-055**: Tenant Branding Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.3** | Tenant Branding | Lines 1086–1190 | `TenantDetails.tsx` (`/tenants/:id`, Branding) | Save Tenant Colors & Title | **REQ-056**: Update Tenant Branding Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.3** | Tenant Branding | Lines 1086–1190 | `TenantDetails.tsx` (`/tenants/:id`, Branding) | Upload Custom Logo/Favicon | **REQ-057**: Tenant Branding Media Ingestion | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.3** | Tenant Branding | Lines 1086–1190 | `TenantDetails.tsx` (`/tenants/:id`, Branding) | Reset Branding to Platform Default | **REQ-058**: Reset Tenant Branding Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.4** | Tenant Database | Lines 1192–1290 | `TenantDetails.tsx` (`/tenants/:id`, Database) | View Database Environment Info | **REQ-059**: Tenant Database Status Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.4** | Tenant Database | Lines 1192–1290 | `TenantDetails.tsx` (`/tenants/:id`, Database) | View Storage Utilization Metrics | **REQ-060**: Tenant Database Telemetry Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.4** | Tenant Database | Lines 1192–1290 | `TenantDetails.tsx` (`/tenants/:id`, Database) | Switch DB Isolation Mode | **REQ-061**: Tenant DB Isolation Mode Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.4** | Tenant Database | Lines 1192–1290 | `TenantDetails.tsx` (`/tenants/:id`, Database) | Test Database Ping Latency | **REQ-062**: Database Ping & Diagnostic Check | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `TenantDetails.tsx` (Isolation, UI-005) | View Isolation & Encryption Key | **REQ-063**: Tenant Isolation Policy Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `TenantDetails.tsx` (Isolation, UI-005) | Configure BYOK Key Provider & ARN | **REQ-064**: Update BYOK Configuration Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `TenantDetails.tsx` (Isolation, UI-005) | Click "Validate Key" Button | **REQ-065**: Validate Encryption Key Access | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `TenantDetails.tsx` (Isolation, UI-005) | Click "Rotate Key" Action Modal | **REQ-066**: Rotate Tenant Encryption Key | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `CIDRNetworkTable.tsx` (UI-006) | View CIDR Network Policy Table | **REQ-067**: Tenant CIDR Allowlist Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `CIDRNetworkTable.tsx` (UI-006) | Add Network Range Modal Submit | **REQ-068**: Add CIDR Rule Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `CIDRNetworkTable.tsx` (UI-006) | Edit Network Range Modal Submit | **REQ-069**: Update CIDR Rule Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `CIDRNetworkTable.tsx` (UI-006) | Remove Network Range Modal Confirm | **REQ-070**: Delete CIDR Rule Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.5** | Tenant Isolation | Lines 1292–1390 | `CIDRNetworkTable.tsx` (UI-006) | Toggle Row Enforcement Switch | **REQ-071**: Toggle CIDR Rule Status Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.6** | Tenant Backup | Lines 1392–1490 | `TenantDetails.tsx` (`/tenants/:id`, Backup) | View Backup Snapshots List | **REQ-072**: Tenant Backup Snapshot Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.6** | Tenant Backup | Lines 1392–1490 | `TenantDetails.tsx` (`/tenants/:id`, Backup) | Trigger On-Demand Backup | **REQ-073**: Trigger Backup Snapshot Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.6** | Tenant Backup | Lines 1392–1490 | `TenantDetails.tsx` (`/tenants/:id`, Backup) | Save Automated Backup Schedule | **REQ-074**: Update Backup Schedule Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.6** | Tenant Backup | Lines 1392–1490 | `TenantDetails.tsx` (`/tenants/:id`, Backup) | Download Backup Archive | **REQ-075**: Generate Backup Download Stream | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.2.6** | Tenant Backup | Lines 1392–1490 | `TenantDetails.tsx` (`/tenants/:id`, Backup) | Restore Tenant from Snapshot | **REQ-076**: Restore Tenant Snapshot Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3** | Organization Management | Lines 1492–1594 | `OrganizationManagement.tsx` (`/organization`) | View Hierarchy Tree & Summary | **REQ-077**: Organization Hierarchy Tree Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3** | Organization Management | Lines 1492–1594 | `OrganizationManagement.tsx` (`/organization`) | View Entity Aggregated Counts | **REQ-078**: Org Entity Counts Aggregator | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.1** | Company Setup | Lines 1596–1714 | `CompanySetup.tsx` (`/organization/company-setup`) | View Company Legal Profile | **REQ-080**: Company Profile Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.1** | Company Setup | Lines 1596–1714 | `CompanySetup.tsx` (`/organization/company-setup`) | Register Legal Company Entity | **REQ-081**: Create Company Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.1** | Company Setup | Lines 1596–1714 | `CompanySetup.tsx` (`/organization/company-setup`) | Update Company Legal Profile | **REQ-082**: Update Company Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.1** | Company Setup | Lines 1596–1714 | `CompanySetup.tsx` (`/organization/company-setup`) | Upload Registration Documents | **REQ-083**: Company Document Ingestion | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.2** | Business Units | Lines 1716–1820 | `BusinessUnits.tsx` (`/organization/business-units`) | View Business Units Directory | **REQ-084**: Business Units Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.2** | Business Units | Lines 1716–1820 | `BusinessUnits.tsx` (`/organization/business-units`) | Filter & Search Business Units | **REQ-085**: Business Unit Search & Filter | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.2** | Business Units | Lines 1716–1820 | `BusinessUnits.tsx` (`/organization/business-units`) | Create Business Unit Entity | **REQ-086**: Create Business Unit Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.2** | Business Units | Lines 1716–1820 | `BusinessUnits.tsx` (`/organization/business-units`) | Update Business Unit Details | **REQ-087**: Update Business Unit Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.2** | Business Units | Lines 1716–1820 | `BusinessUnits.tsx` (`/organization/business-units`) | Delete / Deactivate Unit | **REQ-088**: Delete Business Unit Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.3** | Departments | Lines 1822–1922 | `Departments.tsx` (`/organization/departments`) | View Departments Directory Table | **REQ-089**: Departments Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.3** | Departments | Lines 1822–1922 | `Departments.tsx` (`/organization/departments`) | Filter Departments by Business Unit | **REQ-090**: Filter Departments | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.3** | Departments | Lines 1822–1922 | `Departments.tsx` (`/organization/departments`) | Create Department Entity | **REQ-091**: Create Department Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.3** | Departments | Lines 1822–1922 | `Departments.tsx` (`/organization/departments`) | Update Department Manager/Details | **REQ-092**: Update Department Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.3** | Departments | Lines 1822–1922 | `Departments.tsx` (`/organization/departments`) | Delete / Deactivate Department | **REQ-093**: Delete Department Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.4** | Branches | Lines 1924–2038 | `Branches.tsx` (`/organization/branches`) | View Branches Directory Table | **REQ-094**: Branches Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.4** | Branches | Lines 1924–2038 | `Branches.tsx` (`/organization/branches`) | Filter Branches by Country/City | **REQ-095**: Filter Branches | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.4** | Branches | Lines 1924–2038 | `Branches.tsx` (`/organization/branches`) | Create Branch Location | **REQ-096**: Create Branch Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.4** | Branches | Lines 1924–2038 | `Branches.tsx` (`/organization/branches`) | Update Branch Manager/Address | **REQ-097**: Update Branch Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.4** | Branches | Lines 1924–2038 | `Branches.tsx` (`/organization/branches`) | Delete / Deactivate Branch | **REQ-098**: Delete Branch Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.5** | Cost Centers | Lines 2040–2144 | `CostCenters.tsx` (`/organization/cost-centers`) | View Cost Centers Directory Table | **REQ-099**: Cost Centers Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.5** | Cost Centers | Lines 2040–2144 | `CostCenters.tsx` (`/organization/cost-centers`) | Filter Cost Centers | **REQ-100**: Filter Cost Centers | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.5** | Cost Centers | Lines 2040–2144 | `CostCenters.tsx` (`/organization/cost-centers`) | Create Cost Center & Budget | **REQ-101**: Create Cost Center Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.5** | Cost Centers | Lines 2040–2144 | `CostCenters.tsx` (`/organization/cost-centers`) | Update Cost Center Budget/Owner | **REQ-102**: Update Cost Center Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.5** | Cost Centers | Lines 2040–2144 | `CostCenters.tsx` (`/organization/cost-centers`) | Delete / Deactivate Cost Center | **REQ-103**: Delete Cost Center Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.6** | Locations | Lines 2146–2262 | `Locations.tsx` (`/organization/locations`) | View Locations Table | **REQ-104**: Locations Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.6** | Locations | Lines 2146–2262 | `Locations.tsx` (`/organization/locations`) | Filter Locations by Region | **REQ-105**: Filter Locations | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.6** | Locations | Lines 2146–2262 | `Locations.tsx` (`/organization/locations`) | Create Geographic Location | **REQ-106**: Create Location Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.6** | Locations | Lines 2146–2262 | `Locations.tsx` (`/organization/locations`) | Update Location Coordinates | **REQ-107**: Update Location Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.3.6** | Locations | Lines 2146–2262 | `Locations.tsx` (`/organization/locations`) | Delete / Deactivate Location | **REQ-108**: Delete Location Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4** | User Management | Lines 2264–2382 | `UserManagement.tsx` (`/users`) | View User Directory Table | **REQ-109**: User Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4** | User Management | Lines 2264–2382 | `UserManagement.tsx` (`/users`) | Search Users by Name/Email | **REQ-110**: User Directory Search | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4** | User Management | Lines 2264–2382 | `UserManagement.tsx` (`/users`) | Filter Users by Role/Dept/Status | **REQ-111**: Filter Users | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4** | User Management | Lines 2264–2382 | `UserManagement.tsx` (`/users`) | Paginate User Directory | **REQ-112**: User Pagination Standard | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4** | User Management | Lines 2264–2382 | `UserManagement.tsx` (`/users`) | Export Users to CSV/Excel | **REQ-113**: User Directory Export | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.1** | User Registration | Lines 2384–2506 | `UserManagement.tsx` (Register Modal) | Submit User Registration Form | **REQ-114**: User Registration Mutation | `POST {{authServiceUrl}}/auth/register` | **VERIFIED** |
| **Story-1.4.1** | User Registration | Lines 2384–2506 | `UserManagement.tsx` (Register Modal) | Validate Email Uniqueness | **REQ-115**: Email Availability Verification | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.1** | User Registration | Lines 2384–2506 | `UserManagement.tsx` (Register Modal) | Send Invitation / Password Setup | **REQ-116**: Send Invitation Email Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.2** | User Import | Lines 2508–2608 | `UserManagement.tsx` (CSV Import Modal) | Download CSV Import Template | **REQ-117**: Import Template Download | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.2** | User Import | Lines 2508–2608 | `UserManagement.tsx` (CSV Import Modal) | Upload CSV/Excel User Batch | **REQ-118**: Batch User File Upload | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.2** | User Import | Lines 2508–2608 | `UserManagement.tsx` (CSV Import Modal) | Run Dry-run Pre-validation | **REQ-119**: Batch Ingestion Pre-validation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.2** | User Import | Lines 2508–2608 | `UserManagement.tsx` (CSV Import Modal) | Commit Batch User Ingestion | **REQ-120**: Commit Batch Ingestion Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.3** | User Profile | Lines 2610–2726 | `UserDetails.tsx` (`/users/:id`) | View User Profile Details | **REQ-121**: Individual User Detail Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.3** | User Profile | Lines 2610–2726 | `UserDetails.tsx` (`/users/:id`) | Update User Profile Contact/Title | **REQ-122**: Update User Profile Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.3** | User Profile | Lines 2610–2726 | `UserDetails.tsx` (`/users/:id`) | Assign Security Roles to User | **REQ-123**: Assign User Roles Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.3** | User Profile | Lines 2610–2726 | `UserDetails.tsx` (`/users/:id`) | Trigger Admin Password Reset | **REQ-124**: Trigger Admin Password Reset | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.3** | User Profile | Lines 2610–2726 | `UserDetails.tsx` (`/users/:id`) | Revoke All Sessions for User | **REQ-125**: Revoke All Sessions for User | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.4** | User Activation | Lines 2728–2830 | `UserManagement.tsx` (Row Action) | Click "Activate" Action Button | **REQ-126**: Activate User Account Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.5** | User Deactivation | Lines 2832–2932 | `UserManagement.tsx` (Row Action) | Click "Deactivate" Action Button | **REQ-128**: Deactivate User Account Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.5** | User Deactivation | Lines 2832–2932 | `UserManagement.tsx` (Row Action) | Terminate Active Sessions on Suspend | **REQ-129**: Invalidate Sessions on Deactivation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.5** | User Deactivation | Lines 2832–2932 | `UserManagement.tsx` (Row Action) | Click "Delete" User Action | **REQ-130**: Delete User Record Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.6** | Bulk User Upload | Lines 2934–3040 | `UserManagement.tsx` (Bulk Action Bar) | Click Bulk Activate Users | **REQ-131**: Bulk Activate Users Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.6** | Bulk User Upload | Lines 2934–3040 | `UserManagement.tsx` (Bulk Action Bar) | Click Bulk Deactivate Users | **REQ-132**: Bulk Deactivate Users Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.4.6** | Bulk User Upload | Lines 2934–3040 | `UserManagement.tsx` (Bulk Action Bar) | Click Bulk Assign Role | **REQ-133**: Bulk Role Assignment Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5** | Role & Permission Management | Lines 3042–3152 | `RoleManagement.tsx` (`/roles`) | View Security Roles Directory | **REQ-134**: Security Roles Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5** | Role & Permission Management | Lines 3042–3152 | `RoleManagement.tsx` (`/roles`) | Filter Roles by Type (System/Custom) | **REQ-135**: Filter Security Roles | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.1** | Roles | Lines 3154–3260 | `RoleManagement.tsx` (Add Role Modal) | Create Custom Security Role | **REQ-137**: Create Security Role Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.1** | Roles | Lines 3154–3260 | `RoleManagement.tsx` (Edit Role Modal) | Update Role Name & Permissions | **REQ-138**: Update Security Role Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.1** | Roles | Lines 3154–3260 | `RoleManagement.tsx` (Delete Confirm) | Delete Custom Role | **REQ-139**: Delete Security Role Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.2** | Permissions | Lines 3262–3368 | `PermissionManagement.tsx` (`/permissions`) | View Permissions by Module | **REQ-141**: System Permissions Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.2** | Permissions | Lines 3262–3368 | `PermissionManagement.tsx` (`/permissions`) | Filter Permissions by Action Type | **REQ-142**: Filter Permissions | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.3** | RBAC | Lines 3370–3472 | `AdminAccessMatrix.tsx` (`/admin/access-matrix`) | View Role-Permission Grid | **REQ-144**: RBAC Access Matrix Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.3** | RBAC | Lines 3370–3472 | `AdminAccessMatrix.tsx` (`/admin/access-matrix`) | Save Batch Matrix Changes | **REQ-146**: Batch Update RBAC Matrix Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.4** | Data Permissions | Lines 3474–3580 | `DataPermissions.tsx` (`/roles/data-permissions`) | View Data Scoping Configuration | **REQ-147**: Data Scoping Rules Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.4** | Data Permissions | Lines 3474–3580 | `DataPermissions.tsx` (`/roles/data-permissions`) | Save Data Scope Rules for Role | **REQ-148**: Update Data Scope Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.5** | Department Permissions | Lines 3582–3684 | `DepartmentPermissions.tsx` (`/roles/department-permissions`) | View Department Overrides | **REQ-149**: Department Permissions Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.5.5** | Department Permissions | Lines 3582–3684 | `DepartmentPermissions.tsx` (`/roles/department-permissions`) | Save Department Overrides | **REQ-150**: Update Department Permission Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6** | Authentication & Security | Lines 3686–3776 | `SecurityDashboard.tsx` (`/security`) | View Security KPI Summary | **REQ-151**: Security KPI Summary Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6** | Authentication & Security | Lines 3686–3776 | `SecurityDashboard.tsx` (`/security`) | View Security Health Score | **REQ-152**: Security Health Score Telemetry | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.1** | Login | Lines 3778–3878 | `LoginPage.tsx` (`/login`) | Submit Credentials (Login) | **REQ-154**: User Login / JWT Token Generation | `POST {{authServiceUrl}}/auth/login` | **VERIFIED** |
| **Story-1.6.1** | Login | Lines 3778–3878 | Platform App Guard | Automatic Refresh on Token Expiry | **REQ-155**: Token Refresh Mutation | `POST {{authServiceUrl}}/auth/refresh` | **VERIFIED** |
| **Story-1.6.1** | Login | Lines 3778–3878 | Platform App Header / User Menu | Click "Sign Out" Action | **REQ-156**: Session Invalidation Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.2** | Login History | Lines 3880–3972 | `LoginHistory.tsx` (`/security/login-history`) | View User Authentication History | **REQ-158**: Login History Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.2** | Login History | Lines 3880–3972 | `LoginHistory.tsx` (`/security/login-history`) | Filter by User, IP, Status | **REQ-159**: Filter Login History | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.2** | Login History | Lines 3880–3972 | `LoginHistory.tsx` (`/security/login-history`) | Export Login History to CSV | **REQ-160**: Login History Export Service | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.3** | SSO (Single Sign-On) | Lines 3974–4072 | `SSOConfiguration.tsx` (`/security/sso`) | View SAML/OIDC Configuration | **REQ-161**: SSO Configuration Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.3** | SSO (Single Sign-On) | Lines 3974–4072 | `SSOConfiguration.tsx` (`/security/sso`) | Save IdP Metadata & Cert | **REQ-162**: Update SSO Configuration Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.3** | SSO (Single Sign-On) | Lines 3974–4072 | `SSOConfiguration.tsx` (`/security/sso`) | Click "Test Connection" | **REQ-163**: Test SSO Connectivity Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.3** | SSO (Single Sign-On) | Lines 3974–4072 | `SSOConfiguration.tsx` (`/security/sso`) | Click "Download SP Metadata" | **REQ-164**: SP Metadata XML Generation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.4** | OAuth | Lines 4074–4176 | `OAuthConfiguration.tsx` (`/security/oauth`) | View OAuth Providers Directory | **REQ-165**: OAuth Providers Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.4** | OAuth | Lines 4074–4176 | `OAuthConfiguration.tsx` (Add Provider) | Register OAuth 2.0 Provider | **REQ-166**: Create OAuth Provider Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.4** | OAuth | Lines 4074–4176 | `OAuthConfiguration.tsx` (Edit Provider) | Update Client ID & Secret | **REQ-167**: Update OAuth Provider Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.4** | OAuth | Lines 4074–4176 | `OAuthConfiguration.tsx` (Toggle Action) | Toggle Provider Enabled Switch | **REQ-168**: Toggle OAuth Status Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.4** | OAuth | Lines 4074–4176 | `OAuthConfiguration.tsx` (Delete Confirm) | Delete OAuth Provider | **REQ-169**: Delete OAuth Provider Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.5** | MFA | Lines 4178–4282 | `MFAConfiguration.tsx` (`/security/mfa`) | View MFA Policy Settings | **REQ-170**: MFA Configuration Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.5** | MFA | Lines 4178–4282 | `MFAConfiguration.tsx` (`/security/mfa`) | Save MFA Enforcement Policy | **REQ-171**: Update MFA Policy Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.5** | MFA | Lines 4178–4282 | `MFAConfiguration.tsx` (Setup Modal) | Generate TOTP QR Code | **REQ-172**: Provision TOTP Secret Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.5** | MFA | Lines 4178–4282 | `MFAConfiguration.tsx` (Setup Modal) | Submit 6-digit TOTP Code | **REQ-173**: Validate TOTP Code Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.5** | MFA | Lines 4178–4282 | `MFAConfiguration.tsx` (Setup Modal) | Generate Backup Recovery Codes | **REQ-174**: Generate Recovery Codes Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.6** | Password Policy | Lines 4284–4378 | `PasswordPolicy.tsx` (`/security/password-policy`) | View Password Rules | **REQ-175**: Password Policy Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.6** | Password Policy | Lines 4284–4378 | `PasswordPolicy.tsx` (`/security/password-policy`) | Save Password Complexity Rules | **REQ-176**: Update Password Policy Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.6** | Password Policy | Lines 4284–4378 | `PasswordPolicy.tsx` (`/security/password-policy`) | Force Password Change Flag | **REQ-177**: Force Password Reset Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.7** | Account Lockout | Lines 4380–4474 | `AccountLockout.tsx` (`/security/account-lockout`) | View Lockout Policy & Locked Users | **REQ-178**: Account Lockout Policy Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.7** | Account Lockout | Lines 4380–4474 | `AccountLockout.tsx` (`/security/account-lockout`) | Save Lockout Thresholds | **REQ-179**: Update Lockout Policy Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.7** | Account Lockout | Lines 4380–4474 | `AccountLockout.tsx` (Locked Users Table) | View Currently Locked Accounts | **REQ-180**: Locked Accounts Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.7** | Account Lockout | Lines 4380–4474 | `AccountLockout.tsx` (Unlock Action) | Click "Unlock Account" Action | **REQ-181**: Unlock User Account Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.8** | Security Alerts | Lines 4476–4576 | `SecurityAlerts.tsx` (`/security/alerts`) | View Security Incidents Table | **REQ-182**: Security Alerts Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.8** | Security Alerts | Lines 4476–4576 | `SecurityAlerts.tsx` (`/security/alerts`) | Filter Incidents by Severity | **REQ-183**: Filter Security Alerts | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.8** | Security Alerts | Lines 4476–4576 | `SecurityAlerts.tsx` (`/security/alerts`) | Click "Acknowledge" Alert Action | **REQ-184**: Acknowledge Alert Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.8** | Security Alerts | Lines 4476–4576 | `SecurityAlerts.tsx` (Resolution Modal) | Submit Alert Resolution Notes | **REQ-185**: Resolve Alert Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.9** | Device Management | Lines 4578–4680 | `DeviceManagement.tsx` (`/security/devices`) | View Registered Client Devices | **REQ-186**: User Devices Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.9** | Device Management | Lines 4578–4680 | `DeviceManagement.tsx` (`/security/devices`) | Filter by Trust Status | **REQ-187**: Filter User Devices | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.9** | Device Management | Lines 4578–4680 | `DeviceManagement.tsx` (`/security/devices`) | Mark Device as Trusted | **REQ-188**: Approve Device Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.9** | Device Management | Lines 4578–4680 | `DeviceManagement.tsx` (`/security/devices`) | Revoke Trust / Block Device | **REQ-189**: Block Device Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.9** | Device Management | Lines 4578–4680 | `DeviceManagement.tsx` (`/security/devices`) | Trigger Remote Wipe Confirmation | **REQ-190**: Remote Wipe Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.10** | Session Management | Lines 4682–4784 | `SessionManagement.tsx` (`/security/sessions`) | View Active Sessions Directory | **REQ-191**: Active Sessions Directory Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.10** | Session Management | Lines 4682–4784 | `SessionManagement.tsx` (`/security/sessions`) | Filter Sessions by User/IP | **REQ-192**: Filter Active Sessions | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.10** | Session Management | Lines 4682–4784 | `SessionManagement.tsx` (`/security/sessions`) | Terminate Single Session Action | **REQ-193**: Terminate Session Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.10** | Session Management | Lines 4682–4784 | `SessionManagement.tsx` (`/security/sessions`) | Terminate All Sessions for User | **REQ-194**: Terminate User Sessions Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.6.10** | Session Management | Lines 4682–4784 | `SessionManagement.tsx` (`/security/sessions`) | Force Global Session Purge | **REQ-195**: Global Session Termination Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7** | System Configuration | Lines 4786–4872 | `SystemConfigDashboard.tsx` (`/system/config`) | View Configuration Health | **REQ-196**: System Configuration Health Query | `GET {{adminServiceUrl}}/api/v1/health/services` | **VERIFIED** |
| **Story-1.7.1** | General Settings | Lines 4874–4970 | `GeneralSettings.tsx` (`/system/general`) | View General App Information | **REQ-198**: Platform General Settings Query | `GET {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story-1.7.1** | General Settings | Lines 4874–4970 | `GeneralSettings.tsx` (`/system/general`) | Save General App Information | **REQ-199**: Save General Settings Mutation | `PUT {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story-1.7.2** | Localization | Lines 4972–5070 | `Localization.tsx` (`/system/localization`) | View Localization Preferences | **REQ-200**: Localization Settings Query | `GET {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story-1.7.2** | Localization | Lines 4972–5070 | `Localization.tsx` (`/system/localization`) | Save Localization Preferences | **REQ-201**: Save Localization Mutation | `PUT {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story-1.7.2** | Localization | Lines 4972–5070 | `Localization.tsx` (`/system/localization`) | View Supported Languages | **REQ-202**: Supported Languages Catalog Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7.3** | Currency | Lines 5072–5164 | `Currency.tsx` (`/system/currency`) | View Currency Configuration | **REQ-203**: Currency Configuration Query | `GET {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story-1.7.3** | Currency | Lines 5072–5164 | `Currency.tsx` (`/system/currency`) | Save Base Currency & Precision | **REQ-204**: Save Currency Mutation | `PUT {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story-1.7.3** | Currency | Lines 5072–5164 | `Currency.tsx` (`/system/currency`) | Click "Sync Forex Rates" | **REQ-205**: Sync Forex Rates Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7.4** | Time Zone | Lines 5166–5258 | `TimeZone.tsx` (`/system/timezone`) | View Timezone Settings | **REQ-206**: Timezone Setting Query | `GET {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story-1.7.4** | Time Zone | Lines 5166–5258 | `TimeZone.tsx` (`/system/timezone`) | Save Timezone & DST Settings | **REQ-207**: Save Timezone Mutation | `PUT {{baseUrl}}/api/v1/platform-settings/GLOBAL_SETTINGS` | **VERIFIED** |
| **Story-1.7.4** | Time Zone | Lines 5166–5258 | `TimeZone.tsx` (`/system/timezone`) | View IANA Timezone Catalog | **REQ-208**: Timezone Catalog Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7.5** | Email Configuration | Lines 5260–5356 | `EmailConfiguration.tsx` (`/system/email`) | View SMTP Parameters | **REQ-209**: SMTP Gateway Parameters Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7.5** | Email Configuration | Lines 5260–5356 | `EmailConfiguration.tsx` (`/system/email`) | Save SMTP Host & Credentials | **REQ-210**: Update SMTP Configuration Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7.5** | Email Configuration | Lines 5260–5356 | `EmailConfiguration.tsx` (`/system/email`) | Click "Send Test Email" | **REQ-211**: Test SMTP Gateway Connection | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7.6** | SMS Configuration | Lines 5358–5456 | `SMSConfiguration.tsx` (`/system/sms`) | View SMS Gateway Parameters | **REQ-212**: SMS Gateway Parameters Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7.6** | SMS Configuration | Lines 5358–5456 | `SMSConfiguration.tsx` (`/system/sms`) | Save SMS API Key & Sender ID | **REQ-213**: Update SMS Gateway Mutation | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.7.6** | SMS Configuration | Lines 5358–5456 | `SMSConfiguration.tsx` (`/system/sms`) | Click "Send Test SMS" | **REQ-214**: Test SMS Gateway Transmission | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8** | Audit & Compliance | Lines 5458–5542 | `AuditDashboard.tsx` (`/audit`) | View Audit KPI Metrics | **REQ-215**: Audit Dashboard KPI Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8** | Audit & Compliance | Lines 5458–5542 | `AuditDashboard.tsx` (`/audit`) | View Event Volume Timeseries | **REQ-216**: Audit Volume Timeseries Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.1** | Audit Logs | Lines 5544–5632 | `AuditLogs.tsx` (`/audit/logs`) | View Immutable Audit Logs Table | **REQ-218**: Immutable Audit Trail Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.1** | Audit Logs | Lines 5544–5632 | `AuditLogs.tsx` (`/audit/logs`) | Filter Audit Logs by Actor/Date | **REQ-219**: Filter Audit Logs | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.1** | Audit Logs | Lines 5544–5632 | `AuditLogs.tsx` (`/audit/logs`) | Open Audit Record Detail Modal | **REQ-220**: Audit Record Detail Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.1** | Audit Logs | Lines 5544–5632 | `AuditLogs.tsx` (`/audit/logs`) | Export Audit Logs to CSV/PDF | **REQ-221**: Audit Trail Export Service | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.2** | Activity Logs | Lines 5634–5720 | `ActivityLogs.tsx` (`/audit/activity`) | View User Operational Activity Logs | **REQ-222**: Operational Activity Logs Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.2** | Activity Logs | Lines 5634–5720 | `ActivityLogs.tsx` (`/audit/activity`) | Filter Activity Logs by Module | **REQ-223**: Filter Activity Logs | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.2** | Activity Logs | Lines 5634–5720 | `ActivityLogs.tsx` (`/audit/activity`) | Export Activity Logs to CSV | **REQ-224**: Activity Logs Export Service | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.3** | Security Logs | Lines 5722–5808 | `SecurityLogs.tsx` (`/audit/security`) | View Security Incident Logs Table | **REQ-225**: Security Event Logs Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.3** | Security Logs | Lines 5722–5808 | `SecurityLogs.tsx` (`/audit/security`) | Filter by Event Code / Severity | **REQ-226**: Filter Security Logs | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.3** | Security Logs | Lines 5722–5808 | `SecurityLogs.tsx` (`/audit/security`) | Export Security Logs to CSV | **REQ-227**: Security Logs Export Service | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.4** | Compliance Reports | Lines 5810–5896 | `ComplianceReports.tsx` (`/audit/compliance`) | View Compliance Report History | **REQ-228**: Compliance Reports History Query | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.4** | Compliance Reports | Lines 5810–5896 | `ComplianceReports.tsx` (`/audit/compliance`) | Click "Generate Report" (SOC 2, ISO) | **REQ-229**: Generate Compliance Report Action | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |
| **Story-1.8.4** | Compliance Reports | Lines 5810–5896 | `ComplianceReports.tsx` (`/audit/compliance`) | Click "Download Report" (PDF/JSON) | **REQ-230**: Download Compliance Report Stream | **BACKEND CONTRACT REQUIRED** | **VERIFIED** |

---

## 3. Verification & Compliance Checklist

- [x] **All 58 Wireframe Stories Mapped:** Every story from Story-1 through Story-1.8.4 is represented with explicit line references from `JAVA-SUITE-WIREFRAMES.md`.
- [x] **Zero Orphaned Requirements:** Every backend capability corresponds directly to an interactive element or action in the reference UI prototype.
- [x] **Completed UI Tasks (UI-001 through UI-006) Traceable:**
  - **UI-001:** Traced to Story-1, `TelemetryGauge.tsx`, and **REQ-002** (Real-Time Hardware Telemetry).
  - **UI-002:** Traced to Story-1, `ActiveOnlineSessionsWidget.tsx`, and **REQ-003** (Active Online Sessions Counter).
  - **UI-003:** Traced to Story-1, `ExportReportModal.tsx`, and **REQ-004** (Dashboard Operational Report Generation).
  - **UI-004:** Traced to Story-1.1, `SuperAdminManagementHub.tsx`, `ModuleHealthCard.tsx`, and **REQ-008, REQ-009, REQ-010**.
  - **UI-005:** Traced to Story-1.2.5, `TenantDetails.tsx` BYOK form, and **REQ-063, REQ-064, REQ-065, REQ-066**.
  - **UI-006:** Traced to Story-1.2.5, `CIDRNetworkTable.tsx`, and **REQ-067, REQ-068, REQ-069, REQ-070, REQ-071**.
- [x] **Zero Speculative Endpoints:** Endpoints are strictly cited from documented Postman collections, while all other capabilities remain designated as **BACKEND CONTRACT REQUIRED**.
