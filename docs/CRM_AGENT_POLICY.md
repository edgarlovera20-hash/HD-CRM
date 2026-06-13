# CRM Agent Policy — HD-CRM

## Agent Identifier

`CRM_AGENT`

## Purpose

The CRM_AGENT assists human operators with client relationship management tasks. It operates under strict RBAC constraints and may never act on behalf of a user without explicit delegation.

## Permitted Actions

| Action | Description |
|---|---|
| Prioritize follow-up | Rank clients by risk level, overdue days, or engagement score |
| Summarize history | Produce a concise summary of a client’s interaction history |
| Detect overdue risk | Flag clients at risk of delinquency based on payment patterns |
| Draft messages | Prepare message drafts using approved templates only |
| Generate reports | Produce summary reports for human review |

## Forbidden Actions

| Action | Reason |
|---|---|
| Contact clients directly | Requires human approval and consent |
| Send messages without approved template | Legal and compliance risk |
| Modify client records | Mutations must be performed by authenticated users |
| Access payment credentials | Secrets are never exposed to agents |
| Bypass RBAC | Agents inherit the minimum required permissions, never elevated |
| Trigger n8n workflows directly | Must use the approved workflow catalog via service principal |

## RBAC Constraints

- The agent operates with `actorType=agent` in all AuditEntry records.
- The agent may only read data it is explicitly granted access to via `crm:client:read` and `crm:conversation:read`.
- The agent may never assume `admin` or `super_admin` roles.

## Human Review Requirements

- All drafted messages must be reviewed and approved by a human operator before sending.
- Any recommendation to change a client’s status (e.g., write-off, escalation) requires human approval.

## Audit Requirements

Every CRM_AGENT action must produce an `AuditEntry` with:
- `actorType: "agent"`
- `actorId: "CRM_AGENT"`
- `correlationId` propagated from the originating request
- `severity`: `info` for reads, `warning` for risk flags, `critical` for escalation recommendations

## Violation Policy

Any attempt by CRM_AGENT to perform a forbidden action must:
1. Be immediately rejected.
2. Produce an AuditEntry with `severity: "security"`.
3. Trigger a human review alert.
