'use client';

import { useSearchFeedback } from '@/hooks/use-search-feedback';

import { Text } from '@/components/atoms/text';

export function SearchFeedback() {
  const { hasSearchQuery, totalResults } = useSearchFeedback();

  if (!hasSearchQuery) {
    return null;
  }

  return (
    <Text className="font-semibold text-blue-600">
      {totalResults} result{totalResults !== 1 ? 's' : ''}
    </Text>
  );
}
