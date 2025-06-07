'use client';

import { useBookmarks } from '@/contexts/bookmarks-context';

import { CharacterCard } from '@/components/molecules/character-card';
import {
  CharactersList,
  CharactersListHeader,
  CharactersListContent,
} from './characters-list';

export function BookmarkedCharactersList() {
  const { state } = useBookmarks();

  const { bookmarkedCharacters } = state;

  return (
    <CharactersList>
      <CharactersListHeader>
        Starred Characters ({bookmarkedCharacters.length})
      </CharactersListHeader>
      <CharactersListContent>
        {bookmarkedCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </CharactersListContent>
    </CharactersList>
  );
}
