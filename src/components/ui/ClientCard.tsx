import { Mail, Phone, Building2, DollarSign, Calendar } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

type ClientStatus = "active" | "inactive" | "prospect" | "hot" | "cold" | "won" | "lost" | "pending";

interface ClientCardProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  revenue: number;
  lastContact: string;
}

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function ClientCard({
  name,
  company,
  email,
  phone,
  status,
  revenue,
  lastContact,
}: ClientCardProps) {
  return (
    <div
      className="rounded-[20px] p-5 transition-all hover:translate-y-[-2px] cursor-pointer"
      style={{
        background: "#161F33",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
      }}
    >
      {/* Avatar + Status */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #0066FF, #00A3FF)" }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Name & company */}
      <div className="mb-3">
        <h3 className="font-semibold text-white text-sm mb-0.5 truncate">{name}</h3>
        <div className="flex items-center gap-1.5">
          <Building2 className="w-3 h-3 text-[#4B5563] flex-shrink-0" />
          <p className="text-xs text-[#6B7280] truncate">{company}</p>
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-3 h-3 text-[#4B5563] flex-shrink-0" />
          <span className="text-xs text-[#6B7280] truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3 h-3 text-[#4B5563] flex-shrink-0" />
          <span className="text-xs text-[#6B7280]">{phone}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/[0.06] mb-4" />

      {/* Revenue & last contact */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[#4B5563] mb-0.5">Revenue</p>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-[#10B981]" />
            <span className="text-sm font-bold text-white">{currency.format(revenue)}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[#4B5563] mb-0.5">Último contacto</p>
          <div className="flex items-center gap-1 justify-end">
            <Calendar className="w-3 h-3 text-[#4B5563]" />
            <span className="text-xs text-[#6B7280]">{lastContact}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
