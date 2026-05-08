import React from 'react';
import { GlassCard, Badge } from '../components/Common';
import { Calendar, Search, Filter, CheckCircle2, XCircle, Eye, AlertCircle } from 'lucide-react';
import { formatDate, formatCurrency } from '../lib/utils';

const EVENTS_MOCK = [
  { id: '1', title: 'Traditional Wedding (Chennai)', organizer: 'Ravi Kumar', type: 'Wedding', budget: 500000, status: 'active', date: '2024-05-20', vendors: 4 },
  { id: '2', title: 'Temple Festival (Madurai)', organizer: 'Muthu Swamy', type: 'Festival', budget: 150000, status: 'pending', date: '2024-06-15', vendors: 2 },
  { id: '3', title: 'Arangetram Perform (Coimbatore)', organizer: 'Anitha Raj', type: 'Classical', budget: 80000, status: 'active', date: '2024-07-10', vendors: 3 },
  { id: '4', title: 'Corporate Meet (Trichy)', organizer: 'Kavitha Mani', type: 'Corporate', budget: 200000, status: 'completed', date: '2024-04-22', vendors: 6 },
  { id: '5', title: 'Music Concert (Salem)', organizer: 'Srinivasan', type: 'Concert', budget: 150000, status: 'pending', date: '2024-08-05', vendors: 0 },
];

export const EventManagement: React.FC = () => {
  const [events, setEvents] = React.useState(EVENTS_MOCK);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredEvents = events.filter(ev => 
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setEvents(prev => prev.map(ev => ev.id === id ? { ...ev, status: newStatus } : ev));
  };

  const handleAddEvent = () => {
    const title = window.prompt('Event Title:');
    if (!title) return;
    const organizer = window.prompt('Organizer Name:');
    if (!organizer) return;
    
    const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        organizer,
        type: 'General',
        budget: 45000,
        status: 'pending' as any,
        date: new Date().toISOString().split('T')[0],
        vendors: 0
    };
    
    setEvents([newEvent, ...events]);
  };

  const handleViewDetails = (title: string) => {
    alert(`Viewing details for ${title}...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-heading">Event Monitoring</h1>
          <p className="text-text-subtitle font-medium">Track budgets, vendors, and status across all Tamil Nadu events.</p>
        </div>
        <button className="btn-primary py-2 px-6" onClick={handleAddEvent}>
          Create New Event
        </button>
      </div>

      <div className="bg-white dark:bg-white/5 p-4 rounded-3xl border border-divider flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search events or organizers..." 
            className="input-field pl-12 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <GlassCard key={event.id} className="flex flex-col h-full border-t-4 border-t-primary">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                <Calendar size={24} />
              </div>
              <Badge variant={event.status === 'active' ? 'info' : event.status === 'completed' ? 'success' : event.status === 'pending' ? 'warning' : 'error'}>
                {event.status}
              </Badge>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold leading-tight text-text-heading">{event.title}</h3>
                <p className="text-sm text-text-secondary mt-1 font-medium">Organizer: {event.organizer}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-divider">
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Budget</p>
                  <p className="font-bold text-lg text-text-heading">₹{event.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Type</p>
                  <p className="font-bold text-text-heading">{event.type}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Date</p>
                  <p className="font-bold text-text-heading">{formatDate(event.date)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-text-secondary mb-1">Vendors</p>
                  <p className="font-bold text-text-heading">{event.vendors} Providers</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button 
                className="flex-1 py-3 text-xs font-bold uppercase tracking-widest bg-bg-main rounded-xl hover:bg-black/5 transition-all flex items-center justify-center gap-2 text-text-heading"
                onClick={() => handleViewDetails(event.title)}
              >
                <Eye size={16} />
                Details
              </button>
              {event.status === 'pending' && (
                <button 
                  className="px-4 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all"
                  onClick={() => handleUpdateStatus(event.id, 'active')}
                  title="Approve Event"
                >
                  <CheckCircle2 size={20} />
                </button>
              )}
              {event.status === 'active' && (
                <button 
                  className="px-4 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all"
                  onClick={() => handleUpdateStatus(event.id, 'cancelled')}
                  title="Cancel Event"
                >
                  <XCircle size={20} />
                </button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
