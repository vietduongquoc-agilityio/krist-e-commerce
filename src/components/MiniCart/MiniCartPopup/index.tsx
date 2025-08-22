'use client';

import { useMemo } from 'react';
import { Button, Modal } from '@heroui/react';

// Hooks
import { useUpsertCart, useCheckoutCart } from '@/hooks';

// Components
import { ItemMiniCart } from '@/components';
import { PaymentCard } from '@/components/Card';

// Utils
import { toastManager } from '@/utils';

// Constants
import {
  ERROR_MESSAGES,
  FREE_SHIPPING_AMOUNT,
  SUCCESS_MESSAGES,
} from '@/constants';

// Models
import { CartModel } from '@/models';

interface MiniCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartModel[];
  userId: string;
  isAuthenticated: boolean;
}

export const MiniCartPopup = ({
  isOpen,
  onClose,
  cartItems = [],
  userId,
  isAuthenticated,
}: MiniCartPopupProps) => {
  const upsertCart = useUpsertCart();
  const checkoutCart = useCheckoutCart();

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const remaining = Math.max(FREE_SHIPPING_AMOUNT - subtotal, 0);

  const handleQuantityChange = (
    cartItemDocumentId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;
    if (!userId) return;

    const cartItem = cartItems.find((i) => i.documentId === cartItemDocumentId);
    if (!cartItem) return;

    upsertCart.mutate(
      {
        userId,
        productDocumentId: cartItem.product.documentId,
        colorName: cartItem.color,
        size: cartItem.size,
        quantity: newQuantity,
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

  const renderCartItems = useMemo(() => {
    if (!cartItems.length) {
      return <p className="text-xl text-red">Your cart is empty.</p>;
    }

    return cartItems.map((item) => {
      const { documentId, product, color, quantity } = item;

      return (
        <ItemMiniCart
          key={documentId}
          productItem={product}
          color={color}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          cartItemId={documentId}
        />
      );
    });
  }, [cartItems]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      className="relative z-50"
      aria-label="Mini cart popup"
    >
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="fixed inset-y-0 right-0 w-full max-w-[720px] bg-white p-10 overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[42px] font-secondary">Shopping Cart</h2>
          <Button
            onPress={onClose}
            className="text-gray text-2xl hover:text-black transition"
          >
            ×
          </Button>
        </div>

        {cartItems.length > 0 && (
          <div className="mb-10">
            {remaining > 0 ? (
              <p className="text-gray text-[26px]">
                Buy <strong className="text-black">${remaining}</strong> More
                And Get <strong className="text-black">Free Shipping</strong>
              </p>
            ) : (
              <strong className="text-red text-[18px]">
                You’re eligible for Free Shipping!
              </strong>
            )}
          </div>
        )}

        <div className="space-y-8">{renderCartItems}</div>

        {cartItems.length > 0 && (
          <div className="mt-10">
            <PaymentCard
              subtotal={subtotal}
              onCheckout={handleCheckout}
              disabled={upsertCart.isPending || checkoutCart.isPending}
              isCheckingOut={checkoutCart.isPending}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
