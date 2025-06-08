import type { Character } from '@/services/domain';

import { useSearch } from '@/contexts/search-context';

export function useCharactersList(initialCharacters: Array<Character>) {
  const {
    state: { results, ...searchState },
  } = useSearch();

  const hasSearchCompleted =
    searchState.hasSearchQuery &&
    !searchState.isLoading &&
    (results.length > 0 || searchState.error);

  const charactersToShow = hasSearchCompleted ? results : initialCharacters;

  return {
    ...searchState,
    hasSearchCompleted,
    charactersToShow,
  };
}
