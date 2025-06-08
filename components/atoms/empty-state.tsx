import { cn } from '@/lib/utils';

import { Text } from '@/components/atoms/text';

interface EmptyStateProps {
  message: string;
  className?: string;
}

export function EmptyState({ message, className }: EmptyStateProps) {
  return (
    <div className={cn('grid h-20 place-items-center', className)}>
      <Text variant="muted" size="sm">
        {message}
      </Text>
    </div>
  );
}
