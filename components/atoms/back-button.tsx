'use client';

import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function BackButton({ onClick }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="text-primary-600"
    >
      <ArrowLeft />
    </Button>
  );
}
