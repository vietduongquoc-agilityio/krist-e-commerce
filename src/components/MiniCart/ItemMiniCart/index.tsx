'use client';

import Image from 'next/image';

// components
import { QuantityInput } from '@/components/commons';

// models
import { ProductModel } from '@/models';

interface ItemMiniCartProps {
  productItem: ProductModel;
  onQuantityChange?: (id: string, quantity: number) => void;
}

export const ItemMiniCart = ({
  productItem,
  onQuantityChange,
}: ItemMiniCartProps) => {
  const { thumbnailUrl, title, price, quantity, id, stock } = productItem;
  const freeShippingAmount = 123.15;

  const subtotal = price * quantity;

  return (
    <aside className="flex flex-col gap-7 max-w-[613px] border-b pb-5 border-gray">
      <p className="mt-2 mb-16 text-gray text-[26px]">
        Buy{' '}
        <strong className="text-black">
          ${(freeShippingAmount - subtotal).toFixed(2)}
        </strong>{' '}
        More And Get <strong className="text-black">Free Shipping</strong>
      </p>
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
