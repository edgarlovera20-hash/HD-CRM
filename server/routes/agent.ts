import { Router } from "express";
import { z } from "zod";
import { requireAuth, AuthRequest } from "../middleware/requireAuth.js";
import { runCrmAgent } from "../agents/crm-agent.js";

const router = Router();

const inputSchema = z.object({
  type: z.enum(["overdue_analysis", "client_summary", "commitment_status"]),
  clientId: z.string().optional(),
});

// POST /api/agent/run — CRM_AGENT entry point (requireAuth enforced)
router.post("/run", requireAuth, (req: AuthRequest, res) => {
  try {
    const input = inputSchema.parse(req.body);
    const result = runCrmAgent(input, req.user?.sub ?? "unknown");
    return res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(400).json({ error: message });
  }
});

export default router;
