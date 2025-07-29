'use client';

import { Button, Card } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

// Models
import { ItemCardProps } from '@/models';

// Constants
import { ROUTER } from '@/constants';
import { ColorButton } from '@/components';

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
      className="cursor-pointer flex flex-col gap-5 group relative overflow-hidden hover:shadow-xl transition"
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
      <div className="ml-4 mb-3">
        <h3 className="font-secondary mb-[5px]">{title}</h3>
        <p>${price}</p>
        <div className="flex gap-2 mt-4">
          {(colors ?? []).map((color) => {
            const isSelected = selectedColor === color;
            return (
              <ColorButton
                key={color}
                color={color}
                isSelected={isSelected}
                isDisabled={isSoldOut}
                onClick={() => handleSelect(color)}
                as="div"
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
};
