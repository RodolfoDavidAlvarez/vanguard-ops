"use client";

import { useState, useMemo } from "react";
import {
  Bell,
  AlertTriangle,
  Truck,
  FileCheck,
  DollarSign,
  ShieldCheck,
  Gauge,
  CheckCheck,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { notifications as initialNotifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Notification, Priority } from "@/lib/types";

const TYPE_ICONS: Record<string, typeof AlertTriangle> = {
  diversion: AlertTriangle,
  load_arrival: Truck,
  cod_ready: FileCheck,
  payment: DollarSign,
  compliance: ShieldCheck,
  capacity_alert: Gauge,
};

const TYPE_COLORS: Record<string, string> = {
  diversion: "text-red-500 bg-red-50",
  load_arrival: "text-emerald-500 bg-emerald-50",
  cod_ready: "text-blue-500 bg-blue-50",
  payment: "text-green-500 bg-green-50",
  compliance: "text-amber-500 bg-amber-50",
  capacity_alert: "text-amber-500 bg-amber-50",
};

const PRIORITY_BORDER: Record<Priority, string> = {
  critical: "border-l-red-500",
  high: "border-l-amber-500",
  medium: "border-l-blue-500",
  low: "border-l-slate-300",
};

type Tab = "all" | "critical" | "high" | "unread";

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    switch (activeTab) {
      case "critical": return notifs.filter((n) => n.priority === "critical");
      case "high": return notifs.filter((n) => n.priority === "high" || n.priority === "critical");
      case "unread": return notifs.filter((n) => !n.read);
      default: return notifs;
    }
  }, [notifs, activeTab]);

  const markRead = (id: string) => {
    setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "all", label: "All", count: notifs.length },
    { key: "critical", label: "Critical", count: notifs.filter((n) => n.priority === "critical").length },
    { key: "high", label: "High", count: notifs.filter((n) => n.priority === "high" || n.priority === "critical").length },
    { key: "unread", label: "Unread", count: unreadCount },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500 mt-0.5">{unreadCount} unread</p>
        </div>
        <button
          onClick={markAllRead}
          className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          <CheckCheck className="w-4 h-4" /> Mark All Read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab.key
                ? "border-emerald-500 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                activeTab === tab.key ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.map((n, i) => {
          const Icon = TYPE_ICONS[n.type] || Bell;
          const iconColorClass = TYPE_COLORS[n.type] || "text-slate-500 bg-slate-50";
          const isExpanded = expandedId === n.id;

          return (
            <div
              key={n.id}
              onClick={() => {
                markRead(n.id);
                setExpandedId(isExpanded ? null : n.id);
              }}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border-l-4 cursor-pointer transition-all animate-fade-in-up",
                PRIORITY_BORDER[n.priority],
                n.read ? "bg-white border border-slate-200" : "bg-emerald-50/50 border border-emerald-200",
                `stagger-${Math.min(i + 1, 8)}`
              )}
            >
              {/* Icon */}
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", iconColorClass)}>
                <Icon className="w-4.5 h-4.5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{n.title}</span>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                </div>
                <p className={cn("text-sm text-slate-600 mt-0.5", isExpanded ? "" : "line-clamp-2")}>
                  {n.message}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-slate-400">{n.facility_name.split("—")[0].trim()}</span>
                  <span className="text-[10px] font-mono-data text-slate-400">
                    {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* Priority badge */}
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase shrink-0",
                n.priority === "critical" ? "bg-red-100 text-red-700" :
                n.priority === "high" ? "bg-amber-100 text-amber-700" :
                n.priority === "medium" ? "bg-blue-100 text-blue-700" :
                "bg-slate-100 text-slate-500"
              )}>
                {n.priority}
              </span>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No notifications match this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
