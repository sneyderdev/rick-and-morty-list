export const API_BASE_URL = 'https://rickandmortyapi.com/api/character';

export const API_ERROR_MESSAGES = {
  GENERAL: 'Failed to fetch characters',
  NOT_FOUND: 'Character not found',
  NETWORK: 'Network error occurred',
} as const;

export const OPERATION_STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const;

export const REVALIDATE_TIME = 3600;
