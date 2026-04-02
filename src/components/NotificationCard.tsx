"use client";

import type { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Truck,
  FileCheck,
  DollarSign,
  ShieldCheck,
  Gauge,
  Bell,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "diversion":
      return AlertTriangle;
    case "load_arrival":
      return Truck;
    case "cod_ready":
      return FileCheck;
    case "payment":
      return DollarSign;
    case "compliance":
      return ShieldCheck;
    case "capacity_alert":
      return Gauge;
    default:
      return Bell;
  }
}

function getPriorityBorderColor(priority: string): string {
  switch (priority) {
    case "critical":
      return "border-l-red-500";
    case "high":
      return "border-l-orange-500";
    case "medium":
      return "border-l-blue-500";
    case "low":
      return "border-l-slate-300";
    default:
      return "border-l-slate-300";
  }
}

export default function NotificationCard({
  notification,
  onClick,
}: NotificationCardProps) {
  const Icon = getNotificationIcon(notification.type);
  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), {
    addSuffix: true,
  });

  return (
    <div
      onClick={onClick}
      className={cn(
        "border border-slate-200 rounded-lg p-4 border-l-4 transition-all duration-150 flex gap-3",
        getPriorityBorderColor(notification.priority),
        notification.read ? "bg-white" : "bg-emerald-50/50",
        onClick && "cursor-pointer hover:shadow-sm"
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          notification.read ? "bg-slate-100" : "bg-emerald-100"
        )}
      >
        <Icon
          className={cn(
            "w-4 h-4",
            notification.read ? "text-slate-500" : "text-emerald-600"
          )}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm truncate",
              notification.read
                ? "font-medium text-slate-700"
                : "font-bold text-slate-900"
            )}
          >
            {notification.title}
          </p>
          <span className="text-[10px] text-slate-400 font-mono-data whitespace-nowrap shrink-0">
            {timeAgo}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
          {notification.message}
        </p>
        <p className="text-[10px] text-slate-400 mt-1">
          {notification.facility_name}
        </p>
      </div>
    </div>
  );
}
