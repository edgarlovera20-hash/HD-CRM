import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { auditLog } from "./server/middleware/auditLog.js";
import authRoutes from "./server/routes/auth.js";
import clientsRoutes from "./server/routes/clients.js";
import healthRoutes from "./server/routes/health.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ?? 3002;
const isDev = process.env.NODE_ENV !== "production";

app.use(express.json());

// Audit stub middleware on all API routes (logs mutations per HD-CORE contracts)
app.use("/api", auditLog);

app.use("/api/auth", authRoutes);
app.use("/api", healthRoutes);
app.use("/api", clientsRoutes);

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
