import React from 'react';
import { motion } from 'motion/react';
import { GlassCard, Badge } from '../components/Common';
import { MoreVertical, Search, Filter, Ban, Trash2, Mail, ExternalLink } from 'lucide-react';

const ORGANIZERS_MOCK = [
  { id: '1', name: 'Ravi Kumar', email: 'ravi@chennaievent.com', events: 3, spending: 45000, status: 'active' },
  { id: '2', name: 'Anitha Raj', email: 'anitha@kovaihalls.com', events: 1, spending: 8500, status: 'active' },
  { id: '3', name: 'Muthu Swamy', email: 'muthu@maduraievent.com', events: 2, spending: 12000, status: 'active' },
];

export const OrganizerManagement: React.FC = () => {
  const [organizers, setOrganizers] = React.useState(ORGANIZERS_MOCK);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredOrganizers = organizers.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrganizer = () => {
    const name = window.prompt('Organizer Name:');
    if (!name) return;
    const email = window.prompt('Email Address:');
    if (!email) return;

    const newOrg = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        events: 0,
        spending: 0,
        status: 'active' as any
    };

    setOrganizers([newOrg, ...organizers]);
  };

  const handleToggleStatus = (id: string) => {
    setOrganizers(prev => prev.map(org => 
      org.id === id ? { ...org, status: org.status === 'active' ? 'suspended' : 'active' } : org
    ));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this organizer?')) {
      setOrganizers(prev => prev.filter(org => org.id !== id));
    }
  };

  const handleSendMail = (email: string) => {
    window.location.href = `mailto:${email}?subject=Synora Support`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-heading">Organizers</h1>
          <p className="text-text-subtitle font-medium">Manage event creators and monitor their platform activity in Tamil Nadu.</p>
        </div>
        <button className="btn-primary py-2 px-6" onClick={handleAddOrganizer}>
          Create New Organizer
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <GlassCard className="!p-0">
          <div className="p-4 md:p-6 border-b border-divider flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                className="input-field pl-12 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 hover:bg-black/5 rounded-xl transition-all border border-divider">
              <Filter size={20} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-main">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Organizer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Events Created</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Total Spending</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {filteredOrganizers.map((org) => (
                  <tr key={org.id} className="hover:bg-primary/5 transition-all group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {org.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-text-heading">{org.name}</p>
                          <p className="text-xs text-text-secondary mt-0.5">{org.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-text-heading">{org.events}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-bold text-text-heading">₹{org.spending.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant={org.status === 'active' ? 'success' : 'error'}>{org.status}</Badge>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="p-2 hover:bg-primary/10 text-primary rounded-lg" 
                          title="Send Email"
                          onClick={() => handleSendMail(org.email)}
                        >
                          <Mail size={18} />
                        </button>
                        <button 
                          className={`p-2 rounded-lg transition-colors ${org.status === 'active' ? 'hover:bg-black/5' : 'bg-red-500/10 text-red-500'}`} 
                          title={org.status === 'active' ? "Suspend" : "Activate"}
                          onClick={() => handleToggleStatus(org.id)}
                        >
                          <Ban size={18} />
                        </button>
                        <button 
                          className="p-2 hover:bg-rose-500/10 text-rose-500 rounded-lg" 
                          title="Delete"
                          onClick={() => handleDelete(org.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      {/* Mobile Card Layout for Organizers */}
      <div className="md:hidden space-y-4 px-4 pb-20">
        {filteredOrganizers.map((org) => (
          <GlassCard key={org.id} className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                  {org.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-text-heading">{org.name}</h4>
                  <p className="text-sm text-text-secondary">{org.email}</p>
                </div>
              </div>
              <Badge variant={org.status === 'active' ? 'success' : 'error'}>{org.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-divider">
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Events</p>
                <p className="font-bold text-text-heading">{org.events}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-text-secondary">Spending</p>
                <p className="font-bold text-text-heading">₹{org.spending.toLocaleString()}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
