'use client';

import { Search } from 'lucide-react';

import { useSearch } from '@/contexts/search-context';

import { Input } from '@/components/ui/input';

export function SearchInput() {
  const { state, setQuery } = useSearch();

  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 lg:left-5" />
      <Input
        type="text"
        placeholder="Search or filter results"
        value={state.query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-10 lg:px-12"
      />
    </div>
  );
}
