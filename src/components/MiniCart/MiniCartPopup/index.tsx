'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Modal } from '@heroui/react';

// Services
import {
  checkoutCart,
  getCartItemsByUserId,
  updateCartItemById,
} from '@/services';

// Models
import { CartModel } from '@/models';

// Components
import { ItemMiniCart } from '@/components';
import { toastManager } from '@/utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/constants';
import { PaymentCard } from '@/components/Card';

interface MiniCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiniCartPopup = ({ isOpen, onClose }: MiniCartPopupProps) => {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !session?.user) return;

    const fetchCart = async () => {
      setIsLoading(true);
      const { id: userId } = session.user;
      const data = await getCartItemsByUserId(userId);

      if (data?.length) {
        setCartItems(data);
      }

      setIsLoading(false);
    };

    fetchCart();
  }, [isOpen, session]);

  const subtotal = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const handleQuantityChange = async (
    cartItemDocumentId: string,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.documentId === cartItemDocumentId
            ? { ...item, quantity: Number(newQuantity) }
            : item,
        ),
      );

      await updateCartItemById(cartItemDocumentId, {
        quantity: Number(newQuantity),
      });

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
      await checkoutCart(cartItems, () => {});
      setCartItems([]);
      toastManager.showToast(SUCCESS_MESSAGES.CHECKOUT_SUCCESS, 'success');
      window.dispatchEvent(
        new CustomEvent('cartUpdated', { detail: { type: 'checkout' } }),
      );
      onClose();
    } catch (error) {
      console.error('Error checking out cart:', error);
      toastManager.showToast(ERROR_MESSAGES.CHECKOUT_FAIL, 'error');
    }
  };

  const renderCartItems = useMemo(() => {
    if (isLoading) {
      return <p className="text-xl text-red">Loading cart...</p>;
    }

    if (!cartItems.length)
      return <p className="text-xl text-red">Your cart is empty.</p>;

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
  }, [cartItems, isLoading]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative z-50"
      aria-label="Mini cart popup"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-y-0 right-0 w-full max-w-[720px] bg-white p-10 overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[42px] font-secondary">Shopping Cart</h2>
          <Button
            onPress={onClose}
            className="text-gray text-2xl hover:text-black transition"
          >
            ×
          </Button>
        </div>

        <div className="space-y-8">{renderCartItems}</div>

        {cartItems.length > 0 && (
          <div className="mt-10">
            <PaymentCard subtotal={subtotal} onCheckout={handleCheckout} />
          </div>
        )}
      </div>
    </Modal>
  );
};
