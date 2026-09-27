# Backend Contract Decisions Required

**Document Classification:** Architectural Decision Record & Backend Contract Checklist  
**Governing Source:** Official Java Suite Wireframes (`JAVA-SUITE-WIREFRAMES.md`) & `BACKEND_API_REQUIREMENTS_FROM_WIREFRAMES.md`  
**Target Reference Project:** `D:\super-admin-reference`  
**Generation Date:** September 25, 2026  
**Audience:** Backend Engineering Team, Cloud Architects, API Gateway Team, Security Team  

---

## 1. Purpose & Scope

This document specifies the **unresolved technical, architectural, and protocol decisions** that the backend engineering team must formally confirm before frontend API integration can commence.

In accordance with strict zero-speculation rules, **frontend development has not assumed answers to these architectural questions**. Every item listed below represents a genuine divergence or gap identified during the wireframe analysis and audit of existing backend artifacts (`BACKEND_API_CONTRACT.md` and Postman collections).

---

## 2. Unresolved Architectural Decision Checklist

The 16 core decision areas requiring backend confirmation are detailed below:

### 1. API Gateway & Base URL Topology
- **Current Observation:** The existing Postman collections and contract documents exhibit divergent and conflicting base URL patterns:
  - `GlobalDashboard_postman_collection.json`: Uses `http://localhost:8082/api/api/v1/global-dashboard` (note duplicated `/api/api/` segment).
  - `platform_settings_service_postman_collection.json`: Uses `{{baseUrl}}/api/v1/platform-settings` (port unspecified).
  - `super_admin_dashboard.postman_collection.json`: Uses `{{adminServiceUrl}}/api/v1/admin/dashboard` and standalone `{{standaloneDashboardUrl}}` on port 8081.
  - `Auth Service`: Uses `{{authServiceUrl}}/auth/login`.
- **Decisions Required from Backend Team:**
  1. What is the single, canonical API Gateway entrypoint URL for local development, staging, and production?
  2. Will all microservices (Auth, Admin, Platform Settings, Tenant, Organization, Audit) be routed behind a unified reverse proxy/gateway (e.g., Spring Cloud Gateway / Kong / AWS API Gateway) on a single hostname, or must the frontend maintain multi-origin client configurations?
  3. Confirm the removal of duplicate `/api/api/` path prefixes from the Global Dashboard endpoints.

---

### 2. API Versioning & URL Path Conventions
- **Current Observation:** Existing collection endpoints exhibit path inconsistency:
  - Some use `/v1/admin/dashboard`, while others use `/api/v1/admin/dashboard`.
  - Auth endpoints use unversioned `/auth/login`, `/auth/register`, `/auth/refresh`.
  - Platform settings use `/api/v1/platform-settings`.
- **Decisions Required from Backend Team:**
  1. Confirm the enterprise-wide standard URL path prefix. (Recommended: `/api/v1/{domain}/{resource}`).
  2. Confirm whether authentication endpoints will adhere to the versioned scheme (e.g., `/api/v1/auth/login`) or remain at root `/auth/login`.
  3. Confirm URL slug casing convention across resources and path variables (kebab-case vs camelCase, e.g. `/platform-settings/{{settingKey}}` vs `/platform-settings/{{setting-key}}`).

---

### 3. Authentication & Session Token Lifecycle
- **Current Observation:** Postman collections document `POST {{authServiceUrl}}/auth/login` and `POST {{authServiceUrl}}/auth/refresh`, but omit session revocation, logout, and token transmission specifications.
- **Decisions Required from Backend Team:**
  1. **Token Transmission Mechanism:** Will JWT access tokens be transmitted via `Authorization: Bearer <token>` request headers, or will the backend issue `HttpOnly`, `Secure`, `SameSite=Strict` cookies to prevent XSS credential theft?
  2. **Token Lifetimes:** What are the agreed lifetimes for access tokens (e.g., 15 minutes) and refresh tokens (e.g., 7 days / 30 days for Remember Me)?
  3. **Logout Endpoint Contract:** Confirm the canonical endpoint path and HTTP verb for user logout (e.g., `POST /api/v1/auth/logout`). Confirm whether the backend maintains a Redis-backed token revocation blacklist or relies strictly on token expiration.
  4. **Remember Me Behavior:** Confirm how the `rememberMe: true` UI toggle alters token generation (longer refresh token lifespan vs persistent cookie).

---

### 4. Multi-Tenant Context Propagation & Isolation Enforcement
- **Current Observation:** The wireframes mandate complete tenant data isolation across all screens, but the transport mechanism for tenant identity on API requests is undefined.
- **Decisions Required from Backend Team:**
  1. What is the canonical method for communicating tenant context on HTTP requests?
     - Option A: HTTP Header `X-Tenant-ID: <uuid-or-slug>`
     - Option B: Embedded JWT Claims (`tenant_id` inside decoded access token)
     - Option C: Subdomain Routing (`https://{tenant-code}.enterprise.domain/api/v1/...`)
     - Option D: URL Path Variable (`/api/v1/tenants/{tenantId}/...`)
  2. How are Super Admin cross-tenant operations authorized when viewing or managing a specific tenant's settings (e.g., `TenantDetails`)? Does the Super Admin pass an override header or path variable?

---

### 5. RBAC & Fine-Grained Permission Claim Payload Structure
- **Current Observation:** The wireframes specify a comprehensive RBAC matrix (Story-1.5, Story-1.5.3) covering system roles, custom roles, and fine-grained permissions per module.
- **Decisions Required from Backend Team:**
  1. Will the JWT access token payload embed all granted granular permission codes (e.g., `"permissions": ["TENANT_READ", "TENANT_WRITE", "USER_IMPORT"]`), or only role identifiers (e.g., `"roles": ["SUPER_ADMIN", "SECURITY_ADMIN"]`)?
  2. If permissions are not embedded in the JWT to prevent header bloat, what is the approved endpoint for the frontend to fetch current user permissions upon bootstrap (e.g., `GET /api/v1/users/me/permissions`)?
  3. What is the exact permission code taxonomy across the 8 core wireframe modules?

---

### 6. Standardized Error Response Envelope & Validation Error Mapping
- **Current Observation:** No standard error response schema is published in the existing API documentation.
- **Decisions Required from Backend Team:**
  1. Confirm the enterprise JSON error response schema for all 4xx and 5xx status codes.  
     *Recommended Standard:*
     ```json
     {
       "timestamp": "2026-09-25T18:30:00.000Z",
       "status": 400,
       "error": "BAD_REQUEST",
       "message": "Validation failed for request payload",
       "path": "/api/v1/tenants",
       "errors": {
         "domain": "Domain 'acme' is already reserved by another organization",
         "contactEmail": "Must be a valid enterprise email format"
       }
     }
     ```
  2. Confirm how field-level form validation errors will be formatted so that frontend input fields can dynamically render error states.

---

### 7. Pagination, Filtering, and Sorting Parameter Standards
- **Current Observation:** Tabular screens (Tenants, Users, Roles, Audit Logs, Sessions, Devices) require robust query capabilities, but parameter naming is unconfirmed.
- **Decisions Required from Backend Team:**
  1. **Page Indexing:** Is the page index 0-based (`page=0`) or 1-based (`page=1`)?
  2. **Page Size Parameter:** Is the parameter named `size`, `pageSize`, or `limit`? What is the default and maximum page size (e.g. default 10, max 100)?
  3. **Pagination Response Metadata:** Confirm the response envelope structure for paginated lists:
     ```json
     {
       "content": [ ... ],
       "page": 1,
       "pageSize": 25,
       "totalElements": 1420,
       "totalPages": 57,
       "isLast": false
     }
     ```
  4. **Sorting Parameter Syntax:** Standardize sorting parameters: `sortBy=createdAt&sortDir=desc` vs `sort=createdAt,desc`.
  5. **Filter Syntax:** Confirm whether filters are flat query parameters (e.g. `?status=ACTIVE&role=ADMIN`) or structured search queries.

---

### 8. File Upload & Media Storage Protocols
- **Current Observation:** The wireframes require file uploads in User Import (CSV/XLSX), Platform Branding (PNG/SVG logo, ICO favicon), Tenant Branding, and Company Legal Setup (PDF registration certificates).
- **Decisions Required from Backend Team:**
  1. What is the approved upload architecture?
     - Option A: Direct multipart form-data to the microservice (`multipart/form-data`).
     - Option B: Two-step presigned cloud URL flow (Frontend requests presigned URL -> uploads directly to S3/GCS/Azure Blob -> confirms upload to backend).
  2. What are the strict server-enforced MIME types and file size maximums per upload category (e.g., Logo <= 2MB, CSV <= 10MB)?

---

### 9. Document Generation & Export Polling vs Streaming Delivery
- **Current Observation:** Dashboard Report Export (Story-1 / UI-003), Audit Log Export (Story-1.8.1), and Compliance Reports (Story-1.8.4) generate PDF, Excel, and CSV files.
- **Decisions Required from Backend Team:**
  1. For small-to-medium exports (e.g. Tenant/User CSV under 5,000 rows): Will the endpoint return a synchronous binary stream with `Content-Disposition: attachment; filename=...`?
  2. For heavy asynchronous document compilations (e.g. Multi-month Audit PDF, SOC 2 compliance package): What is the job polling contract?
     - Step 1: `POST /api/v1/compliance-reports/generate` returns `{ "jobId": "job-abc-123", "status": "PROCESSING" }`
     - Step 2: `GET /api/v1/jobs/{jobId}` returns progress %
     - Step 3: Returns `downloadUrl` upon completion.

---

### 10. Telemetry & Real-Time Metrics Ingestion/Delivery
- **Current Observation:** UI-001 (Hardware CPU & Memory Gauges) and UI-002 (Active Online User Sessions Widget) require live telemetry updates.
- **Decisions Required from Backend Team:**
  1. What is the approved protocol for delivering live telemetry to the browser?
     - Option A: Regular HTTP short-polling at configured intervals (e.g., 15s or 30s) via `GET /api/v1/global-dashboard/metrics`.
     - Option B: Server-Sent Events (SSE) stream via `GET /api/v1/telemetry/stream`.
     - Option C: Full duplex WebSocket connection (e.g., STOMP over SockJS).
  2. If short-polling is selected, confirm acceptable client polling frequencies to prevent server load spikes.

---

### 11. Audit Logging Ingestion, Immutability & Retention Policy
- **Current Observation:** Story-1.8 and Story-1.8.1 through 1.8.3 require comprehensive audit logging across all administrative actions and user activities.
- **Decisions Required from Backend Team:**
  1. Confirm that frontend applications do NOT post audit events directly; all audit logging must be captured transparently at the API Gateway or microservice service layer via Spring AOP interceptors.
  2. Confirm whether audit query endpoints support full-text search across JSON payload diffs (before/after states).
  3. Confirm the audit log retention window (e.g., 90 days hot storage, 365 days cold archive).

---

### 12. Multi-Tenant White-Label Branding Asset Storage & CDN Delivery
- **Current Observation:** Platform branding (Story-1.1.4) and Tenant branding (Story-1.2.3) define custom logos, colors, and portal titles.
- **Decisions Required from Backend Team:**
  1. Are branding image URLs returned as public CDN URLs (e.g., `https://cdn.enterprise.domain/tenants/acme/logo.png`) or served via authenticated backend endpoints?
  2. What caching headers (`Cache-Control: public, max-age=86400, immutable`) are applied to branding assets?
  3. How are brand color tokens transmitted (JSON payload containing hex strings, or server-generated CSS stylesheet)?

---

### 13. Customer-Managed Key (BYOK) Cloud KMS Integration Scope
- **Current Observation:** UI-005 implemented the Customer-Managed Key (BYOK) form supporting AWS KMS, Azure Key Vault, and HashiCorp Vault.
- **Decisions Required from Backend Team:**
  1. Confirm whether BYOK key validation is executed synchronously against the cloud provider's API during the "Validate Key" action, or if it is queued asynchronously.
  2. Confirm the exact error payload when a KMS key ARN fails validation (e.g., missing IAM role permissions vs invalid ARN syntax vs unreachable KMS endpoint).
  3. Confirm the key rotation workflow: Does key rotation initiate an immediate background re-encryption of existing tenant database tables, and how is progress tracked?

---

### 14. CIDR Network Policy & Ingress IP Allowlist Enforcement Architecture
- **Current Observation:** UI-006 implemented the CIDR Network Policy table and allowlist rules per tenant.
- **Decisions Required from Backend Team:**
  1. Where is CIDR IP allowlist enforcement physically executed?
     - Option A: Edge / API Gateway level (evaluating `X-Forwarded-For` client IP against tenant CIDR rules before routing).
     - Option B: Application Security Filter (evaluating client IP during Spring Security filter chain execution).
  2. Confirm what HTTP status code and response payload is returned to a user whose IP address is blocked by CIDR policy (e.g., HTTP 403 Forbidden with specific `IP_NOT_ALLOWED` error code).
  3. Confirm emergency bypass mechanism: Can Super Admins access tenant administration even if their IP is outside the tenant's allowlist?

---

### 15. Software License Model, Activation Flow & Seat Quota Lifecycle
- **Current Observation:** Story-1.1.5 defines software license management with user seat allocations and tiers.
- **Decisions Required from Backend Team:**
  1. What is the formal license state machine (`TRIAL`, `ACTIVE`, `GRACE_PERIOD`, `EXPIRED`, `SUSPENDED`)?
  2. How does the backend enforce user seat quotas during User Registration (Story-1.4.1) or CSV Bulk Upload (Story-1.4.2)? What HTTP status is returned when seat limit is exceeded (e.g., HTTP 409 Conflict vs HTTP 402 Payment Required)?
  3. How are license keys generated and validated (asymmetric signed JWT license strings vs database-stored GUIDs)?

---

### 16. Dynamic Feature Flagging, Entitlements & Tenant Override Architecture
- **Current Observation:** Story-1.1.6 defines global feature flags with tenant-level overrides.
- **Decisions Required from Backend Team:**
  1. How are active feature flags delivered to the client application?
     - Option A: Delivered in a single bootstrap endpoint upon login (e.g., `GET /api/v1/bootstrap` or embedded in `auth/login` response).
     - Option B: Dedicated endpoint `GET /api/v1/features/evaluations` returning a dictionary of `{ [featureKey: string]: boolean }`.
  2. What is the rule evaluation precedence: Does Tenant Override take strict precedence over Subscription Tier Defaults and Global Platform Toggles?
  3. Are feature flag changes broadcasted via SSE/WebSocket, or refreshed on next user session / route change?

---

## 3. Decision Sign-Off Matrix

Before frontend service integration commences, backend architectural leads must review, resolve, and formally sign off on the decisions in this document:

| # | Architecture Decision Area | Backend Owner / Lead | Status | Target Confirmation Date | Approved Contract Reference |
|:---:|:---|:---|:---:|:---:|:---|
| 1 | API Gateway & Base URL Topology | | PENDING CONFIRMATION | | |
| 2 | API Versioning & URL Path Conventions | | PENDING CONFIRMATION | | |
| 3 | Authentication & Session Token Lifecycle | | PENDING CONFIRMATION | | |
| 4 | Multi-Tenant Context Propagation | | PENDING CONFIRMATION | | |
| 5 | RBAC Permission Claim Payload Structure | | PENDING CONFIRMATION | | |
| 6 | Standardized Error Response Envelope | | PENDING CONFIRMATION | | |
| 7 | Pagination, Filtering & Sorting Standards | | PENDING CONFIRMATION | | |
| 8 | File Upload & Media Storage Protocols | | PENDING CONFIRMATION | | |
| 9 | Document Generation & Export Polling | | PENDING CONFIRMATION | | |
| 10 | Telemetry & Real-Time Metrics Protocols | | PENDING CONFIRMATION | | |
| 11 | Audit Logging Ingestion Architecture | | PENDING CONFIRMATION | | |
| 12 | Branding Asset Storage & CDN Delivery | | PENDING CONFIRMATION | | |
| 13 | Customer-Managed Key (BYOK) Cloud KMS Scope | | PENDING CONFIRMATION | | |
| 14 | CIDR Network Policy Enforcement Architecture | | PENDING CONFIRMATION | | |
| 15 | Software License Lifecycle & Quota Handling | | PENDING CONFIRMATION | | |
| 16 | Dynamic Feature Flagging & Entitlements | | PENDING CONFIRMATION | | |

