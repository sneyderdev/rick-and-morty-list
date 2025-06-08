import { useFilteredCharacters } from '@/contexts/filtered-characters-context';

import { useBookmarkedCharactersList } from './use-bookmarked-characters-list';

export function useSearchFeedback() {
  const {
    filteredCharactersState: { characters, isLoading },
  } = useFilteredCharacters();
  const { bookmarkedCharacters, searchQuery } = useBookmarkedCharactersList();

  if (isLoading) {
    return {
      searchQuery: null,
      totalResults: 0,
    };
  }

  const totalResults = bookmarkedCharacters.length + characters.length;

  return {
    searchQuery,
    totalResults,
  };
}
