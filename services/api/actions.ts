'use server';

import type { Character } from '@/services/domain';

import type { ApiResponse } from './types';
import { API_BASE_URL } from './consts';
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
  return fetchWithValidation(
    `${API_BASE_URL}?name=${encodeURIComponent(name)}`,
    ApiPayloadSchema,
    (data) => normalizeApiResponse(data) as Array<Character>,
  );
}
