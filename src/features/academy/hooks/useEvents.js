import { useState, useEffect } from 'react';
import { getEvents } from '../api';

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

export const useEvents = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const params = { ...filters, search: debouncedSearch };
        const fetchedEvents = await getEvents(params);
        setEvents(fetchedEvents);
      } catch (err) {
        setError('Gagal memuat acara. Silakan coba lagi nanti.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [debouncedSearch, filters.type, filters.upcoming]);

  return { events, isLoading, error, filters, setFilters };
};
