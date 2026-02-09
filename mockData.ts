
import type { User, Course, EnrolledCourse, Lesson, UserStatus } from '../types';
import { UserRole } from '../types';

export const adminUser: User = {
  id: 'admin-001',
  name: 'Bayzid',
  email: 'fffgamer066@gmail.com',
  role: UserRole.Admin,
  avatarUrl: 'https://picsum.photos/seed/admin/100/100',
  status: 'Active',
};

export const student: User = {
  id: 'user-123',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  role: UserRole.Student,
  avatarUrl: 'https://picsum.photos/seed/alex/100/100',
  status: 'Active',
};

export const allUsers: User[] = [
  adminUser,
  student,
  { id: 'user-002', name: 'Maria Garcia', email: 'maria.g@example.com', role: UserRole.Student, avatarUrl: 'https://picsum.photos/seed/maria/100/100', status: 'Active', lastLogin: '2023-10-26T10:00:00Z' },
  { id: 'user-003', name: 'Chen Wei', email: 'chen.w@example.com', role: UserRole.Student, avatarUrl: 'https://picsum.photos/seed/chen/100/100', status: 'Pending', lastLogin: '2023-10-25T11:30:00Z' },
  { id: 'user-004', name: 'Fatima Al-Fassi', email: 'fatima.a@example.com', role: UserRole.Student, avatarUrl: 'https://picsum.photos/seed/fatima/100/100', status: 'Blocked', lastLogin: '2023-10-24T15:45:00Z' },
  { id: 'user-005', name: 'David Smith', email: 'david.s@example.com', role: UserRole.Student, avatarUrl: 'https://picsum.photos/seed/david/100/100', status: 'Suspended', lastLogin: '2023-10-23T09:00:00Z' }
];


const lessonsReact: Lesson[] = [
  { id: 'l1-1', title: 'Introduction to React', type: 'video', durationMinutes: 15, content: '#' },
  { id: 'l1-2', title: 'Components and Props', type: 'video', durationMinutes: 25, content: '#' },
  { id: 'l1-3', title: 'State and Lifecycle', type: 'video', durationMinutes: 30, content: '#' },
  { id: 'l1-4', title: 'React Hooks', type: 'pdf', durationMinutes: 0, content: '#' },
];

const lessonsJS: Lesson[] = [
  { id: 'l2-1', title: 'JavaScript Fundamentals', type: 'video', durationMinutes: 45, content: '#' },
  { id: 'l2-2', title: 'ES6+ Features', type: 'video', durationMinutes: 50, content: '#' },
  { id: 'l2-3', title: 'Asynchronous JavaScript', type: 'text', durationMinutes: 0, content: '#' },
];

const lessonsUX: Lesson[] = [
    { id: 'l3-1', title: 'Intro to UX Design', type: 'video', durationMinutes: 20, content: '#' },
    { id: 'l3-2', title: 'User Research', type: 'pdf', durationMinutes: 0, content: '#' },
    { id: 'l3-3', title: 'Wireframing & Prototyping', type: 'video', durationMinutes: 40, content: '#' },
];

const lessonsPython: Lesson[] = [
    { id: 'l4-1', title: 'Python Basics', type: 'video', durationMinutes: 35, content: '#' },
    { id: 'l4-2', title: 'Data Structures', type: 'video', durationMinutes: 55, content: '#' },
    { id: 'l4-3', title: 'Object-Oriented Programming', type: 'video', durationMinutes: 60, content: '#' },
];

export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'Advanced React Development',
    description: 'Master modern React patterns and build complex applications.',
    instructor: 'Jane Doe',
    thumbnailUrl: 'https://picsum.photos/seed/react/600/400',
    category: 'Web Development',
    lessons: lessonsReact,
    price: 49.99,
    status: 'Published',
  },
  {
    id: 'course-2',
    title: 'Modern JavaScript from Scratch',
    description: 'Learn the latest features of JavaScript and become a proficient developer.',
    instructor: 'John Smith',
    thumbnailUrl: 'https://picsum.photos/seed/javascript/600/400',
    category: 'Web Development',
    lessons: lessonsJS,
    price: 39.99,
    discount: { type: 'Percentage', value: 10 },
    status: 'Published',
  },
  {
    id: 'course-3',
    title: 'UX Design Fundamentals',
    description: 'A comprehensive guide to user experience design principles and practices.',
    instructor: 'Emily White',
    thumbnailUrl: 'https://picsum.photos/seed/ux/600/400',
    category: 'Design',
    lessons: lessonsUX,
    price: 29.99,
    status: 'Unpublished',
  },
   {
    id: 'course-4',
    title: 'Complete Python Bootcamp',
    description: 'From zero to hero in Python. Learn to build real-world applications.',
    instructor: 'Michael Brown',
    thumbnailUrl: 'https://picsum.photos/seed/python/600/400',
    category: 'Programming',
    lessons: lessonsPython,
    price: 59.99,
    status: 'Published',
  },
];

export const enrolledCourses: EnrolledCourse[] = [
  {
    course: courses[0],
    progress: 75,
    completedLessons: ['l1-1', 'l1-2', 'l1-3'],
  },
  {
    course: courses[1],
    progress: 25,
    completedLessons: ['l2-1'],
  },
  {
    course: courses[3],
    progress: 0,
    completedLessons: [],
  },
];
