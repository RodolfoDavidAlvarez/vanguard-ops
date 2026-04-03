"use client";

import { useState } from "react";
import {
  Settings,
  Building2,
  Bell,
  Plug,
  Download,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "relative w-10 h-5.5 rounded-full transition-colors",
        checked ? "bg-emerald-500" : "bg-slate-300"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

const integrations = [
  { name: "ERP System", desc: "SAP S/4HANA", status: "connected", color: "text-emerald-500" },
  { name: "Fleet GPS", desc: "Samsara Tracking", status: "connected", color: "text-emerald-500" },
  { name: "Accounting", desc: "QuickBooks Online", status: "pending", color: "text-amber-500" },
  { name: "HR System", desc: "BambooHR", status: "not_connected", color: "text-slate-400" },
];

const STATUS_ICONS = {
  connected: CheckCircle,
  pending: Clock,
  not_connected: XCircle,
};

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    dispatch: true,
    compliance: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Platform configuration</p>
      </div>

      {/* Organization */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-fade-in-up stagger-1">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-900">Organization</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wide">Company Name</label>
            <input
              defaultValue="Vanguard Renewables"
              className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wide">Timezone</label>
            <select className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30">
              <option>America/New_York (EST)</option>
              <option>America/Chicago (CST)</option>
              <option>America/Denver (MST)</option>
              <option>America/Phoenix (MST)</option>
              <option>America/Los_Angeles (PST)</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wide">Primary Contact</label>
            <input
              defaultValue="Oscar Rodriguez"
              className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium uppercase tracking-wide">Contact Email</label>
            <input
              defaultValue="orodriguez@vanguardrenewables.com"
              className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-fade-in-up stagger-2">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: "email" as const, label: "Email Alerts", desc: "Receive email notifications for critical events" },
            { key: "sms" as const, label: "SMS Alerts", desc: "Text message alerts for diversions and critical capacity" },
            { key: "dispatch" as const, label: "Dispatch Notifications", desc: "Real-time updates for load status changes" },
            { key: "compliance" as const, label: "Compliance Reminders", desc: "Reminders for upcoming regulatory deadlines" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-slate-900">{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
              <Toggle
                checked={notifications[item.key]}
                onChange={() => toggleNotification(item.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-fade-in-up stagger-3">
        <div className="flex items-center gap-2 mb-4">
          <Plug className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-900">Integrations</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {integrations.map((intg) => {
            const StatusIcon = STATUS_ICONS[intg.status as keyof typeof STATUS_ICONS];
            return (
              <div key={intg.name} className="border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-900">{intg.name}</span>
                  <StatusIcon className={cn("w-4 h-4", intg.color)} />
                </div>
                <div className="text-xs text-slate-500">{intg.desc}</div>
                <div className="text-[10px] text-slate-400 mt-1 capitalize">{intg.status.replace("_", " ")}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data & Export */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-fade-in-up stagger-4">
        <div className="flex items-center gap-2 mb-4">
          <Download className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-slate-900">Data &amp; Export</h2>
        </div>
        <div className="flex gap-3">
          {[
            "Export All BOLs (CSV)",
            "Export All CODs (CSV)",
            "Generate Monthly Report",
          ].map((label) => (
            <button
              key={label}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
