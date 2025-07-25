'use client';

import { Button, Card, cn } from '@heroui/react';
import { useState } from 'react';
import Image from 'next/image';

interface ProductItemProps {
  thumbnailUrl: string;
  title: string;
  price: number;
  colors: string[];
  onChange?: (color: string) => void;
  isSoldOut?: boolean;
}

export const ProductItem = ({
  thumbnailUrl,
  title,
  colors,
  price,
  onChange,
  isSoldOut = false,
}: ProductItemProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleSelect = (color: string) => {
    const isSame = selectedColor === color;
    const newColor = isSame ? null : color;
    setSelectedColor(newColor);
    onChange?.(newColor || '');
  };

  return (
    <Card className="cursor-pointer flex flex-col gap-5 group relative overflow-hidden">
      <figure className="relative">
        <Image
          src={thumbnailUrl || '/images/productItem1.webp'}
          alt="Product Item"
          sizes="(100vw - 20px) 100vw, 302px"
          width={302}
          height={403}
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              className="bg-gray text-white text-xs font-black rounded-full w-[62px] h-[62px] flex flex-col items-center justify-center pointer-events-none"
            >
              <span>SOLD OUT</span>
            </Button>
          </div>
        )}
      </figure>
      <div>
        <h3 className="font-secondary mb-[5px]">{title}</h3>
        <p>${price}</p>
        <div className="flex gap-2 mt-4">
          {colors.map((color) => (
            <Button
              key={color}
              onPress={() => handleSelect(color)}
              className={cn(
                'w-[26px] h-[33px] rounded-full border-1 transition-all',
                {
                  'border-charcoal': selectedColor === color,
                  'border-transparent': selectedColor !== color,
                },
              )}
              style={{ backgroundColor: color }}
              aria-label={`Color ${color}`}
              isDisabled={isSoldOut}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
