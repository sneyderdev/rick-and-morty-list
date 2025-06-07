'use client';

import { useBookmarks } from '@/contexts/bookmarks-context';

import { CharactersList } from './characters-list';

export function BookmarkedCharactersList() {
  const { state } = useBookmarks();

  const { bookmarkedCharacters } = state;

  return (
    <CharactersList
      title="Starred Characters"
      characters={bookmarkedCharacters}
    />
  );
}
