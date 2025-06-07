'use client';

import dynamic from 'next/dynamic';

import type { Character } from '@/services/domain';

import { Text } from '@/components/atoms/text';
import { BookmarkedCharactersSkeleton } from '@/components/organisms/bookmarked-characters-skeleton';
import { GeneralCharactersList } from '@/components/organisms/general-characters-list';

const BookmarkedCharactersList = dynamic(
  () =>
    import('@/components/organisms/bookmarked-characters-list').then(
      (mod) => mod.BookmarkedCharactersList,
    ),
  {
    ssr: false,
    loading: () => <BookmarkedCharactersSkeleton />,
  },
);

interface CharactersListTemplateProps {
  characters: Array<Character>;
}

export function CharactersListTemplate({
  characters,
}: CharactersListTemplateProps) {
  return (
    <div className="space-y-4 px-6 py-[42px]">
      <header>
        <Text as="h1" variant="heading" size="2xl" className="font-bold">
          Rick and Morty list
        </Text>
      </header>
      <main>
        <BookmarkedCharactersList />
        <GeneralCharactersList characters={characters} />
      </main>
    </div>
  );
}
