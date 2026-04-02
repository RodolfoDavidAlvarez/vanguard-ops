"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  filters?: FilterOption[];
  activeFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  filters,
  activeFilters,
  onFilterChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-900",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500",
            "placeholder:text-slate-400"
          )}
        />
      </div>

      {filters?.map((filter) => (
        <select
          key={filter.key}
          value={activeFilters?.[filter.key] || ""}
          onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
          className={cn(
            "px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-700",
            "focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500",
            "cursor-pointer"
          )}
        >
          <option value="">{filter.label}</option>
          {filter.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}
