'use client';

import { cn, Button } from '@heroui/react';
import { useSearchParams, useRouter } from 'next/navigation';

const sizes = ['S', 'M', 'L', 'XL'];

export const SizeSelection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedSize = searchParams.get('size');

  const handleClick = (size: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedSize === size) {
      params.delete('size');
    } else {
      params.set('size', size);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <h2 className="text-[18px] font-secondary mb-4">Size</h2>
      <div className="grid grid-cols-3 gap-4 w-40">
        {sizes.map((size) => (
          <Button
            key={size}
            onPress={() => handleClick(size)}
            className={cn(
              'border rounded-md px-5 py-2 hover:bg-whiteSmoke transition',
              {
                'border-black text-black font-semibold': selectedSize === size,
                'border-gray  text-gray': selectedSize !== size,
              },
            )}
          >
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
};
