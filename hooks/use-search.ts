'use client';

import { useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';

import { useDebounce } from './use-debounce';

export function useSearch() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const [searchState, setSearchState] = useQueryState('search', {
    defaultValue: '',
  });

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchState(null);

      return;
    }

    if (debouncedQuery !== searchState) {
      setSearchState(debouncedQuery);
    }
  }, [debouncedQuery, searchState, setSearchState]);

  return {
    query,
    setQuery,
  };
}
