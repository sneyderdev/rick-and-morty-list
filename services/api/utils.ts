import { ApiPayloadSchema, ApiPayload } from './schemas';

import type { Character } from '../domain';

export function validateApiPayload(data: unknown) {
  const result = ApiPayloadSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid API response: ${result.error.message}`);
  }

  return result.data;
}

export function transformApiPayloadToDomain(
  data: ApiPayload,
): Array<Character> {
  return data.results.map((character) => ({
    id: character.id.toString(),
    name: character.name,
    species: character.species,
    image: character.image,
  }));
}
