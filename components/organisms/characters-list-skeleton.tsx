import { CharacterCardSkeleton } from '@/components/molecules/character-card-skeleton';
import {
  CharactersList,
  CharactersListHeader,
  CharactersListContent,
} from '@/components/organisms/characters-list';

interface CharactersListSkeletonProps {
  title: string;
  count?: number;
}

export function CharactersListSkeleton({
  title,
  count = 3,
}: CharactersListSkeletonProps) {
  return (
    <CharactersList>
      <CharactersListHeader>{title}</CharactersListHeader>
      <CharactersListContent>
        {Array.from({ length: count }).map((_, index) => (
          <CharacterCardSkeleton key={`CharacterCardSkeleton-${index}`} />
        ))}
      </CharactersListContent>
    </CharactersList>
  );
}
