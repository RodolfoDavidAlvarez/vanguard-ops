"use client";

import { useState, useMemo } from "react";
import {
  ShieldCheck,
  FileText,
  Clock,
  CheckCircle,
  Search,
} from "lucide-react";
import { complianceReports } from "@/lib/mock-data";
import { formatDate, getStatusColor, cn } from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";

const REPORT_TYPE_LABELS: Record<string, string> = {
  epa_air: "EPA Air Emissions",
  npdes_water: "NPDES Water Discharge",
  solid_waste: "Solid Waste",
  sb1383_diversion: "SB 1383 Diversion",
  monthly_tonnage: "Monthly Tonnage",
};

type SortKey = "due_date" | "facility_name";

export default function CompliancePage() {
  const [facilityFilter, setFacilityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("due_date");
  const [sortAsc, setSortAsc] = useState(true);

  const facilityNames = [...new Set(complianceReports.map((r) => r.facility_name))];

  const filtered = useMemo(() => {
    let data = [...complianceReports];
    if (facilityFilter !== "all") data = data.filter((r) => r.facility_name === facilityFilter);
    if (statusFilter !== "all") data = data.filter((r) => r.status === statusFilter);
    data.sort((a, b) => {
      const ak = sortKey === "due_date" ? a.due_date : a.facility_name;
      const bk = sortKey === "due_date" ? b.due_date : b.facility_name;
      return sortAsc ? ak.localeCompare(bk) : bk.localeCompare(ak);
    });
    return data;
  }, [facilityFilter, statusFilter, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const totalReports = complianceReports.length;
  const dueThisMonth = complianceReports.filter((r) => r.due_date.startsWith("2026-04")).length;
  const submitted = complianceReports.filter((r) => r.status === "submitted").length;
  const approved = complianceReports.filter((r) => r.status === "approved").length;

  // Status bar data
  const statusCounts: { status: string; count: number; color: string }[] = [
    { status: "upcoming", count: complianceReports.filter((r) => r.status === "upcoming").length, color: "bg-yellow-400" },
    { status: "in_progress", count: complianceReports.filter((r) => r.status === "in_progress").length, color: "bg-blue-500" },
    { status: "submitted", count: complianceReports.filter((r) => r.status === "submitted").length, color: "bg-indigo-500" },
    { status: "approved", count: complianceReports.filter((r) => r.status === "approved").length, color: "bg-emerald-500" },
  ];

  const SortArrow = ({ col }: { col: SortKey }) => (
    <span className="text-[10px] ml-1">{sortKey === col ? (sortAsc ? "▲" : "▼") : "⇅"}</span>
  );

  const isDueSoon = (date: string) => {
    const d = new Date(date);
    const now = new Date("2026-04-02");
    const diff = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 14 && diff >= 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Regulatory Compliance</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track EPA, NPDES, SB 1383, and solid waste reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {[
          { label: "Total Reports", value: totalReports, icon: FileText, color: "bg-slate-100 text-slate-600" },
          { label: "Due This Month", value: dueThisMonth, icon: Clock, color: "bg-amber-100 text-amber-600" },
          { label: "Submitted", value: submitted, icon: CheckCircle, color: "bg-blue-100 text-blue-600" },
          { label: "Approved", value: approved, icon: ShieldCheck, color: "bg-emerald-100 text-emerald-600" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={cn("bg-white rounded-xl border border-slate-200 p-4 animate-fade-in-up", `stagger-${i + 1}`)}>
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", s.color)}><Icon className="w-4 h-4" /></div>
                <span className="text-xs text-slate-500 font-medium">{s.label}</span>
              </div>
              <div className="font-mono-data text-lg lg:text-2xl font-bold text-slate-900">{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Status overview bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">Compliance Status Overview</div>
        <div className="flex rounded-full overflow-hidden h-4">
          {statusCounts.filter((s) => s.count > 0).map((s) => (
            <div
              key={s.status}
              className={cn("flex items-center justify-center text-[10px] text-white font-bold transition-all", s.color)}
              style={{ width: `${(s.count / totalReports) * 100}%` }}
            >
              {s.count}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2">
          {statusCounts.map((s) => (
            <div key={s.status} className="flex items-center gap-1.5">
              <div className={cn("w-2.5 h-2.5 rounded-full", s.color)} />
              <span className="text-[10px] text-slate-500">{STATUS_LABELS[s.status]} ({s.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <select value={facilityFilter} onChange={(e) => setFacilityFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30">
          <option value="all">All Facilities</option>
          {facilityNames.map((f) => <option key={f} value={f}>{f.split("—")[0].trim()}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30">
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="in_progress">In Progress</option>
          <option value="submitted">Submitted</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("facility_name")}>Facility <SortArrow col="facility_name" /></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Report Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Period</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("due_date")}>Due Date <SortArrow col="due_date" /></th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id}
                  className={cn(
                    "border-b border-slate-100 transition-colors hover:bg-emerald-50",
                    isDueSoon(r.due_date) && r.status !== "submitted" && r.status !== "approved" ? "bg-amber-50/50" : i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  )}
                >
                  <td className="py-3 px-4 font-medium text-slate-900">{r.facility_name.split("—")[0].trim()}</td>
                  <td className="py-3 px-4 text-slate-600">{REPORT_TYPE_LABELS[r.report_type]}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono-data">{r.period}</td>
                  <td className={cn("py-3 px-4 font-mono-data", isDueSoon(r.due_date) && r.status !== "submitted" && r.status !== "approved" ? "text-amber-700 font-semibold" : "text-slate-600")}>{formatDate(r.due_date)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium uppercase", getStatusColor(r.status))}>{STATUS_LABELS[r.status]}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{r.submitted_date ? formatDate(r.submitted_date) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
