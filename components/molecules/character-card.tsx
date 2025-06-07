'use client';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/atoms/text';
import { BookmarkButton } from './bookmark-button';

import type { Character } from '@/services/domain';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <li className="relative">
      <Link
        href={`/character/${character.id}`}
        className="flex flex-1 items-center gap-4 py-4"
      >
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
      </Link>
      <BookmarkButton
        character={character}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2"
      />
    </li>
  );
}
