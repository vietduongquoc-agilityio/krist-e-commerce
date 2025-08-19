'use client';

import Image from 'next/image';

// components
import { QuantityInput } from '@/components/commons';

// constants
import { FREE_SHIPPING_AMOUNT, colorHexToName } from '@/constants';

// models
import { ProductModel } from '@/models';

interface ItemMiniCartProps {
  productItem: ProductModel;
  color: string;
  quantity: number;
  onQuantityChange?: (id: string, quantity: number) => void;
  cartItemId: string;
}

export const ItemMiniCart = ({
  productItem,
  color,
  onQuantityChange,
  quantity,
  cartItemId,
}: ItemMiniCartProps) => {
  const { thumbnailUrl, title, price, stock } = productItem;

  const subtotal = price * quantity;

  const remaining = Math.max(FREE_SHIPPING_AMOUNT - subtotal, 0);

  const colorName = colorHexToName[color.toLowerCase()] || color;

  return (
    <aside className="flex flex-col gap-7 max-w-[613px] border-b pb-5 border-gray">
      {remaining > 0 ? (
        <p className="mt-2 mb-16 text-gray text-[26px]">
          Buy <strong className="text-black">${remaining}</strong> More And Get{' '}
          <strong className="text-black">Free Shipping</strong>
        </p>
      ) : (
        <strong className="mt-2 mb-16 text-red text-[18px]">
          You’re eligible for Free Shipping!
        </strong>
      )}

      <div className="flex flex-row gap-8">
        <Image
          src={thumbnailUrl}
          alt={title}
          width={168}
          height={255}
          className="rounded object-cover"
          sizes="(100vw - 20px) 100vw, 168px"
        />
        <div className="flex flex-col">
          <div className="text-[22px]">
            <h4 className="font-secondary ">{title}</h4>
            <p className="text-gray pt-3">Color: {colorName}</p>
            <p className="my-4">${price}</p>
          </div>
          {/* <QuantityInput /> */}
          <QuantityInput
            value={Number(quantity)}
            min={1}
            max={stock}
            onChange={(val) => onQuantityChange?.(cartItemId, val)}
            aria-label={`Quantity for ${title}`}
          />
        </div>
      </div>
    </aside>
  );
};
