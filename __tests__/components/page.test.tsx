import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { AppLayoutTemplate } from '@/components/templates/app-layout-template';
import { GeneralCharactersList } from '@/components/organisms/general-characters-list';
import { CharactersSidebar } from '@/components/organisms/characters-sidebar';

import { createMockCharacter } from '../utils/mocks';
import { TestWrapper } from '../utils/test-wrapper';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Page Components', () => {
  const mockCharacters = [
    createMockCharacter(),
    createMockCharacter({ id: '2', name: 'Morty Smith' }),
  ];

  it('renders characters sidebar with characters', () => {
    render(<CharactersSidebar characters={mockCharacters} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByText('Rick and Morty list')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('renders general characters list', () => {
    render(<GeneralCharactersList characters={mockCharacters} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByText('Characters (2)')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('renders app layout template', () => {
    render(
      <AppLayoutTemplate characters={mockCharacters}>
        <div>Test Content</div>
      </AppLayoutTemplate>,
      { wrapper: TestWrapper },
    );

    expect(screen.getByText('Rick and Morty list')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
