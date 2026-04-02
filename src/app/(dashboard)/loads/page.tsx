"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  X,
  Truck,
  ChevronUp,
  ChevronDown,
  FileCheck,
} from "lucide-react";
import { loads, facilities } from "@/lib/mock-data";
import { formatDate, formatDateTime, formatTons, getStatusColor, cn } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import type { Load, LoadStatus } from "@/lib/types";

type SortKey = "date" | "customer_name" | "net_weight_tons" | "status";
type SortDir = "asc" | "desc";

const LOAD_STATUSES: LoadStatus[] = [
  "scheduled",
  "in_transit",
  "arrived",
  "weighed",
  "processing",
  "completed",
  "diverted",
];

export default function LoadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [facilityFilter, setFacilityFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  const filtered = useMemo(() => {
    let result = [...loads];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.bol_number.toLowerCase().includes(q) ||
          l.customer_name.toLowerCase().includes(q) ||
          l.carrier_name.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }

    // Facility filter
    if (facilityFilter !== "all") {
      result = result.filter((l) => l.facility_id === facilityFilter);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "date":
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "customer_name":
          cmp = a.customer_name.localeCompare(b.customer_name);
          break;
        case "net_weight_tons":
          cmp = a.net_weight_tons - b.net_weight_tons;
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, statusFilter, facilityFilter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column)
      return (
        <span className="ml-1 opacity-30 inline-flex flex-col leading-none">
          <ChevronUp className="w-3 h-3 -mb-0.5" />
          <ChevronDown className="w-3 h-3" />
        </span>
      );
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 ml-1 inline" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 ml-1 inline" />
    );
  }

  const maxGross = selectedLoad
    ? Math.max(selectedLoad.gross_weight, 60000)
    : 60000;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Loads / Bills of Lading
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            <span className="font-mono-data">{loads.length}</span> total loads
            tracked &middot;{" "}
            <span className="font-mono-data">{filtered.length}</span> shown
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow transition-colors">
          <Plus className="w-4 h-4" />
          New Load
        </button>
      </div>

      {/* Filters */}
      <div className="px-8 pb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search BOL #, customer, carrier..."
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
          {LOAD_STATUSES.map((s) => (
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

      {/* Table */}
      <div className="px-8 pb-8 flex-1 min-h-0 overflow-auto">
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                  BOL #
                </th>
                <th
                  className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider cursor-pointer select-none hover:text-emerald-600"
                  onClick={() => toggleSort("date")}
                >
                  Date
                  <SortIcon column="date" />
                </th>
                <th
                  className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider cursor-pointer select-none hover:text-emerald-600"
                  onClick={() => toggleSort("customer_name")}
                >
                  Customer
                  <SortIcon column="customer_name" />
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                  Facility
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                  Material
                </th>
                <th
                  className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider cursor-pointer select-none hover:text-emerald-600"
                  onClick={() => toggleSort("net_weight_tons")}
                >
                  Net Weight
                  <SortIcon column="net_weight_tons" />
                </th>
                <th
                  className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider cursor-pointer select-none hover:text-emerald-600"
                  onClick={() => toggleSort("status")}
                >
                  Status
                  <SortIcon column="status" />
                </th>
                <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                  Carrier
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((load, i) => (
                <tr
                  key={load.id}
                  onClick={() => setSelectedLoad(load)}
                  className={cn(
                    "border-b border-slate-100 cursor-pointer transition-colors hover:bg-emerald-50/60",
                    i % 2 === 1 && "bg-slate-50/50",
                    selectedLoad?.id === load.id && "bg-emerald-50 ring-1 ring-inset ring-emerald-200",
                    "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${Math.min(i, 15) * 0.02}s` }}
                >
                  <td className="px-4 py-3 font-mono-data text-xs font-medium text-slate-900">
                    {load.bol_number}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDate(load.date)}
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-medium">
                    {load.customer_name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">
                    {load.facility_name.split("—")[0].trim()}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {load.material_type}
                  </td>
                  <td className="px-4 py-3 text-right font-mono-data text-xs font-semibold text-slate-900">
                    {formatTons(load.net_weight_tons)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
                        getStatusColor(load.status)
                      )}
                    >
                      {STATUS_LABELS[load.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {load.carrier_name}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-slate-400"
                  >
                    No loads match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel Overlay */}
      {selectedLoad && (
        <div
          className="fixed inset-0 z-40 bg-black/10"
          onClick={() => setSelectedLoad(null)}
        />
      )}

      {/* Detail Panel */}
      {selectedLoad && (
        <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right border-l border-slate-200">
          {/* Panel Header */}
          <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between bg-slate-50">
            <div>
              <p className="font-mono-data text-lg font-bold text-slate-900 tracking-tight">
                {selectedLoad.bol_number}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                    getStatusColor(selectedLoad.status)
                  )}
                >
                  {STATUS_LABELS[selectedLoad.status]}
                </span>
                <span className="text-sm text-slate-500">
                  {formatDateTime(selectedLoad.date)}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedLoad(null)}
              className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Panel Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Info Grid */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Load Details
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-xs text-slate-400">Customer</p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedLoad.customer_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Facility</p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedLoad.facility_name.split("—")[0].trim()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Material</p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedLoad.material_type}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Origin</p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedLoad.origin}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Destination</p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedLoad.destination}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Carrier</p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedLoad.carrier_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Driver</p>
                  <p className="text-sm font-medium text-slate-900">
                    {selectedLoad.driver_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Reference</p>
                  <p className="text-sm font-mono-data font-medium text-slate-900">
                    {selectedLoad.reference_number}
                  </p>
                </div>
              </div>
            </div>

            {/* Weight Breakdown */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Weight Breakdown
              </h3>
              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                {/* Gross Weight */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Gross Weight</span>
                    <span className="font-mono-data text-xs font-semibold text-slate-700">
                      {selectedLoad.gross_weight.toLocaleString()} lbs
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 rounded-full animate-progress-fill"
                      style={{
                        width: `${(selectedLoad.gross_weight / maxGross) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Tare Weight */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Tare Weight</span>
                    <span className="font-mono-data text-xs font-semibold text-slate-700">
                      {selectedLoad.tare_weight.toLocaleString()} lbs
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full animate-progress-fill"
                      style={{
                        width: `${(selectedLoad.tare_weight / maxGross) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Net Weight */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500 font-semibold">
                      Net Weight
                    </span>
                    <span className="font-mono-data text-xs font-bold text-emerald-700">
                      {selectedLoad.net_weight.toLocaleString()} lbs &middot;{" "}
                      {formatTons(selectedLoad.net_weight_tons)}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full animate-progress-fill"
                      style={{
                        width: `${(selectedLoad.net_weight / maxGross) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {selectedLoad.notes && (
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Notes
                </h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900">
                  {selectedLoad.notes}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {selectedLoad.status === "completed" && (
              <div className="pt-2">
                <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow transition-colors w-full justify-center">
                  <FileCheck className="w-4 h-4" />
                  View Certificate of Destruction
                </button>
              </div>
            )}
          </div>

          {/* Panel Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
            <Truck className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400">
              Created {formatDateTime(selectedLoad.created_at)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
