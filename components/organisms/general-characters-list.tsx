'use client';

import { useCharactersList } from '@/hooks/use-characters-list';

import type { Character } from '@/services/domain';

import { CharacterCard } from '@/components/molecules/character-card';
import { CharactersEmptyState } from '@/components/molecules/characters-empty-state';
import { CharactersListSkeleton } from '@/components/organisms/characters-list-skeleton';
import {
  CharactersList,
  CharactersListHeader,
  CharactersListContent,
} from '@/components/organisms/characters-list';

interface GeneralCharactersListProps {
  initialCharacters: Array<Character>;
}

export function GeneralCharactersList({
  initialCharacters,
}: GeneralCharactersListProps) {
  const {
    hasSearchQuery,
    hasSearchCompleted,
    charactersToShow,
    isLoading,
    error,
    query,
  } = useCharactersList(initialCharacters);

  if (hasSearchQuery && isLoading) {
    return (
      <CharactersListSkeleton title="Characters (searching...)" count={5} />
    );
  }

  const getHeaderText = () => {
    if (hasSearchCompleted) {
      return error
        ? 'Characters (0)'
        : `Characters (${charactersToShow.length})`;
    }

    return `Characters (${charactersToShow.length})`;
  };

  const renderContent = () => {
    if (hasSearchQuery && error) {
      return <CharactersEmptyState type="error" error={error} query={query} />;
    }

    if (charactersToShow.length === 0) {
      return <CharactersEmptyState type="no-characters" />;
    }

    return charactersToShow.map((character) => (
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
