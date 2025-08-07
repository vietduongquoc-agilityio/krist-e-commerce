'use client';

import { Button, Modal } from '@heroui/react';

// Components
import { ItemMiniCart, PaymentCard } from '@/components';

// Types
import { ItemCardProps } from '@/types';

// Utils
import { useCart } from '@/hooks/useCart';
import { toastManager } from '@/utils';

interface MiniCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ItemCardProps[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

export const MiniCartPopup = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
}: MiniCartPopupProps) => {
  const { clearCart, subtotal } = useCart();

  const handleCheckout = () => {
    clearCart();
    onClose();
    toastManager.showToast('Checkout successful', 'success');
  };

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

        <div className="space-y-8">
          {cartItems.length === 0 ? (
            <p className="text-xl text-red">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <ItemMiniCart
                key={item.id}
                productItem={item}
                onQuantityChange={onUpdateQuantity}
              />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-10">
            <PaymentCard
              subtotal={subtotal}
              onCheckout={() => handleCheckout()}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
