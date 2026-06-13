# Environment Configuration — HD-CRM

## Overview

HD-CRM uses environment variables for all configuration. No secrets, credentials, or environment-specific values are hardcoded in source code.

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `APP_NAME` | Application identifier | `HD-CRM` |
| `APP_PORT` | HTTP server port | `3001` |
| `API_BASE_URL` | Base URL for this API | `http://localhost:3001` |
| `HD_CORE_MODE` | HD-CORE resolution mode | `local` or `registry` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/hdcrm` |
| `JWT_SECRET` | JWT signing secret | (never hardcode) |
| `JWT_EXPIRY` | Token expiry | `1h` |
| `N8N_WEBHOOK_BASE_URL` | n8n webhook base URL | `http://localhost:5678` |
| `AUDIT_DB_URL` | Separate audit database URL | `postgresql://user:password@localhost:5432/hdaudit` |
| `LOG_LEVEL` | Logging level | `info` |

## HD-CORE Dependency Mode

- `local`: Resolves HD-CORE packages via `file:../HD-CORE/packages/...` (local development)
- `registry`: Resolves via npm registry (CI/CD and production)

## Security Rules

1. Never commit a `.env` file with real values.
2. Use `.env.example` as the template for all environments.
3. Rotate `JWT_SECRET` immediately if exposed.
4. `DATABASE_URL` and `AUDIT_DB_URL` must use separate databases.
5. All secrets must be injected via environment variables in CI/CD pipelines.
