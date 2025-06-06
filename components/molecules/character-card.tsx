'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/atoms/text';

import type { Character } from '@/services/domain';

interface CharacterCardProps {
  character: Character;
  isBookmarked?: boolean;
}

export function CharacterCard({
  character: { name, species, image },
}: CharacterCardProps) {
  return (
    <li className="flex items-center gap-4 py-4">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Text as="h3" variant="heading">
          {name}
        </Text>
        <Text variant="muted">{species}</Text>
      </div>
    </li>
  );
}
