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
  const {
    filteredCharacters,
    hasSearchQuery,
    hasBookmarkedCharacters,
    hasFilteredResults,
    searchQuery,
  } = useBookmarkedCharactersList();

  const getHeaderText = () => {
    return `Starred Characters (${filteredCharacters.length})`;
  };

  const renderContent = () => {
    if (!hasBookmarkedCharacters) {
      return <CharactersEmptyState type="no-starred" />;
    }

    if (hasSearchQuery && !hasFilteredResults) {
      return (
        <CharactersEmptyState type="no-starred-results" query={searchQuery} />
      );
    }

    return filteredCharacters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  };

  return (
    <CharactersList>
      <CharactersListHeader>{getHeaderText()}</CharactersListHeader>
      <CharactersListContent>{renderContent()}</CharactersListContent>
    </CharactersList>
  );
}
