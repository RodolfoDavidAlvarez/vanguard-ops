"use client";

import type { Facility } from "@/lib/types";
import { FACILITY_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Phone, User } from "lucide-react";

interface FacilityCardProps {
  facility: Facility;
  onClick?: () => void;
}

function getStatusDotColor(status: string): string {
  switch (status) {
    case "operational":
      return "bg-emerald-500";
    case "maintenance":
      return "bg-yellow-400";
    case "construction":
      return "bg-orange-500";
    case "offline":
      return "bg-red-500";
    default:
      return "bg-slate-400";
  }
}

function getUtilizationColor(pct: number): string {
  if (pct > 85) return "bg-red-500";
  if (pct > 70) return "bg-amber-400";
  return "bg-emerald-500";
}

export default function FacilityCard({ facility, onClick }: FacilityCardProps) {
  const typeLabel =
    FACILITY_TYPE_LABELS[facility.type] || facility.type;

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-5 transition-all duration-150",
        onClick && "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full shrink-0",
                getStatusDotColor(facility.status),
                facility.status === "operational" && "animate-pulse-live"
              )}
            />
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {facility.name}
            </h3>
          </div>
          <p className="text-xs text-slate-400 ml-[18px]">{facility.state}</p>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-slate-100 text-slate-600 shrink-0 ml-2">
          {typeLabel}
        </span>
      </div>

      {/* Utilization Bar */}
      <div className="mb-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">Utilization</span>
          <span className="text-sm font-bold font-mono-data text-slate-800">
            {facility.current_utilization_pct}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full animate-progress-fill",
              getUtilizationColor(facility.current_utilization_pct)
            )}
            style={{ width: `${facility.current_utilization_pct}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-slate-400 mb-3 font-mono-data">
        {facility.capacity_tons_per_day} tons/day
      </p>

      {/* Contact */}
      <div className="pt-3 border-t border-slate-100 space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <User className="w-3 h-3 text-slate-400" />
          <span>{facility.contact_name}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Phone className="w-3 h-3 text-slate-400" />
          <span className="font-mono-data">{facility.contact_phone}</span>
        </div>
      </div>
    </div>
  );
}
