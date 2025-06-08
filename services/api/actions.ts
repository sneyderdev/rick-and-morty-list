'use server';

import type { Character } from '@/services/domain';

import type { ApiResponse } from './types';
import { API_BASE_URL, API_ERROR_MESSAGES } from './consts';
import { fetchWithValidation, normalizeApiResponse } from './utils';
import { ApiPayloadSchema, ApiCharacterSchema } from './schemas';

/**
 * Fetches a paginated list of characters from the Rick and Morty API.
 *
 * @param page - The page number to retrieve (1-based indexing)
 * @returns A Promise that resolves to an ApiResponse containing an array of Character objects
 *
 * @example
 * ```typescript
 * const characters = await getCharacters(1);
 * console.log(characters.data); // Array of Character objects
 * ```
 *
 * @throws Will throw an error if the API request fails or if the response doesn't match the expected schema
 */
export async function getCharacters(
  page: number,
): Promise<ApiResponse<Array<Character>>> {
  return fetchWithValidation(
    `${API_BASE_URL}?page=${page}`,
    ApiPayloadSchema,
    (data) => normalizeApiResponse(data) as Array<Character>,
  );
}

/**
 * Retrieves a single character from the Rick and Morty API by ID.
 *
 * @param id - The unique identifier of the character to fetch
 * @returns A Promise that resolves to an ApiResponse containing the Character data
 * @throws Will throw an error if the API request fails or if the response doesn't match the expected schema
 *
 * @example
 * ```typescript
 * const character = await getCharacter(1);
 * console.log(character.name); // "Rick Sanchez"
 * ```
 */
export async function getCharacter(
  id: number,
): Promise<ApiResponse<Character>> {
  return fetchWithValidation(
    `${API_BASE_URL}/${id}`,
    ApiCharacterSchema,
    (data) => normalizeApiResponse(data) as Character,
  );
}

/**
 * Searches for characters by name using the Rick and Morty API.
 *
 * @param name - The character name to search for. Will be URL encoded automatically.
 * @returns A Promise that resolves to an ApiResponse containing an array of matching characters,
 *          or an error response if no characters are found or if the request fails.
 *
 * @example
 * ```typescript
 * const result = await searchCharacters("Rick");
 * if (result.status === 'SUCCESS') {
 *   console.log(result.data); // Array of Character objects
 * } else {
 *   console.error(result.message); // Error message
 * }
 * ```
 */
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
