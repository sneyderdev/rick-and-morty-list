import { useQueryState } from 'nuqs';

import { useBookmarks } from '@/contexts/bookmarks-context';

export function useBookmarkedCharactersList() {
  const {
    state: { bookmarkedCharacters },
  } = useBookmarks();

  const [searchQuery] = useQueryState('search', {
    defaultValue: '',
  });

  if (!searchQuery) {
    return {
      searchQuery,
      bookmarkedCharacters,
    };
  }

  const filteredCharacters = bookmarkedCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    searchQuery,
    bookmarkedCharacters: filteredCharacters,
  };
}
