'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import type { Character } from '@/services/domain';

import { cn } from '@/lib/utils';

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

interface CharactersSidebarProps {
  characters: Array<Character>;
}

export function CharactersSidebar({ characters }: CharactersSidebarProps) {
  const pathname = usePathname();

  const isDetailsPage = pathname.startsWith('/character/');

  return (
    <aside
      className={cn(
        'max-h-dvh w-full space-y-4 overflow-y-auto px-6 py-6 lg:z-auto lg:w-[592px]',
        isDetailsPage && 'hidden lg:block',
      )}
    >
      <header>
        <Text as="h1" variant="heading" size="2xl" className="font-bold">
          Rick and Morty list
        </Text>
      </header>
      <section>
        <BookmarkedCharactersList />
        <GeneralCharactersList characters={characters} />
      </section>
    </aside>
  );
}
