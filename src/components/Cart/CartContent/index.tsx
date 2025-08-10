'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

// Components
import { CartItemRow, PaymentCard } from '@/components';

// Models
import { CartModel } from '@/models';

// Services
import { removeCartItem } from '@/services';

// Utils
import { toastManager } from '@/utils';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

interface CartContentProps {
  cartsItems: CartModel[];
}

export const CartContent = ({ cartsItems }: CartContentProps) => {
  const [cartItem, setCartItem] = useState<CartModel[]>(cartsItems);

  const subtotal = cartItem.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const { data: session } = useSession();
  if (!session) {
    return null;
  }

  const handleRemove = async (cartItemDocumentId: string) => {
    try {
      await removeCartItem(cartItemDocumentId, session?.user.token);

      setCartItem((prev) =>
        prev.filter((item) => item.documentId !== cartItemDocumentId),
      );
    } catch (error) {
      console.error('Error removing item:', error);
      toastManager.showToast(ERROR_MESSAGES.REMOVE_CART_FAIL, 'error');
    }
    toastManager.showToast(
      SUCCESS_MESSAGES.REMOVE_PRODUCT_FROM_CART,
      'success',
    );
  };

  if (!cartItem.length) {
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
          {cartItem.map(({ product, color, quantity, documentId }) => {
            return (
              <CartItemRow
                key={documentId}
                productItem={product}
                cartItemId={documentId}
                color={color}
                quantity={quantity}
                // onQuantityChange={(id, quantity) => handleUpdateQuantity(id, quantity)}
                onRemove={(cartItemDocumentId) =>
                  handleRemove(cartItemDocumentId)
                }
              />
            );
          })}
        </div>
      </div>

      {/* Payment Summary */}
      {cartItem.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard
            subtotal={subtotal}
            // onCheckout={() => handleCheckout()}
          />
        </div>
      )}
    </div>
  );
};
