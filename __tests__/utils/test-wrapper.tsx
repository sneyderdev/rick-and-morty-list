import { BookmarksProvider } from '@/contexts/bookmarks-context';

export function TestWrapper({ children }: { children: React.ReactNode }) {
  return <BookmarksProvider>{children}</BookmarksProvider>;
}
