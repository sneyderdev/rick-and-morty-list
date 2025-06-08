'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

import { useDebounce } from '@/hooks/use-debounce';

import type { Character } from '@/services/domain';
import { searchCharacters } from '@/services/api/actions';
import { OPERATION_STATUS } from '@/services/api/consts';

interface SearchState {
  query: string;
  hasSearchQuery: boolean;
  results: Array<Character>;
  isLoading: boolean;
  error: string | null;
}

interface SearchContextValue {
  state: SearchState;
  setQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SearchState>({
    query: '',
    hasSearchQuery: false,
    results: [],
    isLoading: false,
    error: null,
  });

  const debouncedQuery = useDebounce(state.query, 500);

  const setQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, hasSearchQuery: true, query, error: null }));
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      return setState((prev) => ({ ...prev, results: [], isLoading: false }));
    }

    const searchApiCharacters = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const response = await searchCharacters(debouncedQuery);

      if (response.status === OPERATION_STATUS.ERROR) {
        return setState((prev) => ({
          ...prev,
          results: [],
          isLoading: false,
          error: response.message,
        }));
      }

      setState((prev) => ({
        ...prev,
        results: response.data,
        isLoading: false,
      }));
    };

    searchApiCharacters();
  }, [debouncedQuery]);

  return (
    <SearchContext.Provider value={{ state, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
}
