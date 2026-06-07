import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlassCard, Badge } from '../components/Common';
import { MoreVertical, Search, Filter, Ban, Trash2, Mail, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { User } from '../types';
import { formatDate } from '../lib/utils';

export const OrganizerManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/admin/users');
      const usersData = res.data;
      setUsers(
        Array.isArray(usersData)
          ? usersData
          : usersData.users || usersData.data || []
      );
    } catch (err: any) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = Array.isArray(users)
    ? users.filter(user => 
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         user.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (roleFilter === 'all' || user.role === roleFilter)
      )
    : [];

  const handleToggleStatus = async (id: string, currentEnabled: boolean = true) => {
    try {
      await api.put(`/admin/users/${id}/status`, { enabled: !currentEnabled });
      fetchUsers();
    } catch (err: any) {
      alert('Failed to update user status');
    }
  };

  const handleSendMail = (email: string) => {
    window.location.href = `mailto:${email}?subject=EventLink Support`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-heading">User Management</h1>
          <p className="text-text-subtitle font-medium">Manage all platform users, organizers, vendors, and admins.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg font-bold">
          Failed to load users.<br/>Please login again.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <GlassCard className="!p-0">
          <div className="p-4 md:p-6 border-b border-divider flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                className="input-field pl-12 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-bg-main px-3 py-1.5 rounded-xl border border-divider">
                <Filter size={16} className="text-text-secondary" />
                <select 
                  className="bg-transparent text-sm font-bold outline-none border-none pr-4"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="organizer">Organizer</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-text-secondary animate-pulse">Loading users...</div>
            ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-main">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Role</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary">Created Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-primary/5 transition-all group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <p className="font-bold text-text-heading">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium opacity-70">{user.email}</span>
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant={user.role === 'admin' ? 'error' : user.role === 'vendor' ? 'warning' : 'info'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium opacity-70">{formatDate(user.created_at)}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 px-2">
                        <button 
                          className="p-2 hover:bg-primary/10 text-primary rounded-lg" 
                          title="Send Email"
                          onClick={() => handleSendMail(user.email)}
                        >
                          <Mail size={18} />
                        </button>
                        <button 
                          className="p-2 hover:bg-black/5 text-amber-500 rounded-lg transition-colors"
                          title="Toggle Status"
                          onClick={() => handleToggleStatus(user.id)}
                        >
                          <Ban size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-text-secondary">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
