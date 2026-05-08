import React, { useState } from 'react';
import { GlassCard } from '../components/Common';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Shield, Palette, Database, Save, LogOut } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [displayName, setDisplayName] = useState('TN Admin');
  const [timezone, setTimezone] = useState('IST (Chennai/Kolkata)');

  const handleSaveProfile = () => {
    alert(`Success: Profile updated to ${displayName} (${timezone})`);
  };

  const handleSecurityUpdate = () => {
    alert('Security: Credentials update initiated. Please check your admin email for instructions.');
  };

  return (
    <div className="space-y-8 max-w-4xl pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-heading">System Settings</h1>
        <p className="text-text-subtitle font-medium">Manage your profile, platform preferences, and security configurations in Tamil Nadu.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <GlassCard>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <User size={24} />
              </div>
              <h2 className="text-xl font-bold text-text-heading">Admin Profile</h2>
            </div>
            <button 
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Save Changes
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-text-secondary ml-1">Email Address</label>
              <input type="text" value={user?.email || ''} readOnly className="input-field opacity-60 cursor-not-allowed text-text-heading" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-text-secondary ml-1">Display Name</label>
              <input 
                type="text" 
                placeholder="Admin Name" 
                className="input-field text-text-heading font-medium" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-text-secondary ml-1">Role</label>
              <input type="text" value="Super Administrator" readOnly className="input-field opacity-60 text-text-heading" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-text-secondary ml-1">Timezone</label>
              <select 
                className="input-field text-text-heading font-medium"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option>IST (Chennai/Kolkata)</option>
                <option>GMT (London)</option>
                <option>EST (New York)</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Theme & Prefs */}
        <GlassCard>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Palette size={24} />
            </div>
            <h2 className="text-xl font-bold text-text-heading">Preferences</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-bg-main rounded-2xl border border-divider">
              <div>
                <p className="font-bold text-text-heading">Visual Theme</p>
                <p className="text-xs text-text-secondary font-medium">Switch between light and dark mode</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="px-6 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-center"
              >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-bg-main rounded-2xl border border-divider">
              <div>
                <p className="font-bold text-text-heading">Real-time Notifications</p>
                <p className="text-xs text-text-secondary font-medium">Push alerts for new vendor registrations</p>
              </div>
              <div 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${notifications ? 'bg-primary' : 'bg-divider'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Security */}
        <GlassCard>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Shield size={24} />
            </div>
            <h2 className="text-xl font-bold text-text-heading">Security</h2>
          </div>
          <button 
            onClick={handleSecurityUpdate}
            className="w-full py-4 bg-bg-main border border-divider rounded-2xl font-bold text-left px-6 hover:bg-black/5 transition-all flex items-center justify-between text-text-heading"
          >
            Update Security Credentials
            <Save size={20} className="text-primary" />
          </button>
        </GlassCard>

        {/* Supabase Config */}
        <GlassCard>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Database size={24} />
            </div>
            <h2 className="text-xl font-bold text-text-heading">Platform Connection</h2>
          </div>
          <div className="p-4 bg-bg-main rounded-2xl space-y-4 border border-divider">
            <div>
              <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Connected to Supabase Cloud
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest mb-1">API Endpoint</p>
              <p className="text-xs font-mono break-all text-text-secondary">https://ais-dev-synora.supabase.co</p>
            </div>
          </div>
        </GlassCard>

        <div className="pt-6">
          <button 
            onClick={signOut}
            className="w-full py-4 text-rose-500 font-bold border border-rose-500/20 rounded-2xl hover:bg-rose-500/5 transition-all flex items-center justify-center gap-3"
          >
            <LogOut size={20} />
            Sign Out of Admin Console
          </button>
        </div>
      </div>
    </div>
  );
};
