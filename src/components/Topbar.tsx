import React from 'react';
import { Bell, Search, Sun, Moon, User, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  onToggleSidebar: () => void;
  isMobile: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, isMobile }) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-24 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20 pointer-events-none">
      <div className="w-full h-16 md:h-20 glass rounded-3xl md:rounded-[2rem] flex items-center justify-between px-4 md:px-6 pointer-events-auto">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button 
              onClick={onToggleSidebar}
              className="p-2.5 hover:bg-black/5 rounded-xl transition-colors text-text-subtitle"
            >
              <Menu size={22} />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-header rounded-xl flex items-center justify-center text-white scale-90 md:scale-100">
              <span className="font-black text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-black tracking-tighter leading-none text-text-heading">EventLink</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-0.5">Admin</span>
            </div>
          </div>
          
          {!isMobile && (
            <div className="hidden lg:flex items-center gap-3 bg-bg-main border border-divider px-5 py-2.5 rounded-2xl w-80 ml-8 transition-all focus-within:bg-white focus-within:border-primary/30">
              <Search size={18} className="text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-text-secondary font-medium"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-xl transition-all text-text-subtitle"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-xl transition-all relative text-text-subtitle">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>

          <div className="h-8 w-[1px] bg-divider mx-1 hidden md:block" />

          <div className="flex items-center gap-3 pl-1 group cursor-pointer" onClick={() => navigate('/settings')}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none capitalize text-text-heading">{user?.email?.split('@')[0] || 'Admin'}</p>
              <p className="text-[10px] text-primary mt-1 uppercase tracking-widest font-black">Superuser</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <User size={22} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
