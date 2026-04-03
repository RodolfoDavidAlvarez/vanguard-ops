"use client";

import { useState, useMemo } from "react";
import {
  DollarSign,
  Clock,
  AlertTriangle,
  TrendingUp,
  Plus,
  X,
  Search,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { invoices, revenueData } from "@/lib/mock-data";
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  cn,
} from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import type { Invoice } from "@/lib/types";

type SortKey = "date" | "total" | "due_date";

export default function BillingPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const revenueMTD = invoices
    .filter((i) => i.date.startsWith("2026-04"))
    .reduce((s, i) => s + i.total, 0);
  const outstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((s, i) => s + i.total, 0);
  const overdue = invoices
    .filter((i) => i.status === "overdue")
    .reduce((s, i) => s + i.total, 0);
  const totalTons = invoices.reduce(
    (s, i) => s + i.line_items.reduce((ls, li) => ls + li.tons, 0),
    0
  );
  const totalRev = invoices.reduce((s, i) => s + i.total, 0);
  const avgPerTon = totalTons > 0 ? totalRev / totalTons : 0;

  const filtered = useMemo(() => {
    let data = [...invoices];
    if (statusFilter !== "all")
      data = data.filter((i) => i.status === statusFilter);
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (i) =>
          i.invoice_number.toLowerCase().includes(s) ||
          i.customer_name.toLowerCase().includes(s)
      );
    }
    data.sort((a, b) => {
      if (sortKey === "total") return sortAsc ? a.total - b.total : b.total - a.total;
      const ak = sortKey === "date" ? a.date : a.due_date;
      const bk = sortKey === "date" ? b.date : b.due_date;
      return sortAsc ? ak.localeCompare(bk) : bk.localeCompare(ak);
    });
    return data;
  }, [statusFilter, search, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortArrow = ({ col }: { col: SortKey }) => (
    <span className="text-[10px] ml-1">{sortKey === col ? (sortAsc ? "▲" : "▼") : "⇅"}</span>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Billing &amp; Revenue</h1>
          <p className="text-sm text-slate-500 mt-0.5">{invoices.length} invoices</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {[
          { label: "Revenue MTD", value: formatCurrency(revenueMTD), icon: DollarSign, color: "bg-emerald-100 text-emerald-600" },
          { label: "Outstanding", value: formatCurrency(outstanding), icon: Clock, color: "bg-amber-100 text-amber-600" },
          { label: "Overdue", value: formatCurrency(overdue), icon: AlertTriangle, color: "bg-red-100 text-red-600" },
          { label: "Avg $/Ton", value: formatCurrency(avgPerTon), icon: TrendingUp, color: "bg-blue-100 text-blue-600" },
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

      {/* Revenue chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 animate-fade-in-up stagger-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Revenue Trend</h3>
        <p className="text-xs text-slate-400 mb-4">Monthly revenue across all facilities</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} width={60} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12 }} formatter={(v) => [formatCurrency(Number(v)), "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30">
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Invoice #</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("date")}>Date <SortArrow col="date" /></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("total")}>Total <SortArrow col="total" /></th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("due_date")}>Due Date <SortArrow col="due_date" /></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Paid</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, i) => (
                <tr
                  key={inv.id}
                  onClick={() => setSelectedInvoice(inv)}
                  className={cn(
                    "border-b border-slate-100 cursor-pointer transition-colors hover:bg-emerald-50",
                    inv.status === "overdue" ? "bg-red-50/50" : i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  )}
                >
                  <td className="py-3 px-4 font-mono-data font-medium text-slate-900">{inv.invoice_number}</td>
                  <td className="py-3 px-4 text-slate-600">{formatDate(inv.date)}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">{inv.customer_name}</td>
                  <td className="py-3 px-4 text-right font-mono-data font-bold text-slate-900">{formatCurrency(inv.total)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium uppercase", getStatusColor(inv.status))}>{STATUS_LABELS[inv.status]}</span>
                  </td>
                  <td className="py-3 px-4 font-mono-data text-slate-600">{formatDate(inv.due_date)}</td>
                  <td className="py-3 px-4 text-slate-500">{inv.payment_date ? formatDate(inv.payment_date) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {selectedInvoice && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedInvoice(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 animate-slide-in-right overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-5 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono-data text-lg font-bold text-slate-900">{selectedInvoice.invoice_number}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{selectedInvoice.customer_name}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-xs px-2 py-1 rounded-full font-medium uppercase", getStatusColor(selectedInvoice.status))}>{STATUS_LABELS[selectedInvoice.status]}</span>
                  <button onClick={() => setSelectedInvoice(null)} className="p-1 hover:bg-slate-100 rounded"><X className="w-5 h-5 text-slate-400" /></button>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div><div className="text-[10px] text-slate-400 uppercase tracking-wide">Date</div><div className="text-sm mt-0.5">{formatDate(selectedInvoice.date)}</div></div>
                <div><div className="text-[10px] text-slate-400 uppercase tracking-wide">Due Date</div><div className="text-sm mt-0.5">{formatDate(selectedInvoice.due_date)}</div></div>
                <div><div className="text-[10px] text-slate-400 uppercase tracking-wide">Facility</div><div className="text-sm mt-0.5">{selectedInvoice.facility_id}</div></div>
                {selectedInvoice.payment_date && <div><div className="text-[10px] text-slate-400 uppercase tracking-wide">Paid</div><div className="text-sm text-emerald-600 mt-0.5">{formatDate(selectedInvoice.payment_date)}</div></div>}
              </div>

              <div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Line Items</div>
                <div className="bg-slate-50 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-3 font-medium text-slate-500">Description</th>
                        <th className="text-right py-2 px-3 font-medium text-slate-500">Tons</th>
                        <th className="text-right py-2 px-3 font-medium text-slate-500">Rate</th>
                        <th className="text-right py-2 px-3 font-medium text-slate-500">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.line_items.map((li, i) => (
                        <tr key={i} className="border-b border-slate-100">
                          <td className="py-2 px-3 text-slate-700">{li.description}</td>
                          <td className="py-2 px-3 text-right font-mono-data">{li.tons}</td>
                          <td className="py-2 px-3 text-right font-mono-data">{formatCurrency(li.rate)}</td>
                          <td className="py-2 px-3 text-right font-mono-data font-medium">{formatCurrency(li.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total</div>
                    <div className="font-mono-data text-xl font-bold text-slate-900">{formatCurrency(selectedInvoice.total)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
