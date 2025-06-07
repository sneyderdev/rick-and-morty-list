'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/atoms/text';
import { BookmarkButton } from './bookmark-button';

import type { Character } from '@/services/domain';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <li className="flex items-center gap-4 py-4">
      <Avatar>
        <AvatarImage src={character.image} alt={character.name} />
        <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Text as="h3" variant="heading">
          {character.name}
        </Text>
        <Text variant="muted">{character.species}</Text>
      </div>
      <BookmarkButton character={character} />
    </li>
  );
}
