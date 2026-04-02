"use client";

import { getStatusColor } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorClasses = getStatusColor(
    status as Parameters<typeof getStatusColor>[0]
  );
  const label = STATUS_LABELS[status] || status;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${colorClasses}`}
    >
      {label}
    </span>
  );
}
