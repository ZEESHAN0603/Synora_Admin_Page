export interface Vendor {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  status: 'pending' | 'approved' | 'blocked';
  active: boolean;
  createdAt: string;
}

export interface Organizer {
  id: string;
  name: string;
  email: string;
  eventsCreated: number;
  totalSpending: number;
  active: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  organizerName: string;
  eventType: string;
  budget: number;
  status: 'pending' | 'active' | 'cancelled' | 'completed';
  date: string;
  vendorCount: number;
}

export interface DashboardStats {
  totalVendors: number;
  totalOrganizers: number;
  activeEvents: number;
  revenue: number;
  pendingApprovals: number;
}
