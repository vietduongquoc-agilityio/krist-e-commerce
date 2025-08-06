'use client';

import Image from 'next/image';

// components
import { QuantityInput } from '@/components/commons';

// models
import { ItemCardProps } from '@/types';

// constants
import { FREE_SHIPPING_AMOUNT } from '@/constants';

interface ItemMiniCartProps {
  productItem: ItemCardProps;
  onQuantityChange?: (id: string, quantity: number) => void;
}

export const ItemMiniCart = ({
  productItem,
  onQuantityChange,
}: ItemMiniCartProps) => {
  const { thumbnailUrl, title, price, quantity, id, stock } = productItem;

  const subtotal = price * quantity;

  const remaining = Math.max(FREE_SHIPPING_AMOUNT - subtotal, 0);

  return (
    <aside className="flex flex-col gap-7 max-w-[613px] border-b pb-5 border-gray">
      {remaining > 0 ? (
        <p className="mt-2 mb-16 text-gray text-[26px]">
          Buy <strong className="text-black">${remaining.toFixed(2)}</strong>{' '}
          More And Get <strong className="text-black">Free Shipping</strong>
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
            <p className="my-5">${price.toFixed(2)}</p>
          </div>
          {/* <QuantityInput /> */}
          <QuantityInput
            value={quantity}
            min={1}
            max={stock}
            onChange={(val) => onQuantityChange?.(id, val)}
            aria-label={`Quantity for ${title}`}
          />
        </div>
      </div>
    </aside>
  );
};
