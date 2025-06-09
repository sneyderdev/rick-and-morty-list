'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import type { Character } from '@/services/domain';

import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CharacterDetailItem } from '@/components/molecules/character-detail-item';
import { BookmarkButton } from '@/components/molecules/bookmark-button';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = pathname === `/character/${character.id}`;

  const href = `/character/${character.id}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  return (
    <li className="relative">
      <Link
        href={href}
        className={cn(
          'hover:bg-primary-100 flex flex-1 items-center gap-4 rounded-xl transition-colors lg:px-5',
          isActive && 'bg-primary-100',
        )}
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
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 lg:-translate-x-5"
      />
    </li>
  );
}
