'use client';

import { useMemo, useState } from 'react';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

// Components
import {
  CartItemRow,
  CartItemRowSkeleton,
  ListCartItemRowSkeleton,
  PaymentCard,
} from '@/components';

// Models
import { CartModel } from '@/models';

// Services
import {
  checkoutCart,
  removeCartItem,
  updateCartItemQuantity,
} from '@/services';

// Utils
import { calculateSubtotal, toastManager } from '@/utils';

interface CartContentProps {
  cartItems: CartModel[];
}

export const CartContent = ({ cartItems }: CartContentProps) => {
  const [items, setItems] = useState<CartModel[]>(cartItems);
  const [loadingRemoveId, setLoadingRemoveId] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const subtotal = useMemo(() => calculateSubtotal(items), [items]);

  if (!items.length) {
    return (
      <p className="text-center py-10 text-red text-xl font-secondary">
        Your cart is empty.
      </p>
    );
  }

  const handleRemove = async (cartItemDocumentId: string) => {
    try {
      setLoadingRemoveId(cartItemDocumentId);
      await removeCartItem(cartItemDocumentId);

      setItems((prev) =>
        prev.filter((item) => item.documentId !== cartItemDocumentId),
      );

      toastManager.showToast(
        SUCCESS_MESSAGES.REMOVE_PRODUCT_FROM_CART,
        'success',
      );

      window.dispatchEvent(
        new CustomEvent('cartUpdated', {
          detail: { type: 'remove', documentId: cartItemDocumentId },
        }),
      );
    } catch (error) {
      console.error('Error removing item:', error);
      toastManager.showToast(ERROR_MESSAGES.REMOVE_CART_ITEM_FAIL, 'error');
    } finally {
      setLoadingRemoveId(null);
    }
  };

  const handleQuantityChange = async (
    cartItemDocumentId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    try {
      await updateCartItemQuantity(cartItemDocumentId, newQuantity);

      window.dispatchEvent(
        new CustomEvent('cartUpdated', {
          detail: { type: 'update', documentId: cartItemDocumentId },
        }),
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toastManager.showToast(
        ERROR_MESSAGES.UPDATE_CART_ITEM_QUANTITY_FAIL,
        'error',
      );
    }
  };

  const handleCheckout = async () => {
    try {
      setLoadingCheckout(true);
      await checkoutCart(items, () => {});
      setItems([]);
      toastManager.showToast(SUCCESS_MESSAGES.CHECKOUT_SUCCESS, 'success');
    } catch (error) {
      console.error('Error checking out cart:', error);
      toastManager.showToast(ERROR_MESSAGES.CHECKOUT_FAIL, 'error');
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-10 max-w-[1280px] mx-auto">
      <div className="flex-1">
        {/* Table Header */}
        <div className="text-[22px] pb-[34px] font-secondary flex justify-between">
          <p className="w-[335px]">Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className="pl-[57px]">Total</p>
        </div>

        {/* Item Rows */}

        {/* {items.map(({ product, color, quantity, documentId }) => (
            <CartItemRow
              key={documentId}
              productItem={product}
              cartItemId={documentId}
              color={color}
              quantity={quantity}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))} */}
        {loadingCheckout ? (
          <ListCartItemRowSkeleton count={items.length || 3} />
        ) : (
          <div className="border-y border-gray divide-y divide-gray">
            {items.map(({ product, color, quantity, documentId }) =>
              loadingRemoveId === documentId ? (
                <CartItemRowSkeleton key={documentId} />
              ) : (
                <CartItemRow
                  key={documentId}
                  productItem={product}
                  cartItemId={documentId}
                  color={color}
                  quantity={quantity}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              ),
            )}
          </div>
        )}
      </div>

      {/* Payment Summary */}
      {items.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard
            subtotal={subtotal}
            onCheckout={handleCheckout}
            disabled={loadingCheckout}
          />
        </div>
      )}
    </div>
  );
};
