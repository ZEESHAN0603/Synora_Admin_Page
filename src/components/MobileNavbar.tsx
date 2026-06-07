import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  UserCircle 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export const MobileNavbar: React.FC = () => {
  const tabs = [
    { icon: LayoutDashboard, label: 'Home', path: '/' },
    { icon: Users, label: 'Vendors', path: '/vendors' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: BarChart3, label: 'Stats', path: '/analytics' },
    { icon: UserCircle, label: 'Profile', path: '/settings' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 md:hidden">
      <nav className="max-w-md mx-auto h-20 bg-white/90 dark:bg-zinc-955/90 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-around px-2 shadow-2xl shadow-black/10 border border-divider dark:border-zinc-800/80 relative">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-300 group relative z-10",
              isActive ? "text-primary dark:text-white font-bold" : "text-text-secondary dark:text-zinc-400 hover:text-text-heading dark:hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-active-bg"
                    className="absolute inset-x-2 inset-y-2.5 bg-primary/10 dark:bg-primary/20 rounded-2xl -z-10 border border-primary/10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <div className="relative flex items-center justify-center">
                  <tab.icon 
                    size={20} 
                    className={cn(
                      "transition-all duration-300", 
                      isActive ? "scale-110 stroke-[2.5] text-primary dark:text-white" : "group-active:scale-95"
                    )} 
                  />
                  {isActive && (
                    <motion.div 
                      layoutId="mobile-nav-dot"
                      className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary dark:bg-white" 
                    />
                  )}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider scale-95 origin-center">
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
