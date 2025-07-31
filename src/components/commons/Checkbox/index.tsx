'use client';

import { Checkbox as NextUICheckbox, extendVariants, cn } from '@heroui/react';

export const Checkbox = extendVariants(NextUICheckbox, {
  slots: {
    base: cn('flex items-center gap-2 cursor-pointer'),
    wrapper: cn(
      'w-5 h-5 rounded border border-gray-300 transition-colors',
      'data-[selected=true]:bg-black data-[selected=true]:border-black',
      'flex items-center justify-center',
    ),
    icon: cn('text-white w-3.5 h-3.5'),
    label: cn('text-base text-gray-800 select-none'),
    hiddenInput: cn('hidden'),
  },
});
