"use client";

import type { DispatchEvent } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TimelineEventProps {
  event: DispatchEvent;
  isLast?: boolean;
}

function getEventDotColor(eventType: string): string {
  switch (eventType) {
    case "diverted":
      return "bg-red-500";
    case "completed":
      return "bg-emerald-500";
    case "delay":
      return "bg-amber-400";
    default:
      return "bg-emerald-500";
  }
}

export default function TimelineEvent({ event, isLast = false }: TimelineEventProps) {
  return (
    <div className="flex gap-3">
      {/* Dot + line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-3 h-3 rounded-full shrink-0 mt-1",
            getEventDotColor(event.event_type)
          )}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-slate-200 mt-1" />
        )}
      </div>

      {/* Content */}
      <div className={cn("pb-5 min-w-0", isLast && "pb-0")}>
        <p className="text-xs font-mono-data text-slate-400">
          {formatDateTime(event.timestamp)}
        </p>
        <p className="text-sm text-slate-800 mt-0.5">{event.description}</p>
        <p className="text-xs text-slate-400 mt-0.5">{event.facility_name}</p>
      </div>
    </div>
  );
}
