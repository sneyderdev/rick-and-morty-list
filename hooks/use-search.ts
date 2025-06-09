import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';

import { useDebounce } from './use-debounce';

/**
 * Custom hook for managing search functionality with URL query state synchronization and debouncing.
 *
 * This hook provides a debounced search input that automatically syncs with URL query parameters.
 * It maintains both local state for immediate UI updates and URL state for persistence and sharing.
 *
 * @returns An object containing:
 * - `query`: The current search query string for UI binding
 * - `setQuery`: Function to update the local search query
 *
 * @example
 * ```tsx
 * function SearchComponent() {
 *   const { query, setQuery } = useSearch();
 *
 *   return (
 *     <input
 *       value={query}
 *       onChange={(e) => setQuery(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 *
 * @remarks
 * - Uses a 500ms debounce delay to prevent excessive URL updates
 * - Automatically clears the URL parameter when search is empty
 * - Initializes with the current URL search parameter value
 */
export function useSearch() {
  const [searchQuery, setSearchQuery] = useQueryState('search', {
    defaultValue: '',
  });

  const [query, setQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchQuery(null);

      return;
    }

    if (debouncedQuery !== searchQuery) {
      setSearchQuery(debouncedQuery);
    }
  }, [debouncedQuery, searchQuery, setSearchQuery]);

  return {
    query,
    setQuery,
  };
}
