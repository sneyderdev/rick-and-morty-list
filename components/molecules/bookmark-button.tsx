'use client';

import { Heart } from 'lucide-react';

import { useBookmarks } from '@/contexts/bookmarks-context';
import type { Character } from '@/services/domain';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface BookmarkButtonProps {
  character: Character;
}

export function BookmarkButton({ character }: BookmarkButtonProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const bookmarked = isBookmarked(character.id);

  const handleToggleBookmark = () => {
    if (!bookmarked) {
      return addBookmark(character);
    }

    removeBookmark(character.id);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleBookmark}
      className={cn(
        'transition-none',
        bookmarked
          ? 'text-green-500 hover:text-green-500 [&_svg]:fill-green-500'
          : 'text-gray-300 hover:text-gray-400',
      )}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Heart />
    </Button>
  );
}
