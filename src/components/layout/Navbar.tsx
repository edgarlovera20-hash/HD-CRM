import { useState } from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header
      className="flex items-center justify-between px-6 flex-shrink-0"
      style={{
        height: "64px",
        background: "#111827",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Page title */}
      <h1
        className="text-lg font-semibold text-white"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {title}
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4B5563]" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-[10px] text-sm text-[#D1D5DB] placeholder-[#4B5563] focus:outline-none focus:ring-1 focus:ring-[#0066FF]/50 transition-all w-52"
            style={{ background: "#161F33", border: "1px solid rgba(255,255,255,0.06)" }}
          />
        </div>

        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-[10px] text-[#4B5563] hover:text-[#D1D5DB] hover:bg-white/[0.06] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] hover:bg-white/[0.06] transition-all">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0066FF, #00A3FF)" }}
          >
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#4B5563]" />
        </button>
      </div>
    </header>
  );
}
