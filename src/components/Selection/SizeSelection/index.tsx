'use client';

import { cn, Button } from '@heroui/react';
import { useState } from 'react';

interface SizeSelectionProps {
  sizes?: string[];
  onChange?: (size: string) => void;
}

export const SizeSelection = ({
  sizes = ['S', 'M', 'L', 'XL'],
  onChange,
}: SizeSelectionProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleClick = (size: string) => {
    setSelectedSize(size);
    onChange?.(size);
  };

  return (
    <div className="mb-6">
      <h2 className="text-[18px] font-secondary mb-4">Size</h2>
      <div className="grid grid-cols-3 gap-4 w-40">
        {sizes.map((size) => (
          <Button
            key={size}
            onPress={() => handleClick(size)}
            className={cn('border rounded-md px-5 py-2', {
              'border-black text-black font-semibold': selectedSize === size,
              'border-gray  text-gray': selectedSize !== size,
            })}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};
