
import React, { useState } from 'react';
import type { User } from '../../types';
import AdminSidebar from './AdminSidebar';
import Header from '../Header';
import AdminDashboardView from './AdminDashboardView';
import UserManagementView from './UserManagementView';
import CourseManagementView from './CourseManagementView';
import AdminSettingsView from './AdminSettingsView';

export type AdminView = 'admin_dashboard' | 'user_management' | 'course_management' | 'payment_management' | 'admin_settings';

interface AdminPanelProps {
  user: User;
  onLogout: () => void;
  t: (key: string) => string;
  language: 'en' | 'bn';
  toggleLanguage: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onLogout, t, language, toggleLanguage }) => {
  const [currentView, setCurrentView] = useState<AdminView>('admin_dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'admin_dashboard':
        return <AdminDashboardView t={t} />;
      case 'user_management':
        return <UserManagementView t={t} />;
      case 'course_management':
        return <CourseManagementView t={t} />;
       case 'admin_settings':
         return <AdminSettingsView t={t} />;
      default:
        return <AdminDashboardView t={t} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <AdminSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        t={t}
        onLogout={onLogout}
      />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Header
          title={t(currentView)}
          user={user}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          language={language}
          toggleLanguage={toggleLanguage}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
