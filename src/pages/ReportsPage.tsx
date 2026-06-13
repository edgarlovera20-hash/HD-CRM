import { BarChart3, PieChart, TrendingUp, Users, RefreshCw, Target, Download, Eye } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";

interface ReportCard {
  id: string;
  title: string;
  description: string;
  lastGenerated: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  trend?: string;
  trendUp?: boolean;
}

const reports: ReportCard[] = [
  {
    id: "1",
    title: "Revenue por Mes",
    description: "Análisis mensual de ingresos, crecimiento MoM y proyecciones para el siguiente trimestre.",
    lastGenerated: "Hoy, 09:15",
    category: "Financiero",
    icon: BarChart3,
    color: "#0066FF",
    trend: "+12.3%",
    trendUp: true,
  },
  {
    id: "2",
    title: "Análisis de Pipeline",
    description: "Estado actual del pipeline de ventas por etapa, valor ponderado y velocidad de cierre.",
    lastGenerated: "Hoy, 08:00",
    category: "Ventas",
    icon: TrendingUp,
    color: "#8B5CF6",
    trend: "$1.8M",
    trendUp: true,
  },
  {
    id: "3",
    title: "Tasa de Conversión de Leads",
    description: "Métricas de conversión desde prospecto hasta cliente cerrado, por fuente y canal.",
    lastGenerated: "Jun 12, 17:30",
    category: "Marketing",
    icon: Target,
    color: "#10B981",
    trend: "23.4%",
    trendUp: true,
  },
  {
    id: "4",
    title: "Ventas por Agente",
    description: "Performance individual de cada vendedor: volumen, tasa de cierre y comisiones generadas.",
    lastGenerated: "Jun 12, 16:00",
    category: "Ventas",
    icon: Users,
    color: "#F59E0B",
    trend: "5 agentes",
    trendUp: undefined,
  },
  {
    id: "5",
    title: "Retención de Clientes",
    description: "Análisis de churn, clientes en riesgo, NPS estimado y estrategias de fidelización.",
    lastGenerated: "Jun 10, 10:00",
    category: "CRM",
    icon: PieChart,
    color: "#EF4444",
    trend: "94.2%",
    trendUp: true,
  },
  {
    id: "6",
    title: "Forecast Q3 2026",
    description: "Proyección de ingresos para Q3 2026 basada en pipeline actual y tendencias históricas.",
    lastGenerated: "Jun 09, 14:30",
    category: "Financiero",
    icon: TrendingUp,
    color: "#00A3FF",
    trend: "$2.4M",
    trendUp: true,
  },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Financiero: { bg: "#0066FF15", text: "#60A5FA" },
  Ventas: { bg: "#8B5CF615", text: "#A78BFA" },
  Marketing: { bg: "#10B98115", text: "#10B981" },
  CRM: { bg: "#EF444415", text: "#F87171" },
};

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reportes Comerciales"
        description="Genera y descarga reportes de ventas, leads y rendimiento de equipo"
        actions={[
          { label: "Actualizar Todo", variant: "secondary", icon: RefreshCw },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {reports.map((report) => {
          const Icon = report.icon;
          const catStyle = categoryColors[report.category] ?? { bg: "#6B728015", text: "#9CA3AF" };

          return (
            <div
              key={report.id}
              className="rounded-[20px] p-5 flex flex-col transition-all hover:translate-y-[-2px]"
              style={{
                background: "#161F33",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center flex-shrink-0"
                  style={{ background: `${report.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: report.color }} />
                </div>
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: catStyle.bg, color: catStyle.text }}
                >
                  {report.category}
                </span>
              </div>

              {/* Title + description */}
              <h3 className="font-semibold text-white text-sm mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                {report.title}
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4 flex-1">{report.description}</p>

              {/* Trend + date */}
              <div className="flex items-center justify-between mb-4">
                {report.trend && (
                  <span className="text-sm font-bold" style={{ color: report.color }}>
                    {report.trend}
                  </span>
                )}
                <span className="text-[10px] text-[#4B5563] ml-auto">
                  Generado: {report.lastGenerated}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.06] mb-4" />

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-[10px] text-xs font-semibold transition-all text-white hover:bg-[#0052CC]"
                  style={{ background: "#0066FF" }}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Generar
                </button>
                <button
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all text-[#D1D5DB] hover:text-white hover:bg-white/[0.06]"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ver
                </button>
                <button
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all text-[#D1D5DB] hover:text-white hover:bg-white/[0.06]"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
