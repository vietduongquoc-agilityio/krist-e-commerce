'use client';

import { Button, Modal } from '@heroui/react';
import { useMemo } from 'react';

// Components
import { ItemMiniCart, PaymentCard } from '@/components';

// Models
import { CartModel } from '@/models';

interface MiniCartPopupClientProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartModel[];
}

export function MiniCartPopupClient({
  isOpen,
  onClose,
  cartItems,
}: MiniCartPopupClientProps) {
  const subtotal = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

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
            cartItems.map(({ product, color, quantity, id }) => (
              <ItemMiniCart
                key={id}
                productItem={product}
                color={color}
                quantity={quantity}
              />
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-10">
            <PaymentCard subtotal={subtotal} />
          </div>
        )}
      </div>
    </Modal>
  );
}
