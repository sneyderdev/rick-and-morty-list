import type { ZodSchema } from 'zod';

import type { Character } from '@/services/domain';

import type { ApiPayload, ApiCharacter } from './schemas';
import {
  API_ERROR_MESSAGES,
  OPERATION_STATUS,
  REVALIDATE_TIME,
} from './consts';

/**
 * Validates an API response against a Zod schema and returns the parsed data.
 *
 * @template T - The expected type of the validated data
 * @param data - The raw data to validate (typically from an API response)
 * @param schema - The Zod schema to validate against
 * @returns The validated and parsed data of type T
 * @throws {Error} When the data doesn't match the schema, with details about the validation failure
 *
 * @example
 * ```typescript
 * const userSchema = z.object({ id: z.number(), name: z.string() });
 * const validatedUser = validateApiResponse(apiData, userSchema);
 * ```
 */
export function validateApiResponse<T>(data: unknown, schema: ZodSchema<T>) {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid API response: ${result.error.message}`);
  }

  return result.data;
}

/**
 * Maps an API character object to a domain character object.
 *
 * Transforms the character data received from the API into the format
 * expected by the domain layer, converting the ID to a string and
 * extracting the relevant character properties.
 *
 * @param character - The character object from the API
 * @returns The mapped character object for the domain layer
 */
export function mapApiCharacterToDomain(character: ApiCharacter): Character {
  return {
    id: character.id.toString(),
    name: character.name,
    species: character.species,
    status: character.status,
    image: character.image,
  };
}

/**
 * Normalizes API response data by converting API character objects to domain objects.
 *
 * @param data - The API response payload containing either a collection of characters with results array or a single character object
 * @returns An array of normalized Character objects if the input contains a results array, or a single normalized Character object otherwise
 *
 * @example
 * ```typescript
 * // For paginated API response
 * const apiResponse = { results: [apiCharacter1, apiCharacter2] };
 * const characters = normalizeApiResponse(apiResponse); // Returns Character[]
 *
 * // For single character API response
 * const singleCharacter = normalizeApiResponse(apiCharacter); // Returns Character
 * ```
 */
export function normalizeApiResponse(
  data: ApiPayload | ApiCharacter,
): Array<Character> | Character {
  if ('results' in data) {
    return data.results.map(mapApiCharacterToDomain);
  }

  return mapApiCharacterToDomain(data);
}

/**
 * Fetches data from a URL, validates it against a Zod schema, and transforms the result.
 *
 * This utility function performs a complete fetch operation with built-in validation and transformation:
 * - Fetches data from the specified URL with Next.js revalidation
 * - Validates the response against the provided Zod schema
 * - Transforms the validated data using the provided mapper function
 * - Returns a standardized result object indicating success or failure
 *
 * @template TSchema - The type of the validated schema data
 * @template TResult - The type of the final transformed result
 *
 * @param url - The URL to fetch data from
 * @param schema - Zod schema used to validate the API response
 * @param mapApiResponse - Function to transform the validated data into the desired result format
 *
 * @returns A promise that resolves to either:
 *   - Success object containing the transformed data
 *   - Error object containing an error message
 *
 * @example
 * ```typescript
 * const result = await fetchWithValidation(
 *   'https://api.example.com/users',
 *   userSchema,
 *   (data) => data.users
 * );
 *
 * if (result.status === OPERATION_STATUS.SUCCESS) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.message);
 * }
 * ```
 */
export async function fetchWithValidation<TSchema, TResult>(
  url: string,
  schema: ZodSchema<TSchema>,
  mapApiResponse: (data: TSchema) => TResult,
): Promise<
  | { status: typeof OPERATION_STATUS.SUCCESS; data: TResult }
  | { status: typeof OPERATION_STATUS.ERROR; message: string }
> {
  try {
    const response = await fetch(url, {
      next: {
        revalidate: REVALIDATE_TIME,
      },
    });

    if (!response.ok) {
      const errorMessage =
        response.status === 404
          ? API_ERROR_MESSAGES.NOT_FOUND
          : API_ERROR_MESSAGES.GENERAL;

      return {
        status: OPERATION_STATUS.ERROR,
        message: errorMessage,
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
      message: API_ERROR_MESSAGES.NETWORK,
    };
  }
}
