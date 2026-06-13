# API Contract — HD-CRM

## Overview

This document defines the expected API surface for HD-CRM. Implementation follows after architecture phase is closed.

## Base URL

```
https://api.hd-crm.internal/v1
```

## Authentication

- All endpoints require a valid JWT issued by HD-CORE identity service.
- Agents use service principal tokens with scoped permissions.

## Resources

### Clients

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /clients | `crm:client:read` | List clients with filters |
| GET | /clients/:id | `crm:client:read` | Get single client |
| POST | /clients | `crm:client:create` | Create a new client |
| PATCH | /clients/:id | `crm:client:update` | Update client data |
| DELETE | /clients/:id | `crm:client:delete` | Soft-delete client |

### Leads

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /leads | `crm:lead:read` | List leads |
| POST | /leads | `crm:lead:create` | Create a lead (used by n8n WEB_LEAD_TO_CRM) |
| PATCH | /leads/:id/convert | `crm:lead:update` | Convert lead to client |

### Payment Commitments

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /commitments | `crm:commitment:read` | List commitments |
| POST | /commitments | `crm:commitment:create` | Create commitment |
| PATCH | /commitments/:id/fulfill | `crm:commitment:update` | Mark as fulfilled |

### Conversations

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | /conversations/:clientId | `crm:conversation:read` | Get client conversation history |
| POST | /conversations/:clientId/messages | `crm:conversation:write` | Send an audited message |

## Permissions Required

All permissions are defined in `HD-CORE/packages/contracts/src/rbac.ts`.

## Events Emitted

See `docs/EVENTS.md` for the full list of domain events.

## Audit Rules

- Every mutation (POST, PATCH, DELETE) must produce an `AuditEntry`.
- Read operations on sensitive data (conversations, payment details) must produce an `AuditEntry` with `severity: info`.

## Error Contract

| Code | Meaning |
|---|---|
| 400 | Validation error — payload does not match contract |
| 401 | Not authenticated |
| 403 | Insufficient permissions (RBAC) |
| 404 | Resource not found |
| 409 | Conflict — resource already exists or state conflict |
| 429 | Rate limit exceeded |
| 500 | Internal error — must never leak stack traces |

## Prohibited

- No direct database access from other platforms. HD-CRM data is only accessible through this API.
- No API keys in query parameters.
- No unauthenticated mutation endpoints.
