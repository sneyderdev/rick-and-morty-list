'use client';

import { Heart } from 'lucide-react';

import { useBookmarks } from '@/contexts/bookmarks-context';
import type { Character } from '@/services/domain';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

interface BookmarkButtonProps {
  character: Character;

  className?: string;
}

export function BookmarkButton({ character, className }: BookmarkButtonProps) {
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
        'text-secondary-600 transition-none',
        bookmarked
          ? 'text-secondary-600 hover:text-secondary-600 [&_svg]:fill-secondary-600'
          : 'text-gray-300 hover:text-gray-400',
        className,
      )}
      aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Heart />
    </Button>
  );
}
