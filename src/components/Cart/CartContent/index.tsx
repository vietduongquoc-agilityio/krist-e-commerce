'use client';

// Components
import { CartItemRow, PaymentCard } from '@/components';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

// Models
import { CartModel } from '@/models';
import { removeCartItem } from '@/services';

// Utils
import { calculateSubtotal, toastManager } from '@/utils';
import { useMemo, useState } from 'react';

interface CartContentProps {
  cartItems: CartModel[];
}

export const CartContent = ({ cartItems }: CartContentProps) => {
  const subtotal = useMemo(() => calculateSubtotal(cartItems), [cartItems]);

  const [cartItem, setCartItem] = useState<CartModel[]>(cartItems);

  if (!cartItem.length) {
    return (
      <p className="text-center py-10 text-red text-xl font-secondary">
        Your cart is empty.
      </p>
    );
  }
  const handleRemove = async (cartItemDocumentId: string) => {
    try {
      await removeCartItem(cartItemDocumentId);

      setCartItem((prev) =>
        prev.filter((item) => item.documentId !== cartItemDocumentId),
      );
    } catch (error) {
      console.error('Error removing item:', error);
      toastManager.showToast(ERROR_MESSAGES.REMOVE_CART_ITEM_FAIL, 'error');
    }
    toastManager.showToast(
      SUCCESS_MESSAGES.REMOVE_PRODUCT_FROM_CART,
      'success',
    );
  };

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
          {cartItem.map(({ product, color, quantity, documentId }) => {
            return (
              <CartItemRow
                key={documentId}
                productItem={product}
                cartItemId={documentId}
                color={color}
                quantity={quantity}
                onRemove={handleRemove}
              />
            );
          })}
        </div>
      </div>

      {/* Payment Summary */}
      {cartItem.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard subtotal={subtotal} />
        </div>
      )}
    </div>
  );
};
