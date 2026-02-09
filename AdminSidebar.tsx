
import React from 'react';
import { ICONS } from '../../constants';
import type { AdminView } from './AdminPanel';

interface AdminSidebarProps {
  currentView: AdminView;
  setCurrentView: (view: AdminView) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  t: (key: string) => string;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, setCurrentView, isOpen, t, onLogout }) => {
  const navItems: { view: AdminView; label: string; icon: React.ReactElement }[] = [
    { view: 'admin_dashboard', label: t('admin_dashboard'), icon: ICONS.dashboard },
    { view: 'user_management', label: t('user_management'), icon: ICONS.adminUsers },
    { view: 'course_management', label: t('course_management'), icon: ICONS.adminCourses },
    { view: 'payment_management', label: t('payment_management'), icon: ICONS.adminPayments },
    { view: 'admin_settings', label: t('admin_settings'), icon: ICONS.adminSettings },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 flex flex-col transition-all duration-300 z-30 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
        <div className="text-2xl text-indigo-600 dark:text-indigo-400">{ICONS.logo}</div>
        {isOpen && <h1 className="text-xl font-bold ml-3 text-gray-800 dark:text-white">Admin Panel</h1>}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
              currentView === item.view
                ? 'bg-indigo-600 text-white shadow-md'
                : 'hover:bg-indigo-50 dark:hover:bg-gray-700'
            } ${!isOpen ? 'justify-center' : ''}`}
            title={item.label}
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span className="ml-4 font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onLogout}
          className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/50 text-red-500 ${!isOpen ? 'justify-center' : ''}`}
          title={t('logout')}
        >
          <span className="text-lg">{ICONS.logout}</span>
          {isOpen && <span className="ml-4 font-medium">{t('logout')}</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
