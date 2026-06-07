import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { MobileNavbar } from '../components/MobileNavbar';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export const DashboardLayout: React.FC = () => {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bg-main">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-primary font-black uppercase tracking-widest animate-pulse">Pulse Initializing...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-bg-main text-text-subtitle transition-colors">
      {!isMobile && (
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
        />
      )}
      <div className="flex-1 flex flex-col min-w-0 transition-opacity duration-500">
        <Topbar 
          isMobile={isMobile} 
        />
        <main className={cn(
          "flex-1 p-4 md:p-8 pt-0 md:pt-4 overflow-x-hidden max-w-7xl mx-auto w-full transition-all duration-500",
          isMobile && "pb-32"
        )}>
          <Outlet />
        </main>
        {isMobile && <MobileNavbar />}
      </div>
    </div>
  );
};
