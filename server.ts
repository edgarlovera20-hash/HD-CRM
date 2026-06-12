import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { auditLog } from "./server/middleware/auditLog.js";
import authRoutes from "./server/routes/auth.js";
import agentRouter from "./server/routes/agent.js";
import clientsRoutes from "./server/routes/clients.js";
import healthRoutes from "./server/routes/health.js";
import leadsRouter from "./server/routes/leads.js";
import webhooksRouter from "./server/routes/webhooks.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3002;
const isDev = process.env.NODE_ENV !== "production";

app.use(express.json());

// CORS: allow HD-WEB (different origin/port) to call /api/leads cross-origin
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ?? "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// Audit stub middleware on all API routes (logs mutations per HD-CORE contracts)
app.use("/api", auditLog);

app.use("/api/auth", authRoutes);
app.use("/api/agent", agentRouter);
app.use("/api", healthRoutes);
app.use("/api", clientsRoutes);
app.use("/api/leads", leadsRouter);
app.use("/api/webhooks/n8n", webhooksRouter);

if (!isDev) {
  const clientDist = path.join(__dirname, "dist/client");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
} else {
  app.get("/api/ping", (_req, res) => res.json({ ok: true, env: "dev" }));
}

app.listen(PORT, () => {
  console.log(`HD-CRM server running on port ${PORT}`);
});

export default app;
