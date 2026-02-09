
import React from 'react';
import type { Course } from '../types';
import CourseCard from './CourseCard';

interface BrowseCoursesViewProps {
  courses: Course[];
  t: (key: string) => string;
}

const BrowseCoursesView: React.FC<BrowseCoursesViewProps> = ({ courses, t }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">{t('browse')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} t={t} />
        ))}
      </div>
    </div>
  );
};

export default BrowseCoursesView;
