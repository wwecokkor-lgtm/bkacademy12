import React from 'react';
import type { Course, EnrolledCourse } from '../types';
import ProgressDonut from './ProgressDonut';
import { ICONS } from '../constants';

interface CourseCardProps {
  course?: Course;
  enrolledCourse?: EnrolledCourse;
  t: (key: string) => string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, enrolledCourse, t }) => {
  const displayCourse = course || enrolledCourse?.course;

  if (!displayCourse) return null;

  const totalLessons = displayCourse.lessons.length;
  // FIX: Corrected typo from 'displaycourse' to 'displayCourse'
  const totalDuration = displayCourse.lessons.reduce((acc, lesson) => acc + lesson.durationMinutes, 0);

  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = totalDuration % 60;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col cursor-pointer border border-transparent hover:border-indigo-500">
      <div className="relative">
        <img src={displayCourse.thumbnailUrl} alt={displayCourse.title} className="w-full h-44 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <div className="w-16 h-16 bg-white bg-opacity-25 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-4xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                {ICONS.play}
            </div>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{displayCourse.category}</p>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 truncate">{displayCourse.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('by_instructor')} {displayCourse.instructor}</p>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-4 space-x-4">
            <div className="flex items-center space-x-1.5">
                {ICONS.book}
                <span>{totalLessons} {t('lessons')}</span>
            </div>
            <div className="flex items-center space-x-1.5">
                {ICONS.clock}
                <span>{totalHours}h {totalMinutes}m</span>
            </div>
        </div>

        <div className="mt-auto pt-5">
          {enrolledCourse ? (
            <div>
              <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('progress')}</p>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{enrolledCourse.progress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{width: `${enrolledCourse.progress}%`}}></div>
              </div>
            </div>
          ) : (
            <div className="text-center">
                <span className="text-xl font-bold text-gray-800 dark:text-white group-hover:hidden transition-opacity duration-300">Free</span>
                <button className="w-full bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0">
                  {t('view_course')}
                </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
