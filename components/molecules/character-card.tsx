'use client';

import Link from 'next/link';

import type { Character } from '@/services/domain';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CharacterDetailItem } from './character-detail-item';
import { BookmarkButton } from './bookmark-button';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <li className="relative">
      <Link
        href={`/character/${character.id}`}
        className="flex flex-1 items-center gap-4"
      >
        <Avatar>
          <AvatarImage src={character.image} alt={character.name} />
          <AvatarFallback>{character.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CharacterDetailItem
          title={character.name}
          description={character.species}
        />
      </Link>
      <BookmarkButton
        character={character}
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2"
      />
    </li>
  );
}
