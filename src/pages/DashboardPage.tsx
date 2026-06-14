import type { ComponentType, CSSProperties } from "react";
import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Building2,
  Activity,
  UserPlus,
  CheckCircle,
  Phone,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { MetricCard } from "../components/ui/MetricCard";
import { StatusBadge } from "../components/ui/StatusBadge";

interface Activity {
  id: string;
  type: "lead" | "deal" | "contact" | "meeting";
  description: string;
  time: string;
  user: string;
}

const recentActivities: Activity[] = [
  { id: "1", type: "lead", description: "Nuevo lead: Corporativo Bajío SA", time: "Hace 5 min", user: "Carlos M." },
  { id: "2", type: "deal", description: "Deal movido a Propuesta: Hotel Las Palmas", time: "Hace 22 min", user: "Ana R." },
  { id: "3", type: "contact", description: "Contacto realizado: Juan García (TecNorte)", time: "Hace 45 min", user: "Luis H." },
  { id: "4", type: "meeting", description: "Reunión agendada: Farmacéutica GDL — 15 Jun", time: "Hace 1h", user: "María L." },
  { id: "5", type: "deal", description: "Deal cerrado ganado: Distribuidora CDMX $85,000", time: "Hace 2h", user: "Carlos M." },
  { id: "6", type: "lead", description: "Nuevo lead: Automotriz Frontera", time: "Hace 3h", user: "Ana R." },
  { id: "7", type: "contact", description: "Seguimiento: Constructora Monterrey", time: "Hace 4h", user: "Luis H." },
  { id: "8", type: "meeting", description: "Reunión completada: Grupo Salinas — Propuesta", time: "Ayer 18:30", user: "María L." },
];

const activityIcons: Record<Activity["type"], ComponentType<{ className?: string; style?: CSSProperties }>> = {
  lead: UserPlus,
  deal: ArrowUpRight,
  contact: Phone,
  meeting: Calendar,
};

const activityColors: Record<Activity["type"], string> = {
  lead: "#0066FF",
  deal: "#10B981",
  contact: "#F59E0B",
  meeting: "#8B5CF6",
};

interface TopClient {
  id: string;
  name: string;
  company: string;
  revenue: number;
  status: "active" | "inactive" | "prospect";
  lastContact: string;
}

const topClients: TopClient[] = [
  { id: "1", name: "María López", company: "Constructora Monterrey", revenue: 89500, status: "active", lastContact: "Hoy" },
  { id: "2", name: "Juan García", company: "TecNorte SA", revenue: 45200, status: "active", lastContact: "Ayer" },
  { id: "3", name: "Ana Martínez", company: "Hotel Paraíso Cancún", revenue: 32000, status: "active", lastContact: "Jun 10" },
  { id: "4", name: "Luis Hernández", company: "Farmacéutica GDL", revenue: 27500, status: "active", lastContact: "Jun 09" },
  { id: "5", name: "Carlos Rodríguez", company: "Distribuidora CDMX", revenue: 85000, status: "active", lastContact: "Hoy" },
];

const pipelineStages = [
  { name: "Prospecting", deals: 45, value: 820000, color: "#0066FF" },
  { name: "Qualification", deals: 28, value: 510000, color: "#8B5CF6" },
  { name: "Proposal", deals: 17, value: 320000, color: "#F59E0B" },
  { name: "Negotiation", deals: 12, value: 195000, color: "#EF4444" },
  { name: "Closing", deals: 8, value: 148000, color: "#10B981" },
];

const maxDeals = Math.max(...pipelineStages.map((s) => s.deals));

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="MRR"
          value="$284,500"
          change="+12.3%"
          changeType="up"
          icon={DollarSign}
          color="#0066FF"
        />
        <MetricCard
          title="Leads Activos"
          value="342"
          change="+47"
          changeType="up"
          icon={UserPlus}
          color="#8B5CF6"
        />
        <MetricCard
          title="Tasa de Cierre"
          value="23.4%"
          change="+2.1%"
          changeType="up"
          icon={Target}
          color="#10B981"
        />
        <MetricCard
          title="Pipeline Value"
          value="$1.8M"
          change="+$230K"
          changeType="up"
          icon={TrendingUp}
          color="#F59E0B"
        />
        <MetricCard
          title="Clientes Activos"
          value="187"
          change="+8"
          changeType="up"
          icon={Users}
          color="#00A3FF"
        />
        <MetricCard
          title="CAC"
          value="$1,240"
          change="-$80"
          changeType="down"
          icon={Activity}
          color="#10B981"
          goodDown
        />
      </div>

      {/* Middle row: Activities + Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div
          className="rounded-[20px] overflow-hidden"
          style={{
            background: "#161F33",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          }}
        >
          <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
              Actividad Reciente
            </h3>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentActivities.map((act) => {
              const Icon = activityIcons[act.type];
              const color = activityColors[act.type];
              return (
                <div key={act.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <div
                    className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${color}20` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#D1D5DB] leading-snug">{act.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#4B5563]">{act.time}</span>
                      <span className="text-xs text-[#4B5563]">·</span>
                      <span className="text-xs text-[#6B7280]">{act.user}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline by Stage */}
        <div
          className="rounded-[20px] overflow-hidden"
          style={{
            background: "#161F33",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          }}
        >
          <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
              Pipeline por Etapa
            </h3>
          </div>
          <div className="px-5 py-4 space-y-4">
            {pipelineStages.map((stage) => (
              <div key={stage.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: stage.color }}
                    />
                    <span className="text-sm text-[#D1D5DB]">{stage.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#6B7280]">{stage.deals} deals</span>
                    <span className="text-xs font-semibold text-white">{currency.format(stage.value)}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(stage.deals / maxDeals) * 100}%`,
                      background: stage.color,
                      opacity: 0.8,
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Total */}
            <div
              className="pt-4 mt-2 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-sm text-[#6B7280]">Total pipeline</span>
              <span className="text-base font-bold text-white">
                {currency.format(pipelineStages.reduce((s, st) => s + st.value, 0))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Clients Table */}
      <div
        className="rounded-[20px] overflow-hidden"
        style={{
          background: "#161F33",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
            Clientes Principales
          </h3>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-xs text-[#6B7280]">Top 5 por revenue</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">Cliente</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">Empresa</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">Revenue</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">Estado</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">Último Contacto</th>
              </tr>
            </thead>
            <tbody>
              {topClients.map((client, idx) => (
                <tr
                  key={client.id}
                  className="transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: idx < topClients.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #0066FF, #00A3FF)" }}
                      >
                        {client.name.charAt(0)}
                      </div>
                      <span className="text-[#D1D5DB] font-medium">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#4B5563]" />
                      <span className="text-[#9CA3AF]">{client.company}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-white">{currency.format(client.revenue)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={client.status} />
                  </td>
                  <td className="px-5 py-4 text-[#6B7280]">{client.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
