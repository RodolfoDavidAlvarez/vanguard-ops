"use client";

import { useState } from "react";
import {
  Truck,
  AlertTriangle,
  Scale,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Bell,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  loads,
  notifications,
  dispatchEvents,
  monthlyTonnageData,
  facilityUtilizationData,
  materialBreakdownData,
  revenueData,
  facilities,
} from "@/lib/mock-data";
import { formatCurrency, formatDateTime, cn } from "@/lib/utils";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const todayLoads = loads.filter((l) => l.date.startsWith("2026-04-02"));
const divertedLoads = loads.filter((l) => l.status === "diverted");
const completedThisMonth = loads.filter(
  (l) => l.status === "completed" && l.date.startsWith("2026-04")
);
const tonsMTD = loads
  .filter(
    (l) =>
      l.date.startsWith("2026-04") &&
      (l.status === "completed" || l.status === "processing" || l.status === "weighed")
  )
  .reduce((sum, l) => sum + l.net_weight_tons, 0);
const revenueMTD = revenueData.find((r) => r.month === "Apr")?.revenue ?? 0;
const operationalCount = facilities.filter(
  (f) => f.status === "operational"
).length;

const unreadNotifications = notifications.filter((n) => !n.read).slice(0, 5);
const recentEvents = [...dispatchEvents]
  .sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  .slice(0, 8);

const kpis = [
  {
    title: "Loads Today",
    value: todayLoads.length.toString(),
    icon: Truck,
    trend: { value: 12, label: "vs last week" },
    subtitle: `${todayLoads.filter((l) => l.status === "completed").length} completed`,
  },
  {
    title: "Active Diversions",
    value: divertedLoads.length.toString(),
    icon: AlertTriangle,
    trend: { value: -1, label: "vs yesterday" },
    subtitle: "Storage charges accruing",
    danger: true,
  },
  {
    title: "Tons MTD",
    value: tonsMTD.toFixed(1),
    icon: Scale,
    trend: { value: 18, label: "vs last month" },
    subtitle: `${completedThisMonth.length} loads processed`,
  },
  {
    title: "Revenue MTD",
    value: formatCurrency(revenueMTD),
    icon: DollarSign,
    trend: { value: 18, label: "vs last month" },
    subtitle: "On track for target",
  },
];

const priorityIconColor: Record<string, string> = {
  critical: "text-red-500",
  high: "text-amber-500",
  medium: "text-blue-500",
  low: "text-slate-400",
};

const eventDotColor: Record<string, string> = {
  diverted: "bg-red-500",
  completed: "bg-emerald-500",
  delay: "bg-amber-500",
  arrival: "bg-blue-500",
  weighed: "bg-indigo-500",
  processing: "bg-violet-500",
  dispatched: "bg-emerald-400",
  scheduled: "bg-slate-400",
  gps_update: "bg-cyan-500",
  checkpoint: "bg-slate-400",
};

function getUtilColor(pct: number) {
  if (pct >= 85) return "#ef4444";
  if (pct >= 70) return "#f59e0b";
  return "#10b981";
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {getGreeting()}, Oscar
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {operationalCount} facilities operational &mdash;{" "}
          {divertedLoads.length} loads diverted &mdash; April 2, 2026
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const isPositive = kpi.trend.value > 0;
          const TrendIcon = isPositive ? TrendingUp : TrendingDown;
          return (
            <div
              key={kpi.title}
              className={cn(
                "bg-white rounded-xl border border-slate-200 p-5 animate-fade-in-up",
                `stagger-${i + 1}`
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    kpi.danger
                      ? "bg-red-100 text-red-600"
                      : "bg-emerald-100 text-emerald-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-500">
                  {kpi.title}
                </span>
              </div>
              <div className="font-mono-data text-3xl font-bold text-slate-900">
                {kpi.value}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    kpi.danger
                      ? "text-red-600"
                      : isPositive
                      ? "text-emerald-600"
                      : "text-red-600"
                  )}
                >
                  <TrendIcon className="w-3 h-3" />
                  {Math.abs(kpi.trend.value)}% {kpi.trend.label}
                </div>
                <span className="text-xs text-slate-400">{kpi.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Tonnage */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 animate-fade-in-up stagger-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Monthly Tonnage
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Tons processed across all facilities
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTonnageData}>
                <defs>
                  <linearGradient
                    id="tonnageGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${Number(v).toLocaleString()} tons`, "Tonnage"]}
                />
                <Area
                  type="monotone"
                  dataKey="tons"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#tonnageGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Facility Utilization */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 animate-fade-in-up stagger-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Facility Utilization
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Current capacity usage by facility
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={facilityUtilizationData}
                layout="vertical"
                margin={{ left: 10, right: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${v}%`, "Utilization"]}
                />
                <Bar dataKey="utilization" radius={[0, 4, 4, 0]} barSize={18}>
                  {facilityUtilizationData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={getUtilColor(entry.utilization)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row: Alerts + Timeline + Material breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 animate-fade-in-up stagger-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Active Alerts
            </h3>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
              {unreadNotifications.length} unread
            </span>
          </div>
          <div className="space-y-3">
            {unreadNotifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                <Bell
                  className={cn(
                    "w-4 h-4 mt-0.5 shrink-0",
                    priorityIconColor[n.priority]
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {n.title}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {n.message}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono-data mt-1">
                    {formatDateTime(n.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 animate-fade-in-up stagger-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            Dispatch Timeline
          </h3>
          <div className="space-y-0">
            {recentEvents.map((evt, i) => (
              <div key={evt.id} className="flex gap-3 pb-3">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-2.5 h-2.5 rounded-full shrink-0 mt-1.5",
                      eventDotColor[evt.event_type] || "bg-slate-400"
                    )}
                  />
                  {i < recentEvents.length - 1 && (
                    <div className="w-px flex-1 bg-slate-200 mt-1" />
                  )}
                </div>
                <div className="min-w-0 pb-2">
                  <div className="text-xs text-slate-900">
                    {evt.description}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono-data mt-0.5">
                    {formatDateTime(evt.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 animate-fade-in-up stagger-7">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            Material Breakdown
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Waste types by volume (%)
          </p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={materialBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {materialBreakdownData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${v}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {materialBreakdownData.slice(0, 5).map((m) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: m.color }}
                  />
                  <span className="text-xs text-slate-600">{m.name}</span>
                </div>
                <span className="text-xs font-mono-data text-slate-900 font-medium">
                  {m.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
