interface PageHeaderAction {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ComponentType<{ className?: string }>;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: PageHeaderAction[];
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2
          className="text-xl font-bold text-white mb-1"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {title}
        </h2>
        {description && <p className="text-sm text-[#6B7280]">{description}</p>}
      </div>

      {actions && actions.length > 0 && (
        <div className="flex items-center gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-[14px] text-sm font-semibold transition-all ${
                action.variant === "secondary"
                  ? "text-[#D1D5DB] hover:text-white hover:bg-white/[0.06]"
                  : "text-white hover:bg-[#0052CC]"
              }`}
              style={
                action.variant !== "secondary"
                  ? { background: "#0066FF" }
                  : { border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {action.icon && <action.icon className="w-4 h-4" />}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
