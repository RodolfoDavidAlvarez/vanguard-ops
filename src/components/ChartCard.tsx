"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({
  title,
  subtitle,
  children,
  className,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl overflow-hidden",
        className
      )}
    >
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        {subtitle && (
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}
