// Vanguard Ops Platform — Constants & Configuration

import {
  LayoutDashboard,
  Radio,
  Truck,
  FileCheck,
  Building2,
  Users,
  Receipt,
  ShieldCheck,
  Bell,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Dispatch', href: '/dispatch', icon: Radio, badge: 2 },
  { label: 'Loads / BOLs', href: '/loads', icon: Truck },
  { label: 'CODs', href: '/cods', icon: FileCheck },
  { label: 'Facilities', href: '/facilities', icon: Building2 },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Billing', href: '/billing', icon: Receipt },
  { label: 'Compliance', href: '/compliance', icon: ShieldCheck },
  { label: 'Notifications', href: '/notifications', icon: Bell, badge: 6 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const CHART_COLORS = {
  emerald: '#10b981',
  emeraldDark: '#059669',
  emeraldLight: '#34d399',
  amber: '#f59e0b',
  red: '#ef4444',
  slate: '#64748b',
  blue: '#3b82f6',
};

export const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Scheduled',
  in_transit: 'In Transit',
  arrived: 'Arrived',
  weighed: 'Weighed',
  processing: 'Processing',
  completed: 'Completed',
  diverted: 'Diverted',
  draft: 'Draft',
  issued: 'Issued',
  signed: 'Signed',
  archived: 'Archived',
  sent: 'Sent',
  paid: 'Paid',
  overdue: 'Overdue',
  upcoming: 'Upcoming',
  in_progress: 'In Progress',
  submitted: 'Submitted',
  approved: 'Approved',
  operational: 'Operational',
  maintenance: 'Maintenance',
  construction: 'Construction',
  offline: 'Offline',
};

export const FACILITY_TYPE_LABELS: Record<string, string> = {
  anaerobic_digester: 'Anaerobic Digester',
  depackaging: 'Depackaging',
  composting: 'Composting',
};
