"use client";

import { useState, useMemo } from "react";
import {
  Search,
  LayoutGrid,
  List,
  Download,
  Mail,
  FileCheck,
} from "lucide-react";
import { cods, facilities } from "@/lib/mock-data";
import { formatDate, formatTons, getStatusColor, cn } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import type { CODStatus } from "@/lib/types";

type ViewMode = "grid" | "list";

const COD_STATUSES: CODStatus[] = ["draft", "issued", "signed", "archived"];

export default function CODsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [facilityFilter, setFacilityFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    let result = [...cods];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.cod_number.toLowerCase().includes(q) ||
          c.customer_name.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }

    if (facilityFilter !== "all") {
      result = result.filter((c) => c.facility_id === facilityFilter);
    }

    return result;
  }, [search, statusFilter, facilityFilter]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="px-4 lg:px-8 pt-4 lg:pt-8 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
            Certificates of Destruction
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            <span className="font-mono-data">{cods.length}</span> total
            certificates &middot;{" "}
            <span className="font-mono-data">{filtered.length}</span> shown
          </p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors",
              viewMode === "grid"
                ? "bg-white shadow text-emerald-700"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md transition-colors",
              viewMode === "list"
                ? "bg-white shadow text-emerald-700"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <List className="w-4 h-4" />
            List
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 lg:px-8 pb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search COD #, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 placeholder:text-slate-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 text-slate-700"
        >
          <option value="all">All Statuses</option>
          {COD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <select
          value={facilityFilter}
          onChange={(e) => setFacilityFilter(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 text-slate-700"
        >
          <option value="all">All Facilities</option>
          {facilities.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name.split("—")[0].trim()}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-8 pb-4 lg:pb-8 flex-1 min-h-0 overflow-auto">
        {viewMode === "grid" ? (
          /* ─── Grid View ─── */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((cod, i) => (
              <div
                key={cod.id}
                className={cn(
                  "relative border border-slate-200 rounded-lg bg-slate-50 hover:shadow-lg transition-shadow group animate-fade-in-up",
                  `stagger-${Math.min(i + 1, 8)}`
                )}
              >
                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
                      getStatusColor(cod.status)
                    )}
                  >
                    {STATUS_LABELS[cod.status]}
                  </span>
                </div>

                {/* Document Header */}
                <div className="border-b border-slate-200 px-5 py-3">
                  <div className="flex items-center justify-center">
                    <FileCheck className="w-4 h-4 text-emerald-600 mr-2" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
                      Certificate of Destruction
                    </h3>
                  </div>
                </div>

                {/* COD Number + Date */}
                <div className="px-5 pt-3 flex items-center justify-between">
                  <span className="font-mono-data text-sm font-bold text-slate-900">
                    {cod.cod_number}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatDate(cod.date_issued)}
                  </span>
                </div>

                {/* Fields Grid */}
                <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Facility
                    </p>
                    <p className="text-sm text-slate-800 font-medium truncate">
                      {cod.facility_name.split("—")[0].trim()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Customer
                    </p>
                    <p className="text-sm text-slate-800 font-medium truncate">
                      {cod.customer_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Material
                    </p>
                    <p className="text-sm text-slate-800 truncate">
                      {cod.material_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Tons Destroyed
                    </p>
                    <p className="font-mono-data text-sm font-bold text-emerald-700">
                      {formatTons(cod.tons_destroyed)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Method
                    </p>
                    <p className="text-xs text-slate-600 leading-snug">
                      {cod.destruction_method}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Regulatory Ref.
                    </p>
                    <p className="text-xs text-slate-600 font-mono-data leading-snug">
                      {cod.regulatory_reference}
                    </p>
                  </div>
                </div>

                {/* Signature Line */}
                <div className="px-5 pb-3 border-t border-dashed border-slate-200 pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Certified by
                      </p>
                      <p className="text-sm text-slate-800 italic mt-0.5">
                        {cod.signed_by}
                      </p>
                      <div className="mt-1 w-40 border-b border-slate-300" />
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
                        title="Email Customer"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 py-16 text-center text-slate-400">
                No certificates match your filters.
              </div>
            )}
          </div>
        ) : (
          /* ─── List View ─── */
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    COD #
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    Facility
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    Material
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    Tons
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    Method
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cod, i) => (
                  <tr
                    key={cod.id}
                    className={cn(
                      "border-b border-slate-100 hover:bg-emerald-50/60 transition-colors animate-fade-in-up",
                      i % 2 === 1 && "bg-slate-50/50"
                    )}
                    style={{ animationDelay: `${Math.min(i, 15) * 0.02}s` }}
                  >
                    <td className="px-4 py-3 font-mono-data text-xs font-medium text-slate-900">
                      {cod.cod_number}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(cod.date_issued)}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-[140px] truncate">
                      {cod.facility_name.split("—")[0].trim()}
                    </td>
                    <td className="px-4 py-3 text-slate-900 font-medium">
                      {cod.customer_name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {cod.material_type}
                    </td>
                    <td className="px-4 py-3 text-right font-mono-data text-xs font-semibold text-slate-900">
                      {formatTons(cod.tons_destroyed)}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 max-w-[180px] truncate">
                      {cod.destruction_method}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
                          getStatusColor(cod.status)
                        )}
                      >
                        {STATUS_LABELS[cod.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-1.5 rounded hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
                          title="Download PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
                          title="Email Customer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-12 text-center text-slate-400"
                    >
                      No certificates match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
