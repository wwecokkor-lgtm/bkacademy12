
import React, { useState, useEffect } from 'react';
import type { Course } from '../../types';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface CourseManagementViewProps {
  t: (key: string) => string;
}

const CourseManagementView: React.FC<CourseManagementViewProps> = ({ t }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const coursesCollection = collection(db, 'courses');
        const coursesSnapshot = await getDocs(coursesCollection);
        const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);


  const getStatusColor = (status: 'Published' | 'Unpublished') => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Unpublished': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
       <div className="flex items-center justify-center h-full">
        <i className="fas fa-spinner fa-spin text-4xl text-indigo-600"></i>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('all_courses')}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">{t('title')}</th>
              <th scope="col" className="px-6 py-3">{t('instructor')}</th>
              <th scope="col" className="px-6 py-3">{t('price')}</th>
              <th scope="col" className="px-6 py-3">{t('status')}</th>
              <th scope="col" className="px-6 py-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-3">
                  <img src={course.thumbnailUrl} alt={course.title} className="w-12 h-8 rounded object-cover" />
                  {course.title}
                </td>
                <td className="px-6 py-4">{course.instructor}</td>
                <td className="px-6 py-4">${course.price ? course.price.toFixed(2) : '0.00'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline">Edit</button>
                  <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManagementView;
