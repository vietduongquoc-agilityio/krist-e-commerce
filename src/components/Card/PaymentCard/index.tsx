'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, Checkbox } from '@heroui/react';
import { usePathname } from 'next/navigation';

// Components
import { Button } from '@/components/commons/Button';

interface PaymentCardProps {
  subtotal: number;
  onCheckout?: () => void;
  disabled?: boolean;
  isCheckingOut?: boolean;
}

export const PaymentCard = ({
  subtotal,
  onCheckout,
  disabled = false,
  isCheckingOut = false,
}: PaymentCardProps) => {
  const [wrapGift, setWrapGift] = useState(false);
  const pathname = usePathname();

  const total = wrapGift ? subtotal + 10 : subtotal;

  const handleToggleWrapGift = () => {
    setWrapGift((prev) => !prev);
  };

  return (
    <Card className="mt-4 pt-4 w-full max-w-[613px]">
      <label
        htmlFor="wrap-gift-checkbox"
        className="flex items-center gap-2 text-gray border-b border-gray text-[22px] pb-5"
      >
        <Checkbox
          isSelected={wrapGift}
          id="wrap-gift-checkbox"
          onChange={handleToggleWrapGift}
          classNames={{
            wrapper:
              'rounded-[3px] h-auto w-8 h-8 border-2 border-black text-black bg-white',
            hiddenInput: 'hidden',
          }}
        />

        <span className="pl-2">
          For <strong className="text-black">$10.00</strong> Please Wrap The
          Product
        </span>
      </label>

      <div className="flex font-secondary text-[22px] justify-between items-center pb-7 pt-[51px]">
        <span>Subtotal</span>
        <span className="font-bold">${total}</span>
      </div>

      <Button
        onClick={onCheckout}
        variant="solid"
        isDisabled={subtotal === 0 || disabled || isCheckingOut}
        className={`shadow-lg py-6 text-[21px] font-bold transition ${
          isCheckingOut
            ? 'bg-strawberry text-white cursor-not-allowed'
            : 'text-gray hover:text-black'
        }`}
      >
        {isCheckingOut ? 'Processing…' : 'Checkout'}
      </Button>

      {pathname !== '/cart' && (
        <Link
          href="/cart"
          className="underline text-[22px] font-secondary text-black text-center mt-5 hover:text-gray transition"
        >
          View Cart
        </Link>
      )}
    </Card>
  );
};
