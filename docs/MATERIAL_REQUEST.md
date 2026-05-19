# Material Request Workflow Implementation

## Overview
Implemented a complete Material Request workflow allowing Site Engineers to submit material requests that Admins can review and approve/reject. Full multi-tenant isolation with company_id scoping.

## Backend Implementation

### 1. Database Table
**Table:** `material_requests`
- Columns: 
  - id (PK, auto-increment)
  - company_id (FK, required for multi-tenant isolation)
  - project_id (FK, nullable - engineer can select from assigned projects)
  - engineer_id (FK, nullable - auto-filled from authenticated user)
  - material_id (FK, nullable - optional link to inventory)
  - **material_name (NEW)** - Material name entered by engineer (e.g., "Cement", "Steel", "Concrete")
  - quantity (required, INT)
  - priority (ENUM: LOW, MEDIUM, HIGH; default: MEDIUM)
  - status (ENUM: PENDING, APPROVED, REJECTED; default: PENDING)
  - created_at (timestamp)
- Foreign Keys: company_id, project_id, engineer_id, material_id
- Indexes: company_id, project_id, engineer_id, material_id

**Migration:** Run `database/migrate_material_requests.sql` to add material_name column to existing installations

### 2. JPA Entity - MaterialRequest.java
- Extends `BaseEntity` for automatic company_id inheritance
- Enums: Priority (LOW, MEDIUM, HIGH), RequestStatus (PENDING, APPROVED, REJECTED)
- Maps to material_requests table
- Location: `backend/src/main/java/com/erp/model/MaterialRequest.java`

### 3. Repository - MaterialRequestRepository.java
- Extends JpaRepository<MaterialRequest, Long>
- Company-scoped query methods:
  - `findByCompanyId(Long companyId, Pageable pageable)` - Get all requests for a company
  - `findByCompanyIdAndStatus(Long companyId, MaterialRequest.RequestStatus status, Pageable pageable)` - Get pending requests for approval
  - `findByCompanyIdAndProjectId(Long companyId, Long projectId)` - Get requests for specific project
- Location: `backend/src/main/java/com/erp/repository/MaterialRequestRepository.java`

### 4. Service - MaterialRequestService.java
Enforces multi-tenant isolation with company_id filtering on every operation:
- `createRequest(MaterialRequestDTO)` - Site Engineer creates request (auto-set status=PENDING, company_id from AuthContext)
- `listPendingRequests(page, size)` - Admin fetches pending requests for approval (filtered by company)
- `listAllRequests(page, size)` - Get all requests for a company (filtered by company)
- `approveRequest(Long id)` - Admin approves request (verifies company ownership before update)
- `rejectRequest(Long id)` - Admin rejects request (verifies company ownership before update)
- All methods call `currentCompanyId()` from AuthContext and validate company ownership
- Location: `backend/src/main/java/com/erp/service/MaterialRequestService.java`

### 5. DTO - MaterialRequestDTO.java
Data transfer object with fields: 
- id, companyId, projectId, engineerId, materialId, materialName, quantity, priority (String), status (String), createdAt
- Location: `backend/src/main/java/com/erp/dto/MaterialRequestDTO.java`

### 6. REST Controller - MaterialRequestController.java
Endpoints:
- `POST /api/material-requests` - Create request (Site Engineer)
- `GET /api/material-requests/pending` - Get pending requests (Admin approval view)
- `GET /api/material-requests` - Get all requests for company (filtering, pagination)
- `POST /api/material-requests/{id}/approve` - Approve request (Admin)
- `POST /api/material-requests/{id}/reject` - Reject request (Admin)
- All endpoints require JWT auth with company_id header
- Location: `backend/src/main/java/com/erp/controller/MaterialRequestController.java`

## Frontend Implementation

### 1. Site Engineer View - MaterialRequest.jsx (Updated)
**Location:** `frontend/src/pages/engineer/MaterialRequest.jsx`

**Features:**
- **Form to submit material requests:**
  - Project (dropdown, auto-populated with engineer's assigned projects; first project auto-selected)
  - Material Name (required, text input - e.g., "Cement", "Steel", "Concrete")
  - Quantity (required, number input with min=1)
  - Priority (dropdown: LOW, MEDIUM, HIGH; default: MEDIUM)
  - Submit button with loading state
- **Displays engineer's submitted requests with:**
  - Material name and quantity
  - Request ID (MR-{id})
  - Created date
  - Priority badge (color-coded: RED for HIGH, YELLOW for MEDIUM, GREEN for LOW)
  - Status badge (PENDING=yellow, APPROVED=green, REJECTED=red)
- **Auto-fill behavior:**
  - On component mount, fetches projects from `/api/projects` via `useEffect`
  - If projects exist, automatically selects the first project in form
  - Engineers can change project via dropdown
- **Form submission:**
  - Validates material_name and quantity are filled
  - Sends POST to `/api/material-requests` with JWT + X-Company-Id headers
  - Clears form and resets project to first assigned project after successful submission
  - Displays error messages from backend
- Uses `axios` with proper auth headers (JWT token + company_id from localStorage)
  - Status badge (PENDING/APPROVED/REJECTED with colors)
- Uses `axios` to POST to `/api/material-requests`
- Fetches requests from `GET /api/material-requests`
- Sends Authorization header with JWT token and X-Company-Id header from localStorage

### 2. Admin Approval View - MaterialRequests.jsx (New)
**Location:** `frontend/src/pages/admin/MaterialRequests.jsx`

**Features:**
- Table view of pending material requests with columns:
  - Request ID
  - Material ID
  - Quantity
  - Priority (color-coded badge)
  - Engineer ID (who requested)
  - Date submitted
  - Current Status
  - Actions (Approve/Reject buttons for PENDING requests)
- Fetches pending requests from `GET /api/material-requests/pending`
- Action buttons:
  - Approve: POST to `/api/material-requests/{id}/approve`
  - Reject: POST to `/api/material-requests/{id}/reject`
- Refresh button to reload requests
- Error handling and loading states

### 3. Route Integration

**Admin Routes (AdminRoutes.jsx):**
- Added import: `import MaterialRequests from '../pages/admin/MaterialRequests'`
- Added to pageMap: `'material-requests': MaterialRequests`

**Engineer Routes (EngineerRoutes.jsx):**
- Already had: `'material-request': MaterialRequest` (existing component, now updated)

**Admin Sidebar (AdminSidebar.jsx):**
- Added menu item: `{ key: "material-requests", shortLabel: "MR", label: "Material Requests" }`
- Positioned after Inventory and before Finance

**Engineer Sidebar (EngineerSidebar.jsx):**
- Already had: `{ key: "material-request", shortLabel: "MR", label: "Material Request" }`

## Multi-Tenant Isolation

All Material Request operations enforce company_id boundaries:

1. **Create Request:**
   - `companyId` automatically extracted from JWT token via `AuthContext.get()`
   - Verified as required (throw IllegalArgumentException if missing)
   - Set on MaterialRequest entity before save

2. **Read Operations:**
   - `listPendingRequests()` filters by `findByCompanyIdAndStatus(companyId, PENDING, pageable)`
   - `listAllRequests()` filters by `findByCompanyId(companyId, pageable)`
   - No direct findAll() call—always scoped to current company

3. **Update Operations (Approve/Reject):**
   - Load request by ID
   - Verify `request.getCompanyId().equals(currentCompanyId())`
   - If mismatch, throw "Request not found" (not "Access Denied" to avoid info leakage)
   - Update only if company matches

4. **Frontend Security:**
   - Sends `X-Company-Id` header with each request for defense-in-depth
   - Reads companyId from JWT in localStorage and includes in POST/GET headers

## API Request/Response Examples

### Site Engineer - Submit Material Request
```
POST /api/material-requests
Headers: Authorization: Bearer {jwt}, X-Company-Id: {companyId}
Body: {
  "projectId": 5,
  "engineerId": 12,
  "materialId": 8,
  "materialName": "Cement",
  "quantity": 100,
  "priority": "HIGH"
}
Response: {
  "id": 42,
  "companyId": 3,
  "projectId": 5,
  "engineerId": 12,
  "materialId": 8,
  "materialName": "Cement",
  "quantity": 100,
  "priority": "HIGH",
  "status": "PENDING",
  "createdAt": "2026-05-19T14:30:00"
}
```

### Admin - Fetch Pending Requests
```
GET /api/material-requests/pending?page=0&size=20
Headers: Authorization: Bearer {jwt}, X-Company-Id: {companyId}
Response: [
  {
    "id": 42,
    "companyId": 3,
    "projectId": 5,
    "engineerId": 12,
    "materialId": 8,
    "materialName": "Cement",
    "quantity": 100,
    "priority": "HIGH",
    "status": "PENDING",
    "createdAt": "2026-05-19T14:30:00"
  },
  ...
]
```

### Admin - Approve Request
```
POST /api/material-requests/42/approve
Headers: Authorization: Bearer {jwt}, X-Company-Id: {companyId}
Response: {
  "id": 42,
  "companyId": 3,
  ...
  "status": "APPROVED",
  "createdAt": "2026-05-19T14:30:00"
}
```

## Build Status
- ✅ Backend: mvn clean package -DskipTests → SUCCESS (all source files compiled)
- ✅ Frontend: npm run build → SUCCESS (Vite bundled successfully)

## CORS Configuration
**Already configured in backend:** `backend/src/main/java/com/erp/config/WebConfig.java`
- Allowed origins: http://localhost:5173 (Vite), http://localhost:3000, http://localhost:8080
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS
- Allowed headers: * (all)
- Credentials: enabled
- Max age: 3600 seconds

Frontend and backend can communicate via axios requests without CORS errors.

## Testing Scenarios

1. **Site Engineer - Submit Request with Auto-filled Project**
   - Login as Site Engineer
   - Navigate to Material Request page
   - Verify project dropdown is pre-populated (auto-filled with first assigned project)
   - Verify form fields:
     - Project (dropdown with assigned projects)
     - Material Name (required text input - e.g., type "Cement")
     - Quantity (required number input - e.g., enter 100)
     - Priority (dropdown - select HIGH, MEDIUM, or LOW)
   - Click "Submit Request"
   - Verify request appears in "Your Requests" section with:
     - Material name displayed (e.g., "Cement • 100 units")
     - Status badge showing "PENDING" (yellow)
     - Created date and priority shown

2. **Admin - Review Pending Requests**
   - Login as Admin
   - Navigate to "Material Requests" from sidebar (MR icon)
   - See table with all pending requests for the company:
     - ID column shows MR-{id}
     - Material column shows material name from request (e.g., "Cement")
     - Quantity, Priority, Engineer ID, Date, Status columns populated
   - Cannot see requests from other companies (tenant isolation)

3. **Admin - Approve/Reject Requests**
   - From pending requests table, click "Approve" on a request
   - Verify status changes to APPROVED (green badge)
   - Verify Approve/Reject buttons disappear (request is finalized)
   - Refresh page and verify status persists
   - Repeat test with "Reject" button (status becomes REJECTED with red badge)

4. **Multi-Tenant Isolation Test**
   - Have two engineers from different companies submit requests
   - Admin from Company A can only see Company A's requests
   - Admin from Company B only sees Company B's requests
   - Verify company_id header is enforced

## Security Notes
- ✅ All queries filtered by company_id
- ✅ AuthContext provides tenant awareness per-request
- ✅ Ownership verification before allow/reject operations
- ✅ JWT token contains companyId (extracted in AuthContext setup)
- ✅ Frontend sends company header for defense-in-depth
