import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Settings, Menu, Sun, Moon } from 'lucide-react';
import { useBeamStore } from '../../store/useBeamStore';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, theme, setTheme, toggleSidebar, currentPage } = useBeamStore();

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Dashboard';
      case 'courses': return 'My Courses';
      case 'explorer': return 'Course Explorer';
      case 'ai-tutor': return 'AI Tutor';
      case 'notebook': return 'Notebook';
      case 'achievements': return 'Achievements';
      case 'settings': return 'Settings';
      default: return 'Beam';
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 px-6 py-3 sticky top-0 z-40"
    >
      <div className="flex items-center justify-between h-12"> {/* Fixed height container */}
        {/* Left section */}
        <div className="flex items-center gap-4 h-full">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-center h-full"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white font-josefin flex items-center h-full">
            {getPageTitle()}
          </h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-4 h-full">
          {/* Search - hidden on mobile */}
          <div className="hidden md:flex items-center h-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses, notes..."
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 transition-all w-48 md:w-64 font-poppins h-full"
              />
            </div>
          </div>

          {/* Icons group */}
          <div className="flex items-center gap-1 sm:gap-2 h-full">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 h-full aspect-square flex items-center justify-center"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 h-full aspect-square relative flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger-500 rounded-full border border-white dark:border-gray-900"></span>
            </Button>

            {/* Settings */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 h-full aspect-square flex items-center justify-center"
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* User Avatar */}
            {user && (
              <div className="flex items-center gap-2 h-full pl-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white font-poppins leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-poppins leading-tight">
                    Level {user.level} • {user.xp} XP
                  </p>
                </div>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="md"
                  fallback={user.name}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};