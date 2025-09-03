
import { useAuth } from '../../../context/AuthContext';

export const CourseAccessLevel = {
  NO_ACCESS: 'NO_ACCESS',      // User not logged in
  PREVIEW: 'PREVIEW',          // Logged in, but doesn't own the course
  FULL_ACCESS: 'FULL_ACCESS',  // Logged in and owns the course
};

export const useCourseAccess = (courseId) => {
  const { user, courses: userCourses } = useAuth();

  if (!user) {
    return {
      level: CourseAccessLevel.NO_ACCESS,
      message: 'Silakan masuk untuk mengakses kursus ini.',
      redirectPath: '/login',
    };
  }

  const hasAccess = userCourses.some(course => course.id === courseId);

  if (hasAccess) {
    return {
      level: CourseAccessLevel.FULL_ACCESS,
      message: 'Anda memiliki akses penuh ke kursus ini.',
    };
  }

  return {
    level: CourseAccessLevel.PREVIEW,
    message: 'Beli kursus ini atau berlangganan untuk mendapatkan akses penuh.',
  };
};
