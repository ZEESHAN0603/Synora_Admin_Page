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
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
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
    <div className="relative h-screen sticky top-0 shrink-0 z-40 flex">
      <motion.aside
        animate={{ width: isOpen ? 280 : 88 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="h-full bg-white text-text-subtitle flex flex-col border-r border-divider shadow-sm overflow-hidden"
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center px-6 relative shrink-0">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 gradient-header rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              <span className="font-black text-lg">E</span>
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col overflow-hidden whitespace-nowrap"
                >
                  <span className="text-xl font-black tracking-tighter leading-none group-hover:text-primary transition-colors text-text-heading">EventLink TN</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mt-1">Console • Tamil Nadu</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <div key={item.path} className="relative group/tooltip">
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative overflow-hidden",
                  isActive 
                    ? "bg-primary text-white shadow-xl shadow-primary/10" 
                    : "text-text-secondary hover:bg-bg-main hover:text-text-heading",
                  !isOpen && "justify-center px-0"
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
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10 font-bold text-sm tracking-tight whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {isActive && isOpen && (
                      <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white relative z-10 shadow-lg" />
                    )}
                  </>
                )}
              </NavLink>
              
              {!isOpen && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-text-heading text-white text-xs font-bold rounded-lg shadow-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:translate-x-1 transition-all duration-300 whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Premium Card Footer */}
        <div className="p-4 shrink-0">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div 
                key="expanded-health"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="glass-card !p-5 !bg-primary-soft border-primary/10 flex flex-col gap-3"
              >
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
              </motion.div>
            ) : (
              <motion.div 
                key="collapsed-health"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                <div className="w-10 h-10 bg-primary-soft border border-primary/10 rounded-xl flex items-center justify-center text-primary relative group/tooltip">
                  <Zap size={18} className="animate-pulse" />
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-text-heading text-white text-xs font-bold rounded-lg shadow-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:translate-x-1 transition-all duration-300 whitespace-nowrap z-50">
                    Sys Health: Secure
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sign Out Section */}
        <div className="p-4 border-t border-divider shrink-0">
          <div className="relative group/tooltip">
            <button 
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 hover:bg-rose-50/50 transition-all font-bold text-sm",
                !isOpen && "justify-center px-0"
              )}
            >
              <LogOut size={20} />
              {isOpen && <span>End Session</span>}
            </button>
            {!isOpen && (
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:translate-x-1 transition-all duration-300 whitespace-nowrap z-50">
                End Session
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-24 -right-3 w-6 h-6 bg-white border border-divider hover:border-primary rounded-full flex items-center justify-center text-text-secondary hover:text-primary transition-all shadow-md z-50 cursor-pointer"
        style={{ transform: 'translateY(-50%)' }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft size={14} />
        </motion.div>
      </button>
    </div>
  );
};
