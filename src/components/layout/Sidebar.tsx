import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Briefcase,
  LayoutDashboard,
  Users,
  UserPlus,
  Target,
  FileText,
  DollarSign,
  FileSpreadsheet,
  Tag,
  ClipboardList,
  BarChart3,
  PieChart,
  Globe,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface NavItem {
  label: string;
  path?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const navigation: { section: string; items: NavItem[] }[] = [
  {
    section: "Overview",
    items: [{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
  },
  {
    section: "Comercial",
    items: [
      { label: "Clientes", path: "/clients", icon: Users },
      { label: "Leads", path: "/leads", icon: UserPlus },
      { label: "Pipeline", path: "/leads", icon: Target },
      { label: "Cotizaciones", path: "/sales", icon: FileText },
    ],
  },
  {
    section: "Ventas",
    items: [
      { label: "Ventas", path: "/sales", icon: DollarSign },
      { label: "Facturas", path: "/sales", icon: FileSpreadsheet },
      { label: "Productos", path: "/sales", icon: Tag },
    ],
  },
  {
    section: "Marketing",
    items: [
      { label: "Campañas", path: "/reports", icon: ClipboardList },
      { label: "Formularios", path: "/reports", icon: Globe },
    ],
  },
  {
    section: "Reportes",
    items: [
      { label: "Reportes", path: "/reports", icon: BarChart3 },
      { label: "Analytics", path: "/reports", icon: PieChart },
    ],
  },
  {
    section: "Config",
    items: [
      { label: "Integraciones", path: "/reports", icon: Globe },
      { label: "Configuración", path: "/reports", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function toggleSection(section: string) {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  }

  function isActive(path?: string) {
    if (!path) return false;
    return location.pathname === path;
  }

  return (
    <aside
      className="flex flex-col h-screen w-64 flex-shrink-0 overflow-y-auto"
      style={{ background: "#111827", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.06]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0066FF, #00A3FF)" }}
        >
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div>
          <span
            className="font-bold text-lg leading-none"
            style={{
              background: "linear-gradient(135deg, #60A5FA, #38BDF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            HD CRM
          </span>
          <p className="text-[10px] text-[#4B5563] leading-none mt-0.5">Heavenly Dreams</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map(({ section, items }) => (
          <div key={section} className="mb-2">
            <button
              onClick={() => toggleSection(section)}
              className="w-full flex items-center justify-between px-2 py-1.5 mb-1 group"
            >
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#4B5563] group-hover:text-[#6B7280] transition-colors">
                {section}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-[#4B5563] transition-transform ${collapsed[section] ? "-rotate-90" : ""}`}
              />
            </button>

            {!collapsed[section] && (
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => item.path && navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm transition-all ${
                          active
                            ? "bg-[#0066FF]/15 text-[#60A5FA]"
                            : "text-[#6B7280] hover:text-[#D1D5DB] hover:bg-white/[0.04]"
                        }`}
                      >
                        <item.icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-[#3B82F6]" : ""}`} />
                        <span className="font-medium">{item.label}</span>
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-3 rounded-[12px] bg-white/[0.03]">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #0066FF, #00A3FF)" }}
          >
            {(user?.name ?? "U").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#E5E7EB] truncate">{user?.name ?? "Usuario"}</p>
            <p className="text-[10px] text-[#4B5563] truncate">{user?.email ?? ""}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex-shrink-0 text-[#4B5563] hover:text-[#EF4444] transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
