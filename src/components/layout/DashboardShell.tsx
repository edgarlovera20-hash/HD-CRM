import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/clients": "Clientes",
  "/leads": "Pipeline de Leads",
  "/sales": "Ventas",
  "/reports": "Reportes Comerciales",
};

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const location = useLocation();
  const title = pageTitles[location.pathname] ?? "HD CRM";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0A0F1C" }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar title={title} />
        <main className="flex-1 overflow-y-auto px-6 py-6" style={{ background: "#0A0F1C" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
