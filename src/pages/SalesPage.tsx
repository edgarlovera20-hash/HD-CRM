import { DollarSign, TrendingUp, Calendar, Award } from "lucide-react";
import { DataTable, type Column } from "../components/ui/DataTable";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusBadge } from "../components/ui/StatusBadge";
import { MetricCard } from "../components/ui/MetricCard";

type SaleStatus = "active" | "pending" | "won" | "lost";

interface Sale {
  id: string;
  date: string;
  client: string;
  dealName: string;
  amount: number;
  salesperson: string;
  commission: number;
  status: SaleStatus;
}

const sales: Sale[] = [
  { id: "1", date: "13 Jun 2026", client: "Logística del Pacífico", dealName: "Contrato Marco TI 2026", amount: 580000, salesperson: "Carlos Méndez", commission: 29000, status: "won" },
  { id: "2", date: "12 Jun 2026", client: "Automotriz Frontera", dealName: "Migración a Cloud AWS", amount: 260000, salesperson: "Luis Hernández", commission: 13000, status: "won" },
  { id: "3", date: "11 Jun 2026", client: "Distribuidora CDMX", dealName: "Sistema de Cobranza Digital", amount: 85000, salesperson: "Carlos Méndez", commission: 4250, status: "won" },
  { id: "4", date: "10 Jun 2026", client: "Grupo Industrial Bajío", dealName: "Implementación SAP B1", amount: 450000, salesperson: "Ana Ruiz", commission: 22500, status: "pending" },
  { id: "5", date: "09 Jun 2026", client: "Farmacéutica GDL", dealName: "ERP + HRM Integrado", amount: 340000, salesperson: "María López", commission: 17000, status: "pending" },
  { id: "6", date: "07 Jun 2026", client: "Hotel Paraíso Cancún", dealName: "Plataforma Omnicanal", amount: 195000, salesperson: "Ana Ruiz", commission: 9750, status: "pending" },
  { id: "7", date: "05 Jun 2026", client: "Exportadora Veracruz", dealName: "BPO Financiero Anual", amount: 180000, salesperson: "Carlos Méndez", commission: 9000, status: "won" },
  { id: "8", date: "03 Jun 2026", client: "TecNorte SA", dealName: "Data Analytics Platform", amount: 125000, salesperson: "Luis Hernández", commission: 6250, status: "won" },
  { id: "9", date: "01 Jun 2026", client: "Constructora Monterrey", dealName: "Ciberseguridad Enterprise", amount: 290000, salesperson: "María López", commission: 14500, status: "pending" },
  { id: "10", date: "28 May 2026", client: "Inmobiliaria Horizonte", dealName: "CRM Empresarial", amount: 78000, salesperson: "Ana Ruiz", commission: 3900, status: "lost" },
  { id: "11", date: "25 May 2026", client: "Agencia Creativa MX", dealName: "Suite Marketing Digital", amount: 45000, salesperson: "Carlos Méndez", commission: 2250, status: "won" },
  { id: "12", date: "20 May 2026", client: "Clínica Santa Fe", dealName: "Software de Gestión Médica", amount: 95000, salesperson: "Luis Hernández", commission: 4750, status: "won" },
];

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const columns: Column<Sale>[] = [
  {
    key: "date",
    header: "Fecha",
    width: "110px",
    render: (row) => <span className="text-[#9CA3AF] text-xs">{row.date}</span>,
  },
  {
    key: "client",
    header: "Cliente",
    render: (row) => (
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0066FF, #00A3FF)" }}
        >
          {row.client.charAt(0)}
        </div>
        <span className="text-[#D1D5DB] font-medium text-sm">{row.client}</span>
      </div>
    ),
  },
  {
    key: "dealName",
    header: "Deal",
    render: (row) => <span className="text-[#9CA3AF] text-sm">{row.dealName}</span>,
  },
  {
    key: "amount",
    header: "Monto",
    render: (row) => (
      <span className="text-white font-bold text-sm">{currency.format(row.amount)}</span>
    ),
  },
  {
    key: "salesperson",
    header: "Vendedor",
    render: (row) => <span className="text-[#9CA3AF] text-sm">{row.salesperson}</span>,
  },
  {
    key: "commission",
    header: "Comisión",
    render: (row) => (
      <span className="text-[#10B981] font-semibold text-sm">{currency.format(row.commission)}</span>
    ),
  },
  {
    key: "status",
    header: "Estado",
    render: (row) => <StatusBadge status={row.status} />,
  },
];

export default function SalesPage() {
  const monthTotal = sales
    .filter((s) => s.date.includes("Jun 2026"))
    .reduce((sum, s) => sum + s.amount, 0);

  const lastMonthTotal = 253200;

  const quarterTotal = sales.reduce((sum, s) => sum + s.amount, 0) + 504600;

  return (
    <div>
      <PageHeader
        title="Ventas"
        description="Historial y seguimiento de ventas cerradas"
        actions={[
          { label: "Exportar", variant: "secondary" },
          { label: "+ Nueva Venta", variant: "primary" },
        ]}
      />

      {/* Summary metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Mes Actual"
          value={`$${(monthTotal / 1000).toFixed(0)}K`}
          change="+12.3%"
          changeType="up"
          icon={DollarSign}
          color="#0066FF"
        />
        <MetricCard
          title="Mes Anterior"
          value={`$${(lastMonthTotal / 1000).toFixed(0)}K`}
          change="-"
          changeType="neutral"
          icon={Calendar}
          color="#6B7280"
        />
        <MetricCard
          title="Trimestre Q2"
          value={`$${(quarterTotal / 1000).toFixed(0)}K`}
          change="+8.7%"
          changeType="up"
          icon={TrendingUp}
          color="#10B981"
        />
        <MetricCard
          title="Total Año 2026"
          value="$2.1M"
          change="+21.4%"
          changeType="up"
          icon={Award}
          color="#F59E0B"
        />
      </div>

      {/* Sales table */}
      <DataTable<Sale>
        columns={columns}
        data={sales}
        keyExtractor={(row) => row.id}
        emptyMessage="No hay ventas registradas."
      />
    </div>
  );
}
