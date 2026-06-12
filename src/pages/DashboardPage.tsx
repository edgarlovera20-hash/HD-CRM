import { AlertTriangle, DollarSign, LogOut, Phone, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ClientStatus = "active" | "new" | "overdue";

interface Client {
  id: string;
  name: string;
  status: ClientStatus;
  balance: number;
  lastContact: string;
  phone: string;
}

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

const statusStyles: Record<ClientStatus, { label: string; className: string }> = {
  active: { label: "Activo", className: "bg-[#10B981]/15 text-[#10B981]" },
  new: { label: "Nuevo", className: "bg-[#00A3FF]/15 text-[#00A3FF]" },
  overdue: { label: "Moroso", className: "bg-[#EF4444]/15 text-[#EF4444]" },
};

function StatusBadge({ status }: { status: ClientStatus }) {
  const s = statusStyles[status];
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${s.className}`}>
      {s.label}
    </span>
  );
}

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [overdue, setOverdue] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [allRes, overdueRes] = await Promise.all([
          fetch("/api/clients", { headers }),
          fetch("/api/clients/overdue", { headers }),
        ]);
        if (allRes.status === 401 || overdueRes.status === 401) {
          handleLogout();
          return;
        }
        const allData = await allRes.json();
        const overdueData = await overdueRes.json();
        setClients(allData.clients ?? []);
        setOverdue(overdueData.clients ?? []);
      } catch {
        setError("No se pudieron cargar los clientes.");
      } finally {
        setLoading(false);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const totalClients = clients.length;
  const activeCount = clients.filter((c) => c.status === "active").length;
  const overdueCount = overdue.length;
  const totalBalance = clients.reduce((sum, c) => sum + c.balance, 0);

  const cards = [
    { icon: Users, label: "Total de clientes", value: String(totalClients), tint: "#0066FF" },
    { icon: Users, label: "Activos", value: String(activeCount), tint: "#10B981" },
    { icon: AlertTriangle, label: "Cuentas morosas", value: String(overdueCount), tint: "#EF4444" },
    { icon: DollarSign, label: "Saldo total", value: currency.format(totalBalance), tint: "#F59E0B" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-[#F9FAFB]">
      <header className="bg-[#111827] border-b border-[#1F2937] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            HD CRM
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#9CA3AF] text-sm">{user?.email ?? "CRM"}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Bienvenido, {user?.name ?? "CRM"}
          </h1>
          <p className="text-[#9CA3AF] mt-1 text-sm">Gestión de clientes, cobranza y compromisos de pago</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <div key={card.label} className="bg-[#111827] border border-[#1F2937] rounded-xl p-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${card.tint}1A` }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.tint }} />
              </div>
              <p className="text-[#9CA3AF] text-sm">{card.label}</p>
              <p className="text-2xl font-bold text-[#F9FAFB] mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        <section className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-[#1F2937]">
            <h2 className="font-semibold text-[#F9FAFB]">Clientes</h2>
          </div>
          {loading ? (
            <p className="px-6 py-8 text-[#9CA3AF] text-sm">Cargando...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#9CA3AF] border-b border-[#1F2937]">
                    <th className="px-6 py-3 font-medium">Nombre</th>
                    <th className="px-6 py-3 font-medium">Estado</th>
                    <th className="px-6 py-3 font-medium">Saldo</th>
                    <th className="px-6 py-3 font-medium">Último contacto</th>
                    <th className="px-6 py-3 font-medium">Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id} className="border-b border-[#1F2937] last:border-0 hover:bg-[#161F33]">
                      <td className="px-6 py-4 text-[#F9FAFB]">{c.name}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-6 py-4 text-[#E5E7EB]">{currency.format(c.balance)}</td>
                      <td className="px-6 py-4 text-[#9CA3AF]">{c.lastContact}</td>
                      <td className="px-6 py-4 text-[#9CA3AF]">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5" />
                          {c.phone}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1F2937] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            <h2 className="font-semibold text-[#F9FAFB]">Cuentas morosas</h2>
          </div>
          {loading ? (
            <p className="px-6 py-8 text-[#9CA3AF] text-sm">Cargando...</p>
          ) : overdue.length === 0 ? (
            <p className="px-6 py-8 text-[#9CA3AF] text-sm">No hay cuentas morosas.</p>
          ) : (
            <ul className="divide-y divide-[#1F2937]">
              {overdue.map((c) => (
                <li key={c.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[#F9FAFB]">{c.name}</p>
                    <p className="text-[#9CA3AF] text-xs mt-0.5">Último contacto: {c.lastContact}</p>
                  </div>
                  <span className="text-[#EF4444] font-semibold">{currency.format(c.balance)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
