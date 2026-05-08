import React, { useState } from 'react';
import { Search, Filter, MoreVertical, CheckCircle2, XCircle, Ban, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassCard, Badge } from '../components/Common';
import { cn } from '../lib/utils';

const VENDORS_MOCK = [
  { id: '1', name: 'Saravana Mandapam', category: 'Venue', city: 'Chennai', rating: 4.8, status: 'approved', active: true },
  { id: '2', name: 'Madurai Marry Decor', category: 'Decor', city: 'Madurai', rating: 4.5, status: 'pending', active: true },
  { id: '3', name: 'Annapoorna Catering', category: 'Catering', city: 'Coimbatore', rating: 4.9, status: 'approved', active: true },
  { id: '4', name: 'Trichy Lights & Sound', category: 'Sound', city: 'Trichy', rating: 4.2, status: 'blocked', active: false },
  { id: '5', name: 'Salem Security Guard', category: 'Services', city: 'Salem', rating: 4.7, status: 'approved', active: true },
];

export const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState(VENDORS_MOCK);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVendors = vendors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (statusFilter === 'all' || v.status === statusFilter)
  );

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: newStatus } : v));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setVendors(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleAddVendor = () => {
    const name = window.prompt('Vendor Name:');
    if (!name) return;
    const city = window.prompt('City:', 'Chennai');
    if (!city) return;
    
    const newVendor = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      category: 'General',
      city,
      rating: 5.0,
      status: 'pending',
      active: true
    };
    
    setVendors([newVendor, ...vendors]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
          <p className="text-text-subtitle font-medium">Verify, approve, and monitor your platform's service providers.</p>
        </div>
        <button className="btn-primary py-2 px-6" onClick={handleAddVendor}>
          Add New Vendor
        </button>
      </div>

      <GlassCard className="!p-0 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 md:p-6 border-b border-divider flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search vendors by name..." 
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
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main border-b border-divider">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Vendor Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Location</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Rating</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Activity</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {filteredVendors.map((v) => (
                <tr key={v.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary uppercase">
                        {v.name.charAt(0)}
                      </div>
                      <span className="font-bold text-text-heading">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium opacity-70">{v.category}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium opacity-70">{v.city}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold">{v.rating}</span>
                      <div className="flex text-amber-500">
                        {Array.from({ length: 1 }).map((_, i) => <CheckCircle2 key={i} size={14} fill="currentColor" />)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={v.status === 'approved' ? 'success' : v.status === 'blocked' ? 'error' : 'warning'}>
                      {v.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", v.active ? "bg-emerald-500" : "bg-rose-500")} />
                      <span className="text-xs font-bold uppercase">{v.active ? 'Active' : 'Offline'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {v.status === 'pending' && (
                        <button 
                          className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg" 
                          title="Approve"
                          onClick={() => handleUpdateStatus(v.id, 'approved')}
                        >
                          <CheckCircle2 size={18} />
                        </button>
                      )}
                      {v.status !== 'blocked' && (
                        <button 
                          className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-lg" 
                          title="Block"
                          onClick={() => handleUpdateStatus(v.id, 'blocked')}
                        >
                          <Ban size={18} />
                        </button>
                      )}
                      <button 
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg" 
                        title="Delete"
                        onClick={() => handleDelete(v.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-black/5 rounded-lg">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden p-4 space-y-4">
          {filteredVendors.map((v) => (
            <div key={v.id} className="p-4 bg-bg-main rounded-2xl border border-divider">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary uppercase text-sm">
                    {v.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-heading">{v.name}</h4>
                    <p className="text-xs text-text-secondary font-bold uppercase">{v.category} • {v.city}</p>
                  </div>
                </div>
                <Badge variant={v.status === 'approved' ? 'success' : v.status === 'blocked' ? 'error' : 'warning'}>
                  {v.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-divider">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-subtitle">Rating: {v.rating}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-primary/10 text-primary rounded-lg" onClick={() => handleUpdateStatus(v.id, v.status === 'approved' ? 'blocked' : 'approved')}>
                    <MoreVertical size={16} />
                  </button>
                  <button className="p-2 bg-rose-500/10 text-rose-500 rounded-lg" onClick={() => handleDelete(v.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}<div className="p-4 md:p-6 border-t border-divider flex items-center justify-between">
          <p className="text-sm text-text-secondary font-medium">Showing 1 to 7 of 48 entries</p>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-black/5 rounded-lg disabled:opacity-30" disabled>
              <ChevronLeft size={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-lg text-sm font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-lg text-sm font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded-lg text-sm font-bold">3</button>
            <button className="p-2 hover:bg-black/5 rounded-lg">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
