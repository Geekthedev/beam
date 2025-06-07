import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useBeamStore } from '../../store/useBeamStore';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen } = useBeamStore();
  const location = useLocation();
  
  // Pages where we don't want the layout
  const noLayoutPaths = ['/', '/login', '/register', '/onboarding'];
  
  if (noLayoutPaths.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <Header />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};