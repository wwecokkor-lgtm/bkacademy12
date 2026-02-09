
import React from 'react';
import type { User } from '../types';
import { ICONS } from '../constants';

interface HeaderProps {
  title: string;
  user: User;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, user, toggleSidebar, isSidebarOpen, language, toggleLanguage }) => {
  return (
    <header className="flex items-center justify-between h-20 px-4 md:px-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-400 focus:outline-none text-2xl">
          {isSidebarOpen ? ICONS.close : ICONS.menu}
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white ml-4">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleLanguage}
          className="bg-gray-200 dark:bg-gray-700 w-12 text-center py-2 rounded-md font-bold text-sm text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Toggle Language"
        >
          {language === 'en' ? 'BN' : 'EN'}
        </button>
        <button className="relative text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
          <span className="text-2xl">{ICONS.bell}</span>
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-3">
          <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="hidden md:block">
            <div className="font-semibold text-gray-800 dark:text-white">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</div>
          </div>
           <button className="hidden md:block text-gray-500 dark:text-gray-400">{ICONS.chevronDown}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
