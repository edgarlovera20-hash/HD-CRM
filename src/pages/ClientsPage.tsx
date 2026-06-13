import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { ClientCard } from "../components/ui/ClientCard";
import { PageHeader } from "../components/ui/PageHeader";

type ClientStatus = "active" | "inactive" | "prospect" | "hot" | "cold" | "won" | "lost" | "pending";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  revenue: number;
  lastContact: string;
}

const clients: Client[] = [
  {
    id: "1",
    name: "Juan García",
    company: "Empresa Tecnológica del Norte SA",
    email: "jgarcia@tecnorte.com.mx",
    phone: "+52 81 1234 5678",
    status: "active",
    revenue: 45200,
    lastContact: "Hoy",
  },
  {
    id: "2",
    name: "María López",
    company: "Constructora Monterrey",
    email: "mlopez@constructora-mty.com.mx",
    phone: "+52 81 9876 5432",
    status: "active",
    revenue: 89500,
    lastContact: "Ayer",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    company: "Distribuidora CDMX",
    email: "c.rodriguez@distcdmx.com.mx",
    phone: "+52 55 2345 6789",
    status: "prospect",
    revenue: 0,
    lastContact: "Jun 10",
  },
  {
    id: "4",
    name: "Ana Martínez",
    company: "Hotel Paraíso Cancún",
    email: "ana.martinez@paraisocancun.com.mx",
    phone: "+52 998 345 6789",
    status: "active",
    revenue: 32000,
    lastContact: "Jun 09",
  },
  {
    id: "5",
    name: "Luis Hernández",
    company: "Farmacéutica Guadalajara",
    email: "lhernandez@farmagdl.com.mx",
    phone: "+52 33 4567 8901",
    status: "inactive",
    revenue: 15000,
    lastContact: "May 28",
  },
  {
    id: "6",
    name: "Sofía Ramírez",
    company: "Agencia de Publicidad Creativa",
    email: "sofia@creativamx.com",
    phone: "+52 55 5678 9012",
    status: "hot",
    revenue: 28000,
    lastContact: "Hoy",
  },
  {
    id: "7",
    name: "Diego Torres",
    company: "Logística del Pacífico SA",
    email: "dtorres@logpacifico.com.mx",
    phone: "+52 664 678 9012",
    status: "active",
    revenue: 67300,
    lastContact: "Jun 11",
  },
  {
    id: "8",
    name: "Valentina Cruz",
    company: "Inmobiliaria Horizonte",
    email: "vcruz@horizonte-inmob.com.mx",
    phone: "+52 33 7890 1234",
    status: "prospect",
    revenue: 0,
    lastContact: "Jun 08",
  },
  {
    id: "9",
    name: "Ricardo Flores",
    company: "Automotriz Frontera",
    email: "rflores@autofrontera.com.mx",
    phone: "+52 656 890 1234",
    status: "active",
    revenue: 51800,
    lastContact: "Jun 10",
  },
  {
    id: "10",
    name: "Patricia Mendoza",
    company: "Exportadora Veracruz",
    email: "pmendoza@exportver.com.mx",
    phone: "+52 229 901 2345",
    status: "cold",
    revenue: 12500,
    lastContact: "May 15",
  },
  {
    id: "11",
    name: "Alejandro Vega",
    company: "Grupo Industrial del Bajío",
    email: "avega@grupobajio.com.mx",
    phone: "+52 477 012 3456",
    status: "active",
    revenue: 94200,
    lastContact: "Ayer",
  },
  {
    id: "12",
    name: "Fernanda Castro",
    company: "Clínica Médica Santa Fe",
    email: "fcastro@clinicasf.com.mx",
    phone: "+52 55 1234 5670",
    status: "prospect",
    revenue: 0,
    lastContact: "Jun 12",
  },
];

const filterStatuses: { value: ClientStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activo" },
  { value: "prospect", label: "Prospecto" },
  { value: "inactive", label: "Inactivo" },
  { value: "hot", label: "Caliente" },
  { value: "cold", label: "Frío" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "all">("all");

  const filtered = clients.filter((c) => {
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Clientes"
        description={`${clients.length} clientes registrados · ${clients.filter((c) => c.status === "active").length} activos`}
        actions={[
          {
            label: "+ Nuevo Cliente",
            icon: Plus,
            variant: "primary",
          },
        ]}
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
          <input
            type="text"
            placeholder="Buscar cliente, empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-[12px] text-sm text-[#D1D5DB] placeholder-[#4B5563] focus:outline-none focus:ring-1 focus:ring-[#0066FF]/50 transition-all"
            style={{ background: "#161F33", border: "1px solid rgba(255,255,255,0.08)" }}
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#4B5563]" />
          <div className="flex gap-1.5 flex-wrap">
            {filterStatuses.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className="px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all"
                style={{
                  background: statusFilter === f.value ? "#0066FF" : "rgba(255,255,255,0.05)",
                  color: statusFilter === f.value ? "#fff" : "#9CA3AF",
                  border: statusFilter === f.value ? "1px solid #0066FF" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-[#4B5563] mb-4">
        Mostrando {filtered.length} de {clients.length} clientes
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="rounded-[20px] p-12 text-center"
          style={{ background: "#161F33", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-[#6B7280]">No se encontraron clientes con ese criterio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((client) => (
            <ClientCard
              key={client.id}
              name={client.name}
              company={client.company}
              email={client.email}
              phone={client.phone}
              status={client.status}
              revenue={client.revenue}
              lastContact={client.lastContact}
            />
          ))}
        </div>
      )}
    </div>
  );
}
