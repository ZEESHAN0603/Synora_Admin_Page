import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { GlassCard, Badge } from '../components/Common';
import { formatDate, formatCurrency } from '../lib/utils';
import api from '../services/api';
import { Booking } from '../types';

export const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Maps for fallback if backend doesn't return joined names
  const [eventMap, setEventMap] = useState<Record<string, string>>({});
  const [vendorMap, setVendorMap] = useState<Record<string, {name: string, category: string}>>({});

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch bookings, events, and vendors in parallel for fallback mapping
      const [res, eventsRes, vendorsRes, catRes] = await Promise.all([
        api.get('/admin/bookings'),
        api.get('/admin/events').catch(() => ({ data: [] })),
        api.get('/admin/vendors').catch(() => ({ data: [] })),
        api.get('/categories').catch(() => ({ data: [] }))
      ]);
      
      const bookingsData = res.data;
      setBookings(
        Array.isArray(bookingsData)
          ? bookingsData
          : bookingsData.bookings || bookingsData.data || []
      );
      
      // Build maps
      const eMap: Record<string, string> = {};
      if (Array.isArray(eventsRes.data)) {
        eventsRes.data.forEach((e: any) => eMap[e.id] = e.event_name);
      }
      setEventMap(eMap);
      
      const cMap: Record<string, string> = {};
      if (Array.isArray(catRes.data)) {
        catRes.data.forEach((c: any) => cMap[c.id] = c.name);
      }
      
      const vMap: Record<string, {name: string, category: string}> = {};
      if (Array.isArray(vendorsRes.data)) {
        vendorsRes.data.forEach((v: any) => {
          vMap[v.id] = {
            name: v.business_name,
            category: cMap[v.category_id] || v.category_id
          };
        });
      }
      setVendorMap(vMap);
      
    } catch (err: any) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = Array.isArray(bookings)
    ? bookings.filter(b => {
        const searchTarget = searchTerm.toLowerCase();
        const eName = b.event_name || eventMap[b.event_id] || b.event_id || '';
        const vName = b.vendor_name || vendorMap[b.vendor_id]?.name || b.vendor_id || '';
        
        const eventMatch = eName.toLowerCase().includes(searchTarget);
        const vendorMatch = vName.toLowerCase().includes(searchTarget);
        const statusMatch = statusFilter === 'all' || b.booking_status === statusFilter;
        return (eventMatch || vendorMatch) && statusMatch;
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-heading">Booking Management</h1>
          <p className="text-text-subtitle font-medium">Monitor all event vendor bookings and their current statuses.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg font-bold">
          Failed to load bookings.<br/>Please login again.
        </div>
      )}

      <GlassCard className="!p-0 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-divider flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search by event or vendor name..." 
              className="input-field pl-12 py-2 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-bg-main px-3 py-1.5 rounded-xl border border-divider">
              <Filter size={16} className="text-text-secondary" />
              <select 
                className="bg-transparent text-sm font-bold outline-none border-none pr-4"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-text-secondary animate-pulse">Loading bookings...</div>
          ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main border-b border-divider">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Event Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Total Amount</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-5">
                    <span className="font-bold text-text-heading">{b.event_name || eventMap[b.event_id] || b.event_id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-text-heading">₹{b.total_amount?.toLocaleString() ?? 0}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium opacity-70">{formatDate(b.created_at)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={
                      b.booking_status === 'confirmed' ? 'success' : 
                      b.booking_status === 'rejected' || b.booking_status === 'cancelled' ? 'error' : 
                      'warning'
                    }>
                      {b.booking_status}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-secondary">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
