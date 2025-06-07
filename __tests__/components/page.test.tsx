import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { BookmarksProvider } from '@/contexts/bookmarks-context';

import { CharactersListTemplate } from '@/components/templates/characters-list-template';

import { createMockCharacter } from '../utils/mocks';

describe('Page Components', () => {
  it('renders character list template with characters', () => {
    const mockCharacters = [
      createMockCharacter(),
      createMockCharacter({ id: '2', name: 'Morty Smith' }),
    ];

    render(
      <BookmarksProvider>
        <CharactersListTemplate characters={mockCharacters} />
      </BookmarksProvider>,
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
