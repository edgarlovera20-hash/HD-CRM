# Roadmap — HD-CRM

## Phase 1: Technical Foundation

- [ ] TypeScript + Vite/Node project setup
- [ ] Shared contracts from HD-CORE integrated
- [ ] TypeScript strict mode enabled
- [ ] tsconfig.json with path aliases
- [ ] ESLint + Prettier configured
- [ ] CI/CD pipeline (typecheck + lint)
- [ ] .env.example documented

## Phase 2: Domain Model

- [ ] Client entity (id, name, status, riskLevel, tags)
- [ ] Lead entity (id, source, assignedTo, convertedAt)
- [ ] PaymentCommitment entity (id, clientId, amount, dueDate, status)
- [ ] Conversation entity (id, clientId, channel, messages[])
- [ ] Message entity (id, conversationId, content, sender, templateId, sentAt)
- [ ] AuditEntry integration from HD-CORE

## Phase 3: API Layer

- [ ] REST API following docs/API_CONTRACT.md
- [ ] JWT authentication middleware
- [ ] RBAC middleware using HD-CORE permissions
- [ ] Input validation with HD-CORE validators
- [ ] Error handling following API error contract
- [ ] Rate limiting

## Phase 4: UI

- [ ] Client list view with risk indicators
- [ ] Client detail view with history
- [ ] Overdue client dashboard
- [ ] Payment commitment tracker
- [ ] Conversation view (audited)
- [ ] Approved message template selector

## Phase 5: Integrations

- [ ] n8n: WEB_LEAD_TO_CRM workflow integration
- [ ] n8n: CRM_OVERDUE_ALERT workflow integration
- [ ] n8n: CRM_PAYMENT_COMMITMENT_REMINDER workflow integration
- [ ] Event bus: publish domain events to HD-BRAIN
- [ ] Event bus: consume events from HD-WEB

## Phase 6: AI Agents

- [ ] CRM_AGENT integration following docs/CRM_AGENT_POLICY.md
- [ ] Follow-up prioritization engine
- [ ] Risk detection model integration
- [ ] Message draft generator (template-constrained)
- [ ] Human-in-the-loop approval flow for agent drafts

## Phase 7: Observability

- [ ] AuditEntry persistence layer
- [ ] Audit log viewer (admin only)
- [ ] Metrics: overdue rate, conversion rate, message response time
- [ ] Alerting: critical risk threshold alerts

## Phase 8: Production Readiness

- [ ] Database migrations with rollback support
- [ ] Secrets management via environment variables (no hardcoded secrets)
- [ ] Load testing for client list and conversation endpoints
- [ ] Penetration testing checklist
- [ ] GDPR / data privacy review
- [ ] Disaster recovery plan
