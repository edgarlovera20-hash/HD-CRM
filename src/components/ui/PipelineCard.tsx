import { Building2, DollarSign, User, Clock } from "lucide-react";

interface PipelineCardProps {
  name: string;
  company: string;
  value: number;
  stage: string;
  probability: number;
  assignee: string;
  daysInStage: number;
}

const stageColors: Record<string, { bg: string; text: string }> = {
  Prospecting: { bg: "#0066FF20", text: "#60A5FA" },
  Qualification: { bg: "#8B5CF620", text: "#A78BFA" },
  Proposal: { bg: "#F59E0B20", text: "#F59E0B" },
  Negotiation: { bg: "#EF444420", text: "#F87171" },
  "Closed Won": { bg: "#10B98120", text: "#10B981" },
};

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function PipelineCard({
  name,
  company,
  value,
  stage,
  probability,
  assignee,
  daysInStage,
}: PipelineCardProps) {
  const stageStyle = stageColors[stage] ?? { bg: "#6B728020", text: "#9CA3AF" };

  return (
    <div
      className="rounded-[16px] p-4 cursor-pointer transition-all hover:translate-y-[-2px]"
      style={{
        background: "#1A2540",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm font-semibold text-white truncate">{name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Building2 className="w-3 h-3 text-[#4B5563] flex-shrink-0" />
            <p className="text-xs text-[#6B7280] truncate">{company}</p>
          </div>
        </div>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ background: stageStyle.bg, color: stageStyle.text }}
        >
          {probability}%
        </span>
      </div>

      {/* Value */}
      <div className="flex items-center gap-1.5 mb-3">
        <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
        <span className="text-base font-bold text-white">{currency.format(value)}</span>
      </div>

      {/* Probability bar */}
      <div className="mb-3">
        <div className="h-1 rounded-full bg-white/[0.06]">
          <div
            className="h-1 rounded-full transition-all"
            style={{
              width: `${probability}%`,
              background: `linear-gradient(90deg, #0066FF, #00A3FF)`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, #0066FF, #00A3FF)" }}
          >
            {assignee.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-[#6B7280]">{assignee.split(" ")[0]}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-[#4B5563]" />
          <span className="text-[10px] text-[#4B5563]">{daysInStage}d</span>
        </div>
      </div>
    </div>
  );
}
