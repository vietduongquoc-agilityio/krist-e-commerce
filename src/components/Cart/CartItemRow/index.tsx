'use client';

import Image from 'next/image';

// Types
import {} from '@/types';

// Components
import { Button, QuantityInput } from '@/components';

// Models
import { ProductModel } from '@/models';
import { colorHexToName } from '@/utils';

interface CartItemProps {
  productItem: ProductModel;
  color: string;
  quantity: number;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  cartItemId: string;
}

export const CartItemRow = ({
  productItem,
  onQuantityChange,
  onRemove,
  color,
  quantity,
  cartItemId,
}: CartItemProps) => {
  const { thumbnailUrl, id, title, price, stock } = productItem;

  const colorName = colorHexToName[color.toLowerCase()] || color;

  return (
    <section>
      <div className="font-secondary mx-auto w-full max-w-[1280px] border-y border-gray pt-9 pb-11  flex justify-between ">
        {/* Image + Info */}
        <div className="flex gap-6 w-full max-w-[366px]">
          <Image
            src={
              thumbnailUrl ||
              'https://plus.unsplash.com/premium_photo-1707932496423-1ee96181ade8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8T3ZlcnNpemVkJTIwRGVuaW0lMjBKYWNrZXR8ZW58MHx8MHx8fDA%3D'
            }
            alt={title}
            width={168}
            height={255}
            className="object-cover"
            sizes="(100vw - 20px) 100vw, 168px"
          />

          <div className="flex flex-col text-[22px] items-start gap-5">
            <h3>{title}</h3>
            <p className="text-[22px] text-gray">Color: {colorName}</p>
            <Button
              onClick={() => onRemove?.(cartItemId)}
              variant="flat"
              className="underline text-gray px-0 hover:text-black transition"
            >
              Remove
            </Button>
          </div>
        </div>

        {/* Price */}
        <div className="text-lg font-medium w-[100px] text-center">
          ${price}
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
          ${price * quantity}
        </div>
      </div>
    </section>
  );
};
