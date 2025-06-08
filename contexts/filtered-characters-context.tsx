'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useQueryState } from 'nuqs';

import type { Character } from '@/services/domain';
import { searchCharacters } from '@/services/api/actions';
import { OPERATION_STATUS } from '@/services/api/consts';

interface FilteredCharactersState {
  characters: Array<Character>;
  isLoading: boolean;
  error: string | null;
}

interface FilteredCharactersContextValue {
  filteredCharactersState: FilteredCharactersState;
  searchQuery: string;
}

const FilteredCharactersContext =
  createContext<FilteredCharactersContextValue | null>(null);

const initialState: FilteredCharactersState = {
  characters: [],
  isLoading: false,
  error: null,
};

export function FilteredCharacterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filteredCharactersState, setFilteredCharactersState] =
    useState<FilteredCharactersState>(initialState);

  const [searchQuery] = useQueryState('search', {
    defaultValue: '',
  });

  useEffect(() => {
    if (!searchQuery.trim()) {
      return setFilteredCharactersState(initialState);
    }

    const searchApiCharacters = async () => {
      setFilteredCharactersState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      const response = await searchCharacters(searchQuery);

      if (response.status === OPERATION_STATUS.ERROR) {
        return setFilteredCharactersState({
          characters: [],
          isLoading: false,
          error: response.message,
        });
      }

      setFilteredCharactersState((prev) => ({
        ...prev,
        characters: response.data,
        isLoading: false,
      }));
    };

    searchApiCharacters();
  }, [searchQuery]);

  return (
    <FilteredCharactersContext.Provider
      value={{ filteredCharactersState, searchQuery }}
    >
      {children}
    </FilteredCharactersContext.Provider>
  );
}

export function useFilteredCharacters() {
  const context = useContext(FilteredCharactersContext);

  if (!context) {
    throw new Error(
      'useFilteredCharacters must be used within a FilteredCharacterProvider',
    );
  }

  return context;
}
