
import { useState, useEffect, useMemo } from 'react';
import { getCourseBySlug } from '../api';
import { useAuth } from '../../../context/AuthContext';

export const useCourseData = (courseSlug) => {
  const { courses: userCourses } = useAuth();
  const [baseCourse, setBaseCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        const fetchedCourse = await getCourseBySlug(courseSlug);
        if (fetchedCourse) {
          setBaseCourse(fetchedCourse);
        } else {
          setError('Kursus tidak ditemukan.');
        }
      } catch (err) {
        setError('Gagal memuat data kursus.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [courseSlug]);

  const course = useMemo(() => {
    if (!baseCourse) return null;
    const userCourseData = userCourses.find(uc => uc.id === baseCourse.id);
    return { ...baseCourse, ...userCourseData };
  }, [baseCourse, userCourses]);

  const progress = course?.progress || 0;
  const completedTopics = useMemo(() => new Set(course?.completedTopics || []), [course]);

  return { course, isLoading, error, progress, completedTopics };
};
