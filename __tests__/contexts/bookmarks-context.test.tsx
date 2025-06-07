import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { useBookmarks } from '@/contexts/bookmarks-context';

import {
  createMockCharacter,
  localStorageMock,
  resetLocalStorageMocks,
} from '../utils/mocks';
import { TestWrapper } from '../utils/test-wrapper';

function TestComponent() {
  const { state, addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const { bookmarkedCharacters } = state;

  const mockCharacter = createMockCharacter();

  return (
    <div>
      <span data-testid="bookmarks-count">{bookmarkedCharacters.length}</span>
      <span data-testid="is-bookmarked">
        {isBookmarked(mockCharacter.id).toString()}
      </span>
      <button
        data-testid="add-bookmark"
        onClick={() => addBookmark(mockCharacter)}
      >
        Add Bookmark
      </button>
      <button
        data-testid="remove-bookmark"
        onClick={() => removeBookmark(mockCharacter.id)}
      >
        Remove Bookmark
      </button>
    </div>
  );
}

describe('BookmarksContext', () => {
  beforeEach(() => {
    resetLocalStorageMocks();
  });

  it('should start with empty bookmarks', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(<TestComponent />, { wrapper: TestWrapper });

    expect(screen.getByTestId('bookmarks-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-bookmarked')).toHaveTextContent('false');
  });

  it('should add a bookmark', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(<TestComponent />, { wrapper: TestWrapper });

    fireEvent.click(screen.getByTestId('add-bookmark'));

    expect(screen.getByTestId('bookmarks-count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-bookmarked')).toHaveTextContent('true');
  });

  it('should remove a bookmark', () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(<TestComponent />, { wrapper: TestWrapper });

    fireEvent.click(screen.getByTestId('add-bookmark'));
    expect(screen.getByTestId('bookmarks-count')).toHaveTextContent('1');

    fireEvent.click(screen.getByTestId('remove-bookmark'));
    expect(screen.getByTestId('bookmarks-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-bookmarked')).toHaveTextContent('false');
  });

  it('should load bookmarks from localStorage', () => {
    const mockCharacter = createMockCharacter();
    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockCharacter]));

    render(<TestComponent />, { wrapper: TestWrapper });

    expect(screen.getByTestId('bookmarks-count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-bookmarked')).toHaveTextContent('true');
  });
});
