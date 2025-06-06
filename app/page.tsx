import { getCharacters } from '@/services/api/actions';
import { OPERATION_STATUS } from '@/services/api/consts';

import { CharactersList } from '@/components/organisms/characters-list';

export default async function Home() {
  const response = await getCharacters(1);

  if (response.status === OPERATION_STATUS.ERROR) {
    return <div>{response.message}</div>;
  }

  const characters = response.data;

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="text-4xl font-bold">Rick and Morty list</h1>
        <CharactersList title="Characters" characters={characters} />
      </main>
    </div>
  );
}
