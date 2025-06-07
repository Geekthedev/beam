import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  Search,
  Brain,
  FileText,
  Trophy,
  Settings,
  X,
  Zap,
  Users,
  Calendar,
} from 'lucide-react';
import { useBeamStore } from '../../store/useBeamStore';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'explorer', label: 'Course Explorer', icon: Search },
  { id: 'ai-tutor', label: 'AI Tutor', icon: Brain },
  { id: 'notebook', label: 'Notebook', icon: FileText },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, currentPage, setCurrentPage, user } = useBeamStore();

  const handleMenuClick = (pageId: string) => {
    setCurrentPage(pageId);
    // Only close sidebar on mobile
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay - Only shown on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <div className="fixed lg:static h-screen z-50 lg:z-0">
        {/* Mobile Sidebar - Animated */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              key="mobile-sidebar"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`
                lg:hidden fixed top-0 left-0 h-screen w-80 
                bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
                flex flex-col
              `}
            >
              {/* Mobile sidebar content */}
              <SidebarContent 
                onClose={() => setSidebarOpen(false)} 
                onItemClick={handleMenuClick}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar - Always visible */}
        <aside className={`
          hidden lg:flex h-screen w-20 xl:w-64
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
          flex-col transition-all duration-300
        `}>
          <SidebarContent 
            onClose={() => {}} 
            onItemClick={handleMenuClick}
            isDesktop={true}
          />
        </aside>
      </div>
    </>
  );
};

// Extracted sidebar content component
const SidebarContent: React.FC<{
  onClose: () => void;
  onItemClick: (pageId: string) => void;
  isDesktop?: boolean;
}> = ({ onClose, onItemClick, isDesktop = false }) => {
  const { currentPage, user } = useBeamStore();
  
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 xl:p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isDesktop || (isDesktop && window.innerWidth >= 1280) ? (
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white font-josefin">
                Beam
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-poppins">
                Illuminate Learning
              </p>
            </div>
          ) : null}
        </div>
        
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Stats */}
      {user && (!isDesktop || (isDesktop && window.innerWidth >= 1280)) && (
        <div className="p-4 xl:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 font-poppins">
                Level {user.level}
              </span>
              <span className="text-sm font-bold text-primary-600 dark:text-primary-400 font-poppins">
                {user.xp} XP
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(user.xp % 1000) / 10}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 font-poppins">
              <span>{user.xp % 1000} / 1000 XP</span>
              <span>🔥 {user.streak} day streak</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 xl:p-4 space-y-1 xl:space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: isDesktop ? 0 : 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onItemClick(item.id)}
              className={`
                w-full flex items-center gap-3 p-3 xl:px-4 xl:py-3 rounded-lg xl:rounded-xl 
                transition-all duration-200 font-poppins
                ${isActive
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
            >
              <Icon className="w-5 h-5 min-w-[20px]" />
              {(!isDesktop || (isDesktop && window.innerWidth >= 1280)) && (
                <span>{item.label}</span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      {(!isDesktop || (isDesktop && window.innerWidth >= 1280)) && (
        <div className="p-2 xl:p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-poppins">
              © 2024 Beam. Illuminate Learning.
            </p>
          </div>
        </div>
      )}
    </>
  );
};