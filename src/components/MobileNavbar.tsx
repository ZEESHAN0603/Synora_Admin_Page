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
      <nav className="max-w-md mx-auto h-20 bg-bg-nav/95 backdrop-blur-lg rounded-[2.5rem] flex items-center justify-around px-2 shadow-2xl shadow-black/5 border border-divider">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-500 group",
              isActive ? "text-primary" : "text-text-secondary"
            )}
          >
            <div className="relative">
              <tab.icon size={22} className={cn("transition-transform duration-500", "group-active:scale-90")} />
              <div className={cn(
                "absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 transition-opacity duration-500",
                "group-[.active]:opacity-100"
              )} />
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest transition-all duration-500",
              "group-[.active]:scale-110"
            )}>
              {tab.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
