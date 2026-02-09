
import React, { useState, useEffect } from 'react';
import { ICONS } from '../../constants';
import type { User, Course } from '../../types';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface AdminDashboardViewProps {
  t: (key: string) => string;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ t }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
        setUsers(usersList);

        const coursesCollection = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesCollection);
        const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalSales = courses.reduce((sum, course) => sum + (course.price || 0), 0).toFixed(2);

  const StatCard: React.FC<{ icon: React.ReactElement; label: string; value: string | number; colorClasses: string }> = ({ icon, label, value, colorClasses }) => (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center space-x-4 border-l-4 ${colorClasses.split(' ')[0]}`}>
      <div className={`text-3xl p-4 rounded-lg ${colorClasses.split(' ')[1]}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
    </div>
  );

  if (isLoading) {
    return (
       <div className="flex items-center justify-center h-full">
        <i className="fas fa-spinner fa-spin text-4xl text-indigo-600"></i>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('admin_welcome')}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{t('admin_overview')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={ICONS.adminUsers} label={t('total_users')} value={users.length} colorClasses="border-blue-500 text-blue-500 bg-blue-100 dark:bg-blue-900/50" />
        <StatCard icon={ICONS.adminCourses} label={t('total_courses')} value={courses.length} colorClasses="border-green-500 text-green-500 bg-green-100 dark:bg-green-900/50" />
        <StatCard icon={ICONS.adminPayments} label={t('total_sales')} value={`$${totalSales}`} colorClasses="border-indigo-500 text-indigo-500 bg-indigo-100 dark:bg-indigo-900/50" />
      </div>
      {/* Additional charts and recent activity could be added here */}
    </div>
  );
};

export default AdminDashboardView;
