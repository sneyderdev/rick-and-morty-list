'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { FilteredCharacterProvider } from '@/contexts/filtered-characters-context';

import type { Character } from '@/services/domain';

import { cn } from '@/lib/utils';

import { Text } from '@/components/atoms/text';
import { SearchFeedback } from '@/components/atoms/search-feedback';
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
    <FilteredCharacterProvider>
      <aside
        className={cn(
          'max-h-dvh w-full space-y-4 overflow-y-auto px-6 pt-[42px] pb-6 lg:w-[592px]',
          isDetailsPage && 'hidden lg:block',
        )}
      >
        <header>
          <Text as="h1" variant="heading" size="2xl" className="font-bold">
            Rick and Morty list
          </Text>
        </header>

        <SearchInput />
        <SearchFeedback />

        <div>
          <BookmarkedCharactersList />
          <GeneralCharactersList initialCharacters={characters} />
        </div>
      </aside>
    </FilteredCharacterProvider>
  );
}
