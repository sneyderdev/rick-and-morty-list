import type { Character } from '@/services/domain';

export function createMockCharacter(overrides?: Partial<Character>): Character {
  return {
    id: '1',
    name: 'Rick Sanchez',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    ...overrides,
  };
}
