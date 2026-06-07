import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  Calendar, 
  BarChart3, 
  FileText, 
  Settings, 
  LogOut,
  ChevronLeft,
  X,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, isMobile }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/' },
    { icon: Users, label: 'Vendors', path: '/vendors' },
    { icon: UserSquare2, label: 'Users', path: '/users' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: FileText, label: 'Bookings', path: '/bookings' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          {isMobile && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            />
          )}

          <motion.aside
            initial={isMobile ? { x: -300 } : { width: 80 }}
            animate={isMobile ? { x: 0 } : { width: 280 }}
            exit={isMobile ? { x: -300 } : { width: 80 }}
            className={cn(
              "fixed lg:relative h-screen bg-white text-text-subtitle z-40 flex flex-col border-r border-divider shadow-sm overflow-hidden",
              !isMobile && "sticky top-0"
            )}
          >
            {/* Logo Section */}
            <div className="h-24 flex items-center px-6 relative shrink-0">
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 gradient-header rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                  <span className="font-black text-lg">S</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors text-text-heading">EventLink Tamil Nadu</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mt-1">Console • TN</span>
                </div>
              </div>
              
              {isMobile && (
                <button onClick={() => setIsOpen(false)} className="absolute right-4 top-8 p-2 text-text-secondary hover:text-text-heading transition-colors">
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={({ isActive }) => cn(
                    "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative overflow-hidden",
                    isActive 
                      ? "bg-primary text-white shadow-xl shadow-primary/10" 
                      : "text-text-secondary hover:bg-bg-main hover:text-text-heading"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-linear-to-r from-primary to-acc-blue"
                        />
                      )}
                      <item.icon size={20} className={cn("relative z-10 transition-transform", isActive ? "scale-110" : "group-hover:scale-110")} />
                      <span className="relative z-10 font-bold text-sm tracking-tight">{item.label}</span>
                      {isActive && (
                        <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white relative z-10 shadow-lg" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Premium Card Footer */}
            <div className="p-4 shrink-0">
              <div className="glass-card !p-5 !bg-primary-soft border-primary/10 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm">
                    <Zap size={16} />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-primary">Sys Health</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-text-secondary">Status:</span>
                  <div className="flex items-center gap-1.5 ">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-emerald-500">Secure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Out Section */}
            <div className="p-4 border-t border-divider shrink-0">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 hover:bg-rose-50/50 transition-all font-bold text-sm"
              >
                <LogOut size={20} />
                <span>End Session</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
