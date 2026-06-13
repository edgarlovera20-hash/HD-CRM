import { PipelineCard } from "../components/ui/PipelineCard";
import { PageHeader } from "../components/ui/PageHeader";

interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  assignee: string;
  daysInStage: number;
}

const pipelineData: {
  stage: string;
  color: string;
  headerBg: string;
  deals: Deal[];
}[] = [
  {
    stage: "Prospecting",
    color: "#0066FF",
    headerBg: "#0066FF15",
    deals: [
      { id: "p1", name: "Sistema ERP Empresarial", company: "TecNorte SA", value: 120000, stage: "Prospecting", probability: 15, assignee: "Carlos Méndez", daysInStage: 3 },
      { id: "p2", name: "Licencias Software 2026", company: "Automotriz Frontera", value: 45000, stage: "Prospecting", probability: 20, assignee: "Ana Ruiz", daysInStage: 1 },
      { id: "p3", name: "Consultoría IT Anual", company: "Corporativo Bajío", value: 85000, stage: "Prospecting", probability: 10, assignee: "Luis Hdz", daysInStage: 5 },
      { id: "p4", name: "Infraestructura Cloud", company: "Exportadora Veracruz", value: 200000, stage: "Prospecting", probability: 12, assignee: "María L.", daysInStage: 2 },
      { id: "p5", name: "Plan Marketing Digital", company: "Clínica Santa Fe", value: 30000, stage: "Prospecting", probability: 18, assignee: "Carlos Méndez", daysInStage: 7 },
      { id: "p6", name: "Sistema POS Restaurantes", company: "Grupo Gastronómico", value: 65000, stage: "Prospecting", probability: 15, assignee: "Ana Ruiz", daysInStage: 4 },
      { id: "p7", name: "Seguridad Perimetral", company: "Inmobiliaria Horizonte", value: 95000, stage: "Prospecting", probability: 10, assignee: "Luis Hdz", daysInStage: 6 },
      { id: "p8", name: "App Móvil Corporativa", company: "Farmacéutica GDL", value: 180000, stage: "Prospecting", probability: 20, assignee: "María L.", daysInStage: 9 },
    ],
  },
  {
    stage: "Qualification",
    color: "#8B5CF6",
    headerBg: "#8B5CF615",
    deals: [
      { id: "q1", name: "Renovación Contrato ERP", company: "Constructora Mty", value: 145000, stage: "Qualification", probability: 35, assignee: "Carlos Méndez", daysInStage: 8 },
      { id: "q2", name: "Plataforma E-commerce", company: "Distribuidora CDMX", value: 220000, stage: "Qualification", probability: 40, assignee: "Ana Ruiz", daysInStage: 12 },
      { id: "q3", name: "Suite CRM + Marketing", company: "Hotel Paraíso Cancún", value: 78000, stage: "Qualification", probability: 30, assignee: "Luis Hdz", daysInStage: 6 },
      { id: "q4", name: "Outsourcing IT 12 Meses", company: "Logística del Pacífico", value: 360000, stage: "Qualification", probability: 38, assignee: "María L.", daysInStage: 15 },
      { id: "q5", name: "Digitalización Procesos", company: "Grupo Industrial Bajío", value: 95000, stage: "Qualification", probability: 35, assignee: "Carlos Méndez", daysInStage: 3 },
    ],
  },
  {
    stage: "Proposal",
    color: "#F59E0B",
    headerBg: "#F59E0B15",
    deals: [
      { id: "pr1", name: "Implementación SAP B1", company: "Grupo Industrial Bajío", value: 450000, stage: "Proposal", probability: 55, assignee: "Ana Ruiz", daysInStage: 10 },
      { id: "pr2", name: "BPO Financiero Anual", company: "Exportadora Veracruz", value: 180000, stage: "Proposal", probability: 60, assignee: "Carlos Méndez", daysInStage: 7 },
      { id: "pr3", name: "Data Analytics Platform", company: "TecNorte SA", value: 125000, stage: "Proposal", probability: 50, assignee: "Luis Hdz", daysInStage: 14 },
      { id: "pr4", name: "Ciberseguridad Enterprise", company: "Constructora Mty", value: 290000, stage: "Proposal", probability: 58, assignee: "María L.", daysInStage: 5 },
    ],
  },
  {
    stage: "Negotiation",
    color: "#EF4444",
    headerBg: "#EF444415",
    deals: [
      { id: "n1", name: "Contrato Marco TI 2026-2027", company: "Logística del Pacífico", value: 580000, stage: "Negotiation", probability: 75, assignee: "Carlos Méndez", daysInStage: 18 },
      { id: "n2", name: "Plataforma Omnicanal", company: "Hotel Paraíso Cancún", value: 195000, stage: "Negotiation", probability: 72, assignee: "Ana Ruiz", daysInStage: 11 },
      { id: "n3", name: "ERP + HRM Integrado", company: "Farmacéutica GDL", value: 340000, stage: "Negotiation", probability: 78, assignee: "María L.", daysInStage: 22 },
    ],
  },
  {
    stage: "Closed Won",
    color: "#10B981",
    headerBg: "#10B98115",
    deals: [
      { id: "w1", name: "Sistema de Cobranza Digital", company: "Distribuidora CDMX", value: 85000, stage: "Closed Won", probability: 100, assignee: "Carlos Méndez", daysInStage: 0 },
      { id: "w2", name: "Migración a Cloud AWS", company: "Automotriz Frontera", value: 260000, stage: "Closed Won", probability: 100, assignee: "Luis Hdz", daysInStage: 0 },
    ],
  },
];

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export default function LeadsPage() {
  const totalValue = pipelineData.reduce(
    (sum, col) => sum + col.deals.reduce((s, d) => s + d.value, 0),
    0,
  );
  const totalDeals = pipelineData.reduce((sum, col) => sum + col.deals.length, 0);

  return (
    <div>
      <PageHeader
        title="Pipeline de Leads"
        description={`${totalDeals} deals activos · Valor total ${currency.format(totalValue)}`}
        actions={[
          { label: "+ Nuevo Deal", variant: "primary" },
          { label: "Filtrar", variant: "secondary" },
        ]}
      />

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {pipelineData.map((col) => {
            const colValue = col.deals.reduce((s, d) => s + d.value, 0);
            return (
              <div key={col.stage} className="w-72 flex-shrink-0 flex flex-col">
                {/* Column header */}
                <div
                  className="rounded-[16px] px-4 py-3 mb-3"
                  style={{ background: col.headerBg, border: `1px solid ${col.color}30` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                      <h3 className="text-sm font-semibold text-white">{col.stage}</h3>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: col.color }}
                    >
                      {col.deals.length}
                    </span>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: col.color }}>
                    {currency.format(colValue)}
                  </p>
                </div>

                {/* Cards */}
                <div className="space-y-3 flex-1">
                  {col.deals.map((deal) => (
                    <PipelineCard
                      key={deal.id}
                      name={deal.name}
                      company={deal.company}
                      value={deal.value}
                      stage={deal.stage}
                      probability={deal.probability}
                      assignee={deal.assignee}
                      daysInStage={deal.daysInStage}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
