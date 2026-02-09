
import React from 'react';
import type { User, EnrolledCourse } from '../types';
import CourseCard from './CourseCard';
import { ICONS } from '../constants';

interface DashboardViewProps {
  user: User;
  enrolledCourses: EnrolledCourse[];
  t: (key: string) => string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, enrolledCourses, t }) => {
  const coursesInProgress = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length;
  const lastInProgressCourse = enrolledCourses.find(c => c.progress > 0 && c.progress < 100);

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('welcome_back')}, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">{t('learning_journey')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={ICONS.play} label={t('courses_in_progress')} value={coursesInProgress} colorClasses="border-blue-500 text-blue-500 bg-blue-100 dark:bg-blue-900/50" />
        <StatCard icon={ICONS.check} label={t('completed_courses')} value={completedCourses} colorClasses="border-green-500 text-green-500 bg-green-100 dark:bg-green-900/50" />
        <StatCard icon={ICONS.book} label={t('total_enrolled')} value={enrolledCourses.length} colorClasses="border-indigo-500 text-indigo-500 bg-indigo-100 dark:bg-indigo-900/50" />
      </div>

      {lastInProgressCourse && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('continue_learning')}</h2>
          <CourseCard enrolledCourse={lastInProgressCourse} t={t} />
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('your_courses')}</h2>
        {enrolledCourses.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {enrolledCourses.slice(0, 3).map(enrolled => (
                <CourseCard key={enrolled.course.id} enrolledCourse={enrolled} t={t} />
            ))}
            </div>
        ) : (
             <p className="text-center text-gray-500 dark:text-gray-400 py-8">{t('not_enrolled')}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
