// Vanguard Ops Platform — Mock Data
// Realistic sample data for demo. Designed to impress a BlackRock-backed company.

import type {
  Facility,
  Load,
  COD,
  Customer,
  Notification,
  Invoice,
  ComplianceReport,
  DispatchEvent,
} from './types';

// ─── Facilities (8) ───────────────────────────────────────────────────────────

export const facilities: Facility[] = [
  {
    id: 'fac-001',
    name: 'Congress AZ — Maricopa Organics',
    address: '24850 W Congress Ave, Buckeye, AZ 85326',
    state: 'AZ',
    capacity_tons_per_day: 120,
    current_utilization_pct: 87,
    status: 'operational',
    type: 'composting',
    contact_name: 'Marcus Rivera',
    contact_phone: '(623) 555-0142',
    lat: 33.3706,
    lng: -112.6868,
  },
  {
    id: 'fac-002',
    name: 'Dane County WI — Midwest Biogas',
    address: '4502 Sycamore Ave, Madison, WI 53714',
    state: 'WI',
    capacity_tons_per_day: 200,
    current_utilization_pct: 72,
    status: 'operational',
    type: 'anaerobic_digester',
    contact_name: 'Jennifer Kowalski',
    contact_phone: '(608) 555-0238',
    lat: 43.0731,
    lng: -89.4012,
  },
  {
    id: 'fac-003',
    name: 'Stearns County MN — Northern Plains AD',
    address: '18220 County Rd 138, St. Cloud, MN 56301',
    state: 'MN',
    capacity_tons_per_day: 180,
    current_utilization_pct: 64,
    status: 'operational',
    type: 'anaerobic_digester',
    contact_name: 'Thomas Lindgren',
    contact_phone: '(320) 555-0417',
    lat: 45.5579,
    lng: -94.1632,
  },
  {
    id: 'fac-004',
    name: 'Windham County VT — Green Mountain Compost',
    address: '283 Putney Rd, Brattleboro, VT 05301',
    state: 'VT',
    capacity_tons_per_day: 80,
    current_utilization_pct: 91,
    status: 'operational',
    type: 'composting',
    contact_name: 'Sarah McAllister',
    contact_phone: '(802) 555-0193',
    lat: 42.8509,
    lng: -72.5579,
  },
  {
    id: 'fac-005',
    name: 'Henrico County VA — Atlantic Depackaging',
    address: '9400 Staples Mill Rd, Glen Allen, VA 23060',
    state: 'VA',
    capacity_tons_per_day: 150,
    current_utilization_pct: 58,
    status: 'maintenance',
    type: 'depackaging',
    contact_name: 'David Chen',
    contact_phone: '(804) 555-0326',
    lat: 37.6568,
    lng: -77.5092,
  },
  {
    id: 'fac-006',
    name: 'Brevard County FL — Space Coast Renewables',
    address: '7200 N Wickham Rd, Melbourne, FL 32940',
    state: 'FL',
    capacity_tons_per_day: 160,
    current_utilization_pct: 78,
    status: 'operational',
    type: 'anaerobic_digester',
    contact_name: 'Patricia Alvarez',
    contact_phone: '(321) 555-0284',
    lat: 28.0836,
    lng: -80.6081,
  },
  {
    id: 'fac-007',
    name: 'Clackamas County OR — Pacific Northwest Organics',
    address: '15600 SE 362nd Dr, Sandy, OR 97055',
    state: 'OR',
    capacity_tons_per_day: 100,
    current_utilization_pct: 45,
    status: 'construction',
    type: 'composting',
    contact_name: 'Michael Torres',
    contact_phone: '(503) 555-0159',
    lat: 45.3974,
    lng: -122.2608,
  },
  {
    id: 'fac-008',
    name: 'Weld County CO — Front Range Biogas',
    address: '34100 WCR 31, Greeley, CO 80631',
    state: 'CO',
    capacity_tons_per_day: 220,
    current_utilization_pct: 83,
    status: 'operational',
    type: 'anaerobic_digester',
    contact_name: 'Brian Hawkins',
    contact_phone: '(970) 555-0471',
    lat: 40.4233,
    lng: -104.7091,
  },
];

// ─── Customers (10) ───────────────────────────────────────────────────────────

export const customers: Customer[] = [
  {
    id: 'cust-001',
    name: 'Tyson Foods Inc.',
    type: 'waste_generator',
    contact_name: 'Rebecca Torres',
    contact_email: 'rtorres@tyson.com',
    contact_phone: '(479) 555-0312',
    address: '2200 W Don Tyson Pkwy, Springdale, AR 72762',
    total_tons_ytd: 1842.5,
    total_loads_ytd: 78,
    outstanding_balance: 14250.0,
    payment_terms: 'Net 30',
  },
  {
    id: 'cust-002',
    name: 'PetSmart Distribution',
    type: 'waste_generator',
    contact_name: 'Mark Sullivan',
    contact_email: 'msullivan@petsmart.com',
    contact_phone: '(623) 555-0198',
    address: '19601 N 27th Ave, Phoenix, AZ 85027',
    total_tons_ytd: 623.8,
    total_loads_ytd: 32,
    outstanding_balance: 4800.0,
    payment_terms: 'Net 30',
  },
  {
    id: 'cust-003',
    name: 'Nestle Purina PetCare',
    type: 'waste_generator',
    contact_name: 'Angela Hoffman',
    contact_email: 'ahoffman@purina.nestle.com',
    contact_phone: '(314) 555-0427',
    address: 'Checkerboard Square, St. Louis, MO 63164',
    total_tons_ytd: 2156.3,
    total_loads_ytd: 92,
    outstanding_balance: 0,
    payment_terms: 'Net 15',
  },
  {
    id: 'cust-004',
    name: 'Frito-Lay North America',
    type: 'waste_generator',
    contact_name: 'James Park',
    contact_email: 'jpark@pepsico.com',
    contact_phone: '(972) 555-0283',
    address: '7701 Legacy Dr, Plano, TX 75024',
    total_tons_ytd: 1547.9,
    total_loads_ytd: 64,
    outstanding_balance: 8920.0,
    payment_terms: 'Net 30',
  },
  {
    id: 'cust-005',
    name: 'General Mills',
    type: 'waste_generator',
    contact_name: 'Karen Lindstrom',
    contact_email: 'klindstrom@generalmills.com',
    contact_phone: '(763) 555-0156',
    address: 'One General Mills Blvd, Minneapolis, MN 55426',
    total_tons_ytd: 987.4,
    total_loads_ytd: 41,
    outstanding_balance: 3200.0,
    payment_terms: 'Net 30',
  },
  {
    id: 'cust-006',
    name: 'Starbucks Coffee Co.',
    type: 'waste_generator',
    contact_name: 'Lisa Nakamura',
    contact_email: 'lnakamura@starbucks.com',
    contact_phone: '(206) 555-0342',
    address: '2401 Utah Ave S, Seattle, WA 98134',
    total_tons_ytd: 412.6,
    total_loads_ytd: 22,
    outstanding_balance: 0,
    payment_terms: 'Net 15',
  },
  {
    id: 'cust-007',
    name: 'Whole Foods Market',
    type: 'waste_generator',
    contact_name: 'Daniel Ortega',
    contact_email: 'dortega@wholefoods.com',
    contact_phone: '(512) 555-0218',
    address: '550 Bowie St, Austin, TX 78703',
    total_tons_ytd: 734.2,
    total_loads_ytd: 38,
    outstanding_balance: 5600.0,
    payment_terms: 'Net 30',
  },
  {
    id: 'cust-008',
    name: 'Kroger Co.',
    type: 'waste_generator',
    contact_name: 'Robert Whitfield',
    contact_email: 'rwhitfield@kroger.com',
    contact_phone: '(513) 555-0394',
    address: '1014 Vine St, Cincinnati, OH 45202',
    total_tons_ytd: 1328.1,
    total_loads_ytd: 56,
    outstanding_balance: 7450.0,
    payment_terms: 'Net 30',
  },
  {
    id: 'cust-009',
    name: 'Sysco Corporation',
    type: 'hauler',
    contact_name: 'Michelle Foster',
    contact_email: 'mfoster@sysco.com',
    contact_phone: '(281) 555-0267',
    address: '1390 Enclave Pkwy, Houston, TX 77077',
    total_tons_ytd: 2891.5,
    total_loads_ytd: 118,
    outstanding_balance: 12800.0,
    payment_terms: 'Net 45',
  },
  {
    id: 'cust-010',
    name: 'Soil Seed & Water',
    type: 'processor',
    contact_name: 'Rodo Alvarez',
    contact_email: 'ralvarez@soilseedandwater.com',
    contact_phone: '(602) 637-0032',
    address: '24850 W Congress Ave, Buckeye, AZ 85326',
    total_tons_ytd: 517.95,
    total_loads_ytd: 24,
    outstanding_balance: 0,
    payment_terms: 'Net 15',
  },
];

// ─── Loads / BOLs (42) ───────────────────────────────────────────────────────

export const loads: Load[] = [
  // Today's loads
  {
    id: 'load-001', bol_number: 'BOL-2026-04-0201', date: '2026-04-02T06:15:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', origin: 'Tyson Tempe Plant', destination: 'Congress AZ', carrier_name: 'Southwest Hauling', driver_name: 'Carlos Mendez', gross_weight: 48200, tare_weight: 16800, net_weight: 31400, net_weight_tons: 15.7, status: 'in_transit', reference_number: 'TYS-040201', notes: 'ETA 10:30 AM', created_at: '2026-04-02T05:45:00', gps_lat: 33.42, gps_lng: -112.15,
  },
  {
    id: 'load-002', bol_number: 'BOL-2026-04-0202', date: '2026-04-02T07:00:00', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'General Mills', material_type: 'Cereal Production Waste', origin: 'General Mills Minneapolis', destination: 'Dane County WI', carrier_name: 'Great Lakes Transport', driver_name: 'Steve Johnson', gross_weight: 52100, tare_weight: 17200, net_weight: 34900, net_weight_tons: 17.45, status: 'scheduled', reference_number: 'GM-040201', notes: 'Pickup confirmed 7 AM', created_at: '2026-04-01T16:00:00', gps_lat: null, gps_lng: null,
  },
  {
    id: 'load-003', bol_number: 'BOL-2026-04-0203', date: '2026-04-02T05:30:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'PetSmart Distribution', material_type: 'Expired Pet Food', origin: 'PetSmart DC Phoenix', destination: 'Congress AZ', carrier_name: 'Desert Express', driver_name: 'Miguel Ramirez', gross_weight: 44600, tare_weight: 16400, net_weight: 28200, net_weight_tons: 14.1, status: 'arrived', reference_number: 'PS-040201', notes: 'Arrived at scale house', created_at: '2026-04-02T04:00:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-004', bol_number: 'BOL-2026-04-0204', date: '2026-04-02T08:00:00', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Sysco Corporation', material_type: 'Food Distribution Waste', origin: 'Sysco Jacksonville', destination: 'Brevard County FL', carrier_name: 'Atlantic Freight', driver_name: 'James Williams', gross_weight: 50800, tare_weight: 17000, net_weight: 33800, net_weight_tons: 16.9, status: 'in_transit', reference_number: 'SYS-040201', notes: 'Highway delay — ETA pushed to 1 PM', created_at: '2026-04-02T06:30:00', gps_lat: 29.92, gps_lng: -81.32,
  },
  {
    id: 'load-005', bol_number: 'BOL-2026-04-0205', date: '2026-04-02T06:45:00', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Kroger Co.', material_type: 'Grocery Store Organics', origin: 'Kroger Denver DC', destination: 'Weld County CO', carrier_name: 'Rocky Mountain Haul', driver_name: 'Pat Donnelly', gross_weight: 46300, tare_weight: 16600, net_weight: 29700, net_weight_tons: 14.85, status: 'weighed', reference_number: 'KR-040201', notes: 'Weighed in, awaiting processing', created_at: '2026-04-02T05:00:00', gps_lat: 40.4233, gps_lng: -104.7091,
  },
  {
    id: 'load-006', bol_number: 'BOL-2026-04-0206', date: '2026-04-02T07:30:00', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'Frito-Lay North America', material_type: 'Snack Production Waste', origin: 'Frito-Lay Mankato', destination: 'Stearns County MN', carrier_name: 'Heartland Carriers', driver_name: 'Dave Olson', gross_weight: 49500, tare_weight: 16900, net_weight: 32600, net_weight_tons: 16.3, status: 'scheduled', reference_number: 'FL-040201', notes: '', created_at: '2026-04-01T14:00:00', gps_lat: null, gps_lng: null,
  },
  {
    id: 'load-007', bol_number: 'BOL-2026-04-0207', date: '2026-04-02T09:00:00', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', customer_name: 'Starbucks Coffee Co.', material_type: 'Coffee Grounds & Packaging', origin: 'Starbucks Roastery VT', destination: 'Windham County VT', carrier_name: 'New England Waste', driver_name: 'Tom Baker', gross_weight: 38200, tare_weight: 15800, net_weight: 22400, net_weight_tons: 11.2, status: 'processing', reference_number: 'SB-040201', notes: 'Processing in Bay 3', created_at: '2026-04-02T07:00:00', gps_lat: 42.8509, gps_lng: -72.5579,
  },
  // Diverted loads (Oscar's pain point)
  {
    id: 'load-008', bol_number: 'BOL-2026-04-0108', date: '2026-04-01T14:00:00', facility_id: 'fac-005', facility_name: 'Henrico County VA — Atlantic Depackaging', customer_name: 'Nestle Purina PetCare', material_type: 'Pet Food Returns', origin: 'Nestle Purina Richmond', destination: 'Henrico County VA', carrier_name: 'East Coast Logistics', driver_name: 'Ray Cooper', gross_weight: 51200, tare_weight: 17100, net_weight: 34100, net_weight_tons: 17.05, status: 'diverted', reference_number: 'NP-040101', notes: 'DIVERTED — Facility maintenance. Rerouted to Brevard FL. Storage charges apply.', created_at: '2026-04-01T10:00:00', gps_lat: 37.65, gps_lng: -77.51,
  },
  {
    id: 'load-009', bol_number: 'BOL-2026-04-0109', date: '2026-04-01T15:30:00', facility_id: 'fac-005', facility_name: 'Henrico County VA — Atlantic Depackaging', customer_name: 'Whole Foods Market', material_type: 'Packaged Food Waste', origin: 'Whole Foods DC Richmond', destination: 'Henrico County VA', carrier_name: 'East Coast Logistics', driver_name: 'Mike Patterson', gross_weight: 43800, tare_weight: 16200, net_weight: 27600, net_weight_tons: 13.8, status: 'diverted', reference_number: 'WF-040101', notes: 'DIVERTED — Facility maintenance. Rerouted to Space Coast FL. Holiday weekend storage charges.', created_at: '2026-04-01T11:00:00', gps_lat: 37.66, gps_lng: -77.50,
  },
  // Yesterday completed
  {
    id: 'load-010', bol_number: 'BOL-2026-04-0110', date: '2026-04-01T06:00:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Soil Seed & Water', material_type: 'Compost Feedstock', origin: 'SSW Yard Buckeye', destination: 'Congress AZ', carrier_name: 'SSW Internal', driver_name: 'Coy Cooper', gross_weight: 42800, tare_weight: 16000, net_weight: 26800, net_weight_tons: 13.4, status: 'completed', reference_number: 'SSW-040101', notes: 'COD issued', created_at: '2026-04-01T05:00:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-011', bol_number: 'BOL-2026-04-0111', date: '2026-04-01T07:30:00', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', origin: 'Tyson Madison', destination: 'Dane County WI', carrier_name: 'Great Lakes Transport', driver_name: 'Bill Murphy', gross_weight: 49800, tare_weight: 17000, net_weight: 32800, net_weight_tons: 16.4, status: 'completed', reference_number: 'TYS-040101', notes: 'COD issued', created_at: '2026-04-01T06:00:00', gps_lat: 43.0731, gps_lng: -89.4012,
  },
  {
    id: 'load-012', bol_number: 'BOL-2026-04-0112', date: '2026-04-01T08:15:00', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Frito-Lay North America', material_type: 'Snack Production Waste', origin: 'Frito-Lay Denver', destination: 'Weld County CO', carrier_name: 'Rocky Mountain Haul', driver_name: 'Pat Donnelly', gross_weight: 47600, tare_weight: 16800, net_weight: 30800, net_weight_tons: 15.4, status: 'completed', reference_number: 'FL-040101', notes: '', created_at: '2026-04-01T07:00:00', gps_lat: 40.4233, gps_lng: -104.7091,
  },
  {
    id: 'load-013', bol_number: 'BOL-2026-04-0113', date: '2026-04-01T09:00:00', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Kroger Co.', material_type: 'Grocery Store Organics', origin: 'Kroger Orlando DC', destination: 'Brevard County FL', carrier_name: 'Sunshine State Hauling', driver_name: 'Alex Gonzalez', gross_weight: 45200, tare_weight: 16500, net_weight: 28700, net_weight_tons: 14.35, status: 'completed', reference_number: 'KR-040101', notes: '', created_at: '2026-04-01T07:30:00', gps_lat: 28.0836, gps_lng: -80.6081,
  },
  {
    id: 'load-014', bol_number: 'BOL-2026-04-0114', date: '2026-04-01T10:00:00', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'General Mills', material_type: 'Cereal Production Waste', origin: 'General Mills Golden Valley', destination: 'Stearns County MN', carrier_name: 'Heartland Carriers', driver_name: 'Eric Swanson', gross_weight: 51800, tare_weight: 17300, net_weight: 34500, net_weight_tons: 17.25, status: 'completed', reference_number: 'GM-040101', notes: '', created_at: '2026-04-01T08:00:00', gps_lat: 45.5579, gps_lng: -94.1632,
  },
  {
    id: 'load-015', bol_number: 'BOL-2026-04-0115', date: '2026-04-01T11:00:00', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', customer_name: 'Starbucks Coffee Co.', material_type: 'Coffee Grounds & Packaging', origin: 'Starbucks Distribution NE', destination: 'Windham County VT', carrier_name: 'New England Waste', driver_name: 'Tom Baker', gross_weight: 37800, tare_weight: 15600, net_weight: 22200, net_weight_tons: 11.1, status: 'completed', reference_number: 'SB-040101', notes: '', created_at: '2026-04-01T09:00:00', gps_lat: 42.8509, gps_lng: -72.5579,
  },
  // Last week loads
  {
    id: 'load-016', bol_number: 'BOL-2026-03-3101', date: '2026-03-31T06:30:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'PetSmart Distribution', material_type: 'Expired Pet Food', origin: 'PetSmart DC Phoenix', destination: 'Congress AZ', carrier_name: 'Desert Express', driver_name: 'Miguel Ramirez', gross_weight: 45100, tare_weight: 16400, net_weight: 28700, net_weight_tons: 14.35, status: 'completed', reference_number: 'PS-033101', notes: '', created_at: '2026-03-31T05:00:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-017', bol_number: 'BOL-2026-03-3102', date: '2026-03-31T07:00:00', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Sysco Corporation', material_type: 'Food Distribution Waste', origin: 'Sysco Chicago', destination: 'Dane County WI', carrier_name: 'Great Lakes Transport', driver_name: 'Steve Johnson', gross_weight: 53200, tare_weight: 17400, net_weight: 35800, net_weight_tons: 17.9, status: 'completed', reference_number: 'SYS-033101', notes: '', created_at: '2026-03-31T05:30:00', gps_lat: 43.0731, gps_lng: -89.4012,
  },
  {
    id: 'load-018', bol_number: 'BOL-2026-03-3103', date: '2026-03-31T08:00:00', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', origin: 'Tyson Denver', destination: 'Weld County CO', carrier_name: 'Rocky Mountain Haul', driver_name: 'Chris Taylor', gross_weight: 50200, tare_weight: 17100, net_weight: 33100, net_weight_tons: 16.55, status: 'completed', reference_number: 'TYS-033101', notes: '', created_at: '2026-03-31T06:00:00', gps_lat: 40.4233, gps_lng: -104.7091,
  },
  {
    id: 'load-019', bol_number: 'BOL-2026-03-3001', date: '2026-03-30T06:00:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', origin: 'Tyson Tempe Plant', destination: 'Congress AZ', carrier_name: 'Southwest Hauling', driver_name: 'Carlos Mendez', gross_weight: 47900, tare_weight: 16700, net_weight: 31200, net_weight_tons: 15.6, status: 'completed', reference_number: 'TYS-033001', notes: '', created_at: '2026-03-30T05:00:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-020', bol_number: 'BOL-2026-03-3002', date: '2026-03-30T07:00:00', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'Nestle Purina PetCare', material_type: 'Pet Food Production Waste', origin: 'Purina Factory MN', destination: 'Stearns County MN', carrier_name: 'Heartland Carriers', driver_name: 'Dave Olson', gross_weight: 48700, tare_weight: 16900, net_weight: 31800, net_weight_tons: 15.9, status: 'completed', reference_number: 'NP-033001', notes: '', created_at: '2026-03-30T05:30:00', gps_lat: 45.5579, gps_lng: -94.1632,
  },
  {
    id: 'load-021', bol_number: 'BOL-2026-03-3003', date: '2026-03-30T08:30:00', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Whole Foods Market', material_type: 'Packaged Food Waste', origin: 'Whole Foods Jacksonville', destination: 'Brevard County FL', carrier_name: 'Atlantic Freight', driver_name: 'James Williams', gross_weight: 42100, tare_weight: 16100, net_weight: 26000, net_weight_tons: 13.0, status: 'completed', reference_number: 'WF-033001', notes: '', created_at: '2026-03-30T07:00:00', gps_lat: 28.0836, gps_lng: -80.6081,
  },
  {
    id: 'load-022', bol_number: 'BOL-2026-03-2901', date: '2026-03-29T06:15:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Soil Seed & Water', material_type: 'Compost Feedstock', origin: 'SSW Yard Buckeye', destination: 'Congress AZ', carrier_name: 'SSW Internal', driver_name: 'Coy Cooper', gross_weight: 43500, tare_weight: 16100, net_weight: 27400, net_weight_tons: 13.7, status: 'completed', reference_number: 'SSW-032901', notes: '', created_at: '2026-03-29T05:00:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-023', bol_number: 'BOL-2026-03-2902', date: '2026-03-29T07:30:00', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Kroger Co.', material_type: 'Grocery Store Organics', origin: 'Kroger Milwaukee DC', destination: 'Dane County WI', carrier_name: 'Great Lakes Transport', driver_name: 'Bill Murphy', gross_weight: 46800, tare_weight: 16700, net_weight: 30100, net_weight_tons: 15.05, status: 'completed', reference_number: 'KR-032901', notes: '', created_at: '2026-03-29T06:00:00', gps_lat: 43.0731, gps_lng: -89.4012,
  },
  {
    id: 'load-024', bol_number: 'BOL-2026-03-2903', date: '2026-03-29T09:00:00', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', customer_name: 'Starbucks Coffee Co.', material_type: 'Coffee Grounds & Packaging', origin: 'Starbucks Distribution NE', destination: 'Windham County VT', carrier_name: 'New England Waste', driver_name: 'Tom Baker', gross_weight: 39100, tare_weight: 15900, net_weight: 23200, net_weight_tons: 11.6, status: 'completed', reference_number: 'SB-032901', notes: '', created_at: '2026-03-29T07:30:00', gps_lat: 42.8509, gps_lng: -72.5579,
  },
  {
    id: 'load-025', bol_number: 'BOL-2026-03-2801', date: '2026-03-28T06:00:00', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Frito-Lay North America', material_type: 'Snack Production Waste', origin: 'Frito-Lay Denver', destination: 'Weld County CO', carrier_name: 'Rocky Mountain Haul', driver_name: 'Pat Donnelly', gross_weight: 48900, tare_weight: 16800, net_weight: 32100, net_weight_tons: 16.05, status: 'completed', reference_number: 'FL-032801', notes: '', created_at: '2026-03-28T05:00:00', gps_lat: 40.4233, gps_lng: -104.7091,
  },
  {
    id: 'load-026', bol_number: 'BOL-2026-03-2802', date: '2026-03-28T07:00:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'PetSmart Distribution', material_type: 'Expired Pet Food', origin: 'PetSmart DC Phoenix', destination: 'Congress AZ', carrier_name: 'Desert Express', driver_name: 'Miguel Ramirez', gross_weight: 44200, tare_weight: 16300, net_weight: 27900, net_weight_tons: 13.95, status: 'completed', reference_number: 'PS-032801', notes: '', created_at: '2026-03-28T05:30:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-027', bol_number: 'BOL-2026-03-2803', date: '2026-03-28T08:00:00', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Sysco Corporation', material_type: 'Food Distribution Waste', origin: 'Sysco Tampa', destination: 'Brevard County FL', carrier_name: 'Sunshine State Hauling', driver_name: 'Alex Gonzalez', gross_weight: 51400, tare_weight: 17200, net_weight: 34200, net_weight_tons: 17.1, status: 'completed', reference_number: 'SYS-032801', notes: '', created_at: '2026-03-28T06:30:00', gps_lat: 28.0836, gps_lng: -80.6081,
  },
  {
    id: 'load-028', bol_number: 'BOL-2026-03-2701', date: '2026-03-27T06:30:00', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'General Mills', material_type: 'Cereal Production Waste', origin: 'General Mills Golden Valley', destination: 'Stearns County MN', carrier_name: 'Heartland Carriers', driver_name: 'Eric Swanson', gross_weight: 50600, tare_weight: 17100, net_weight: 33500, net_weight_tons: 16.75, status: 'completed', reference_number: 'GM-032701', notes: '', created_at: '2026-03-27T05:00:00', gps_lat: 45.5579, gps_lng: -94.1632,
  },
  {
    id: 'load-029', bol_number: 'BOL-2026-03-2702', date: '2026-03-27T07:00:00', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Nestle Purina PetCare', material_type: 'Pet Food Production Waste', origin: 'Purina Factory WI', destination: 'Dane County WI', carrier_name: 'Great Lakes Transport', driver_name: 'Steve Johnson', gross_weight: 49200, tare_weight: 17000, net_weight: 32200, net_weight_tons: 16.1, status: 'completed', reference_number: 'NP-032701', notes: '', created_at: '2026-03-27T05:30:00', gps_lat: 43.0731, gps_lng: -89.4012,
  },
  {
    id: 'load-030', bol_number: 'BOL-2026-03-2703', date: '2026-03-27T08:30:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', origin: 'Tyson Tempe Plant', destination: 'Congress AZ', carrier_name: 'Southwest Hauling', driver_name: 'Carlos Mendez', gross_weight: 48400, tare_weight: 16800, net_weight: 31600, net_weight_tons: 15.8, status: 'completed', reference_number: 'TYS-032701', notes: '', created_at: '2026-03-27T06:00:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  // More historical loads for data density
  {
    id: 'load-031', bol_number: 'BOL-2026-03-2601', date: '2026-03-26T06:00:00', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Kroger Co.', material_type: 'Grocery Store Organics', origin: 'Kroger Denver DC', destination: 'Weld County CO', carrier_name: 'Rocky Mountain Haul', driver_name: 'Chris Taylor', gross_weight: 45800, tare_weight: 16500, net_weight: 29300, net_weight_tons: 14.65, status: 'completed', reference_number: 'KR-032601', notes: '', created_at: '2026-03-26T05:00:00', gps_lat: 40.4233, gps_lng: -104.7091,
  },
  {
    id: 'load-032', bol_number: 'BOL-2026-03-2602', date: '2026-03-26T07:30:00', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Whole Foods Market', material_type: 'Packaged Food Waste', origin: 'Whole Foods Orlando', destination: 'Brevard County FL', carrier_name: 'Atlantic Freight', driver_name: 'James Williams', gross_weight: 41600, tare_weight: 16000, net_weight: 25600, net_weight_tons: 12.8, status: 'completed', reference_number: 'WF-032601', notes: '', created_at: '2026-03-26T06:00:00', gps_lat: 28.0836, gps_lng: -80.6081,
  },
  {
    id: 'load-033', bol_number: 'BOL-2026-03-2501', date: '2026-03-25T06:15:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Soil Seed & Water', material_type: 'Compost Feedstock', origin: 'SSW Yard Buckeye', destination: 'Congress AZ', carrier_name: 'SSW Internal', driver_name: 'Coy Cooper', gross_weight: 44100, tare_weight: 16200, net_weight: 27900, net_weight_tons: 13.95, status: 'completed', reference_number: 'SSW-032501', notes: '', created_at: '2026-03-25T05:00:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-034', bol_number: 'BOL-2026-03-2502', date: '2026-03-25T07:00:00', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', origin: 'Tyson Madison', destination: 'Dane County WI', carrier_name: 'Great Lakes Transport', driver_name: 'Bill Murphy', gross_weight: 50100, tare_weight: 17000, net_weight: 33100, net_weight_tons: 16.55, status: 'completed', reference_number: 'TYS-032501', notes: '', created_at: '2026-03-25T06:00:00', gps_lat: 43.0731, gps_lng: -89.4012,
  },
  {
    id: 'load-035', bol_number: 'BOL-2026-03-2503', date: '2026-03-25T08:00:00', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'Frito-Lay North America', material_type: 'Snack Production Waste', origin: 'Frito-Lay Mankato', destination: 'Stearns County MN', carrier_name: 'Heartland Carriers', driver_name: 'Dave Olson', gross_weight: 48200, tare_weight: 16800, net_weight: 31400, net_weight_tons: 15.7, status: 'completed', reference_number: 'FL-032501', notes: '', created_at: '2026-03-25T07:00:00', gps_lat: 45.5579, gps_lng: -94.1632,
  },
  {
    id: 'load-036', bol_number: 'BOL-2026-03-2401', date: '2026-03-24T06:00:00', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', customer_name: 'Starbucks Coffee Co.', material_type: 'Coffee Grounds & Packaging', origin: 'Starbucks Distribution NE', destination: 'Windham County VT', carrier_name: 'New England Waste', driver_name: 'Tom Baker', gross_weight: 38600, tare_weight: 15800, net_weight: 22800, net_weight_tons: 11.4, status: 'completed', reference_number: 'SB-032401', notes: '', created_at: '2026-03-24T05:00:00', gps_lat: 42.8509, gps_lng: -72.5579,
  },
  {
    id: 'load-037', bol_number: 'BOL-2026-03-2402', date: '2026-03-24T07:00:00', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Sysco Corporation', material_type: 'Food Distribution Waste', origin: 'Sysco Denver', destination: 'Weld County CO', carrier_name: 'Rocky Mountain Haul', driver_name: 'Pat Donnelly', gross_weight: 52800, tare_weight: 17300, net_weight: 35500, net_weight_tons: 17.75, status: 'completed', reference_number: 'SYS-032401', notes: '', created_at: '2026-03-24T05:30:00', gps_lat: 40.4233, gps_lng: -104.7091,
  },
  {
    id: 'load-038', bol_number: 'BOL-2026-03-2403', date: '2026-03-24T08:30:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'PetSmart Distribution', material_type: 'Expired Pet Food', origin: 'PetSmart DC Phoenix', destination: 'Congress AZ', carrier_name: 'Desert Express', driver_name: 'Miguel Ramirez', gross_weight: 43800, tare_weight: 16300, net_weight: 27500, net_weight_tons: 13.75, status: 'completed', reference_number: 'PS-032401', notes: '', created_at: '2026-03-24T07:00:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-039', bol_number: 'BOL-2026-03-2301', date: '2026-03-23T06:30:00', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Nestle Purina PetCare', material_type: 'Pet Food Production Waste', origin: 'Purina Factory FL', destination: 'Brevard County FL', carrier_name: 'Sunshine State Hauling', driver_name: 'Alex Gonzalez', gross_weight: 49600, tare_weight: 17000, net_weight: 32600, net_weight_tons: 16.3, status: 'completed', reference_number: 'NP-032301', notes: '', created_at: '2026-03-23T05:00:00', gps_lat: 28.0836, gps_lng: -80.6081,
  },
  {
    id: 'load-040', bol_number: 'BOL-2026-03-2302', date: '2026-03-23T07:30:00', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'General Mills', material_type: 'Cereal Production Waste', origin: 'General Mills Minneapolis', destination: 'Dane County WI', carrier_name: 'Great Lakes Transport', driver_name: 'Steve Johnson', gross_weight: 51200, tare_weight: 17200, net_weight: 34000, net_weight_tons: 17.0, status: 'completed', reference_number: 'GM-032301', notes: '', created_at: '2026-03-23T06:00:00', gps_lat: 43.0731, gps_lng: -89.4012,
  },
  {
    id: 'load-041', bol_number: 'BOL-2026-03-2303', date: '2026-03-23T08:00:00', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', origin: 'Tyson Tempe Plant', destination: 'Congress AZ', carrier_name: 'Southwest Hauling', driver_name: 'Carlos Mendez', gross_weight: 47500, tare_weight: 16700, net_weight: 30800, net_weight_tons: 15.4, status: 'completed', reference_number: 'TYS-032301', notes: '', created_at: '2026-03-23T06:30:00', gps_lat: 33.3706, gps_lng: -112.6868,
  },
  {
    id: 'load-042', bol_number: 'BOL-2026-03-2304', date: '2026-03-23T09:00:00', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'Kroger Co.', material_type: 'Grocery Store Organics', origin: 'Kroger Minneapolis DC', destination: 'Stearns County MN', carrier_name: 'Heartland Carriers', driver_name: 'Eric Swanson', gross_weight: 46200, tare_weight: 16600, net_weight: 29600, net_weight_tons: 14.8, status: 'completed', reference_number: 'KR-032301', notes: '', created_at: '2026-03-23T07:30:00', gps_lat: 45.5579, gps_lng: -94.1632,
  },
];

// ─── CODs (25) ────────────────────────────────────────────────────────────────

export const cods: COD[] = [
  { id: 'cod-001', cod_number: 'COD-2026-0401', date_issued: '2026-04-01', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Soil Seed & Water', material_type: 'Compost Feedstock', tons_destroyed: 13.4, destruction_method: 'Aerobic composting — windrow process', bol_ids: ['load-010'], regulatory_reference: 'AZ DEQ Solid Waste Permit SW-4821', signed_by: 'Marcus Rivera', status: 'signed', pdf_url: null },
  { id: 'cod-002', cod_number: 'COD-2026-0402', date_issued: '2026-04-01', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', tons_destroyed: 16.4, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-011'], regulatory_reference: 'WI DNR License #1284-AD', signed_by: 'Jennifer Kowalski', status: 'signed', pdf_url: null },
  { id: 'cod-003', cod_number: 'COD-2026-0403', date_issued: '2026-04-01', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Frito-Lay North America', material_type: 'Snack Production Waste', tons_destroyed: 15.4, destruction_method: 'Anaerobic digestion — thermophilic', bol_ids: ['load-012'], regulatory_reference: 'CO CDPHE Permit #AD-7291', signed_by: 'Brian Hawkins', status: 'signed', pdf_url: null },
  { id: 'cod-004', cod_number: 'COD-2026-0404', date_issued: '2026-04-01', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Kroger Co.', material_type: 'Grocery Store Organics', tons_destroyed: 14.35, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-013'], regulatory_reference: 'FL DEP Permit #SW-0582-AD', signed_by: 'Patricia Alvarez', status: 'signed', pdf_url: null },
  { id: 'cod-005', cod_number: 'COD-2026-0405', date_issued: '2026-04-01', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'General Mills', material_type: 'Cereal Production Waste', tons_destroyed: 17.25, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-014'], regulatory_reference: 'MN PCA Permit #SW-9031', signed_by: 'Thomas Lindgren', status: 'issued', pdf_url: null },
  { id: 'cod-006', cod_number: 'COD-2026-0406', date_issued: '2026-04-01', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', customer_name: 'Starbucks Coffee Co.', material_type: 'Coffee Grounds & Packaging', tons_destroyed: 11.1, destruction_method: 'Aerobic composting — aerated static pile', bol_ids: ['load-015'], regulatory_reference: 'VT DEC Permit #WM-3847', signed_by: 'Sarah McAllister', status: 'issued', pdf_url: null },
  { id: 'cod-007', cod_number: 'COD-2026-0331A', date_issued: '2026-03-31', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'PetSmart Distribution', material_type: 'Expired Pet Food', tons_destroyed: 14.35, destruction_method: 'Aerobic composting — windrow process', bol_ids: ['load-016'], regulatory_reference: 'AZ DEQ Solid Waste Permit SW-4821', signed_by: 'Marcus Rivera', status: 'signed', pdf_url: null },
  { id: 'cod-008', cod_number: 'COD-2026-0331B', date_issued: '2026-03-31', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Sysco Corporation', material_type: 'Food Distribution Waste', tons_destroyed: 17.9, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-017'], regulatory_reference: 'WI DNR License #1284-AD', signed_by: 'Jennifer Kowalski', status: 'signed', pdf_url: null },
  { id: 'cod-009', cod_number: 'COD-2026-0331C', date_issued: '2026-03-31', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', tons_destroyed: 16.55, destruction_method: 'Anaerobic digestion — thermophilic', bol_ids: ['load-018'], regulatory_reference: 'CO CDPHE Permit #AD-7291', signed_by: 'Brian Hawkins', status: 'signed', pdf_url: null },
  { id: 'cod-010', cod_number: 'COD-2026-0330A', date_issued: '2026-03-30', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', tons_destroyed: 15.6, destruction_method: 'Aerobic composting — windrow process', bol_ids: ['load-019'], regulatory_reference: 'AZ DEQ Solid Waste Permit SW-4821', signed_by: 'Marcus Rivera', status: 'signed', pdf_url: null },
  { id: 'cod-011', cod_number: 'COD-2026-0330B', date_issued: '2026-03-30', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'Nestle Purina PetCare', material_type: 'Pet Food Production Waste', tons_destroyed: 15.9, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-020'], regulatory_reference: 'MN PCA Permit #SW-9031', signed_by: 'Thomas Lindgren', status: 'signed', pdf_url: null },
  { id: 'cod-012', cod_number: 'COD-2026-0330C', date_issued: '2026-03-30', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Whole Foods Market', material_type: 'Packaged Food Waste', tons_destroyed: 13.0, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-021'], regulatory_reference: 'FL DEP Permit #SW-0582-AD', signed_by: 'Patricia Alvarez', status: 'signed', pdf_url: null },
  { id: 'cod-013', cod_number: 'COD-2026-0329A', date_issued: '2026-03-29', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Soil Seed & Water', material_type: 'Compost Feedstock', tons_destroyed: 13.7, destruction_method: 'Aerobic composting — windrow process', bol_ids: ['load-022'], regulatory_reference: 'AZ DEQ Solid Waste Permit SW-4821', signed_by: 'Marcus Rivera', status: 'signed', pdf_url: null },
  { id: 'cod-014', cod_number: 'COD-2026-0329B', date_issued: '2026-03-29', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Kroger Co.', material_type: 'Grocery Store Organics', tons_destroyed: 15.05, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-023'], regulatory_reference: 'WI DNR License #1284-AD', signed_by: 'Jennifer Kowalski', status: 'signed', pdf_url: null },
  { id: 'cod-015', cod_number: 'COD-2026-0329C', date_issued: '2026-03-29', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', customer_name: 'Starbucks Coffee Co.', material_type: 'Coffee Grounds & Packaging', tons_destroyed: 11.6, destruction_method: 'Aerobic composting — aerated static pile', bol_ids: ['load-024'], regulatory_reference: 'VT DEC Permit #WM-3847', signed_by: 'Sarah McAllister', status: 'signed', pdf_url: null },
  { id: 'cod-016', cod_number: 'COD-2026-0328A', date_issued: '2026-03-28', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Frito-Lay North America', material_type: 'Snack Production Waste', tons_destroyed: 16.05, destruction_method: 'Anaerobic digestion — thermophilic', bol_ids: ['load-025'], regulatory_reference: 'CO CDPHE Permit #AD-7291', signed_by: 'Brian Hawkins', status: 'signed', pdf_url: null },
  { id: 'cod-017', cod_number: 'COD-2026-0328B', date_issued: '2026-03-28', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'PetSmart Distribution', material_type: 'Expired Pet Food', tons_destroyed: 13.95, destruction_method: 'Aerobic composting — windrow process', bol_ids: ['load-026'], regulatory_reference: 'AZ DEQ Solid Waste Permit SW-4821', signed_by: 'Marcus Rivera', status: 'signed', pdf_url: null },
  { id: 'cod-018', cod_number: 'COD-2026-0328C', date_issued: '2026-03-28', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Sysco Corporation', material_type: 'Food Distribution Waste', tons_destroyed: 17.1, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-027'], regulatory_reference: 'FL DEP Permit #SW-0582-AD', signed_by: 'Patricia Alvarez', status: 'signed', pdf_url: null },
  { id: 'cod-019', cod_number: 'COD-2026-0327A', date_issued: '2026-03-27', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', customer_name: 'General Mills', material_type: 'Cereal Production Waste', tons_destroyed: 16.75, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-028'], regulatory_reference: 'MN PCA Permit #SW-9031', signed_by: 'Thomas Lindgren', status: 'signed', pdf_url: null },
  { id: 'cod-020', cod_number: 'COD-2026-0327B', date_issued: '2026-03-27', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Nestle Purina PetCare', material_type: 'Pet Food Production Waste', tons_destroyed: 16.1, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-029'], regulatory_reference: 'WI DNR License #1284-AD', signed_by: 'Jennifer Kowalski', status: 'signed', pdf_url: null },
  { id: 'cod-021', cod_number: 'COD-2026-0327C', date_issued: '2026-03-27', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', tons_destroyed: 15.8, destruction_method: 'Aerobic composting — windrow process', bol_ids: ['load-030'], regulatory_reference: 'AZ DEQ Solid Waste Permit SW-4821', signed_by: 'Marcus Rivera', status: 'signed', pdf_url: null },
  { id: 'cod-022', cod_number: 'COD-2026-0326A', date_issued: '2026-03-26', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', customer_name: 'Kroger Co.', material_type: 'Grocery Store Organics', tons_destroyed: 14.65, destruction_method: 'Anaerobic digestion — thermophilic', bol_ids: ['load-031'], regulatory_reference: 'CO CDPHE Permit #AD-7291', signed_by: 'Brian Hawkins', status: 'signed', pdf_url: null },
  { id: 'cod-023', cod_number: 'COD-2026-0326B', date_issued: '2026-03-26', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', customer_name: 'Whole Foods Market', material_type: 'Packaged Food Waste', tons_destroyed: 12.8, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-032'], regulatory_reference: 'FL DEP Permit #SW-0582-AD', signed_by: 'Patricia Alvarez', status: 'signed', pdf_url: null },
  { id: 'cod-024', cod_number: 'COD-2026-0325A', date_issued: '2026-03-25', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', customer_name: 'Soil Seed & Water', material_type: 'Compost Feedstock', tons_destroyed: 13.95, destruction_method: 'Aerobic composting — windrow process', bol_ids: ['load-033'], regulatory_reference: 'AZ DEQ Solid Waste Permit SW-4821', signed_by: 'Marcus Rivera', status: 'signed', pdf_url: null },
  { id: 'cod-025', cod_number: 'COD-2026-0325B', date_issued: '2026-03-25', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', customer_name: 'Tyson Foods Inc.', material_type: 'Poultry Processing Waste', tons_destroyed: 16.55, destruction_method: 'Anaerobic digestion — mesophilic', bol_ids: ['load-034'], regulatory_reference: 'WI DNR License #1284-AD', signed_by: 'Jennifer Kowalski', status: 'signed', pdf_url: null },
];

// ─── Notifications (15) ──────────────────────────────────────────────────────

export const notifications: Notification[] = [
  { id: 'notif-001', type: 'diversion', title: 'Load Diverted — Nestle Purina', message: 'BOL-2026-04-0108 diverted from Henrico VA to Brevard FL due to facility maintenance. Storage charges of $2,400/day may apply.', facility_id: 'fac-005', facility_name: 'Henrico County VA — Atlantic Depackaging', timestamp: '2026-04-01T14:32:00', read: false, priority: 'critical' },
  { id: 'notif-002', type: 'diversion', title: 'Load Diverted — Whole Foods', message: 'BOL-2026-04-0109 diverted from Henrico VA to Space Coast FL. Holiday weekend — extended storage charges apply.', facility_id: 'fac-005', facility_name: 'Henrico County VA — Atlantic Depackaging', timestamp: '2026-04-01T15:48:00', read: false, priority: 'critical' },
  { id: 'notif-003', type: 'capacity_alert', title: 'Capacity Warning — Green Mountain VT', message: 'Windham County VT at 91% utilization. Recommend diverting non-priority loads to Dane County WI (72% util).', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', timestamp: '2026-04-02T06:00:00', read: false, priority: 'high' },
  { id: 'notif-004', type: 'compliance', title: 'EPA Air Report Due — Front Range CO', message: 'Q1 2026 EPA Air Emissions Report due April 15. Status: In Progress. Assigned to Brian Hawkins.', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', timestamp: '2026-04-02T07:00:00', read: false, priority: 'high' },
  { id: 'notif-005', type: 'load_arrival', title: 'Load Arrived — PetSmart', message: 'BOL-2026-04-0203 arrived at Congress AZ scale house. Driver: Miguel Ramirez. Net weight: 14.1 tons.', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', timestamp: '2026-04-02T08:15:00', read: false, priority: 'medium' },
  { id: 'notif-006', type: 'payment', title: 'Payment Received — Nestle Purina', message: 'Invoice INV-2026-0312 paid in full ($48,750.00). Net 15 terms met.', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', timestamp: '2026-04-01T16:30:00', read: true, priority: 'medium' },
  { id: 'notif-007', type: 'cod_ready', title: 'COD Ready for Signature — Tyson', message: 'COD-2026-0402 generated for 16.4 tons poultry processing waste at Dane County WI. Awaiting facility manager signature.', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', timestamp: '2026-04-01T17:00:00', read: true, priority: 'low' },
  { id: 'notif-008', type: 'capacity_alert', title: 'Capacity Update — Congress AZ', message: 'Congress AZ utilization at 87%. Two loads scheduled for tomorrow. Monitor closely.', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', timestamp: '2026-04-01T18:00:00', read: true, priority: 'high' },
  { id: 'notif-009', type: 'load_arrival', title: 'Load Weighed — Kroger', message: 'BOL-2026-04-0205 weighed at Weld County CO. Gross: 46,300 lbs, Tare: 16,600 lbs, Net: 14.85 tons.', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', timestamp: '2026-04-02T09:00:00', read: false, priority: 'low' },
  { id: 'notif-010', type: 'compliance', title: 'NPDES Permit Renewal — Space Coast FL', message: 'Annual NPDES water discharge permit renewal due May 1. Begin preparation.', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', timestamp: '2026-04-01T09:00:00', read: true, priority: 'medium' },
  { id: 'notif-011', type: 'payment', title: 'Invoice Overdue — Frito-Lay', message: 'Invoice INV-2026-0298 ($8,920.00) is 15 days past due. Payment terms: Net 30. Contact James Park.', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', timestamp: '2026-04-01T08:00:00', read: true, priority: 'high' },
  { id: 'notif-012', type: 'load_arrival', title: 'Load Processing — Starbucks', message: 'BOL-2026-04-0207 now processing at Windham County VT, Bay 3. Estimated completion: 2 hours.', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', timestamp: '2026-04-02T09:30:00', read: false, priority: 'low' },
  { id: 'notif-013', type: 'compliance', title: 'SB 1383 Quarterly Report — Congress AZ', message: 'California SB 1383 diversion report template available. Due April 30 for Q1 data.', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', timestamp: '2026-03-31T10:00:00', read: true, priority: 'medium' },
  { id: 'notif-014', type: 'cod_ready', title: 'COD Batch Ready — March Week 4', message: '6 CODs generated for March 24-28 loads. Ready for review and customer distribution.', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', timestamp: '2026-03-29T16:00:00', read: true, priority: 'low' },
  { id: 'notif-015', type: 'capacity_alert', title: 'Construction Update — Pacific NW OR', message: 'Clackamas County OR facility at 45% build-out. Phase 1 composting bays on track for June completion.', facility_id: 'fac-007', facility_name: 'Clackamas County OR — Pacific Northwest Organics', timestamp: '2026-03-28T14:00:00', read: true, priority: 'low' },
];

// ─── Invoices (8) ─────────────────────────────────────────────────────────────

export const invoices: Invoice[] = [
  {
    id: 'inv-001', invoice_number: 'INV-2026-0401', customer_id: 'cust-001', customer_name: 'Tyson Foods Inc.', facility_id: 'fac-001', date: '2026-04-01', due_date: '2026-05-01', status: 'sent',
    line_items: [
      { description: 'Poultry Processing Waste — composting (15.6 tons)', tons: 15.6, rate: 48.00, amount: 748.80 },
      { description: 'Poultry Processing Waste — composting (15.8 tons)', tons: 15.8, rate: 48.00, amount: 758.40 },
      { description: 'Poultry Processing Waste — composting (15.4 tons)', tons: 15.4, rate: 48.00, amount: 739.20 },
    ],
    subtotal: 2246.40, tax: 0, total: 2246.40, payment_date: null,
  },
  {
    id: 'inv-002', invoice_number: 'INV-2026-0402', customer_id: 'cust-009', customer_name: 'Sysco Corporation', facility_id: 'fac-002', date: '2026-04-01', due_date: '2026-05-16', status: 'sent',
    line_items: [
      { description: 'Food Distribution Waste — AD processing (17.9 tons)', tons: 17.9, rate: 52.00, amount: 930.80 },
      { description: 'Food Distribution Waste — AD processing (17.75 tons)', tons: 17.75, rate: 52.00, amount: 923.00 },
    ],
    subtotal: 1853.80, tax: 0, total: 1853.80, payment_date: null,
  },
  {
    id: 'inv-003', invoice_number: 'INV-2026-0312', customer_id: 'cust-003', customer_name: 'Nestle Purina PetCare', facility_id: 'fac-003', date: '2026-03-12', due_date: '2026-03-27', status: 'paid',
    line_items: [
      { description: 'Pet Food Production Waste — March batch (937.5 tons)', tons: 937.5, rate: 52.00, amount: 48750.00 },
    ],
    subtotal: 48750.00, tax: 0, total: 48750.00, payment_date: '2026-04-01',
  },
  {
    id: 'inv-004', invoice_number: 'INV-2026-0298', customer_id: 'cust-004', customer_name: 'Frito-Lay North America', facility_id: 'fac-008', date: '2026-03-01', due_date: '2026-03-31', status: 'overdue',
    line_items: [
      { description: 'Snack Production Waste — AD processing (171.5 tons)', tons: 171.5, rate: 52.00, amount: 8918.00 },
    ],
    subtotal: 8918.00, tax: 0, total: 8918.00, payment_date: null,
  },
  {
    id: 'inv-005', invoice_number: 'INV-2026-0315', customer_id: 'cust-005', customer_name: 'General Mills', facility_id: 'fac-003', date: '2026-03-15', due_date: '2026-04-14', status: 'sent',
    line_items: [
      { description: 'Cereal Production Waste — AD processing (102.4 tons)', tons: 102.4, rate: 52.00, amount: 5324.80 },
    ],
    subtotal: 5324.80, tax: 0, total: 5324.80, payment_date: null,
  },
  {
    id: 'inv-006', invoice_number: 'INV-2026-0320', customer_id: 'cust-007', customer_name: 'Whole Foods Market', facility_id: 'fac-006', date: '2026-03-20', due_date: '2026-04-19', status: 'sent',
    line_items: [
      { description: 'Packaged Food Waste — AD processing (64.2 tons)', tons: 64.2, rate: 55.00, amount: 3531.00 },
      { description: 'Diversion surcharge — holiday rerouting', tons: 13.8, rate: 15.00, amount: 207.00 },
    ],
    subtotal: 3738.00, tax: 0, total: 3738.00, payment_date: null,
  },
  {
    id: 'inv-007', invoice_number: 'INV-2026-0325', customer_id: 'cust-008', customer_name: 'Kroger Co.', facility_id: 'fac-008', date: '2026-03-25', due_date: '2026-04-24', status: 'sent',
    line_items: [
      { description: 'Grocery Store Organics — AD + composting (88.7 tons)', tons: 88.7, rate: 50.00, amount: 4435.00 },
    ],
    subtotal: 4435.00, tax: 0, total: 4435.00, payment_date: null,
  },
  {
    id: 'inv-008', invoice_number: 'INV-2026-0403', customer_id: 'cust-010', customer_name: 'Soil Seed & Water', facility_id: 'fac-001', date: '2026-04-02', due_date: '2026-04-17', status: 'draft',
    line_items: [
      { description: 'Compost Feedstock — windrow composting (41.05 tons)', tons: 41.05, rate: 48.00, amount: 1970.40 },
    ],
    subtotal: 1970.40, tax: 0, total: 1970.40, payment_date: null,
  },
];

// ─── Compliance Reports (10) ─────────────────────────────────────────────────

export const complianceReports: ComplianceReport[] = [
  { id: 'comp-001', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', report_type: 'epa_air', period: 'Q1 2026', due_date: '2026-04-15', status: 'in_progress', submitted_date: null },
  { id: 'comp-002', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', report_type: 'npdes_water', period: 'Annual 2025', due_date: '2026-05-01', status: 'upcoming', submitted_date: null },
  { id: 'comp-003', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', report_type: 'sb1383_diversion', period: 'Q1 2026', due_date: '2026-04-30', status: 'upcoming', submitted_date: null },
  { id: 'comp-004', facility_id: 'fac-002', facility_name: 'Dane County WI — Midwest Biogas', report_type: 'solid_waste', period: 'Q1 2026', due_date: '2026-04-15', status: 'in_progress', submitted_date: null },
  { id: 'comp-005', facility_id: 'fac-003', facility_name: 'Stearns County MN — Northern Plains AD', report_type: 'epa_air', period: 'Q1 2026', due_date: '2026-04-15', status: 'submitted', submitted_date: '2026-04-01' },
  { id: 'comp-006', facility_id: 'fac-004', facility_name: 'Windham County VT — Green Mountain Compost', report_type: 'monthly_tonnage', period: 'March 2026', due_date: '2026-04-10', status: 'submitted', submitted_date: '2026-04-02' },
  { id: 'comp-007', facility_id: 'fac-001', facility_name: 'Congress AZ — Maricopa Organics', report_type: 'solid_waste', period: 'Q1 2026', due_date: '2026-04-15', status: 'in_progress', submitted_date: null },
  { id: 'comp-008', facility_id: 'fac-008', facility_name: 'Weld County CO — Front Range Biogas', report_type: 'monthly_tonnage', period: 'March 2026', due_date: '2026-04-10', status: 'approved', submitted_date: '2026-03-28' },
  { id: 'comp-009', facility_id: 'fac-006', facility_name: 'Brevard County FL — Space Coast Renewables', report_type: 'solid_waste', period: 'Q1 2026', due_date: '2026-04-15', status: 'in_progress', submitted_date: null },
  { id: 'comp-010', facility_id: 'fac-005', facility_name: 'Henrico County VA — Atlantic Depackaging', report_type: 'epa_air', period: 'Q1 2026', due_date: '2026-04-15', status: 'upcoming', submitted_date: null },
];

// ─── Dispatch Events (20) ────────────────────────────────────────────────────

export const dispatchEvents: DispatchEvent[] = [
  { id: 'evt-001', load_id: 'load-001', event_type: 'dispatched', timestamp: '2026-04-02T06:15:00', description: 'Load dispatched — Tyson Tempe to Congress AZ', facility_name: 'Congress AZ — Maricopa Organics' },
  { id: 'evt-002', load_id: 'load-001', event_type: 'gps_update', timestamp: '2026-04-02T08:30:00', description: 'GPS update — I-10 westbound, ETA 10:30 AM', facility_name: 'Congress AZ — Maricopa Organics' },
  { id: 'evt-003', load_id: 'load-003', event_type: 'arrival', timestamp: '2026-04-02T08:15:00', description: 'Arrived at scale house — PetSmart load', facility_name: 'Congress AZ — Maricopa Organics' },
  { id: 'evt-004', load_id: 'load-004', event_type: 'delay', timestamp: '2026-04-02T09:00:00', description: 'Highway delay — Sysco load ETA pushed to 1 PM', facility_name: 'Brevard County FL — Space Coast Renewables' },
  { id: 'evt-005', load_id: 'load-005', event_type: 'weighed', timestamp: '2026-04-02T08:45:00', description: 'Weigh-in complete — 14.85 tons net', facility_name: 'Weld County CO — Front Range Biogas' },
  { id: 'evt-006', load_id: 'load-007', event_type: 'processing', timestamp: '2026-04-02T09:30:00', description: 'Processing started — Bay 3, est. 2 hours', facility_name: 'Windham County VT — Green Mountain Compost' },
  { id: 'evt-007', load_id: 'load-008', event_type: 'diverted', timestamp: '2026-04-01T14:32:00', description: 'DIVERTED — Facility maintenance at Henrico VA. Rerouting to Brevard FL.', facility_name: 'Henrico County VA — Atlantic Depackaging' },
  { id: 'evt-008', load_id: 'load-009', event_type: 'diverted', timestamp: '2026-04-01T15:48:00', description: 'DIVERTED — Whole Foods load rerouted. Holiday weekend storage charges.', facility_name: 'Henrico County VA — Atlantic Depackaging' },
  { id: 'evt-009', load_id: 'load-010', event_type: 'completed', timestamp: '2026-04-01T14:00:00', description: 'Processing complete — COD issued for SSW feedstock', facility_name: 'Congress AZ — Maricopa Organics' },
  { id: 'evt-010', load_id: 'load-011', event_type: 'completed', timestamp: '2026-04-01T15:30:00', description: 'Processing complete — COD issued for Tyson poultry waste', facility_name: 'Dane County WI — Midwest Biogas' },
  { id: 'evt-011', load_id: 'load-002', event_type: 'scheduled', timestamp: '2026-04-01T16:00:00', description: 'Load scheduled — General Mills pickup confirmed 7 AM', facility_name: 'Dane County WI — Midwest Biogas' },
  { id: 'evt-012', load_id: 'load-006', event_type: 'scheduled', timestamp: '2026-04-01T14:00:00', description: 'Load scheduled — Frito-Lay Mankato pickup', facility_name: 'Stearns County MN — Northern Plains AD' },
  { id: 'evt-013', load_id: 'load-012', event_type: 'completed', timestamp: '2026-04-01T16:00:00', description: 'Processing complete — Frito-Lay waste processed at Front Range', facility_name: 'Weld County CO — Front Range Biogas' },
  { id: 'evt-014', load_id: 'load-013', event_type: 'completed', timestamp: '2026-04-01T16:30:00', description: 'Processing complete — Kroger organics processed', facility_name: 'Brevard County FL — Space Coast Renewables' },
  { id: 'evt-015', load_id: 'load-014', event_type: 'completed', timestamp: '2026-04-01T17:00:00', description: 'Processing complete — General Mills cereal waste', facility_name: 'Stearns County MN — Northern Plains AD' },
  { id: 'evt-016', load_id: 'load-015', event_type: 'completed', timestamp: '2026-04-01T17:30:00', description: 'Processing complete — Starbucks coffee grounds composted', facility_name: 'Windham County VT — Green Mountain Compost' },
  { id: 'evt-017', load_id: 'load-001', event_type: 'checkpoint', timestamp: '2026-04-02T07:45:00', description: 'Driver checkpoint — fuel stop at Buckeye Travel Center', facility_name: 'Congress AZ — Maricopa Organics' },
  { id: 'evt-018', load_id: 'load-004', event_type: 'dispatched', timestamp: '2026-04-02T08:00:00', description: 'Load dispatched — Sysco Jacksonville to Brevard FL', facility_name: 'Brevard County FL — Space Coast Renewables' },
  { id: 'evt-019', load_id: 'load-005', event_type: 'arrival', timestamp: '2026-04-02T08:30:00', description: 'Arrived at facility — Kroger load at Front Range', facility_name: 'Weld County CO — Front Range Biogas' },
  { id: 'evt-020', load_id: 'load-003', event_type: 'weighed', timestamp: '2026-04-02T08:45:00', description: 'Weigh-in started — PetSmart load at Congress AZ', facility_name: 'Congress AZ — Maricopa Organics' },
];

// ─── Chart Data ──────────────────────────────────────────────────────────────

export const monthlyTonnageData = [
  { month: 'Oct', tons: 1420 },
  { month: 'Nov', tons: 1580 },
  { month: 'Dec', tons: 1340 },
  { month: 'Jan', tons: 1710 },
  { month: 'Feb', tons: 1890 },
  { month: 'Mar', tons: 2240 },
  { month: 'Apr', tons: 680 },
];

export const facilityUtilizationData = facilities
  .filter((f) => f.status !== 'construction')
  .map((f) => ({
    name: f.name.split('—')[0].trim(),
    utilization: f.current_utilization_pct,
    capacity: f.capacity_tons_per_day,
  }));

export const materialBreakdownData = [
  { name: 'Poultry Processing', value: 28, color: '#10b981' },
  { name: 'Food Distribution', value: 18, color: '#059669' },
  { name: 'Pet Food / Returns', value: 15, color: '#34d399' },
  { name: 'Snack Production', value: 14, color: '#6ee7b7' },
  { name: 'Grocery Organics', value: 12, color: '#a7f3d0' },
  { name: 'Coffee Grounds', value: 8, color: '#d1fae5' },
  { name: 'Compost Feedstock', value: 5, color: '#ecfdf5' },
];

export const revenueData = [
  { month: 'Oct', revenue: 68400 },
  { month: 'Nov', revenue: 74200 },
  { month: 'Dec', revenue: 62800 },
  { month: 'Jan', revenue: 81500 },
  { month: 'Feb', revenue: 89300 },
  { month: 'Mar', revenue: 104600 },
  { month: 'Apr', revenue: 32400 },
];
