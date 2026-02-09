
import React from 'react';
import type { EnrolledCourse } from '../types';
import CourseCard from './CourseCard';

interface MyLearningViewProps {
  enrolledCourses: EnrolledCourse[];
  t: (key: string) => string;
}

const MyLearningView: React.FC<MyLearningViewProps> = ({ enrolledCourses, t }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{t('my_learning')}</h1>
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enrolledCourses.map(enrolled => (
            <CourseCard key={enrolled.course.id} enrolledCourse={enrolled} t={t} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">{t('no_courses_yet')}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{t('start_learning_prompt')}</p>
        </div>
      )}
    </div>
  );
};

export default MyLearningView;
