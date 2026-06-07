export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  city?: string;
  created_at: string;
}

export interface Vendor {
  id: string;
  user_id: string;
  category_id: string;
  business_name: string;
  description: string;
  location: string;
  base_price_min: number;
  base_price_max: number;
  gst_number: string;
  portfolio_url?: string;
  rating: number;
  total_reviews: number;
  approved: boolean;
  approval_status: string;
  approved_by?: number;
  approved_at?: string;
  rejection_reason?: string;
  created_at: string;
}

export interface Event {
  id: string;
  organizer_id: string;
  event_name: string;
  event_type: string;
  event_date: string;
  location: string;
  budget: number;
  guest_count: number;
  description?: string;
  created_at: string;
}

export interface Booking {
  id: string;
  event_id: string;
  vendor_id: string;
  organizer_id: string;
  booking_status: string;
  total_amount: number;
  notes?: string;
  rejection_reason?: string;
  created_at: string;
  event_name?: string;
  vendor_name?: string;
  vendor_category?: string;
}

export interface DashboardStats {
  total_users: number;
  total_vendors: number;
  total_events: number;
  total_bookings: number;
  pending_vendors: number;
}
