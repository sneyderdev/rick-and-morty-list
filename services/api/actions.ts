'use server';

import { API_BASE_URL, API_ERROR_MESSAGE, OPERATION_STATUS } from './consts';
import { validateApiPayload, transformApiPayloadToDomain } from './utils';
import { type GetCharactersPayload } from './types';

export async function getCharacters(
  page: number,
): Promise<GetCharactersPayload> {
  try {
    const response = await fetch(`${API_BASE_URL}?page=${page}`);

    if (!response.ok) {
      return {
        status: OPERATION_STATUS.ERROR,
        message: API_ERROR_MESSAGE,
      };
    }

    const data = await response.json();

    const validatedData = validateApiPayload(data);

    return {
      status: OPERATION_STATUS.SUCCESS,
      data: transformApiPayloadToDomain(validatedData),
    };
  } catch (error) {
    console.error('Error fetching characters:', error);

    return {
      status: OPERATION_STATUS.ERROR,
      message: API_ERROR_MESSAGE,
    };
  }
}
