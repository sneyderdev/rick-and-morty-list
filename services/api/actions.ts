'use server';

import type { Character } from '@/services/domain';

import type { ApiResponse } from './types';
import { API_BASE_URL, API_ERROR_MESSAGES } from './consts';
import { fetchWithValidation, normalizeApiResponse } from './utils';
import { ApiPayloadSchema, ApiCharacterSchema } from './schemas';

export async function getCharacters(
  page: number,
): Promise<ApiResponse<Array<Character>>> {
  return fetchWithValidation(
    `${API_BASE_URL}?page=${page}`,
    ApiPayloadSchema,
    (data) => normalizeApiResponse(data) as Array<Character>,
  );
}

export async function getCharacter(
  id: number,
): Promise<ApiResponse<Character>> {
  return fetchWithValidation(
    `${API_BASE_URL}/${id}`,
    ApiCharacterSchema,
    (data) => normalizeApiResponse(data) as Character,
  );
}

export async function searchCharacters(
  name: string,
): Promise<ApiResponse<Array<Character>>> {
  const result = await fetchWithValidation(
    `${API_BASE_URL}?name=${encodeURIComponent(name)}`,
    ApiPayloadSchema,
    (data) => normalizeApiResponse(data) as Array<Character>,
  );

  if (
    result.status === 'ERROR' &&
    result.message === API_ERROR_MESSAGES.NOT_FOUND
  ) {
    return {
      status: 'ERROR',
      message: `No characters found with name "${name}"`,
    };
  }

  return result;
}
