export const revalidate = 3600;

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { getCharacter, getCharacters } from '@/services/api/actions';
import { OPERATION_STATUS } from '@/services/api/consts';

import { CharacterDetailsContent } from '@/components/organisms/character-details-content';

export async function generateMetadata({
  params,
}: CharacterDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  const response = await getCharacter(Number(id));

  if (response.status === OPERATION_STATUS.ERROR) {
    return {
      title: 'Character Not Found',
      description: 'The requested character could not be found.',
    };
  }

  const character = response.data;

  return {
    title: `${character.name} | Rick and Morty List`,
    description: `Learn about ${character.name}, a ${character.species} character from Rick and Morty. Status: ${character.status}.`,
    openGraph: {
      title: `${character.name} | Rick and Morty List`,
      description: `Learn about ${character.name}, a ${character.species} character from Rick and Morty. Status: ${character.status}.`,
      images: [
        {
          url: character.image,
          width: 300,
          height: 300,
          alt: `${character.name} from Rick and Morty`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${character.name} | Rick and Morty List`,
      description: `Learn about ${character.name}, a ${character.species} character from Rick and Morty.`,
      images: [character.image],
    },
  };
}

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
