import { CharacterList } from '@/components/organisms/character-list';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="text-4xl font-bold">Rick and Morty list</h1>
        <CharacterList
          title="Characters"
          characters={[
            {
              id: '1',
              name: 'Rick Sanchez',
              species: 'Human',
              image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            },
            {
              id: '2',
              name: 'Morty Smith',
              species: 'Human',
              image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            },
          ]}
        />
      </main>
    </div>
  );
}
