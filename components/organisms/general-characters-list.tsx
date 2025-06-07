'use client';

import type { Character } from '@/services/domain';

import { CharacterCard } from '@/components/molecules/character-card';
import {
  CharactersList,
  CharactersListHeader,
  CharactersListContent,
} from './characters-list';

interface GeneralCharactersListProps {
  characters: Array<Character>;
}

export function GeneralCharactersList({
  characters,
}: GeneralCharactersListProps) {
  return (
    <CharactersList>
      <CharactersListHeader>
        Starred Characters ({characters.length})
      </CharactersListHeader>
      <CharactersListContent>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </CharactersListContent>
    </CharactersList>
  );
}
