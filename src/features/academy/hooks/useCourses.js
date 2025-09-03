
import { useState, useEffect } from 'react';
import { getCourses } from '../api';

// Helper hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useCourses = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const params = { ...filters, search: debouncedSearch };
        const fetchedCourses = await getCourses(params);
        setCourses(fetchedCourses);
      } catch (err) {
        setError('Gagal memuat kursus. Silakan coba lagi nanti.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [debouncedSearch, filters.level, filters.sortBy, filters.price]);

  return { courses, isLoading, error, filters, setFilters };
};
