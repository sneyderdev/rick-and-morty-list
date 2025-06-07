'use client';

import { useRouter } from 'next/navigation';

import type { Character } from '@/services/domain';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/atoms/text';
import { BackButton } from '@/components/atoms/back-button';
import { BookmarkButton } from '@/components/molecules/bookmark-button';

interface CharacterDetailTemplateProps {
  character: Character;
}

export function CharacterDetailTemplate({
  character,
}: CharacterDetailTemplateProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-dvh">
      <header className="flex h-[70px] items-center gap-3 p-4 md:hidden">
        <BackButton onClick={handleBack} />
      </header>
      <main className="p-6 pt-0 md:pt-6">
        <div className="space-y-4">
          <section className="space-y-2">
            <div className="relative w-max">
              <Avatar className="size-24">
                <AvatarImage src={character.image} alt={character.name} />
                <AvatarFallback className="text-2xl">
                  {character.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -right-2 -bottom-2">
                <BookmarkButton character={character} />
              </div>
            </div>
            <Text as="h1" variant="heading" size="2xl" className="font-bold">
              {character.name}
            </Text>
          </section>
          <div className="space-y-4">
            <div className="divide-y">
              <div className="flex-1 py-4">
                <Text as="h3" variant="heading">
                  Specie
                </Text>
                <Text variant="muted" className="font-medium">
                  {character.species}
                </Text>
              </div>
              <div className="flex-1 py-4">
                <Text as="h3" variant="heading">
                  Status
                </Text>
                <Text variant="muted" className="font-medium">
                  {character.status}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
