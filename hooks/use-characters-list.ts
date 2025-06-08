import type { Character } from '@/services/domain';

import { useFilteredCharacters } from '@/contexts/filtered-characters-context';

export function useCharactersList(initialCharacters: Array<Character>) {
  const { filteredCharactersState, searchQuery } = useFilteredCharacters();

  if (!searchQuery) {
    return {
      ...filteredCharactersState,
      characters: initialCharacters,
      searchQuery,
    };
  }

  return {
    ...filteredCharactersState,
    searchQuery,
  };
}
