import { Router } from "express";
import { z } from "zod";
import { emitEvent } from "../events/emitter.js";

const router = Router();

const leadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().max(2000).optional(),
});

// In-memory leads store (replace with Prisma in next phase when DB is provisioned)
const leads: Array<{ id: string; correlationId: string; createdAt: string; source: string } & z.infer<typeof leadSchema>> = [];

router.post("/", async (req, res) => {
  try {
    const data = leadSchema.parse(req.body);
    const correlationId = crypto.randomUUID();
    const lead = {
      id: crypto.randomUUID(),
      correlationId,
      createdAt: new Date().toISOString(),
      source: "web",
      ...data,
    };
    leads.push(lead);
    console.log(`[AUDIT STUB] POST /api/leads correlationId=${correlationId}`);
    emitEvent(
      "web.lead.submitted",
      { leadId: lead.id, email: lead.email, source: "web" },
      "HD-CRM",
      { id: "system", type: "system" },
      lead.correlationId
    );
    return res.status(201).json({ ok: true, id: lead.id, correlationId });
  } catch {
    return res.status(400).json({ error: "Datos de lead inválidos" });
  }
});

router.get("/", (_req, res) => {
  res.json(leads);
});

export default router;
