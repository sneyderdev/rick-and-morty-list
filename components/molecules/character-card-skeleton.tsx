import { Skeleton } from '@/components/ui/skeleton';

export function CharacterCardSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4">
      <Skeleton className="size-8 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}
