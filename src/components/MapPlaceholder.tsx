"use client";

import { cn } from "@/lib/utils";
import type { Facility, Load } from "@/lib/types";

interface MapPlaceholderProps {
  facilities: Facility[];
  loads?: Load[];
  className?: string;
  fullSize?: boolean;
}

// Map lat/lng to approximate SVG coordinates on a rough US map
// US bounds: lat 24.5-49.5, lng -125 to -66.5
function geoToSvg(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng - -125) / (-66.5 - -125)) * 100;
  const y = ((49.5 - lat) / (49.5 - 24.5)) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
}

function getFacilityDotColor(status: string): string {
  switch (status) {
    case "operational":
      return "#10b981";
    case "maintenance":
      return "#f59e0b";
    case "construction":
      return "#f97316";
    case "offline":
      return "#6b7280";
    default:
      return "#10b981";
  }
}

export default function MapPlaceholder({
  facilities,
  loads,
  className,
  fullSize = false,
}: MapPlaceholderProps) {
  return (
    <div
      className={cn(
        "control-room-bg rounded-xl border border-slate-700/50 relative overflow-hidden",
        fullSize ? "h-[500px]" : "h-[320px]",
        className
      )}
    >
      {/* LIVE indicator */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-live" />
        <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase font-mono-data">
          LIVE
        </span>
      </div>

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Simplified continental US outline */}
        <path
          d="M8,22 L12,18 L18,16 L22,17 L28,15 L32,16 L36,18 L40,17 L44,16 L48,18 L52,17 L56,16 L60,18 L64,20 L68,22 L72,24 L76,26 L80,28 L84,30 L86,34 L88,38 L90,42 L88,46 L86,50 L84,54 L82,58 L80,60 L76,62 L72,64 L68,66 L64,68 L60,70 L56,72 L52,74 L48,72 L44,70 L40,68 L36,66 L32,64 L28,62 L24,60 L20,58 L16,56 L14,52 L12,48 L10,44 L8,40 L6,36 L6,30 L8,26 Z"
          fill="none"
          stroke="rgba(16, 185, 129, 0.15)"
          strokeWidth="0.4"
        />
        {/* Interior grid lines for depth */}
        <line
          x1="10"
          y1="40"
          x2="90"
          y2="40"
          stroke="rgba(16, 185, 129, 0.05)"
          strokeWidth="0.2"
        />
        <line
          x1="10"
          y1="55"
          x2="90"
          y2="55"
          stroke="rgba(16, 185, 129, 0.05)"
          strokeWidth="0.2"
        />
        <line
          x1="50"
          y1="15"
          x2="50"
          y2="80"
          stroke="rgba(16, 185, 129, 0.05)"
          strokeWidth="0.2"
        />
        <line
          x1="30"
          y1="15"
          x2="30"
          y2="80"
          stroke="rgba(16, 185, 129, 0.05)"
          strokeWidth="0.2"
        />
        <line
          x1="70"
          y1="15"
          x2="70"
          y2="80"
          stroke="rgba(16, 185, 129, 0.05)"
          strokeWidth="0.2"
        />

        {/* Facility dots */}
        {facilities.map((fac) => {
          const { x, y } = geoToSvg(fac.lat, fac.lng);
          const color = getFacilityDotColor(fac.status);
          return (
            <g key={fac.id}>
              {/* Glow ring for operational */}
              {fac.status === "operational" && (
                <circle
                  cx={x}
                  cy={y}
                  r="2.5"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.3"
                  opacity="0.4"
                  className="animate-pulse-live"
                />
              )}
              <circle cx={x} cy={y} r="1.2" fill={color} className="animate-glow" />
              {/* Label */}
              <text
                x={x}
                y={y - 2.5}
                textAnchor="middle"
                fill="rgba(148, 163, 184, 0.7)"
                fontSize="2"
                fontFamily="var(--font-mono), monospace"
              >
                {fac.state}
              </text>
            </g>
          );
        })}

        {/* Load truck dots */}
        {loads
          ?.filter((l) => l.gps_lat != null && l.gps_lng != null)
          .map((load) => {
            const { x, y } = geoToSvg(load.gps_lat!, load.gps_lng!);
            return (
              <g key={load.id}>
                <rect
                  x={x - 0.8}
                  y={y - 0.5}
                  width="1.6"
                  height="1"
                  rx="0.2"
                  fill="#facc15"
                  opacity="0.9"
                />
              </g>
            );
          })}
      </svg>
    </div>
  );
}
