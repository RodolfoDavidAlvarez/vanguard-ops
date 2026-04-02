// Vanguard Ops Platform — Utility Functions

import type { LoadStatus, CODStatus, InvoiceStatus, ComplianceReportStatus, Priority, FacilityStatus } from './types';

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatTons(n: number): string {
  return `${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} tons`;
}

export function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(d: string): string {
  return new Date(d).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

type AnyStatus = LoadStatus | CODStatus | InvoiceStatus | ComplianceReportStatus | FacilityStatus;

export function getStatusColor(status: AnyStatus): string {
  const map: Record<string, string> = {
    // Load statuses
    scheduled: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-yellow-100 text-yellow-800',
    arrived: 'bg-indigo-100 text-indigo-800',
    weighed: 'bg-purple-100 text-purple-800',
    processing: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    diverted: 'bg-red-100 text-red-800',
    // COD statuses
    draft: 'bg-gray-100 text-gray-800',
    issued: 'bg-blue-100 text-blue-800',
    signed: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-600',
    // Invoice statuses
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    // Compliance statuses
    upcoming: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    submitted: 'bg-indigo-100 text-indigo-800',
    approved: 'bg-green-100 text-green-800',
    // Facility statuses
    operational: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    construction: 'bg-orange-100 text-orange-800',
    offline: 'bg-red-100 text-red-800',
  };
  return map[status] || 'bg-gray-100 text-gray-800';
}

export function getPriorityColor(priority: Priority): string {
  const map: Record<Priority, string> = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700',
  };
  return map[priority];
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
