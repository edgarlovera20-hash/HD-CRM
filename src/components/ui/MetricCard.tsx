import type { ComponentType, CSSProperties } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  color?: string;
  goodDown?: boolean;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color = "#0066FF",
  goodDown = false,
}: MetricCardProps) {
  const isPositive = changeType === "up" && !goodDown || changeType === "down" && goodDown;
  const isNeutral = changeType === "neutral";

  const changeColor = isNeutral
    ? "#6B7280"
    : isPositive
    ? "#10B981"
    : "#EF4444";

  return (
    <div
      className="relative overflow-hidden rounded-[20px] p-5"
      style={{
        background: "#161F33",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06] -translate-y-8 translate-x-8"
        style={{ background: color }}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-4"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>

        {/* Value */}
        <p className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
          {value}
        </p>

        {/* Title */}
        <p className="text-sm text-[#6B7280] mb-3">{title}</p>

        {/* Change */}
        <div className="flex items-center gap-1">
          {changeType === "up" ? (
            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: changeColor }} />
          ) : changeType === "down" ? (
            <ArrowDownRight className="w-3.5 h-3.5" style={{ color: changeColor }} />
          ) : null}
          <span className="text-xs font-medium" style={{ color: changeColor }}>
            {change}
          </span>
          <span className="text-xs text-[#4B5563]">vs mes anterior</span>
        </div>
      </div>
    </div>
  );
}
