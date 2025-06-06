import { forwardRef, createElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva('tracking-normal truncate', {
  variants: {
    variant: {
      heading: 'font-semibold',
      body: 'font-normal',
      muted: 'text-muted-foreground',
      caption: 'uppercase tracking-wide',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
  },
  defaultVariants: {
    variant: 'body',
    size: 'base',
  },
});

type ElementType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: ElementType;
}

const Text = forwardRef<HTMLElement, TextProps>(
  ({ className, variant, size, as = 'p', ...props }, ref) => {
    return createElement(as, {
      className: cn(textVariants({ variant, size }), className),
      ref,
      ...props,
    });
  },
);

Text.displayName = 'Text';

export { Text, textVariants };
