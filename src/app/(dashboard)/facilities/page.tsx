"use client";

import { useState, useMemo } from "react";
import {
  Building2,
  CheckCircle,
  Wrench,
  HardHat,
  Plus,
  X,
  Phone,
  User,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { facilities, loads, complianceReports } from "@/lib/mock-data";
import {
  formatDate,
  formatTons,
  getStatusColor,
  cn,
} from "@/lib/utils";
import { STATUS_LABELS, FACILITY_TYPE_LABELS } from "@/lib/constants";
import type { Facility } from "@/lib/types";

// Approximate US map positions for each state (% x, % y relative to SVG viewBox)
const FACILITY_MAP_POS: Record<string, { x: number; y: number }> = {
  AZ: { x: 15, y: 65 },
  WI: { x: 55, y: 25 },
  MN: { x: 50, y: 18 },
  VT: { x: 82, y: 15 },
  VA: { x: 75, y: 40 },
  FL: { x: 72, y: 72 },
  OR: { x: 10, y: 18 },
  CO: { x: 30, y: 38 },
};

function getFacilityDotColor(status: string): string {
  if (status === "operational") return "#10b981";
  if (status === "maintenance") return "#f59e0b";
  return "#94a3b8";
}

function getUtilizationColor(pct: number): string {
  if (pct >= 85) return "bg-red-500";
  if (pct >= 70) return "bg-amber-500";
  return "bg-emerald-500";
}

function getUtilizationTextColor(pct: number): string {
  if (pct >= 85) return "text-red-600";
  if (pct >= 70) return "text-amber-600";
  return "text-emerald-600";
}

function getFacilityTypeBadge(type: string): string {
  switch (type) {
    case "composting":
      return "bg-green-100 text-green-800";
    case "anaerobic_digester":
      return "bg-blue-100 text-blue-800";
    case "depackaging":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function FacilitiesPage() {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );

  const stats = useMemo(() => {
    const operational = facilities.filter(
      (f) => f.status === "operational"
    ).length;
    const maintenance = facilities.filter(
      (f) => f.status === "maintenance"
    ).length;
    const construction = facilities.filter(
      (f) => f.status === "construction"
    ).length;
    return { total: facilities.length, operational, maintenance, construction };
  }, []);

  // Recent loads for selected facility (last 7 days count per day)
  const facilityLoadsLast7 = useMemo(() => {
    if (!selectedFacility) return { dayCounts: [], recentLoads: [] };

    const facilityLoads = loads
      .filter((l) => l.facility_id === selectedFacility.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const recentLoads = facilityLoads.slice(0, 5);

    // Count loads per day for last 7 days
    const today = new Date("2026-04-02");
    const dayCounts: { day: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
      const count = facilityLoads.filter((l) => {
        const ld = new Date(l.date).toISOString().split("T")[0];
        return ld === dateStr;
      }).length;
      dayCounts.push({ day: dayLabel, count });
    }

    return { dayCounts, recentLoads };
  }, [selectedFacility]);

  const facilityCompliance = useMemo(() => {
    if (!selectedFacility) return [];
    return complianceReports.filter(
      (r) => r.facility_id === selectedFacility.id
    );
  }, [selectedFacility]);

  const maxDayCount = Math.max(
    ...facilityLoadsLast7.dayCounts.map((d) => d.count),
    1
  );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="px-4 lg:px-8 pt-4 lg:pt-8 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
            Facilities
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            <span className="font-mono-data">{stats.total}</span> locations
            across 8 states
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow transition-colors">
          <Plus className="w-4 h-4" />
          Add Facility
        </button>
      </div>

      {/* Stats Row */}
      <div className="px-4 lg:px-8 pb-4 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3">
          <div className="p-2 rounded-lg bg-slate-100">
            <Building2 className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <p className="font-mono-data text-xl font-bold text-slate-900">
              {stats.total}
            </p>
            <p className="text-xs text-slate-500">Total Facilities</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3">
          <div className="p-2 rounded-lg bg-green-50">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-mono-data text-xl font-bold text-green-700">
              {stats.operational}
            </p>
            <p className="text-xs text-slate-500">Operational</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3">
          <div className="p-2 rounded-lg bg-amber-50">
            <Wrench className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="font-mono-data text-xl font-bold text-amber-700">
              {stats.maintenance}
            </p>
            <p className="text-xs text-slate-500">Under Maintenance</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3">
          <div className="p-2 rounded-lg bg-orange-50">
            <HardHat className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="font-mono-data text-xl font-bold text-orange-700">
              {stats.construction}
            </p>
            <p className="text-xs text-slate-500">Under Construction</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 pb-4 lg:pb-8 flex-1 min-h-0 overflow-auto space-y-6">
        {/* Map Section */}
        <div className="control-room-bg rounded-xl overflow-hidden relative" style={{ height: 300 }}>
          {/* LIVE indicator */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-live" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Live
            </span>
          </div>

          {/* SVG Map */}
          <svg
            viewBox="0 0 100 85"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Simplified US outline */}
            <path
              d="M5,15 L12,10 L18,8 L24,7 L30,8 L36,7 L42,6 L48,5 L54,6 L60,8 L66,7 L72,6 L78,8 L84,10 L90,12 L92,16 L90,20 L88,25 L86,30 L84,35 L80,38 L78,42 L76,45 L78,50 L80,55 L78,58 L74,60 L72,65 L70,68 L72,72 L74,76 L70,78 L66,75 L62,72 L58,68 L55,65 L52,62 L48,58 L44,55 L40,52 L36,50 L32,48 L28,46 L24,44 L20,42 L16,40 L12,38 L8,35 L6,30 L5,25 Z"
              fill="none"
              stroke="rgba(100,116,139,0.3)"
              strokeWidth="0.4"
            />
            {/* State region hints */}
            <path
              d="M5,15 L12,10 L18,8 L18,25 L12,30 L5,25 Z"
              fill="rgba(100,116,139,0.05)"
              stroke="rgba(100,116,139,0.1)"
              strokeWidth="0.2"
            />

            {/* Facility dots */}
            {facilities.map((f) => {
              const pos = FACILITY_MAP_POS[f.state];
              if (!pos) return null;
              const color = getFacilityDotColor(f.status);
              return (
                <g key={f.id}>
                  {/* Pulse ring for operational */}
                  {f.status === "operational" && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="2.5"
                      fill="none"
                      stroke={color}
                      strokeWidth="0.3"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        from="1.5"
                        to="4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.6"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  {/* Dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="1.5"
                    fill={color}
                    className="cursor-pointer"
                    onClick={() => setSelectedFacility(f)}
                  />
                  {/* Label */}
                  <text
                    x={pos.x}
                    y={pos.y - 3}
                    textAnchor="middle"
                    fill="white"
                    fontSize="2.2"
                    fontWeight="600"
                    className="pointer-events-none select-none"
                    style={{ fontFamily: "var(--font-dm-sans), system-ui" }}
                  >
                    {f.name.split("—")[0].trim().split(" ").slice(0, 2).join(" ")}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Facility Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.map((f, i) => (
            <div
              key={f.id}
              onClick={() => setSelectedFacility(f)}
              className={cn(
                "bg-white border border-slate-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 animate-fade-in-up",
                `stagger-${i + 1}`,
                selectedFacility?.id === f.id &&
                  "ring-2 ring-emerald-500 border-emerald-300"
              )}
            >
              {/* Name + State */}
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {f.name.split("—")[0].trim()}
                  </h3>
                  <p className="text-xs text-slate-500">{f.state}</p>
                </div>
                {/* Status dot */}
                <div className="flex items-center gap-1.5 ml-2 shrink-0">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      f.status === "operational" && "bg-green-500 animate-pulse-live",
                      f.status === "maintenance" && "bg-amber-500",
                      f.status === "construction" && "bg-slate-400"
                    )}
                  />
                  <span className="text-[10px] text-slate-500">
                    {STATUS_LABELS[f.status]}
                  </span>
                </div>
              </div>

              {/* Type badge */}
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3",
                  getFacilityTypeBadge(f.type)
                )}
              >
                {FACILITY_TYPE_LABELS[f.type]}
              </span>

              {/* Utilization bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Utilization
                  </span>
                  <span
                    className={cn(
                      "font-mono-data text-xs font-bold",
                      getUtilizationTextColor(f.current_utilization_pct)
                    )}
                  >
                    {f.current_utilization_pct}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full animate-progress-fill",
                      getUtilizationColor(f.current_utilization_pct)
                    )}
                    style={{ width: `${f.current_utilization_pct}%` }}
                  />
                </div>
              </div>

              {/* Capacity */}
              <p className="text-xs text-slate-500 mb-2">
                <span className="font-mono-data font-semibold">
                  {f.capacity_tons_per_day}
                </span>{" "}
                tons/day capacity
              </p>

              {/* Contact */}
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <User className="w-3 h-3" />
                <span className="truncate">{f.contact_name}</span>
                <span className="mx-0.5">&middot;</span>
                <span className="font-mono-data text-[10px]">
                  {f.contact_phone}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Panel Overlay */}
      {selectedFacility && (
        <div
          className="fixed inset-0 z-40 bg-black/10"
          onClick={() => setSelectedFacility(null)}
        />
      )}

      {/* Detail Panel */}
      {selectedFacility && (
        <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right border-l border-slate-200">
          {/* Panel Header */}
          <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedFacility.name.split("—")[0].trim()}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {selectedFacility.address}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                      getStatusColor(selectedFacility.status)
                    )}
                  >
                    {STATUS_LABELS[selectedFacility.status]}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                      getFacilityTypeBadge(selectedFacility.type)
                    )}
                  >
                    {FACILITY_TYPE_LABELS[selectedFacility.type]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedFacility(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Panel Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Key Metrics */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Capacity</p>
                  <p className="font-mono-data text-lg font-bold text-slate-900">
                    {selectedFacility.capacity_tons_per_day}
                    <span className="text-xs font-normal text-slate-500 ml-1">
                      tons/day
                    </span>
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-400">Utilization</p>
                  <p
                    className={cn(
                      "font-mono-data text-lg font-bold",
                      getUtilizationTextColor(
                        selectedFacility.current_utilization_pct
                      )
                    )}
                  >
                    {selectedFacility.current_utilization_pct}%
                  </p>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        getUtilizationColor(
                          selectedFacility.current_utilization_pct
                        )
                      )}
                      style={{
                        width: `${selectedFacility.current_utilization_pct}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Contact
              </h3>
              <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-3">
                <div className="p-2 rounded-full bg-emerald-100">
                  <User className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedFacility.contact_name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span className="font-mono-data text-xs text-slate-500">
                      {selectedFacility.contact_phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Load Activity (7-day mini bar chart) */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Load Activity (Last 7 Days)
              </h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-end justify-between gap-2" style={{ height: 80 }}>
                  {facilityLoadsLast7.dayCounts.map((d, idx) => (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-1"
                    >
                      <span className="font-mono-data text-[10px] text-slate-500">
                        {d.count}
                      </span>
                      <div
                        className={cn(
                          "w-full rounded-t",
                          d.count > 0 ? "bg-emerald-500" : "bg-slate-200"
                        )}
                        style={{
                          height: `${
                            d.count > 0
                              ? Math.max((d.count / maxDayCount) * 50, 4)
                              : 4
                          }px`,
                        }}
                      />
                      <span className="text-[9px] text-slate-400">
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Loads */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <Truck className="w-3.5 h-3.5 inline mr-1" />
                Recent Loads
              </h3>
              {facilityLoadsLast7.recentLoads.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No recent loads for this facility.
                </p>
              ) : (
                <div className="space-y-2">
                  {facilityLoadsLast7.recentLoads.map((l) => (
                    <div
                      key={l.id}
                      className="flex items-center justify-between bg-white border border-slate-100 rounded-lg px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="font-mono-data text-xs font-medium text-slate-900">
                          {l.bol_number}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {l.customer_name} &middot; {l.material_type}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className="font-mono-data text-xs font-semibold text-slate-700">
                          {formatTons(l.net_weight_tons)}
                        </p>
                        <span
                          className={cn(
                            "inline-flex items-center px-1.5 py-0 rounded-full text-[10px] font-semibold",
                            getStatusColor(l.status)
                          )}
                        >
                          {STATUS_LABELS[l.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Compliance */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 inline mr-1" />
                Compliance Reports
              </h3>
              {facilityCompliance.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No compliance reports for this facility.
                </p>
              ) : (
                <div className="space-y-2">
                  {facilityCompliance.map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between bg-white border border-slate-100 rounded-lg px-3 py-2"
                    >
                      <div>
                        <p className="text-xs font-medium text-slate-900">
                          {r.report_type
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </p>
                        <p className="text-xs text-slate-500">
                          {r.period} &middot; Due {formatDate(r.due_date)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
                          getStatusColor(r.status)
                        )}
                      >
                        {STATUS_LABELS[r.status]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
