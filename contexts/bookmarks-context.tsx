'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from 'react';

import type { Character } from '@/services/domain';

interface BookmarksState {
  bookmarkedCharacters: Array<Character>;
}

interface BookmarkContextValue {
  state: BookmarksState;
  addBookmark: (character: Character) => void;
  removeBookmark: (characterId: string) => void;
  isBookmarked: (characterId: string) => boolean;
}

const BookmarksContext = createContext<BookmarkContextValue | null>(null);

type BookmarksAction =
  | { type: 'ADD_BOOKMARK'; payload: Character }
  | { type: 'REMOVE_BOOKMARK'; payload: string }
  | { type: 'LOAD_BOOKMARKS'; payload: Array<Character> };

function bookmarksReducer(
  state: BookmarksState,
  action: BookmarksAction,
): BookmarksState {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarkedCharacters: [...state.bookmarkedCharacters, action.payload],
      };
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarkedCharacters: state.bookmarkedCharacters.filter(
          (char) => char.id !== action.payload,
        ),
      };
    case 'LOAD_BOOKMARKS':
      return {
        ...state,
        bookmarkedCharacters: action.payload,
      };
    default:
      return state;
  }
}

const LOCAL_STORAGE_KEY = 'rick-and-morty-bookmarks';

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookmarksReducer, {
    bookmarkedCharacters: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (saved) {
      dispatch({ type: 'LOAD_BOOKMARKS', payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(state.bookmarkedCharacters),
    );
  }, [state.bookmarkedCharacters]);

  const addBookmark = (character: Character) => {
    dispatch({ type: 'ADD_BOOKMARK', payload: character });
  };

  const removeBookmark = (characterId: string) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: characterId });
  };

  const isBookmarked = (characterId: string) => {
    return state.bookmarkedCharacters.some((char) => char.id === characterId);
  };

  return (
    <BookmarksContext.Provider
      value={{ state, addBookmark, removeBookmark, isBookmarked }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);

  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }

  return context;
}
