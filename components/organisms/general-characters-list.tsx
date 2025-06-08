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
  const { characters, isLoading, error, searchQuery } =
    useCharactersList(initialCharacters);

  if (isLoading) {
    return (
      <CharactersListSkeleton title="Characters (searching...)" count={5} />
    );
  }

  const renderContent = () => {
    if (error) {
      return (
        <CharactersEmptyState type="error" error={error} query={searchQuery} />
      );
    }

    if (characters.length === 0) {
      return <CharactersEmptyState type="no-characters" />;
    }

    return characters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ));
  };

  return (
    <CharactersList>
      <CharactersListHeader>
        {error ? 'Characters (0)' : `Characters (${characters.length})`}
      </CharactersListHeader>
      <CharactersListContent>{renderContent()}</CharactersListContent>
    </CharactersList>
  );
}
