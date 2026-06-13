type Status =
  | "active"
  | "inactive"
  | "prospect"
  | "hot"
  | "cold"
  | "won"
  | "lost"
  | "pending";

const statusConfig: Record<Status, { label: string; bg: string; text: string }> = {
  active: { label: "Activo", bg: "#10B98120", text: "#10B981" },
  inactive: { label: "Inactivo", bg: "#6B728020", text: "#9CA3AF" },
  prospect: { label: "Prospecto", bg: "#0066FF20", text: "#60A5FA" },
  hot: { label: "Caliente", bg: "#EF444420", text: "#F87171" },
  cold: { label: "Frío", bg: "#38BDF820", text: "#38BDF8" },
  won: { label: "Ganado", bg: "#10B98120", text: "#10B981" },
  lost: { label: "Perdido", bg: "#EF444420", text: "#F87171" },
  pending: { label: "Pendiente", bg: "#F59E0B20", text: "#F59E0B" },
};

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: config.bg, color: config.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5 flex-shrink-0"
        style={{ background: config.text }}
      />
      {config.label}
    </span>
  );
}
