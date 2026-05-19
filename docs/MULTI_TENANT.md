# Multi-Tenant Architecture

This project uses a shared-database multi-tenant model.

## Core rule

Every tenant-aware table carries `company_id`.

## Request flow

1. User logs in.
2. Backend returns a JWT containing `userId`, `role`, and `companyId`.
3. The backend filter reads the token and stores tenant context in `AuthContext`.
4. Service and repository methods scope queries by `companyId`.
5. The frontend stores `token`, `role`, and `companyId` in local storage.

## Data backfill

Use [database/backfill_company_id.sql](../database/backfill_company_id.sql) to repair legacy rows that were created before tenant scoping was enforced.

## Safe rules

- Never query shared tables without a `company_id` filter for tenant data.
- Do not expose rows across tenant boundaries in APIs.
- When creating tenant-owned records, set `company_id` immediately from the authenticated context.

## Notes

- `SUPER_ADMIN` can operate across tenants.
- Company users should only see their own company rows.
- Keep schema migration work separate from app runtime logic when possible.