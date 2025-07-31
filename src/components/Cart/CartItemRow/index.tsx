'use client';

import Image from 'next/image';

// Models
import { ProductModel } from '@/models';

// Components
import { Button, QuantityInput } from '@/components';

interface CartItemProps {
  productItem: ProductModel;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: () => void;
}

export const CartItemRow = ({
  productItem,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  const {
    thumbnailUrl: imageUrl,
    stock,
    id,
    title,
    price,
    quantity,
  } = productItem;

  return (
    <section>
      <div className="font-secondary mx-auto w-full max-w-[1280px] border-y border-gray pt-9 pb-11  flex justify-between ">
        {/* Image + Info */}
        <div className="flex gap-6 w-full max-w-[366px]">
          <Image
            src={imageUrl}
            alt={title}
            width={168}
            height={255}
            className="object-cover"
            sizes="(100vw - 20px) 100vw, 168px"
          />
          <div className="flex flex-col text-[22px] items-start gap-5">
            <h3>{title}</h3>
            <Button
              onClick={onRemove}
              variant="flat"
              className="underline text-gray px-0 hover:text-black transition"
            >
              Remove
            </Button>
          </div>
        </div>

        {/* Price */}
        <div className="text-lg font-medium w-[100px] text-center">
          ${price.toFixed(2)}
        </div>

        {/* <QuantityInput /> */}
        <div className="mt-[-5px]">
          <QuantityInput
            value={quantity}
            min={1}
            max={stock}
            onChange={(val) => onQuantityChange?.(id, val)}
            aria-label={`Quantity for ${title}`}
          />
        </div>

        {/* Total */}
        <div className="text-lg font-semibold w-[100px] text-right">
          ${(price * quantity).toFixed(2)}
        </div>
      </div>
    </section>
  );
};
