// Vanguard Ops Platform — TypeScript Types

export type FacilityType = 'anaerobic_digester' | 'depackaging' | 'composting';
export type FacilityStatus = 'operational' | 'maintenance' | 'construction' | 'offline';

export interface Facility {
  id: string;
  name: string;
  address: string;
  state: string;
  capacity_tons_per_day: number;
  current_utilization_pct: number;
  status: FacilityStatus;
  type: FacilityType;
  contact_name: string;
  contact_phone: string;
  lat: number;
  lng: number;
}

export type LoadStatus =
  | 'scheduled'
  | 'in_transit'
  | 'arrived'
  | 'weighed'
  | 'processing'
  | 'completed'
  | 'diverted';

export interface Load {
  id: string;
  bol_number: string;
  date: string;
  facility_id: string;
  facility_name: string;
  customer_name: string;
  material_type: string;
  origin: string;
  destination: string;
  carrier_name: string;
  driver_name: string;
  gross_weight: number;
  tare_weight: number;
  net_weight: number;
  net_weight_tons: number;
  status: LoadStatus;
  reference_number: string;
  notes: string;
  created_at: string;
  gps_lat: number | null;
  gps_lng: number | null;
}

export type CODStatus = 'draft' | 'issued' | 'signed' | 'archived';

export interface COD {
  id: string;
  cod_number: string;
  date_issued: string;
  facility_id: string;
  facility_name: string;
  customer_name: string;
  material_type: string;
  tons_destroyed: number;
  destruction_method: string;
  bol_ids: string[];
  regulatory_reference: string;
  signed_by: string;
  status: CODStatus;
  pdf_url: string | null;
}

export type CustomerType = 'waste_generator' | 'hauler' | 'processor';

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  total_tons_ytd: number;
  total_loads_ytd: number;
  outstanding_balance: number;
  payment_terms: string;
}

export type NotificationType =
  | 'load_arrival'
  | 'diversion'
  | 'cod_ready'
  | 'payment'
  | 'compliance'
  | 'capacity_alert';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  facility_id: string;
  facility_name: string;
  timestamp: string;
  read: boolean;
  priority: Priority;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface InvoiceLineItem {
  description: string;
  tons: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  customer_name: string;
  facility_id: string;
  date: string;
  due_date: string;
  line_items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  payment_date: string | null;
}

export type ComplianceReportType =
  | 'epa_air'
  | 'npdes_water'
  | 'solid_waste'
  | 'sb1383_diversion'
  | 'monthly_tonnage';

export type ComplianceReportStatus =
  | 'upcoming'
  | 'in_progress'
  | 'submitted'
  | 'approved';

export interface ComplianceReport {
  id: string;
  facility_id: string;
  facility_name: string;
  report_type: ComplianceReportType;
  period: string;
  due_date: string;
  status: ComplianceReportStatus;
  submitted_date: string | null;
}

export interface DispatchEvent {
  id: string;
  load_id: string;
  event_type: string;
  timestamp: string;
  description: string;
  facility_name: string;
}
