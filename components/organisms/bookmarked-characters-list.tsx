'use client';

import { useBookmarkedCharactersList } from '@/hooks/use-bookmarked-characters-list';

import { CharacterCard } from '@/components/molecules/character-card';
import { CharactersEmptyState } from '@/components/molecules/characters-empty-state';
import {
  CharactersList,
  CharactersListHeader,
  CharactersListContent,
} from '@/components/organisms/characters-list';

export function BookmarkedCharactersList() {
  const { bookmarkedCharacters, searchQuery } = useBookmarkedCharactersList();

  const renderContent = () => {
    if (!bookmarkedCharacters.length) {
      return <CharactersEmptyState type="no-starred" />;
    }

    if (searchQuery && !bookmarkedCharacters.length) {
      return (
        <CharactersEmptyState type="no-starred-results" query={searchQuery} />
      );
    }

    return bookmarkedCharacters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  };

  return (
    <CharactersList>
      <CharactersListHeader>
        Starred Characters ({bookmarkedCharacters.length})
      </CharactersListHeader>
      <CharactersListContent>{renderContent()}</CharactersListContent>
    </CharactersList>
  );
}
