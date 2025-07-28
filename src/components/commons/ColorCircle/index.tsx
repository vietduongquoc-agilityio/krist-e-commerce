'use client';

import { cn } from '@heroui/react';

interface ColorButtonProps {
  color: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  as?: 'div' | 'button';
  className?: string;
}

export const ColorButton = ({
  color,
  isSelected = false,
  isDisabled = false,
  onClick,
  as = 'div',
  className,
}: ColorButtonProps) => {
  const Component = as;

  return (
    <Component
      onClick={(e: any) => {
        e.stopPropagation?.();
        if (!isDisabled) onClick?.();
      }}
      className={cn(
        'rounded-full flex items-center justify-center transition-all',
        'w-8 h-8',
        isSelected
          ? 'border-1 border-black'
          : 'border border-gray hover:border-black',
        isDisabled && 'pointer-events-none opacity-50',
        className,
      )}
      type={as === 'button' ? 'button' : undefined}
    >
      <div
        className={cn(
          'rounded-full transition-all',
          isSelected ? 'w-6 h-6' : 'w-8 h-8',
          isSelected && as === 'button' && 'hover:scale-105',
        )}
        style={{ backgroundColor: color }}
      />
    </Component>
  );
};
