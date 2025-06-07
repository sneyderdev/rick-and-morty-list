import type { ZodSchema } from 'zod';

import type { Character } from '@/services/domain';

import type { ApiPayload, ApiCharacter } from './schemas';
import { API_ERROR_MESSAGE, OPERATION_STATUS } from './consts';

export function validateApiResponse<T>(data: unknown, schema: ZodSchema<T>) {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid API response: ${result.error.message}`);
  }

  return result.data;
}

export function mapApiCharacterToDomain(character: ApiCharacter): Character {
  return {
    id: character.id.toString(),
    name: character.name,
    species: character.species,
    status: character.status,
    image: character.image,
  };
}

export function normalizeApiResponse(
  data: ApiPayload | ApiCharacter,
): Array<Character> | Character {
  if ('results' in data) {
    return data.results.map(mapApiCharacterToDomain);
  }

  return mapApiCharacterToDomain(data);
}

export async function fetchWithValidation<TSchema, TResult>(
  url: string,
  schema: ZodSchema<TSchema>,
  mapApiResponse: (data: TSchema) => TResult,
): Promise<
  | { status: typeof OPERATION_STATUS.SUCCESS; data: TResult }
  | { status: typeof OPERATION_STATUS.ERROR; message: string }
> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return {
        status: OPERATION_STATUS.ERROR,
        message: API_ERROR_MESSAGE,
      };
    }

    const data = await response.json();
    const validatedData = validateApiResponse(data, schema);
    const transformedData = mapApiResponse(validatedData);

    return {
      status: OPERATION_STATUS.SUCCESS,
      data: transformedData,
    };
  } catch (error) {
    console.error('API request error:', error);

    return {
      status: OPERATION_STATUS.ERROR,
      message: API_ERROR_MESSAGE,
    };
  }
}
