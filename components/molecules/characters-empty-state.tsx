import { EmptyState } from '@/components/atoms/empty-state';

interface CharactersEmptyStateProps {
  type:
    | 'no-results'
    | 'no-characters'
    | 'no-starred'
    | 'no-starred-results'
    | 'error';
  query?: string;
  error?: string;
}

export function CharactersEmptyState({
  type,
  query,
  error,
}: CharactersEmptyStateProps) {
  const getMessage = () => {
    switch (type) {
      case 'no-results':
        return `No characters found${query ? ` for "${query}"` : ''}`;
      case 'no-characters':
        return 'No characters available';
      case 'no-starred':
        return 'No starred characters yet';
      case 'no-starred-results':
        return `No starred characters found${query ? ` for "${query}"` : ''}`;
      case 'error':
        return error || 'Something went wrong while searching for characters';
      default:
        return 'No characters available';
    }
  };

  return <EmptyState message={getMessage()} />;
}
