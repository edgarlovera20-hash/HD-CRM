import { randomUUID } from "crypto";
import { Router } from "express";
import { z } from "zod";
import { requireAuth, type AuthRequest } from "../middleware/requireAuth.js";
import type { Client, PaymentCommitment } from "../types.js";
import { emitEvent } from "../events/emitter.js";

const router = Router();

// In-memory seed data (replace with real DB queries in production).
// HD-CRM owns clients, leads, conversations, payment commitments and overdue accounts.
const clients: Client[] = [
  { id: "cli_001", name: "María González Hernández", status: "active", balance: 0, lastContact: "2026-06-10", phone: "+52 55 1234 5678" },
  { id: "cli_002", name: "José Ramírez Torres", status: "overdue", balance: 4850.5, lastContact: "2026-05-02", phone: "+52 33 2345 6789" },
  { id: "cli_003", name: "Guadalupe Martínez López", status: "new", balance: 0, lastContact: "2026-06-11", phone: "+52 81 3456 7890" },
  { id: "cli_004", name: "Carlos Sánchez Flores", status: "overdue", balance: 12200, lastContact: "2026-04-18", phone: "+52 55 4567 8901" },
  { id: "cli_005", name: "Ana Patricia Jiménez", status: "active", balance: 1500, lastContact: "2026-06-09", phone: "+52 222 567 8912" },
  { id: "cli_006", name: "Roberto Díaz Mendoza", status: "active", balance: 0, lastContact: "2026-06-08", phone: "+52 33 6789 0123" },
  { id: "cli_007", name: "Fernanda Ruiz Castillo", status: "new", balance: 0, lastContact: "2026-06-12", phone: "+52 998 789 0134" },
  { id: "cli_008", name: "Miguel Ángel Vargas", status: "overdue", balance: 7320.75, lastContact: "2026-04-29", phone: "+52 55 8901 2345" },
  { id: "cli_009", name: "Lucía Morales Reyes", status: "active", balance: 980, lastContact: "2026-06-07", phone: "+52 442 901 2356" },
  { id: "cli_010", name: "Javier Ortega Núñez", status: "overdue", balance: 3100, lastContact: "2026-05-15", phone: "+52 81 0123 4567" },
];

const commitments: PaymentCommitment[] = [];

const commitmentSchema = z.object({
  clientId: z.string().min(1),
  amount: z.number().positive(),
  dueDate: z.string().min(1),
});

// GET /api/clients — list all clients
router.get("/clients", requireAuth, (_req, res) => {
  res.json({ clients });
});

// GET /api/clients/overdue — list overdue accounts only
router.get("/clients/overdue", requireAuth, (_req, res) => {
  res.json({ clients: clients.filter((c) => c.status === "overdue") });
});

// GET /api/clients/:id — single client
router.get("/clients/:id", requireAuth, (req, res) => {
  const client = clients.find((c) => c.id === req.params.id);
  if (!client) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }
  res.json({ client });
});

// GET /api/commitments — list payment commitments
router.get("/commitments", requireAuth, (_req, res) => {
  res.json({ commitments });
});

// POST /api/commitments — create a payment commitment
router.post("/commitments", requireAuth, (req: AuthRequest, res) => {
  const parsed = commitmentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Solicitud inválida", details: parsed.error.issues });
  }

  const client = clients.find((c) => c.id === parsed.data.clientId);
  if (!client) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }

  const commitment: PaymentCommitment = {
    id: `cmt_${randomUUID()}`,
    clientId: parsed.data.clientId,
    amount: parsed.data.amount,
    dueDate: parsed.data.dueDate,
    correlationId: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  commitments.push(commitment);

  // Audit stub: every mutation must produce an AuditEntry per HD-CORE contracts.
  console.log("[AUDIT STUB] payment_commitment.created", {
    action: "create",
    resourceType: "payment_commitment",
    resourceId: commitment.id,
    correlationId: commitment.correlationId,
    platform: "HD-CRM",
    at: commitment.createdAt,
  });

  emitEvent(
    "crm.payment_commitment.created",
    { commitmentId: commitment.id, clientId: commitment.clientId, amount: commitment.amount },
    "HD-CRM",
    { id: req.user?.sub ?? "system", type: req.user ? "user" : "system" },
    commitment.correlationId
  );

  res.status(201).json({ commitment });
});

export default router;
