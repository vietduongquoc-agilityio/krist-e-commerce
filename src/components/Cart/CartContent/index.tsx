'use client';

// Components
import { CartItemRow, PaymentCard } from '@/components';

// Hooks
import { CartModel } from '@/models/cart';

// Utils
import { calculateSubtotal } from '@/utils';
import { useMemo } from 'react';

interface CartContentProps {
  cartItems: CartModel[];
}

export const CartContent = ({ cartItems }: CartContentProps) => {
  const subtotal = useMemo(() => calculateSubtotal(cartItems), [cartItems]);

  if (!cartItems.length) {
    return (
      <p className="text-center py-10 text-red text-xl font-secondary">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div className="flex flex-col  justify-between gap-10 max-w-[1280px] mx-auto">
      <div className="flex-1">
        {/* Table Header */}
        <div className="text-[22px] pb-[34px] font-secondary flex justify-between">
          <p className="w-[335px]">Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className="pl-[57px]">Total</p>
        </div>
        {/* Item Rows */}
        <div className="border-y border-gray divide-y divide-gray">
          {cartItems.map(({ product, color, quantity, id }) => {
            return (
              <CartItemRow
                key={id}
                productItem={product}
                color={color}
                quantity={quantity}
              />
            );
          })}
        </div>
      </div>

      {/* Payment Summary */}
      {cartItems.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard subtotal={subtotal} />
        </div>
      )}
    </div>
  );
};
