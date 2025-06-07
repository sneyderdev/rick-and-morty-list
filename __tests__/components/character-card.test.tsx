import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { CharacterCard } from '@/components/molecules/character-card';

import { createMockCharacter } from '../utils/mocks';
import { TestWrapper } from '../utils/test-wrapper';

describe('CharacterCard', () => {
  const character = createMockCharacter();

  it('should render character information', () => {
    render(<CharacterCard character={character} />, { wrapper: TestWrapper });

    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(character.species)).toBeInTheDocument();
  });

  it('should render bookmark button', () => {
    render(<CharacterCard character={character} />, { wrapper: TestWrapper });

    const bookmarkButton = screen.getByRole('button');
    expect(bookmarkButton).toBeInTheDocument();
  });
});
