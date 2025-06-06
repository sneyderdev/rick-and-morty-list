import { Text } from '@/components/atoms/text';
import { CharacterCard } from '@/components/molecules/character-card';

import type { Character } from '@/types/character';

interface CharacterListProps {
  title: string;
  characters: Array<Character>;
}

export function CharacterList({ title, characters }: CharacterListProps) {
  if (characters.length === 0) {
    return (
      <section className="space-y-4">
        <Text
          variant="caption"
          size="xs"
          className="text-muted-foreground border-b py-4"
        >
          {title} (0)
        </Text>
        <Text variant="muted" size="sm">
          No characters found
        </Text>
      </section>
    );
  }

  return (
    <section>
      <Text
        variant="caption"
        size="xs"
        className="text-muted-foreground border-b py-4"
      >
        {title} ({characters.length})
      </Text>
      <ul className="divide-y">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </ul>
    </section>
  );
}
