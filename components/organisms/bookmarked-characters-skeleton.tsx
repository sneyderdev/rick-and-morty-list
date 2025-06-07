import { CharacterCardSkeleton } from '@/components/molecules/character-card-skeleton';
import {
  CharactersList,
  CharactersListHeader,
  CharactersListContent,
} from './characters-list';

export function BookmarkedCharactersSkeleton() {
  return (
    <CharactersList>
      <CharactersListHeader>Starred Characters</CharactersListHeader>
      <CharactersListContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CharacterCardSkeleton key={`CharacterCardSkeleton-${index}`} />
        ))}
      </CharactersListContent>
    </CharactersList>
  );
}
