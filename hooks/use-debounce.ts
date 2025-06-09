import { useState, useEffect } from 'react';

/**
 * A custom React hook that debounces a value by delaying its update until after a specified delay period.
 *
 * @template T - The type of the value to be debounced
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds before the debounced value is updated
 * @returns The debounced value that will only update after the delay period has passed without new changes
 *
 * @example
 * ```typescript
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * // The debouncedSearchTerm will only update 500ms after the user stops typing
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search operation
 *     performSearch(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
