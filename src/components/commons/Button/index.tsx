'use client';

// Libs
import { cn, extendVariants, Button as NextUIButton } from '@heroui/react';

// Extracted base classes
const baseButtonClass =
  'w-full h-full py-3 rounded-[10px] border border-border-input-100 transition hover:delay-75';

export const Button = extendVariants(NextUIButton, {
  variants: {
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
    variant: {
      solid: cn(
        baseButtonClass,
        'bg-customBackgrounds-button-100 bg-black hover:bg-secondary',
        'text-white text-base',
      ),
      ghost: cn(
        baseButtonClass,
        'bg-transparent hover:bg-primary',
        'text-black text-base hover:text-white',
      ),
      light: cn(
        'text-black text-xl font-bold',
        'hover:delay-75 transition',
        'py-3',
      ),
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});
