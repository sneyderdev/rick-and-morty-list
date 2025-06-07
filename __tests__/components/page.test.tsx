import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { CharactersListTemplate } from '@/components/templates/characters-list-template';

import { createMockCharacter } from '../utils/mocks';
import { TestWrapper } from '../utils/test-wrapper';

describe('Page Components', () => {
  it('renders character list template with characters', () => {
    const mockCharacters = [
      createMockCharacter(),
      createMockCharacter({ id: '2', name: 'Morty Smith' }),
    ];

    render(<CharactersListTemplate characters={mockCharacters} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByText('Rick and Morty list')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
