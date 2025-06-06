import { getCharacters } from '@/services/api/actions';
import { OPERATION_STATUS } from '@/services/api/consts';

import { CharactersListTemplate } from '@/components/templates/characters-list-template';

export default async function Home() {
  const response = await getCharacters(1);

  if (response.status === OPERATION_STATUS.ERROR) {
    return <div>{response.message}</div>;
  }

  const characters = response.data;

  return <CharactersListTemplate characters={characters} />;
}
