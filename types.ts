
export enum UserRole {
  Admin = 'admin',
  Instructor = 'instructor',
  Student = 'student',
}

export type UserStatus = 'Active' | 'Pending' | 'Blocked' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  status: UserStatus;
  lastLogin?: string; // ISO Date String
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'text';
  durationMinutes: number; // For video
  content: string; // URL for video/pdf or text content
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnailUrl: string;
  category: string;
  lessons: Lesson[];
  price: number;
  discount?: {
    type: 'Fixed' | 'Percentage';
    value: number;
  };
  status: 'Published' | 'Unpublished';
}

export interface EnrolledCourse {
  course: Course;
  progress: number; // Percentage 0-100
  completedLessons: string[]; // Array of lesson IDs
}
