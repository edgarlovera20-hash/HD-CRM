# Events — HD-CRM

## Overview

This document catalogs all domain events produced and consumed by HD-CRM. All shared event names must originate from HD-CORE `packages/contracts/src/events.ts`. New events must be added to HD-CORE first.

## Produced Events

| Event | Producer | Consumers | Payload Summary | Sensitivity |
|---|---|---|---|---|
| `crm.lead.created` | HD-CRM | HD-BRAIN, HD-OPERATIONS | leadId, source, createdAt, correlationId | internal |
| `crm.client.overdue_detected` | HD-CRM | HD-BRAIN, HD-ADMIN | clientId, overdueDays, amount, correlationId | internal |
| `crm.payment_commitment.created` | HD-CRM | HD-BRAIN | clientId, commitmentId, dueDate, amount, correlationId | internal |
| `crm.payment_commitment.fulfilled` | HD-CRM | HD-BRAIN, HD-ADMIN | clientId, commitmentId, paidAt, correlationId | internal |
| `crm.conversation.message_sent` | HD-CRM | HD-BRAIN | clientId, conversationId, channel, correlationId | confidential |
| `crm.client.risk_flagged` | HD-CRM | HD-BRAIN, HD-ADMIN | clientId, riskType, severity, correlationId | confidential |

## Consumed Events

| Event | Consumer | Source | Action Taken |
|---|---|---|---|
| `web.lead.submitted` | HD-CRM | HD-WEB | Create lead record |
| `brain.risk.alert_generated` | HD-CRM | HD-BRAIN | Flag client for human review |
| `admin.user.role_changed` | HD-CRM | HD-ADMIN | Refresh RBAC context |

## Rules

1. All shared event names must come from `HD-CORE/packages/contracts/src/events.ts`.
2. Every event payload must include `correlationId` and `createdAt`.
3. Events must never include credentials, tokens, or full PII — only identifiers.
4. Consumers must be idempotent: processing the same event twice must not produce side effects.
5. HD-CRM must not directly call HD-BRAIN, HD-ADMIN, or HD-RH APIs. Communication is event-driven only.
