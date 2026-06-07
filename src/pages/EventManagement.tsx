import React, { useState, useEffect } from 'react';
import { GlassCard, Badge } from '../components/Common';
import { Calendar, Search, Filter, CheckCircle2, XCircle, Eye, AlertCircle, Trash2 } from 'lucide-react';
import { formatDate, formatCurrency } from '../lib/utils';
import api from '../services/api';
import { Event } from '../types';

export const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/admin/events');
      const eventsData = res.data;
      setEvents(
        Array.isArray(eventsData)
          ? eventsData
          : eventsData.events || eventsData.data || []
      );
    } catch (err: any) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = Array.isArray(events)
    ? events.filter(ev => 
        (ev.event_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (ev.organizer_id?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      )
    : [];

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${id}`);
        fetchEvents();
      } catch (err: any) {
        alert('Failed to delete event');
      }
    }
  };

  const handleViewDetails = (title: string) => {
    alert(`Viewing details for ${title}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-heading">Event Monitoring</h1>
          <p className="text-text-subtitle font-medium">Track budgets, vendors, and status across all events.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg font-bold">
          Failed to load events.<br/>Please login again.
        </div>
      )}

      <div className="bg-white dark:bg-white/5 p-4 rounded-3xl border border-divider flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="input-field pl-12 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-text-secondary animate-pulse">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="col-span-full p-8 text-center text-text-secondary">No events found.</div>
        ) : filteredEvents.map((event) => (
          <GlassCard key={event.id} className="flex flex-col h-full border-t-4 border-t-primary">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Calendar size={24} />
              </div>
              <Badge variant="info">
                Active
              </Badge>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold leading-tight text-text-heading">{event.event_name}</h3>
                <p className="text-sm text-text-secondary mt-1 font-medium">Organizer ID: {event.organizer_id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-divider">
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Budget</p>
                  <p className="font-bold text-lg text-text-heading">₹{event.budget?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Type</p>
                  <p className="font-bold text-text-heading">{event.event_type}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Date</p>
                  <p className="font-bold text-text-heading">{formatDate(event.event_date)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Location</p>
                  <p className="font-bold text-text-heading truncate">{event.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button 
                className="flex-1 py-3 text-xs font-bold uppercase tracking-widest bg-bg-main rounded-xl hover:bg-black/5 transition-all flex items-center justify-center gap-2 text-text-heading"
                onClick={() => handleViewDetails(event.event_name)}
              >
                <Eye size={16} />
                Details
              </button>
              <button 
                className="px-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all"
                onClick={() => handleDeleteEvent(event.id)}
                title="Delete Event"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
