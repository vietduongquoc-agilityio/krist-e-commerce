'use client';

import { Button, Modal } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';

// Components
import { ItemMiniCart, PaymentCard } from '@/components';

// Models
import { CartModel } from '@/models';

// Utils
import { calculateSubtotal, handleQuantityChange } from '@/utils';

interface MiniCartPopupClientProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartModel[];
  onQuantityChange?: (cartItemDocumentId: string, newQuantity: number) => void;
}

export const MiniCartPopupClient = ({
  isOpen,
  onClose,
  cartItems,
  onQuantityChange,
}: MiniCartPopupClientProps) => {
  const [cartItem, setCartItem] = useState<CartModel[]>(cartItems);

  const subtotal = useMemo(() => calculateSubtotal(cartItem), [cartItem]);
  const handleQuantityOnChange = (id: string, quantity: number) => {
    handleQuantityChange(id, quantity, setCartItem);
  };

  useEffect(() => {
    setCartItem(cartItems);
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
          {cartItem.length === 0 ? (
            <p className="text-xl text-red">Your cart is empty.</p>
          ) : (
            cartItem.map(({ product, color, quantity, documentId }) => (
              <ItemMiniCart
                key={documentId}
                productItem={product}
                color={color}
                quantity={quantity}
                onQuantityChange={handleQuantityOnChange}
                cartItemId={documentId}
              />
            ))
          )}
        </div>

        {cartItem.length > 0 && (
          <div className="mt-10">
            <PaymentCard subtotal={subtotal} />
          </div>
        )}
      </div>
    </Modal>
  );
};
