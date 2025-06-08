import { useSearch } from '@/contexts/search-context';
import { useBookmarks } from '@/contexts/bookmarks-context';

export function useBookmarkedCharactersList() {
  const { state: searchState } = useSearch();
  const { state: bookmarksState } = useBookmarks();

  const filteredCharacters = searchState.hasSearchQuery
    ? bookmarksState.bookmarkedCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchState.query.toLowerCase()),
      )
    : bookmarksState.bookmarkedCharacters;

  const hasBookmarkedCharacters =
    bookmarksState.bookmarkedCharacters.length > 0;

  const hasFilteredResults = filteredCharacters.length > 0;

  return {
    filteredCharacters,
    hasSearchQuery: searchState.hasSearchQuery,
    hasBookmarkedCharacters,
    hasFilteredResults,
    searchQuery: searchState.query,
  };
}
