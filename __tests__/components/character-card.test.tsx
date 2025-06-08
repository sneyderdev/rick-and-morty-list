import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

import { CharacterCard } from '@/components/molecules/character-card';

import { createMockCharacter } from '../utils/mocks';
import { TestWrapper } from '../utils/test-wrapper';

const createMockSearchParams = (queryString = '') => {
  const mockSearchParams = new URLSearchParams();

  mockSearchParams.toString = jest.fn(() => queryString);

  return mockSearchParams;
};

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => createMockSearchParams()),
}));

describe('CharacterCard', () => {
  const character = createMockCharacter();

  beforeEach(() => {
    jest.mocked(usePathname).mockReturnValue('/');
  });

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

  it('should render link to character details', () => {
    render(<CharacterCard character={character} />, { wrapper: TestWrapper });

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/character/${character.id}`);
  });

  it('should show active state when on character page', () => {
    jest.mocked(usePathname).mockReturnValue(`/character/${character.id}`);

    render(<CharacterCard character={character} />, { wrapper: TestWrapper });

    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-primary-100');
  });
});
