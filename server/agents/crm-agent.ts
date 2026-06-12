// CRM_AGENT — read-only analysis only. NEVER contacts clients, modifies records, or sends messages.
import { randomUUID } from "crypto";

export interface CrmAgentInput {
  type: "overdue_analysis" | "client_summary" | "commitment_status";
  clientId?: string;
}

export interface CrmAgentResult {
  agentId: "CRM_AGENT";
  correlationId: string;
  actorType: "agent";
  input: CrmAgentInput;
  output: Record<string, unknown>;
  forbidden: string[];
  timestamp: string;
}

const FORBIDDEN_ACTIONS = [
  "contact_client",
  "send_message",
  "modify_client_record",
  "bypass_rbac",
  "delete_record",
];

const PERMITTED_ACTIONS = [
  "overdue_analysis",
  "client_summary",
  "commitment_status",
];

export function runCrmAgent(input: CrmAgentInput, actorId: string): CrmAgentResult {
  const correlationId = randomUUID();

  if (!PERMITTED_ACTIONS.includes(input.type)) {
    console.warn(
      `[CRM_AGENT] FORBIDDEN action attempted: ${input.type} actor=${actorId} correlationId=${correlationId}`,
    );
    throw new Error(
      `CRM_AGENT: action '${input.type}' is not permitted. Forbidden: ${FORBIDDEN_ACTIONS.join(", ")}`,
    );
  }

  console.log(
    `[AUDIT STUB] CRM_AGENT action=${input.type} actorId=${actorId} actorType=agent correlationId=${correlationId} platform=HD-CRM severity=info`,
  );

  const output: Record<string, unknown> = {
    analysis: `CRM_AGENT stub: analyzed ${input.type}`,
    recommendation:
      "Review overdue accounts and schedule follow-up with human approval",
    requiresHumanApproval: true,
  };

  return {
    agentId: "CRM_AGENT",
    correlationId,
    actorType: "agent",
    input,
    output,
    forbidden: FORBIDDEN_ACTIONS,
    timestamp: new Date().toISOString(),
  };
}
