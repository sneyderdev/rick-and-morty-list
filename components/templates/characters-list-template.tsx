import type { Character } from '@/services/domain';

import { Text } from '@/components/atoms/text';
import { CharactersList } from '@/components/organisms/characters-list';

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
        <CharactersList title="Characters" characters={characters} />
      </main>
    </div>
  );
}
