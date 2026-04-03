"use client";

import { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  X,
  Scale,
  Truck,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { customers, loads, invoices } from "@/lib/mock-data";
import {
  formatCurrency,
  formatTons,
  formatDate,
  getStatusColor,
  cn,
} from "@/lib/utils";
import { STATUS_LABELS } from "@/lib/constants";
import type { Customer } from "@/lib/types";

const CUSTOMER_TYPE_LABELS: Record<string, string> = {
  waste_generator: "Generator",
  hauler: "Hauler",
  processor: "Processor",
};

const CUSTOMER_TYPE_COLORS: Record<string, string> = {
  waste_generator: "bg-blue-100 text-blue-700",
  hauler: "bg-amber-100 text-amber-700",
  processor: "bg-emerald-100 text-emerald-700",
};

type SortKey = "name" | "total_tons_ytd" | "total_loads_ytd" | "outstanding_balance";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("total_tons_ytd");
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    let data = [...customers];
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.contact_name.toLowerCase().includes(s) ||
          c.contact_email.toLowerCase().includes(s)
      );
    }
    data.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string") return sortAsc ? av.localeCompare(bv as string) : (bv as string).localeCompare(av);
      return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
    });
    return data;
  }, [search, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const totalTonsYTD = customers.reduce((s, c) => s + c.total_tons_ytd, 0);
  const totalOutstanding = customers.reduce((s, c) => s + c.outstanding_balance, 0);
  const avgLoads = Math.round(customers.reduce((s, c) => s + c.total_loads_ytd, 0) / customers.length);

  const customerLoads = selectedCustomer
    ? loads.filter((l) => l.customer_name === selectedCustomer.name).slice(0, 5)
    : [];
  const customerInvoices = selectedCustomer
    ? invoices.filter((inv) => inv.customer_name === selectedCustomer.name)
    : [];

  const SortArrow = ({ col }: { col: SortKey }) => (
    <span className="text-[10px] ml-1">{sortKey === col ? (sortAsc ? "▲" : "▼") : "⇅"}</span>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500 mt-0.5">{customers.length} active accounts</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {[
          { label: "Total Customers", value: customers.length.toString(), icon: Users, color: "bg-emerald-100 text-emerald-600" },
          { label: "Total Tons YTD", value: totalTonsYTD.toLocaleString(undefined, { maximumFractionDigits: 1 }), icon: Scale, color: "bg-blue-100 text-blue-600" },
          { label: "Outstanding Balance", value: formatCurrency(totalOutstanding), icon: DollarSign, color: "bg-red-100 text-red-600" },
          { label: "Avg Loads/Customer", value: avgLoads.toString(), icon: BarChart3, color: "bg-amber-100 text-amber-600" },
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers, contacts, emails..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("name")}>Customer <SortArrow col="name" /></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("total_tons_ytd")}>Tons YTD <SortArrow col="total_tons_ytd" /></th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("total_loads_ytd")}>Loads <SortArrow col="total_loads_ytd" /></th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort("outstanding_balance")}>Outstanding <SortArrow col="outstanding_balance" /></th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Terms</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className={cn(
                    "border-b border-slate-100 cursor-pointer transition-colors hover:bg-emerald-50",
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  )}
                >
                  <td className="py-3 px-4 font-medium text-slate-900">{c.name}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium uppercase", CUSTOMER_TYPE_COLORS[c.type])}>{CUSTOMER_TYPE_LABELS[c.type]}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{c.contact_name}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{c.contact_email}</td>
                  <td className="py-3 px-4 text-right font-mono-data font-medium text-slate-900">{c.total_tons_ytd.toLocaleString(undefined, { minimumFractionDigits: 1 })}</td>
                  <td className="py-3 px-4 text-right font-mono-data text-slate-700">{c.total_loads_ytd}</td>
                  <td className={cn("py-3 px-4 text-right font-mono-data font-medium", c.outstanding_balance > 0 ? "text-red-600" : "text-emerald-600")}>{formatCurrency(c.outstanding_balance)}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{c.payment_terms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {selectedCustomer && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedCustomer(null)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 animate-slide-in-right overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-5 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-slate-900">{selectedCustomer.name}</div>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium uppercase mt-1 inline-block", CUSTOMER_TYPE_COLORS[selectedCustomer.type])}>{CUSTOMER_TYPE_LABELS[selectedCustomer.type]}</span>
                </div>
                <button onClick={() => setSelectedCustomer(null)} className="p-1 hover:bg-slate-100 rounded"><X className="w-5 h-5 text-slate-400" /></button>
              </div>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div><div className="text-[10px] text-slate-400 uppercase tracking-wide">Contact</div><div className="text-sm font-medium mt-0.5">{selectedCustomer.contact_name}</div></div>
                <div><div className="text-[10px] text-slate-400 uppercase tracking-wide">Email</div><div className="text-sm text-emerald-600 mt-0.5">{selectedCustomer.contact_email}</div></div>
                <div><div className="text-[10px] text-slate-400 uppercase tracking-wide">Phone</div><div className="text-sm mt-0.5">{selectedCustomer.contact_phone}</div></div>
                <div><div className="text-[10px] text-slate-400 uppercase tracking-wide">Terms</div><div className="text-sm mt-0.5">{selectedCustomer.payment_terms}</div></div>
              </div>
              <div className="text-xs text-slate-500">{selectedCustomer.address}</div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Tons YTD", value: selectedCustomer.total_tons_ytd.toLocaleString(undefined, { minimumFractionDigits: 1 }), color: "bg-emerald-50 text-emerald-700" },
                  { label: "Loads YTD", value: selectedCustomer.total_loads_ytd.toString(), color: "bg-blue-50 text-blue-700" },
                  { label: "Outstanding", value: formatCurrency(selectedCustomer.outstanding_balance), color: selectedCustomer.outstanding_balance > 0 ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700" },
                ].map((s) => (
                  <div key={s.label} className={cn("rounded-lg p-3 text-center", s.color)}>
                    <div className="text-[10px] uppercase tracking-wide font-medium opacity-70">{s.label}</div>
                    <div className="font-mono-data text-lg font-bold mt-1">{s.value}</div>
                  </div>
                ))}
              </div>

              {customerLoads.length > 0 && (
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Recent Loads</div>
                  <div className="space-y-2">
                    {customerLoads.map((l) => (
                      <div key={l.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <div>
                          <div className="text-xs font-mono-data font-medium">{l.bol_number}</div>
                          <div className="text-[10px] text-slate-400">{formatDate(l.date)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono-data font-bold text-emerald-600">{l.net_weight_tons}t</div>
                          <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", getStatusColor(l.status))}>{STATUS_LABELS[l.status]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {customerInvoices.length > 0 && (
                <div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Invoices</div>
                  <div className="space-y-2">
                    {customerInvoices.map((inv) => (
                      <div key={inv.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                        <div>
                          <div className="text-xs font-mono-data font-medium">{inv.invoice_number}</div>
                          <div className="text-[10px] text-slate-400">Due {formatDate(inv.due_date)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono-data font-bold">{formatCurrency(inv.total)}</div>
                          <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", getStatusColor(inv.status))}>{STATUS_LABELS[inv.status]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
