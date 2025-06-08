import { BookmarksProvider } from '@/contexts/bookmarks-context';
import { SearchProvider } from '@/contexts/search-context';

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BookmarksProvider>
      <SearchProvider>{children}</SearchProvider>
    </BookmarksProvider>
  );
}
