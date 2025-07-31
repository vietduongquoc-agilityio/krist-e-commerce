'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, Checkbox, cn } from '@heroui/react';

// Components
import { Button } from '@/components';

interface PaymentCardProps {
  subtotal: number;
  onCheckout?: () => void;
}

export const PaymentCard = ({ subtotal, onCheckout }: PaymentCardProps) => {
  const [wrapGift, setWrapGift] = useState(false);

  const total = wrapGift ? subtotal + 10 : subtotal;

  return (
    <Card className="mt-4 pt-4 w-full max-w-[613px]">
      <label
        htmlFor="wrap-gift-checkbox"
        className="flex items-center gap-2 text-gray border-b border-gray text-[22px] pb-5"
      >
        <Checkbox
          isSelected={wrapGift}
          id="wrap-gift-checkbox"
          onChange={() => setWrapGift(!wrapGift)}
          classNames={{
            wrapper: 'rounded-[3px] border-[2px] border-black bg-white w-8 h-8',
          }}
        />

        <span className="pl-2">
          For <strong className="text-black">$10.00</strong> Please Wrap The
          Product
        </span>
      </label>

      <div className="flex font-secondary text-[22px] justify-between items-center pb-7 pt-[51px]">
        <span>Subtotal</span>
        <span className="font-bold">${total.toFixed(2)}</span>
      </div>

      <Button
        onClick={onCheckout}
        variant="solid"
        isDisabled={subtotal === 0}
        className="shadow-lg py-6"
      >
        Checkout
      </Button>

      <Link
        href="/cart"
        className="underline text-[22px] font-secondary text-black text-center mt-5 hover:text-gray transition"
      >
        View Cart
      </Link>
    </Card>
  );
};
