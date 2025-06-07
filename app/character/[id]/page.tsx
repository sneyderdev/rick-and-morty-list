import { notFound } from 'next/navigation';

import { getCharacter } from '@/services/api/actions';
import { OPERATION_STATUS } from '@/services/api/consts';

import { CharacterDetailTemplate } from '@/components/templates/character-detail-template';

interface CharacterDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  const { id } = await params;

  const response = await getCharacter(Number(id));

  if (response.status === OPERATION_STATUS.ERROR) {
    notFound();
  }

  const character = response.data;

  return <CharacterDetailTemplate character={character} />;
}
