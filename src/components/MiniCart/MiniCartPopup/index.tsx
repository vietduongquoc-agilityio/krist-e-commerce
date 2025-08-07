'use client';

import { useSession } from 'next-auth/react';
import { Button, Modal } from '@heroui/react';

// Components
import { ItemMiniCart, PaymentCard } from '@/components';

// Models
import { useEffect, useMemo, useState } from 'react';

// Utils
import {
  // clearCart,
  getCartItemsByUserId,
  updateCartItemQuantity,
} from '@/services';
import { ProductModel } from '@/models';

interface MiniCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MiniCartPopup = ({ isOpen, onClose }: MiniCartPopupProps) => {
  const { data: session } = useSession();

  console.log('session', session);

  const [cartItems, setCartItems] = useState<ProductModel[]>([]);
  console.log('cartItems', cartItems);
  const [loading, setLoading] = useState(true);

  const jwt = session?.user.token;
  const userId = session?.user?.id;

  useEffect(() => {
    if (!isOpen || !userId || !jwt) return;
    setLoading(true);

    getCartItemsByUserId(userId, jwt)
      .then((data) => {
        if (Array.isArray(data)) {
          setCartItems(data);
        } else {
          setCartItems([]);
        }
      })
      .finally(() => setLoading(false));
  }, [isOpen, userId, jwt]);

  const subtotal = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const onUpdateQuantity = async (id: string, qty: number) => {
    await updateCartItemQuantity(id, qty, jwt);
    setCartItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: qty } : c)),
    );
  };

  // const handleCheckout = async () => {
  //   await clearCart(userId!, jwt);
  //   setCartItems([]);
  //   onClose();
  // };

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
          {loading ? (
            <p className="text-gray">Loading your cart...</p>
          ) : cartItems.length === 0 ? (
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
              // onCheckout={() => handleCheckout()}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};
