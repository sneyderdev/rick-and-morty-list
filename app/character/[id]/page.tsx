export const revalidate = 3600;

import { notFound } from 'next/navigation';

import { getCharacter, getCharacters } from '@/services/api/actions';
import { OPERATION_STATUS } from '@/services/api/consts';

import { CharacterDetailsContent } from '@/components/organisms/character-details-content';

export async function generateStaticParams() {
  const response = await getCharacters(1);

  if (response.status === OPERATION_STATUS.ERROR) {
    return [];
  }

  return response.data.map((character) => ({
    id: character.id,
  }));
}

interface CharacterDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  const { id } = await params;

  console.log(`Loading character ${id}`);

  const response = await getCharacter(Number(id));

  if (response.status === OPERATION_STATUS.ERROR) {
    notFound();
  }

  const character = response.data;

  return <CharacterDetailsContent character={character} />;
}
