import { useSearch } from '@/contexts/search-context';
import { useBookmarks } from '@/contexts/bookmarks-context';

export function useSearchFeedback() {
  const { state: searchState } = useSearch();
  const { state: bookmarksState } = useBookmarks();

  const filteredBookmarks = bookmarksState.bookmarkedCharacters.filter(
    (character) =>
      character.name.toLowerCase().includes(searchState.query.toLowerCase()),
  );

  const totalResults =
    filteredBookmarks.length +
    (searchState.error ? 0 : searchState.results.length);

  return {
    hasSearchQuery: searchState.hasSearchQuery,
    totalResults,
  };
}
