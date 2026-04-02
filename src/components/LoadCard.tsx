"use client";

import type { Load } from "@/lib/types";
import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

interface LoadCardProps {
  load: Load;
  onClick?: () => void;
}

function getStatusBorderColor(status: string): string {
  switch (status) {
    case "completed":
      return "border-l-emerald-500";
    case "in_transit":
      return "border-l-yellow-400";
    case "diverted":
      return "border-l-red-500";
    case "scheduled":
      return "border-l-blue-500";
    case "arrived":
      return "border-l-indigo-500";
    case "weighed":
      return "border-l-purple-500";
    case "processing":
      return "border-l-orange-500";
    default:
      return "border-l-slate-300";
  }
}

export default function LoadCard({ load, onClick }: LoadCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-slate-200 rounded-lg p-4 border-l-4 transition-all duration-150",
        getStatusBorderColor(load.status),
        onClick && "cursor-pointer hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-bold text-slate-900 font-mono-data">
          {load.bol_number}
        </span>
        <StatusBadge status={load.status} />
      </div>

      <p className="text-sm font-medium text-slate-700 truncate">
        {load.customer_name}
      </p>
      <p className="text-xs text-slate-500 mt-0.5">{load.material_type}</p>

      <div className="mt-3">
        <span className="text-lg font-bold text-emerald-600 font-mono-data">
          {load.net_weight_tons.toFixed(2)}
        </span>
        <span className="text-xs text-slate-400 ml-1">tons</span>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100">
        <p className="text-xs text-slate-400 truncate">
          {load.carrier_name} &middot; {load.driver_name}
        </p>
      </div>
    </div>
  );
}
