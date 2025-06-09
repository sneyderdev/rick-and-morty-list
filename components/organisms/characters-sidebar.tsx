'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

import { FilteredCharacterProvider } from '@/contexts/filtered-characters-context';

import type { Character } from '@/services/domain';

import { cn } from '@/lib/utils';

import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/atoms/text';
import { SearchInput } from '@/components/molecules/search-input';
import { GeneralCharactersList } from '@/components/organisms/general-characters-list';
import { CharactersListSkeleton } from '@/components/organisms/characters-list-skeleton';

const BookmarkedCharactersList = dynamic(
  () =>
    import('@/components/organisms/bookmarked-characters-list').then(
      (mod) => mod.BookmarkedCharactersList,
    ),
  {
    ssr: false,
    loading: () => <CharactersListSkeleton title="Starred Characters" />,
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
        'max-h-dvh w-full space-y-4 overflow-y-auto px-6 pt-[42px] pb-6 lg:w-[376px] lg:px-4',
        isDetailsPage && 'hidden lg:block',
      )}
    >
      <header>
        <Text as="h1" variant="heading" size="2xl" className="font-bold">
          <Link href="/">Rick and Morty List</Link>
        </Text>
      </header>

      <Suspense fallback={<Skeleton className="h-9 w-full lg:h-[52px]" />}>
        <SearchInput />
      </Suspense>

      <Suspense fallback={<CharactersListSkeleton title="Loading..." />}>
        <FilteredCharacterProvider>
          <div>
            <BookmarkedCharactersList />
            <GeneralCharactersList initialCharacters={characters} />
          </div>
        </FilteredCharacterProvider>
      </Suspense>
    </aside>
  );
}
