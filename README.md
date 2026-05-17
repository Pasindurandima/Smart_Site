# Construction ERP SaaS (MVP)

Cloud-first ERP platform for construction companies, built as a SaaS-ready web application.

## Tech Stack

- Frontend: React (Vite)
- Backend: Spring Boot (REST API)
- Database: MySQL
- Security: JWT (planned for full RBAC rollout)

## Current Repository Structure

- `frontend/` - React application
- `backend/` - Spring Boot API
- `database/` - schema and SQL scripts
- `docs/` - specifications and design docs

## Product Scope

The platform targets core construction operations:

- Project lifecycle and milestone tracking
- Worker and attendance management
- Inventory and material consumption control
- Expense, invoice, and payment workflows
- Client-facing progress portal
- SaaS subscription plans and tenant isolation

## Documentation

- Software Requirements Specification (SRS): `docs/SRS.md`

## Architecture Direction

This repository currently follows a modular monolith approach suitable for MVP delivery speed.

Planned evolution path:

1. Stabilize domain modules in the current Spring Boot codebase
2. Introduce API gateway and shared auth
3. Extract domain services (project, worker, inventory, finance, client)
4. Move toward event-driven communication for notifications and reporting

## Suggested Next Milestones

1. Implement company and tenant context in authentication flow
2. Add role-based protected routes in frontend and backend
3. Build project and task management end-to-end APIs and UI
4. Add inventory and expense modules with dashboard KPIs
5. Integrate invoice generation and client portal access

## Status

MVP foundation is in progress. See `docs/SRS.md` for complete requirements and module-level scope.
