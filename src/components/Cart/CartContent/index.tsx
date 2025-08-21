'use client';

import { useMemo } from 'react';

// Constants
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';

// Components
import { ListCartItemRowSkeleton } from '@/components/Skeletons';
import { PaymentCard } from '@/components/Card';
import { CartItemRow } from '@/components';

// Hooks
import {
  useCheckoutCart,
  useGetCartItems,
  useRemoveCartItem,
  useUpsertCart,
} from '@/hooks';

// Utils
import { toastManager } from '@/utils';

interface CartContentProps {
  userId: string;
  isAuthenticated: boolean;
  isRemoving?: boolean;
}

export const CartContent = ({ userId, isAuthenticated }: CartContentProps) => {
  // fetch
  const {
    data: cartItems = [],
    isFetching,
    isLoading,
  } = useGetCartItems({ userId, isAuthenticated });

  // mutations
  const removeCartItem = useRemoveCartItem();
  const upsertCart = useUpsertCart();
  const checkoutCart = useCheckoutCart();

  const subtotal = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * (item.quantity || 0),
      0,
    );
  }, [cartItems]);

  if (isLoading) {
    return <ListCartItemRowSkeleton count={3} />;
  }

  if (!cartItems.length) {
    return (
      <p className="text-center py-10 text-red text-xl font-secondary">
        Your cart is empty.
      </p>
    );
  }

  // handlers
  const handleRemove = (cartItemDocumentId: string) => {
    removeCartItem.mutate(
      { userId, cartItemDocumentId },
      {
        onSuccess: () => {
          toastManager.showToast(
            SUCCESS_MESSAGES.REMOVE_PRODUCT_FROM_CART,
            'success',
          );
        },
        onError: () => {
          toastManager.showToast(ERROR_MESSAGES.REMOVE_CART_ITEM_FAIL, 'error');
        },
      },
    );
  };

  const handleQuantityChange = (
    cartItemDocumentId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    const cartItem = cartItems.find((i) => i.documentId === cartItemDocumentId);
    if (!cartItem) return;

    upsertCart.mutate(
      {
        userId,
        productDocumentId: cartItem.product.documentId,
        colorName: cartItem.color,
        size: cartItem.size,
        quantity: Number(newQuantity),
        mode: 'set',
      },
      {
        onError: () => {
          toastManager.showToast(
            ERROR_MESSAGES.UPDATE_CART_ITEM_QUANTITY_FAIL,
            'error',
          );
        },
      },
    );
  };

  const handleCheckout = () => {
    checkoutCart.mutate(
      { userId, cartItems },
      {
        onSuccess: () => {
          toastManager.showToast(SUCCESS_MESSAGES.CHECKOUT_SUCCESS, 'success');
        },
        onError: () => {
          toastManager.showToast(ERROR_MESSAGES.CHECKOUT_FAIL, 'error');
        },
      },
    );
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
        {isLoading ? (
          <ListCartItemRowSkeleton count={cartItems.length || 3} />
        ) : (
          <div className="border-y border-gray divide-y divide-gray">
            {cartItems.map(({ product, color, quantity, documentId }) => (
              <CartItemRow
                key={documentId}
                productItem={product}
                cartItemId={documentId}
                color={color}
                quantity={quantity}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
                isRemoving={
                  removeCartItem.isPending &&
                  removeCartItem.variables?.cartItemDocumentId === documentId
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Payment Summary */}
      {cartItems.length > 0 && (
        <div className="flex justify-end">
          <PaymentCard
            subtotal={subtotal}
            onCheckout={handleCheckout}
            disabled={
              isFetching || removeCartItem.isPending || checkoutCart.isPending
            }
            isCheckingOut={checkoutCart.isPending}
          />
        </div>
      )}
    </div>
  );
};
