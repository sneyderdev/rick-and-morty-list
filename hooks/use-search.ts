import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';

import { useDebounce } from './use-debounce';

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
