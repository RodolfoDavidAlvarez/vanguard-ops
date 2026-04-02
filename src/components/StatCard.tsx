"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  className?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  delay,
}: StatCardProps) {
  const staggerClass = delay ? `stagger-${delay}` : "";

  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl p-5 animate-fade-in-up",
        staggerClass,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-900 font-mono-data">
          {value}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        {trend && (
          <div className="flex items-center gap-1">
            {trend.value >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span
              className={cn(
                "text-sm font-medium font-mono-data",
                trend.value >= 0 ? "text-emerald-600" : "text-red-600"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-xs text-slate-400 ml-1">{trend.label}</span>
          </div>
        )}
        {subtitle && (
          <p className="text-xs text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
