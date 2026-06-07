import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, CheckCircle2, XCircle, Ban, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassCard, Badge } from '../components/Common';
import { cn } from '../lib/utils';
import api from '../services/api';
import { Vendor } from '../types';

export const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Record<string, string>>({});

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const [res, catRes] = await Promise.all([
        api.get('/admin/vendors'),
        api.get('/categories')
      ]);
      const vendorsData = res.data;
      setVendors(
        Array.isArray(vendorsData)
          ? vendorsData
          : vendorsData.vendors || vendorsData.data || []
      );
      
      const catMap: Record<string, string> = {};
      if (Array.isArray(catRes.data)) {
        catRes.data.forEach((c: any) => {
          catMap[c.id] = c.name;
        });
      }
      setCategories(catMap);
    } catch (err: any) {
      setError('Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filteredVendors = Array.isArray(vendors)
    ? vendors.filter(v => 
        (v.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) && 
        (statusFilter === 'all' || v.approval_status === statusFilter)
      )
    : [];

  const handleApprove = async (id: string) => {
    try {
      await api.patch(`/admin/vendors/${id}/approve`);
      fetchVendors(); // Refresh UI immediately
    } catch (err: any) {
      alert('Failed to approve vendor');
    }
  };

  const handleReject = async (id: string) => {
    const reason = window.prompt('Reason for rejection:');
    if (reason === null) return;
    try {
      await api.patch(`/admin/vendors/${id}/reject`, { reason: reason || 'Not suitable' });
      fetchVendors(); // Refresh UI immediately
    } catch (err: any) {
      alert('Failed to reject vendor');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
          <p className="text-text-subtitle font-medium">Verify, approve, and monitor your platform's service providers.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg font-bold">
          Failed to load vendors.<br/>Please login again.
        </div>
      )}

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
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center text-text-secondary animate-pulse">Loading vendors...</div>
          ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main border-b border-divider">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Vendor Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Location</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Rating</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider">
              {filteredVendors.map((v) => (
                <tr key={v.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary uppercase">
                        {v.business_name.charAt(0)}
                      </div>
                      <span className="font-bold text-text-heading">{v.business_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium opacity-70">{categories[v.category_id] || v.category_id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium opacity-70">{v.location}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold">{v.rating ?? 0}</span>
                      <div className="flex text-amber-500">
                        <CheckCircle2 size={14} fill="currentColor" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={v.approval_status === 'approved' ? 'success' : v.approval_status === 'rejected' ? 'error' : 'warning'}>
                      {v.approval_status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {v.approval_status === 'pending' && (
                        <>
                          <button 
                            className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg" 
                            title="Approve"
                            onClick={() => handleApprove(v.id)}
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg" 
                            title="Reject"
                            onClick={() => handleReject(v.id)}
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredVendors.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-secondary">No vendors found.</td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden p-4 space-y-4">
          {loading ? (
             <div className="text-center animate-pulse text-text-secondary py-8">Loading vendors...</div>
          ) : (
            filteredVendors.map((v) => (
            <div key={v.id} className="p-4 bg-bg-main rounded-2xl border border-divider">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary uppercase text-sm">
                    {v.business_name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-heading">{v.business_name}</h4>
                    <p className="text-xs text-text-secondary font-bold uppercase">{categories[v.category_id] || v.category_id} • {v.location}</p>
                  </div>
                </div>
                <Badge variant={v.approval_status === 'approved' ? 'success' : v.approval_status === 'rejected' ? 'error' : 'warning'}>
                  {v.approval_status}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-divider">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-subtitle">Rating: {v.rating ?? 0}</span>
                </div>
                <div className="flex gap-2">
                  {v.approval_status === 'pending' && (
                    <>
                      <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg" onClick={() => handleApprove(v.id)}>
                        <CheckCircle2 size={16} />
                      </button>
                      <button className="p-2 bg-rose-500/10 text-rose-500 rounded-lg" onClick={() => handleReject(v.id)}>
                        <XCircle size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </GlassCard>
    </div>
  );
};
