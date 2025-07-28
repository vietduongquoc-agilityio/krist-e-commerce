'use client';

import { Button, Card, cn } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// Models
import { ItemCardProps } from '@/models';

// Constants
import { ROUTER } from '@/constants';

export const ProductItem = ({
  id,
  thumbnailUrl,
  title,
  colors,
  price,
  onChange,
  isSoldOut = false,
}: ItemCardProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const router = useRouter();

  const handleCardClick = () => {
    if (!isSoldOut) {
      router.push(`${ROUTER.PRODUCT}/${id}`);
    }
  };

  const handleSelect = (color: string) => {
    const newColor = selectedColor === color ? null : color;
    setSelectedColor(newColor);
    onChange?.(newColor || '');
  };

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer flex flex-col gap-5 group relative overflow-hidden"
    >
      <figure className="relative">
        <Image
          src={thumbnailUrl || '/images/productItem1.webp'}
          alt="Product Item"
          sizes="(100vw - 20px) 100vw, 302px"
          width={302}
          height={403}
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Button
              variant="ghost"
              className="bg-gray text-white text-[10px] font-black rounded-full w-[62px] h-[62px] flex flex-col items-center justify-center pointer-events-none leading-tight text-center"
            >
              SOLD
              <br />
              OUT
            </Button>
          </div>
        )}
      </figure>
      <div>
        <h3 className="font-secondary mb-[5px]">{title}</h3>
        <p>${price}</p>
        <div className="flex gap-2 mt-4">
          {(colors ?? []).map((color) => {
            const isSelected = selectedColor === color;
            return (
              <div
                key={color}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isSoldOut) handleSelect(color);
                }}
                className={cn(
                  'rounded-full flex items-center justify-center transition-all',
                  'w-8 h-8',
                  isSelected
                    ? 'border-2 border-black'
                    : 'border border-gray hover:border-black',
                  isSoldOut && 'pointer-events-none opacity-50',
                )}
              >
                <div
                  className={cn(
                    'rounded-full transition-all',
                    isSelected ? 'w-6 h-6' : 'w-8 h-8',
                  )}
                  style={{ backgroundColor: color }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
