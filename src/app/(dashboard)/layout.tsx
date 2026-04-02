"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Derive current page name from NAV_ITEMS
  const currentPage =
    NAV_ITEMS.find(
      (item) =>
        pathname === item.href ||
        (item.href !== "/dashboard" && pathname.startsWith(item.href))
    )?.label || "Dashboard";

  return (
    <div className="flex min-h-screen">
      {/* ─── Sidebar ─────────────────────────────────────────── */}
      <aside className="flex flex-col h-screen w-64 bg-slate-950 text-slate-400 fixed left-0 top-0 z-40">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-800">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold tracking-tight text-gradient-emerald">
              VANGUARD
            </span>
            <span className="text-2xl font-bold tracking-tight text-white">
              OPS
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 tracking-widest uppercase">
            Operations Platform
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 shrink-0",
                        isActive ? "text-emerald-400" : "text-slate-500"
                      )}
                    />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
              OR
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">
                Oscar Rodriguez
              </p>
              <p className="text-xs text-slate-500 truncate">
                Operations Director
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── Main content area ───────────────────────────────── */}
      <div className="ml-64 flex-1 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Vanguard Ops</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">{currentPage}</span>
          </div>

          {/* Right side: search, notifications, user */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search loads, BOLs, customers..."
                className="w-72 pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
              />
            </div>

            {/* Notification bell */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User initials */}
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
              OR
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 dot-grid-bg">{children}</main>
      </div>
    </div>
  );
}
