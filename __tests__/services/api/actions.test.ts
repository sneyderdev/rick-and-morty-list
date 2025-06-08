import { getCharacters } from '@/services/api/actions';
import { OPERATION_STATUS, API_ERROR_MESSAGES } from '@/services/api/consts';

import { createMockCharacter } from '@/__tests__/utils/mocks';

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('getCharacters', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should return success with characters data', async () => {
    const mockApiPayload = {
      info: {
        count: 826,
        pages: 42,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: ['https://rickandmortyapi.com/api/episode/1'],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
      ],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiPayload,
    });

    const result = await getCharacters(1);

    expect(result.status).toBe(OPERATION_STATUS.SUCCESS);

    if (result.status === OPERATION_STATUS.SUCCESS) {
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(createMockCharacter());
    }
  });

  it('should return error when API response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
    });

    const result = await getCharacters(1);

    expect(result.status).toBe(OPERATION_STATUS.ERROR);

    if (result.status === OPERATION_STATUS.ERROR) {
      expect(result.message).toBe(API_ERROR_MESSAGES.GENERAL);
    }
  });

  it('should return error when fetch throws an exception', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await getCharacters(1);

    expect(result.status).toBe(OPERATION_STATUS.ERROR);

    if (result.status === OPERATION_STATUS.ERROR) {
      expect(result.message).toBe(API_ERROR_MESSAGES.NETWORK);
    }
  });
});
