"use client";

import { useState } from "react";
import {
  AlertTriangle,
  X,
  Truck,
  ArrowRight,
  Radio,
  FileCheck,
  Users,
  MapPin,
  Phone,
  ChevronRight,
  RotateCcw,
  UserCheck,
  Megaphone,
} from "lucide-react";
import { loads, facilities, dispatchEvents } from "@/lib/mock-data";
import {
  formatCurrency,
  formatTons,
  formatDate,
  formatDateTime,
  getStatusColor,
  cn,
} from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import type { Load } from "@/lib/types";

const statusColumns: { key: string; label: string; color: string }[] = [
  { key: "scheduled", label: "Scheduled", color: "bg-blue-500" },
  { key: "in_transit", label: "In Transit", color: "bg-yellow-500" },
  { key: "arrived", label: "Arrived", color: "bg-indigo-500" },
  { key: "processing", label: "Processing", color: "bg-orange-500" },
  { key: "completed", label: "Completed", color: "bg-emerald-500" },
];

const divertedColor = "bg-red-500";

// Map facility lat/lng to SVG viewBox coordinates (rough continental US)
function facilityToSvg(lat: number, lng: number) {
  const x = ((lng + 125) / 60) * 100;
  const y = ((50 - lat) / 25) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
}

const borderColorMap: Record<string, string> = {
  scheduled: "border-l-blue-500",
  in_transit: "border-l-yellow-500",
  arrived: "border-l-indigo-500",
  weighed: "border-l-purple-500",
  processing: "border-l-orange-500",
  completed: "border-l-emerald-500",
  diverted: "border-l-red-500",
};

function LoadCardMini({
  load,
  onClick,
}: {
  load: Load;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-lg border border-slate-200 p-3 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 border-l-4",
        borderColorMap[load.status] || "border-l-slate-300"
      )}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-mono-data font-bold text-slate-700">
          {load.bol_number}
        </span>
        <span
          className={cn(
            "text-[10px] px-1.5 py-0.5 rounded-full font-medium uppercase",
            getStatusColor(load.status)
          )}
        >
          {STATUS_LABELS[load.status]}
        </span>
      </div>
      <div className="text-sm font-semibold text-slate-900 truncate">
        {load.customer_name}
      </div>
      <div className="text-xs text-slate-500 truncate mt-0.5">
        {load.material_type}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-mono-data font-bold text-emerald-600">
          {load.net_weight_tons} t
        </span>
        <span className="text-[10px] text-slate-400 truncate ml-2">
          {load.carrier_name}
        </span>
      </div>
    </div>
  );
}

// Simplified US outline SVG path
const US_PATH =
  "M 8,25 L 12,22 18,20 22,18 28,17 32,16 38,16 42,15 48,16 52,17 55,18 58,18 62,20 65,22 68,23 72,22 75,20 78,18 82,16 85,17 88,20 90,24 92,28 90,32 88,36 87,40 88,44 90,48 88,52 85,56 82,60 78,62 75,64 72,66 70,70 68,72 65,74 60,72 55,70 50,68 45,66 42,64 38,62 35,60 30,58 25,56 22,54 18,52 15,48 12,44 10,40 8,36 7,32 8,28 Z";

export default function DispatchPage() {
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  const todayLoads = loads.filter(
    (l) =>
      l.date.startsWith("2026-04-02") ||
      l.date.startsWith("2026-04-01")
  );
  const divertedLoads = todayLoads.filter((l) => l.status === "diverted");
  const columnLoads = (status: string) =>
    todayLoads.filter((l) => l.status === status);

  const selectedEvents = selectedLoad
    ? dispatchEvents
        .filter((e) => e.load_id === selectedLoad.id)
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
    : [];

  const inTransitLoads = todayLoads.filter(
    (l) => l.status === "in_transit" && l.gps_lat && l.gps_lng
  );

  return (
    <div className="space-y-4">
      {/* Diversion Alert Banner */}
      {!alertDismissed && divertedLoads.length > 0 && (
        <div className="bg-red-600 text-white rounded-xl p-4 flex items-center gap-3 animate-fade-in-up">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div className="flex-1">
            <span className="font-semibold">
              {divertedLoads.length} loads diverted
            </span>
            <span className="text-red-100 ml-2 text-sm">
              — Holiday weekend storage charges at Henrico VA. Rerouted to
              Brevard FL &amp; Space Coast.
            </span>
          </div>
          <button className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors font-medium">
            View Details
          </button>
          <button
            onClick={() => setAlertDismissed(true)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dispatch Board</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time load tracking &amp; facility dispatch
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-live" />
            LIVE
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Left: Kanban board (3 cols) */}
        <div className="xl:col-span-3 space-y-4">
          {/* Diverted row */}
          {divertedLoads.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                  Diverted
                </span>
                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-medium">
                  {divertedLoads.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {divertedLoads.map((l) => (
                  <LoadCardMini
                    key={l.id}
                    load={l}
                    onClick={() => setSelectedLoad(l)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Kanban columns */}
          <div className="grid grid-cols-5 gap-3">
            {statusColumns.map((col) => {
              const colLoads = columnLoads(col.key);
              return (
                <div key={col.key}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("w-2 h-2 rounded-full", col.color)} />
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      {col.label}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
                      {colLoads.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {colLoads.map((l) => (
                      <LoadCardMini
                        key={l.id}
                        load={l}
                        onClick={() => setSelectedLoad(l)}
                      />
                    ))}
                    {colLoads.length === 0 && (
                      <div className="text-xs text-slate-300 text-center py-6 border border-dashed border-slate-200 rounded-lg">
                        No loads
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Control room (2 cols) */}
        <div className="xl:col-span-2 space-y-4">
          {/* Map */}
          <div className="control-room-bg rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                Facility Network
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-live" />
                LIVE
              </div>
            </div>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-48"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* US outline */}
              <path
                d={US_PATH}
                fill="none"
                stroke="#1e3a5f"
                strokeWidth="0.5"
                opacity="0.6"
              />
              {/* Grid lines */}
              {[20, 40, 60, 80].map((v) => (
                <line
                  key={`h${v}`}
                  x1="0"
                  y1={v}
                  x2="100"
                  y2={v}
                  stroke="#1e3a5f"
                  strokeWidth="0.15"
                  opacity="0.3"
                />
              ))}
              {[20, 40, 60, 80].map((v) => (
                <line
                  key={`v${v}`}
                  x1={v}
                  y1="0"
                  x2={v}
                  y2="100"
                  stroke="#1e3a5f"
                  strokeWidth="0.15"
                  opacity="0.3"
                />
              ))}
              {/* Facility dots */}
              {facilities.map((f) => {
                const pos = facilityToSvg(f.lat, f.lng);
                const color =
                  f.status === "operational"
                    ? "#10b981"
                    : f.status === "maintenance"
                    ? "#f59e0b"
                    : "#6b7280";
                return (
                  <g key={f.id}>
                    {f.status === "operational" && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="3"
                        fill={color}
                        opacity="0.2"
                        className="animate-glow"
                      />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="1.5"
                      fill={color}
                      stroke={color}
                      strokeWidth="0.5"
                      opacity="0.9"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 3}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="2.2"
                      fontFamily="sans-serif"
                    >
                      {f.state}
                    </text>
                  </g>
                );
              })}
              {/* In-transit truck dots */}
              {inTransitLoads.map((l) => {
                const pos = facilityToSvg(l.gps_lat!, l.gps_lng!);
                return (
                  <g key={l.id}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="1.2"
                      fill="#fbbf24"
                      opacity="0.9"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="2.5"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="0.3"
                      opacity="0.4"
                    />
                  </g>
                );
              })}
            </svg>
            {/* Legend */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-slate-400">Operational</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[10px] text-slate-400">Maintenance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-[10px] text-slate-400">In Transit</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: RotateCcw, label: "Divert Load", color: "text-red-600 border-red-200 hover:bg-red-50" },
                { icon: UserCheck, label: "Reassign Driver", color: "text-blue-600 border-blue-200 hover:bg-blue-50" },
                { icon: Megaphone, label: "Notify Sales", color: "text-amber-600 border-amber-200 hover:bg-amber-50" },
                { icon: FileCheck, label: "Generate COD", color: "text-emerald-600 border-emerald-200 hover:bg-emerald-50" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors",
                      action.color
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {action.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live events feed */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Live Feed
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {dispatchEvents
                .sort(
                  (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                )
                .slice(0, 6)
                .map((evt) => {
                  const dotColor =
                    evt.event_type === "diverted"
                      ? "bg-red-500"
                      : evt.event_type === "completed"
                      ? "bg-emerald-500"
                      : evt.event_type === "delay"
                      ? "bg-amber-500"
                      : "bg-slate-400";
                  return (
                    <div key={evt.id} className="flex items-start gap-2">
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full mt-1.5 shrink-0",
                          dotColor
                        )}
                      />
                      <div>
                        <div className="text-xs text-slate-700">
                          {evt.description}
                        </div>
                        <div className="text-[10px] font-mono-data text-slate-400">
                          {formatDateTime(evt.timestamp)}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedLoad && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setSelectedLoad(null)}
          />
          {/* Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 animate-slide-in-right overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-5 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono-data text-lg font-bold text-slate-900">
                    {selectedLoad.bol_number}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {formatDate(selectedLoad.date)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium uppercase",
                      getStatusColor(selectedLoad.status)
                    )}
                  >
                    {STATUS_LABELS[selectedLoad.status]}
                  </span>
                  <button
                    onClick={() => setSelectedLoad(null)}
                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Customer", value: selectedLoad.customer_name },
                  { label: "Facility", value: selectedLoad.facility_name.split("—")[0].trim() },
                  { label: "Material", value: selectedLoad.material_type },
                  { label: "Reference", value: selectedLoad.reference_number },
                  { label: "Carrier", value: selectedLoad.carrier_name },
                  { label: "Driver", value: selectedLoad.driver_name },
                  { label: "Origin", value: selectedLoad.origin },
                  { label: "Destination", value: selectedLoad.destination },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">
                      {item.label}
                    </div>
                    <div className="text-sm text-slate-900 font-medium mt-0.5">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Weight breakdown */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-3">
                  Weight Breakdown
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400">Gross</div>
                    <div className="font-mono-data text-lg font-bold text-slate-700">
                      {selectedLoad.gross_weight.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">lbs</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400">Tare</div>
                    <div className="font-mono-data text-lg font-bold text-slate-500">
                      {selectedLoad.tare_weight.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">lbs</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                  <div className="text-center">
                    <div className="text-[10px] text-emerald-500">Net</div>
                    <div className="font-mono-data text-xl font-bold text-emerald-600">
                      {selectedLoad.net_weight.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-500">
                      lbs ({selectedLoad.net_weight_tons} tons)
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedLoad.notes && (
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
                    Notes
                  </div>
                  <div className="text-sm text-slate-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    {selectedLoad.notes}
                  </div>
                </div>
              )}

              {/* Dispatch Timeline */}
              {selectedEvents.length > 0 && (
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-3">
                    Chain of Custody
                  </div>
                  <div className="space-y-0">
                    {selectedEvents.map((evt, i) => {
                      const dotColor =
                        evt.event_type === "diverted"
                          ? "bg-red-500"
                          : evt.event_type === "completed"
                          ? "bg-emerald-500"
                          : evt.event_type === "delay"
                          ? "bg-amber-500"
                          : "bg-slate-400";
                      return (
                        <div key={evt.id} className="flex gap-3 pb-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={cn(
                                "w-2.5 h-2.5 rounded-full shrink-0 mt-1",
                                dotColor
                              )}
                            />
                            {i < selectedEvents.length - 1 && (
                              <div className="w-px flex-1 bg-slate-200 mt-1" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs text-slate-700">
                              {evt.description}
                            </div>
                            <div className="text-[10px] font-mono-data text-slate-400 mt-0.5">
                              {formatDateTime(evt.timestamp)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
