
import React from 'react';

interface AdminSettingsViewProps {
  t: (key: string) => string;
}

const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({ t }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('admin_settings')}</h2>
      <p className="text-gray-600 dark:text-gray-400">
        System and website configuration options will be available here in a future update.
      </p>
    </div>
  );
};

export default AdminSettingsView;
